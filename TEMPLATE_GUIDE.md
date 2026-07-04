# 📖 Инструкция: Как создать образец-шаблон страницы в VS Code

## Что ты создаёшь?

Ты создаёшь **ONE** HTML-файл, который станет образцом для генерации **5000+ страниц**.

Каждый `{{маркер}}` — это **плейсхолдер**, который платформа заменит на реальные данные для каждого города и услуги.

---

## 📋 Маркеры, которые ты должен использовать

### 1️⃣ `data-pseo-block="meta"` — Мета-информация (title, description, canonical)

**Где писать:** В `<head>` в тегах `<title>` и `<meta>`

**Примеры:**

```html
<title data-pseo-block="meta" data-pseo-field="title">{{meta.title}}</title>

<meta name="description" data-pseo-block="meta" data-pseo-field="description" 
      content="{{meta.description}}">

<link rel="canonical" data-pseo-block="meta" data-pseo-field="canonical" 
      href="{{meta.canonical}}">
```

**Что платформа заменит:**
- `{{meta.title}}` → "Ремонт труб в Алматы — быстро и надёжно"
- `{{meta.description}}` → "Профессиональный ремонт водопровода в Алматы. Мастер приезжает за 1-2 часа..."
- `{{meta.canonical}}` → "https://test.kz/almaty-remont-trub/"

---

### 2️⃣ `data-pseo-block="breadcrumbs"` — Навигационная цепь

**Где писать:** В начале `<body>`, обычно после `<header>`

```html
<nav data-pseo-block="breadcrumbs">
  <a href="/">Главная</a>
  <span>/</span>
  <a href="/{{niche.slug}}/">{{niche.displayName}}</a>
  <span>/</span>
  <a href="/{{location.slug}}-{{service.id}}/">{{location.name}} — {{service.name}}</a>
</nav>
```

**Что платформа заменит:**
- `{{niche.slug}}` → "santehnik"
- `{{niche.displayName}}` → "Сантехнические услуги"
- `{{location.slug}}` → "almaty"
- `{{location.name}}` → "Алматы"
- `{{service.id}}` → "remont-trub"
- `{{service.name}}` → "Ремонт труб"

**Результат в браузере:**
```
Главная / Сантехнические услуги / Алматы — Ремонт труб
```

---

### 3️⃣ `data-pseo-block="hero"` — Герой-секция (заголовок + описание + кнопка)

**Где писать:** В первой большой секции с картинкой

```html
<section data-pseo-block="hero" class="hero">
  <h1>{{hero.h1}}</h1>
  <p>{{hero.leadParagraph}}</p>
  <a href="{{hero.ctaHref}}" class="btn">{{hero.ctaText}}</a>
  <img data-pseo-block="image" data-pseo-slot="hero" 
       src="placeholder-hero.jpg" alt="{{images.hero.alt}}">
</section>
```

**Что платформа заменит:**
- `{{hero.h1}}` → "Ремонт труб в Алматы — срочно и по честной цене"
- `{{hero.leadParagraph}}` → "Профессиональная диагностика и ремонт водопровода. Выезд в течение 1-2 часов. Гарантия на работы."
- `{{hero.ctaHref}}` → "tel:+77273448844" или контактная форма
- `{{hero.ctaText}}` → "Позвоните сейчас"
- `{{images.hero.alt}}` → "Профессиональный ремонт труб в Алматы"

---

### 4️⃣ `data-pseo-block="section"` — Обычные секции контента

**Где писать:** В основном контенте (информационные блоки)

```html
<section data-pseo-block="section" data-pseo-type="intro">
  <h2>{{section.heading}}</h2>
  <div>{{section.bodyMarkdown}}</div>
</section>

<section data-pseo-block="section" data-pseo-type="services">
  <h2>{{section.heading}}</h2>
  <div>{{section.bodyMarkdown}}</div>
</section>

<section data-pseo-block="section" data-pseo-type="local-problems">
  <h2>{{section.heading}}</h2>
  <div>{{section.bodyMarkdown}}</div>
</section>

<section data-pseo-block="section" data-pseo-type="pricing">
  <h2>{{section.heading}}</h2>
  <div>{{section.bodyMarkdown}}</div>
</section>

<section data-pseo-block="section" data-pseo-type="why-us">
  <h2>{{section.heading}}</h2>
  <div>{{section.bodyMarkdown}}</div>
</section>
```

**Что такое `data-pseo-type`?**
- `intro` — введение в услугу
- `services` — описание услуг
- **`local-problems`** — КРИТИЧНЫЙ! Локальная информация о проблемах в этом городе (это даёт уникальность)
- `pricing` — цены
- `why-us` — почему выбрать нас

**Что платформа заменит:**
- `{{section.heading}}` → "Ремонт труб в Алматы: основные услуги"
- `{{section.bodyMarkdown}}` → целый параграф уникального текста с локальной информацией

---

### 5️⃣ `data-pseo-block="interlinking"` — Ссылки на соседние города или другие услуги

**Где писать:** Отдельная секция с ссылками

```html
<section data-pseo-block="interlinking" data-pseo-type="nearby">
  <h2>Ремонт труб в соседних городах</h2>
  <a href="{{interlinking.item.href}}" data-pseo-repeat="item">
    {{interlinking.item.label}}
  </a>
</section>

<section data-pseo-block="interlinking" data-pseo-type="services">
  <h2>Другие сантехнические услуги в {{location.name}}</h2>
  <a href="{{interlinking.item.href}}" data-pseo-repeat="item">
    {{interlinking.item.label}}
  </a>
</section>
```

**Что такое `data-pseo-repeat="item"`?**

Это означает: "**Этот блок повторяется** для каждого элемента в массиве". 

**Для `nearby` (соседние города с той же услугой):**
```html
<!-- Платформа сгенерирует несколько ссылок: -->
<a href="/turgen-remont-trub/">Ремонт труб в Турген</a>
<a href="/talgar-remont-trub/">Ремонт труб в Талгаре</a>
<a href="/kapshagay-remont-trub/">Ремонт труб в Капшагае</a>
```

**Для `services` (другие услуги в этом городе):**
```html
<!-- Платформа сгенерирует ссылки на другие услуги: -->
<a href="/almaty-ustranenie-zasora/">Прочистка засоров в Алматы</a>
<a href="/almaty-remont-unitaza/">Ремонт унитаза в Алматы</a>
<a href="/almaty-remont-vodoonagrevatelya/">Ремонт бойлера в Алматы</a>
```

---

### 6️⃣ `data-pseo-block="faq"` — Часто задаваемые вопросы

**Где писать:** Отдельная секция с Q&A

```html
<section data-pseo-block="faq">
  <h2>Часто задаваемые вопросы</h2>
  <div data-pseo-repeat="item">
    <h3>{{faq.item.question}}</h3>
    <p>{{faq.item.answer}}</p>
  </div>
</section>
```

**Что платформа заменит:**

Платформа создаст 5-10 пар вопрос/ответ, специфичных для услуги + города:

```html
<div>
  <h3>Как быстро вы приезжаете?</h3>
  <p>В будни приезжаем за 1-2 часа после звонка. В выходные - за 3 часа.</p>
</div>

<div>
  <h3>Даёте ли гарантию на ремонт?</h3>
  <p>Да, гарантия на все работы 3 месяца.</p>
</div>

<!-- и т.д. -->
```

---

### 7️⃣ `data-pseo-block="image"` — Изображения

**Где писать:** На любом `<img>` теге

```html
<!-- Hero изображение -->
<img data-pseo-block="image" data-pseo-slot="hero" 
     src="placeholder-hero.jpg" alt="{{images.hero.alt}}">

<!-- OG изображение (для соцсетей) -->
<meta property="og:image" data-pseo-block="image" data-pseo-slot="og" 
      content="{{images.og.src}}">
```

**Что такое `data-pseo-slot`?**
- `hero` — изображение на странице (видит пользователь)
- `og` — изображение для соцсетей (при шаринге в ВК, Telegram и т.д.)

**Что платформа заменит:**
- `{{images.hero.src}}` → путь к изображению
- `{{images.hero.alt}}` → "Профессиональный ремонт труб в Алматы"

---

### 8️⃣ `data-pseo-block="trust"` — Контакты (NAP: Name, Address, Phone)

**Где писать:** В footer или отдельной секции контактов

```html
<footer data-pseo-block="trust">
  <h2>Контакты</h2>
  <p><strong>Компания:</strong> {{trust.nap.name}}</p>
  <p><strong>Адрес:</strong> {{trust.nap.address}}</p>
  <p><strong>Телефон:</strong> <a href="tel:{{trust.nap.phone}}">{{trust.nap.phone}}</a></p>
  <p><em>Контент подготовлен с использованием AI и проверен специалистом.</em></p>
</footer>
```

**Что платформа заменит:**
- `{{trust.nap.name}}` → "Сантехнические услуги Алматы"
- `{{trust.nap.address}}` → "Турксибский район, проспект Абулхаир Хана, 45"
- `{{trust.nap.phone}}` → "+7 (727) 344-88-44"

---

## ✅ Полный чеклист при создании шаблона

- [ ] `<title data-pseo-block="meta">` с `{{meta.title}}`
- [ ] `<meta name="description" data-pseo-block="meta">` с `{{meta.description}}`
- [ ] `<link rel="canonical" data-pseo-block="meta">` с `{{meta.canonical}}`
- [ ] Breadcrumbs `data-pseo-block="breadcrumbs"`
- [ ] Hero-секция `data-pseo-block="hero"` с H1, текстом, кнопкой, изображением
- [ ] Минимум **4 секции** `data-pseo-block="section"`:
  - `data-pseo-type="intro"`
  - `data-pseo-type="services"` или описание услуги
  - **`data-pseo-type="local-problems"` (ОБЯЗАТЕЛЬНО! это даёт уникальность)**
  - `data-pseo-type="pricing"` или `"why-us"`
- [ ] Interlinking `data-pseo-block="interlinking"`:
  - `data-pseo-type="nearby"` (соседние города)
  - `data-pseo-type="services"` (другие услуги в городе)
- [ ] FAQ `data-pseo-block="faq"` с минимум 5 вопросов
- [ ] Изображение `data-pseo-block="image" data-pseo-slot="hero"`
- [ ] OG изображение `data-pseo-block="image" data-pseo-slot="og"`
- [ ] Контакты `data-pseo-block="trust"` с NAP

---

## 🚀 Процесс работы

### 1. Ты создаёшь в VS Code:
```
templates/santehnik/sample.html
```

Это просто **HTML-файл с маркерами и плейсхолдерами**.

### 2. Загружаешь в платформу через `/admin/templates`:
- Платформа проверяет: есть ли все обязательные маркеры?
- Если да → файл сохранён как образец
- Если нет → ошибка с указанием, что не хватает

### 3. Запускаешь генерацию через `/admin/generate`:
- Выбираешь: список городов (1000 шт)
- Выбираешь: главное ключевое слово ("сантехник")
- Указываешь: услуги (какие из них генерировать)

### 4. Платформа генерирует:
- Для каждой комбинации **город + услуга**:
  - Заменяет все `{{маркеры}}` на реальные данные
  - Генерирует уникальный контент через Claude для `section[type=local-problems]`
  - Создаёт ссылки на соседние города и другие услуги
  - Генерирует изображение (Satori/Sharp оверлей)
  - Проверяет compliance гейты (уникальность, word count, local facts)
  - Сохраняет результат в базу

### 5. Финал:
- 5000+ готовых HTML-страниц
- SSG build создаёт статические файлы
- Deploy на хостинг
- Поэтапная публикация волнами (для Google)

---

## 📝 Пример готового шаблона

Вот полный пример `sample.html`, который ты можешь использовать как основу:

[Это в файле templates/santehnik/sample.html](../templates/santehnik/sample.html)

**Как его использовать:**
1. Открой файл в VS Code
2. Смотри на маркеры `data-pseo-*` — это "архитектура" страницы
3. Смотри на плейсхолдеры `{{}}` — это "данные" для заполнения
4. Меняй CSS, дизайн, структуру HTML — всё что угодно!
5. **НЕ меняй маркеры и плейсхолдеры** — они нужны платформе

---

## ❓ FAQ

**Q: Можно ли добавить свой маркер?**
A: Нет, платформа работает только с предопределёнными маркерами из этого документа.

**Q: Что если я забуду маркер?**
A: При загрузке в `/admin/templates` платформа скажет, какой маркер не хватает.

**Q: Можно ли менять CSS и дизайн?**
A: Да! CSS и дизайн — это твоё, меняй как угодно. Маркеры не трогай.

**Q: Сколько услуг можно генерировать на город?**
A: Столько, сколько ты добавишь в `serviceCatalog` в конфиге ниши (обычно 5-10).

**Q: Когда я загрузу шаблон, сразу ли начнётся генерация?**
A: Нет. Ты просто загрузишь образец. Генерация запускается отдельно через `/admin/generate`.
