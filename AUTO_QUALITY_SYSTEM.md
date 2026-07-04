# 🤖 Система Автоматической Проверки Качества (Auto Quality Pipeline)

## Обзор

Система **Monitor → Regenerate → Publish** обеспечивает **100% автоматическое** отслеживание и исправление дублирующегося контента **без участия человека**.

```
┌─────────────────────────────────────────────────────┐
│ 1000 страниц сгенерировано                          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 🔍 MONITOR AGENT (проверяет уникальность)           │
├─────────────────────────────────────────────────────┤
│ • MinHash сравнение                                │
│ • Jaccard similarity 0-100%                         │
│ • Находит дубликаты (>60% совпадения)              │
└─────────────────────────────────────────────────────┘
              ✅ UNIQUE      ❌ DUPLICATE
                    ↓               ↓
      READY TO PUBLISH  ┌────────────────────┐
                        │🔄 REGENERATE AGENT │
                        ├────────────────────┤
                        │ • Меняет угол      │
                        │ • Новый seed       │
                        │ • Переделывает     │
                        │ • Проверяет снова  │
                        └────────────────────┘
                            ✅        ❌
                            ↓         ↓
                    UNIQUE  MANUAL REVIEW
                            ↓
                  PUBLISH ВОЛНАМИ
```

**Результат на 1000 страниц:**
- ✅ Уникальные: 850-950
- ❌ Дубликаты: 50
- 🔄 Переделаны: 45/50 успешно
- 👤 Требуют ручной проверки: 5

**Итог: 995/1000 страниц готовы к публикации (99.5%)**

---

## 📂 Файлы Системы

```
lib/
├── similarity-engine.ts       ← MinHash & Jaccard (расчёты)
├── uniqueness-monitor.ts      ← Monitor Agent (проверка)
├── regenerate-worker.ts       ← Regenerate Agent (переделка)
├── content-angles.ts          ← Варианты контентных углов
└── auto-quality-pipeline.ts   ← Главный оркестратор (всё вместе)
```

---

## 🚀 Как Использовать

### Полный пайплайн (рекомендуемый)

```typescript
import { createAutoQualityPipeline } from '@/lib/auto-quality-pipeline';

const db = await getDatabase();
const llmProvider = createAnthropicProvider();
const pipeline = createAutoQualityPipeline(db, llmProvider);

// После завершения генерации батча
const result = await pipeline.runFullPipeline(batchId);

// Результат:
// ✅ 995/1000 страниц готовы к публикации
// 👤 5 страниц требуют ручной проверки
// 📊 Success rate: 99.5%
```

---

## 🔍 Как Работает Monitor Agent

### Шаг 1: Вычисление отпечатка (MinHash)

```typescript
const content = page.sections.map(s => s.bodyMarkdown).join(' ');
const fingerprint = computeMinHash(content);  // MinHash
// Результат: array[100] с хешами
```

### Шаг 2: Сравнение с соседними

```typescript
// Сравнить с:
// - Соседними городами (та же услуга)
// - Другими услугами (этот же город)

const similarPages = findSimilarPages({
  city: page.city,
  service: page.service,
});

for (const similar of similarPages) {
  const similarity = jaccardSimilarity(fingerprint, similar.fingerprint);
  // similarity = 0 (совсем разные) до 1 (идентичные)
}
```

### Шаг 3: Принятие решения

```
similarity < 0.40  → ✅ UNIQUE (разные на 60%+)
0.40 ≤ similarity < 0.60 → ⚠️  SIMILAR
similarity ≥ 0.60  → ❌ DUPLICATE
```

---

## 🔄 Как Работает Regenerate Agent

### Шаг 1: Изменить "угол" контента

Для услуги "remont-trub" (ремонт труб):

```
Угол 1: Проблемы и их решение
Угол 2: Преимущества нашей компании
Угол 3: Технологии и современность
Угол 4: Процесс работы
Угол 5: Местные особенности
```

При переделке берём другой угол → совсем другой контент

### Шаг 2: Переделать через Claude

```typescript
const newAngle = rotateContentAngle(serviceId, attemptNumber);

const newContent = await llmProvider.generate({
  customPrompt: `
    Переделай контент, фокусируясь на: "${newAngle}"
    - Совсем другие примеры
    - Другая структура
    - Другое обоснование
    - Минимум 50% новых слов
  `,
  seed: newSeed,
});
```

### Шаг 3: Проверить результат

```typescript
const newSimilarity = computeSimilarity(oldContent, newContent);

if (newSimilarity < 0.40) {
  // ✅ Успех! Уже не дублируется
  markAsReady(jobId);
} else {
  // ❌ Всё равно похожа
  if (attemptCount < maxAttempts) {
    // Переделать ещё раз
    addToRegenerateQueue(jobId);
  } else {
    // Отправить на ручную проверку
    markForManualReview(jobId);
  }
}
```

---

## 📊 Примеры Результатов

### До Monitor+Regenerate

```
1000 страниц → 150 имеют duplicate/similar контент (15%)
```

### После Monitor

```
Monitor Agent нашёл:
├─ Уникальные: 850 (85%) ✅
├─ Похожие: 100 (10%)
└─ Дубликаты: 50 (5%) ❌ → на переделку
```

### После Regenerate (2 попытки)

```
Попытка 1:
  50 дубликатов → 30 успешно переделаны, 20 осталось

Попытка 2:
  20 оставшихся → 15 успешно переделаны, 5 не удалось

ИТОГ:
├─ Переделано успешно: 45/50
├─ Требуют ручной проверки: 5/50
└─ ИТОГО УНИКАЛЬНЫХ: 995/1000 (99.5%)
```

---

## 💰 Стоимость

```
Monitor Agent:
  - MinHash вычисления → БЕСПЛАТНО (нет API)
  - На 1000 страниц: $0

Regenerate Agent (для 50 дубликатов):
  - Per page: ~300 output tokens
  - На переделку 50 дубликатов: ~15K tokens
  - При Haiku: ~$0.08
  - ИТОГО: практически бесплатно
```

---

## ✅ Итог

Система работает полностью автоматически:

1. ✅ **Генерация** → 1000 страниц (2-5 часов)
2. ✅ **Monitor** → проверка уникальности (30 минут)
3. ✅ **Regenerate** → переделка дубликатов (30 минут)
4. ✅ **Publish** → волновая публикация

**Твой труд:** только создание шаблонов  
**Всё остальное:** полная автоматизация  
**Успешность:** 95%+ страниц готовы без твоего участия
