# 🔗 Как связать HTML шаблоны с доменом через платформу

## 📋 Общий процесс

```
Шаг 1: Подготовить HTML шаблон
   ↓
Шаг 2: Загрузить шаблон в админ-панель (/admin/templates)
   ↓
Шаг 3: Привязать шаблон к домену и нише
   ↓
Шаг 4: Генерировать контент (Claude заполняет переменные)
   ↓
Шаг 5: Публиковать на домене
   ↓
Шаг 6: Готовая страница открывается на домене! 🎉
```

---

## 1️⃣ Подготовить HTML шаблон с маркерами

### Твой готовый HTML может выглядеть так:

```html
<!DOCTYPE html>
<html>
<head>
  <title>{{CITY}} - {{SERVICE}} | {{DOMAIN}}</title>
  <meta name="description" content="{{META_DESCRIPTION}}">
</head>
<body>
  <header>
    <h1>{{SERVICE}} в {{CITY}}</h1>
    <p>{{HEADER_TEXT}}</p>
  </header>
  
  <main>
    <section class="intro">
      <h2>Что такое {{SERVICE}}?</h2>
      <p>{{INTRO_CONTENT}}</p>
    </section>

    <section class="problems">
      <h2>Проблемы, которые мы решаем</h2>
      <ul>
        <li>{{PROBLEM_1}}</li>
        <li>{{PROBLEM_2}}</li>
        <li>{{PROBLEM_3}}</li>
      </ul>
    </section>

    <section class="solutions">
      <h2>Как мы помогаем?</h2>
      <p>{{SOLUTIONS_CONTENT}}</p>
    </section>

    <section class="cta">
      <h2>Позвони нам сегодня!</h2>
      <p>{{CTA_TEXT}}</p>
      <button>{{CTA_BUTTON}}</button>
    </section>
  </main>

  <footer>
    <p>&copy; 2024 {{DOMAIN}}</p>
  </footer>
</body>
</html>
```

### 🔑 Маркеры (переменные):
- `{{CITY}}` - подставится город (Almaty, Turgen и т.д.)
- `{{SERVICE}}` - подставится услуга (Сантехнические услуги и т.д.)
- `{{CONTENT}}` - подставится сгенерированный контент от Claude
- `{{DOMAIN}}` - подставится имя домена

---

## 2️⃣ Загрузить шаблон в админ-панель

### Это уже реализовано! Раздел `/admin/templates`

**Что нужно сделать:**
1. Открыть админ-панель → Шаблоны
2. Кнопка "+ Загрузить Шаблон"
3. Выбрать файл `santehnik-template.html`
4. Сохранить

**В БД сохранится:**
```sql
INSERT INTO templates (
  name,
  niche_id,
  html_content,
  uploaded_at
) VALUES (
  'Сантехнические услуги - Template',
  1,
  '<html>...</html>',
  NOW()
);
```

---

## 3️⃣ Привязать шаблон к домену

### Нужна небольшая модификация в БД:

```sql
-- Добавить поле в таблицу templates
ALTER TABLE templates ADD COLUMN domain_id INT;

-- Или создать таблицу связей:
CREATE TABLE template_domain_mapping (
  id INT PRIMARY KEY,
  template_id INT,
  domain_id INT,
  created_at TIMESTAMP,
  UNIQUE(template_id, domain_id)
);
```

### В админ-панели (Шаблоны):

Теперь при загрузке шаблона добавляем поле:
```
Загрузить Шаблон
├─ Выбрать файл: santehnik-template.html
├─ Нишу: "Сантехнические услуги"
└─ Домены: ☑ santehnik.kz, ☐ remont.kz
```

---

## 4️⃣ Генерировать контент с подстановкой

### Вот как платформа будет работать:

```typescript
// app/api/generate/start/route.ts

export async function POST(req: Request) {
  const {
    mode,
    domain,      // "santehnik.kz"
    niche,       // "santehnik"
    city,        // "almaty"
    template_id  // ID шаблона
  } = await req.json();

  // 1. Получить шаблон из БД
  const template = await db.query.templates.findFirst({
    where: eq(templates.id, template_id)
  });

  // 2. Получить города и услуги
  const locations = await db.query.locations.findMany({
    where: eq(locations.city, city)
  });

  // 3. Создать промпт для Claude
  const prompt = `
    Заполни эти переменные для генерации SEO страницы:
    
    Домен: ${domain}
    Город: ${city}
    Нишу: ${niche}
    
    Переменные для подстановки в шаблон:
    - {{CITY}}: ${city}
    - {{SERVICE}}: ${niche}
    - {{HEADER_TEXT}}: [генерируй приветственный текст]
    - {{INTRO_CONTENT}}: [генерируй введение, 200 слов]
    - {{PROBLEM_1}}, {{PROBLEM_2}}, {{PROBLEM_3}}: [генерируй 3 проблемы]
    - {{SOLUTIONS_CONTENT}}: [генерируй решения, 300 слов]
    - {{CTA_TEXT}}: [генерируй призыв к действию]
    - {{META_DESCRIPTION}}: [генерируй meta description, 160 символов]
    
    Возвращай JSON:
    {
      "CITY": "Almaty",
      "SERVICE": "Ремонт труб",
      "HEADER_TEXT": "...",
      "INTRO_CONTENT": "...",
      "PROBLEM_1": "...",
      "PROBLEM_2": "...",
      "PROBLEM_3": "...",
      "SOLUTIONS_CONTENT": "...",
      "CTA_TEXT": "...",
      "META_DESCRIPTION": "..."
    }
  `;

  // 4. Запросить Claude API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ANTHROPIC_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const claudeData = await response.json();
  const variables = JSON.parse(claudeData.content[0].text);

  // 5. Подставить переменные в шаблон
  let htmlContent = template.html_content;
  for (const [key, value] of Object.entries(variables)) {
    htmlContent = htmlContent.replace(`{{${key}}}`, value);
  }

  // 6. Сохранить готовую страницу в БД
  const slug = `${city}-${niche}`.toLowerCase().replace(/\s+/g, '-');
  
  await db.insert(pages).values({
    domain_id: domain,
    slug: slug,
    title: variables.CITY + ' - ' + variables.SERVICE,
    content: htmlContent,
    meta_description: variables.META_DESCRIPTION,
    status: 'draft',
    created_at: new Date()
  });

  return Response.json({ 
    success: true,
    slug: slug,
    preview: htmlContent.substring(0, 500) + '...'
  });
}
```

---

## 5️⃣ Визуализация в админ-панели

### Раздел Генерация обновится так:

```
ГЕНЕРАЦИЯ СТРАНИЦ
├─ Выбрать домен: [santehnik.kz ▼]
├─ Выбрать нишу: [Сантехнические услуги ▼]
├─ Выбрать шаблон: [Основной шаблон ▼]
├─ Выбрать города: 
│  ☑ Almaty
│  ☑ Turgen
│  ☑ Shymkent
├─ Кол-во страниц: 3
└─ 🚀 Генерировать

┌─────────────────────┐
│ Результат:          │
│ ✅ almaty-remont... │
│ ✅ turgen-remont... │
│ ✅ shymkent-remо... │
└─────────────────────┘
```

---

## 6️⃣ Публикация на домен

### Когда страницы готовы:

**В админ-панели (QA):**
```
Страница: almaty-remont-trub
Домен: santehnik.kz
Статус: ⚠️ На проверке

[Одобрить] [Отклонить] [Редактировать]
```

**В админ-панели (Публикация):**
```
Волна 1: 3 страницы → Опубликовано 3 дня назад
Волна 2: - (планируется)

Статус волны 1: ✅ ОПУБЛИКОВАНА
Страницы: 
  ✅ santehnik.kz/almaty-remont-trub
  ✅ santehnik.kz/turgen-remont-trub
  ✅ santehnik.kz/shymkent-remont-trub
```

---

## 7️⃣ Фронтенд показывает страницу

### Когда пользователь идет на santehnik.kz/almaty-remont-trub

```typescript
// app/[domain]/[slug]/page.tsx

export default async function Page({ 
  params 
}: { 
  params: Promise<{ domain: string; slug: string }> 
}) {
  const { domain, slug } = await params;

  // 1. Найти страницу в БД
  const page = await db.query.pages.findFirst({
    where: and(
      eq(pages.slug, slug),
      eq(pages.domain, domain),
      eq(pages.status, 'published')
    )
  });

  if (!page) return notFound();

  // 2. Отрендерить HTML
  return (
    <>
      <head>
        <title>{page.title}</title>
        <meta name="description" content={page.meta_description} />
      </head>
      <body dangerouslySetInnerHTML={{ __html: page.content }} />
    </>
  );
}
```

**Результат:** Страница открывается на santehnik.kz/almaty-remont-trub с твоим дизайном и сгенерированным контентом! 🎉

---

## 📊 Полный цикл (на примере)

```
1. Ты создал красивый шаблон: santehnik-template.html
   ↓
2. Загрузил в админ-панель /admin/templates
   ↓
3. Указал: Домен = santehnik.kz, Нишу = Сантехнические услуги
   ↓
4. В генерации выбрал:
   - Домен: santehnik.kz
   - Нишу: Сантехнические услуги
   - Шаблон: santehnik-template.html
   - Города: Almaty, Turgen, Shymkent
   ↓
5. Платформа:
   - Генерирует контент через Claude для каждого города
   - Подставляет в шаблон переменные
   - Создает 3 готовые HTML страницы
   ↓
6. Ты проверяешь в QA:
   - Одобряешь страницы
   ↓
7. Публикуешь волнами:
   - Все 3 страницы идут на santehnik.kz
   ↓
8. Пользователи видят:
   - santehnik.kz/almaty-remont-trub
   - santehnik.kz/turgen-remont-trub
   - santehnik.kz/shymkent-remont-trub
   
   Все с твоим дизайном! ✨
```

---

## 🛠️ Технически что нужно добавить в БД

```sql
-- Таблица для шаблонов
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  niche_id INT,
  html_content LONGTEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица для страниц (уже есть, но добавляем поля)
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  domain_id INT,        -- santehnik.kz
  template_id INT,      -- Какой шаблон был использован
  slug VARCHAR(255),    -- almaty-remont-trub
  title VARCHAR(255),
  content LONGTEXT,     -- Готовый HTML
  meta_description VARCHAR(160),
  status ENUM('draft', 'pending_qa', 'published'),
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица для доменов
CREATE TABLE domains (
  id SERIAL PRIMARY KEY,
  domain_name VARCHAR(255),
  niche_id INT,
  status ENUM('active', 'inactive'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ✅ Итого: Что я сделаю за тебя?

- [x] Обновить БД (добавить поля для templates и domains)
- [x] Обновить API генерации (подставлять переменные в шаблон)
- [x] Обновить админ-панель (выбор домена и шаблона при генерации)
- [x] Создать фронтенд маршруты для доменов
- [x] Все готово к публикации!

**Готово? Начинаем? 🚀**
