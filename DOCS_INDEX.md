# 📚 Documentation Index

**Complete guide to all documentation files for the Dual-Mode pSEO Platform**

---

## 🎯 Quick Navigation

### For First-Time Users
1. **[README.md](README.md)** — Platform overview (5 min read)
2. **[START_HERE.txt](START_HERE.txt)** — Choose your quick-start path (3 variants)
3. **[KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md)** — Understand the dual-mode system

### For Implementation
1. **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** — How to create HTML templates with markers
2. **[templates/santehnik/QUICKSTART.txt](templates/santehnik/QUICKSTART.txt)** — Step-by-step VS Code workflow
3. **[data/niches/schema.ts](data/niches/schema.ts)** — Niche configuration validation

### For Understanding Quality
1. **[AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md)** — Monitor → Regenerate → Publish pipeline
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** — Full system architecture
3. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** — What was built & metrics

---

## 📄 All Documentation Files

### Entry Points (Start Here)

| File | Purpose | Read Time |
|------|---------|-----------|
| [README.md](README.md) | Platform overview, navigation, quick start | 5 min |
| [START_HERE.txt](START_HERE.txt) | 3 quick-start paths (choose one) | 3 min |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | What was built, status, metrics | 5 min |

### Core Concepts

| File | Purpose | Read Time |
|------|---------|-----------|
| [KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md) | Mode 2 (keyword-based generation) complete guide | 10 min |
| [AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md) | Monitor + Regenerate pipeline (95% automation) | 10 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Full system architecture & data flows | 15 min |

### Implementation Guides

| File | Purpose | Read Time |
|------|---------|-----------|
| [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) | HTML template markers & reference | 10 min |
| [templates/santehnik/QUICKSTART.txt](templates/santehnik/QUICKSTART.txt) | VS Code template creation workflow | 5 min |
| [templates/santehnik/TZ.txt](templates/santehnik/TZ.txt) | Technical specification for template | 5 min |
| [templates/santehnik/README.md](templates/santehnik/README.md) | Template folder structure & examples | 5 min |

### Configuration Reference

| File | Purpose | Read Time |
|------|---------|-----------|
| [data/niches/schema.ts](data/niches/schema.ts) | Zod validation schema for niche config | 10 min |
| [data/niches/santehnik.json](data/niches/santehnik.json) | Complete example: plumbing services | 5 min |
| [templates/santehnik/services/remont-trub/TZ.txt](templates/santehnik/services/remont-trub/TZ.txt) | Service-specific technical spec | 3 min |

### Source Code Files

| File | Purpose | Complexity |
|------|---------|-----------|
| [lib/keyword-expander-advanced.ts](lib/keyword-expander-advanced.ts) | Keyword → 50-200 subtopics | Medium |
| [lib/keyword-based-generator.ts](lib/keyword-based-generator.ts) | Generate articles from subtopics | Medium |
| [lib/similarity-engine.ts](lib/similarity-engine.ts) | MinHash + Jaccard similarity | Advanced |
| [lib/uniqueness-monitor.ts](lib/uniqueness-monitor.ts) | Monitor agent (find duplicates) | Advanced |
| [lib/regenerate-worker.ts](lib/regenerate-worker.ts) | Regenerate agent (fix with angles) | Advanced |
| [lib/content-angles.ts](lib/content-angles.ts) | 5 content angles per service | Medium |
| [lib/auto-quality-pipeline.ts](lib/auto-quality-pipeline.ts) | Full pipeline orchestration | Advanced |
| [lib/generation-worker.ts](lib/generation-worker.ts) | Main generation orchestrator | Advanced |
| [db/schema.ts](db/schema.ts) | Drizzle ORM database schema (9 tables) | Medium |

---

## 🎯 Reading Paths by Role

### Path 1: Quick Understanding (15 minutes)
```
1. README.md (overview)
2. START_HERE.txt (choose path)
3. PROJECT_SUMMARY.md (what was built)
```

### Path 2: Full Implementation (1 hour)
```
1. README.md
2. KEYWORD_BASED_MODE.md
3. AUTO_QUALITY_SYSTEM.md
4. TEMPLATE_GUIDE.md
5. templates/santehnik/QUICKSTART.txt
```

### Path 3: Deep Understanding (2 hours)
```
1. README.md
2. ARCHITECTURE.md
3. KEYWORD_BASED_MODE.md
4. AUTO_QUALITY_SYSTEM.md
5. TEMPLATE_GUIDE.md
6. Read relevant source files
```

### Path 4: Configuration & Setup (45 minutes)
```
1. START_HERE.txt
2. data/niches/schema.ts
3. data/niches/santehnik.json (example)
4. Create your own: data/niches/your-niche.json
5. TEMPLATE_GUIDE.md
6. templates/santehnik/sample.html (template example)
```

### Path 5: Quality Assurance Deep-Dive (1.5 hours)
```
1. AUTO_QUALITY_SYSTEM.md
2. lib/similarity-engine.ts
3. lib/uniqueness-monitor.ts
4. lib/regenerate-worker.ts
5. lib/auto-quality-pipeline.ts
6. ARCHITECTURE.md (Quality Gate Flow section)
```

---

## 📊 Documentation Structure

```
PROJECT ROOT
├── README.md                    ← Main entry point
├── START_HERE.txt              ← Quick-start guide
├── PROJECT_SUMMARY.md          ← Status & metrics
├── KEYWORD_BASED_MODE.md       ← Mode 2 guide
├── AUTO_QUALITY_SYSTEM.md      ← Quality pipeline
├── ARCHITECTURE.md             ← System design
├── TEMPLATE_GUIDE.md           ← Template reference
├── DOCS_INDEX.md               ← You are here
│
├── lib/
│   ├── keyword-expander-advanced.ts
│   ├── keyword-based-generator.ts
│   ├── similarity-engine.ts
│   ├── uniqueness-monitor.ts
│   ├── regenerate-worker.ts
│   ├── content-angles.ts
│   ├── auto-quality-pipeline.ts
│   └── generation-worker.ts
│
├── data/niches/
│   ├── schema.ts
│   └── santehnik.json
│
├── templates/santehnik/
│   ├── sample.html
│   ├── README.md
│   ├── QUICKSTART.txt
│   ├── TZ.txt
│   └── services/remont-trub/TZ.txt
│
└── db/
    └── schema.ts
```

---

## 🔍 Finding Specific Topics

### Keyword Expansion (Mode 2)
- **Concept:** [KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md) → "ШАГ 1: Расширение ключевого слова"
- **Code:** [lib/keyword-expander-advanced.ts](lib/keyword-expander-advanced.ts)

### Article Generation (Mode 2)
- **Concept:** [KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md) → "ШАГ 2: Генерация контента"
- **Code:** [lib/keyword-based-generator.ts](lib/keyword-based-generator.ts)

### Duplicate Detection
- **Concept:** [AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md) → "Как Работает Monitor Agent"
- **Code:** [lib/similarity-engine.ts](lib/similarity-engine.ts) + [lib/uniqueness-monitor.ts](lib/uniqueness-monitor.ts)

### Content Regeneration
- **Concept:** [AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md) → "Как Работает Regenerate Agent"
- **Code:** [lib/regenerate-worker.ts](lib/regenerate-worker.ts) + [lib/content-angles.ts](lib/content-angles.ts)

### HTML Templates
- **How to create:** [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)
- **Workflow:** [templates/santehnik/QUICKSTART.txt](templates/santehnik/QUICKSTART.txt)
- **Example:** [templates/santehnik/sample.html](templates/santehnik/sample.html)

### Niche Configuration
- **Schema:** [data/niches/schema.ts](data/niches/schema.ts)
- **Example:** [data/niches/santehnik.json](data/niches/santehnik.json)

### Database Schema
- **Full schema:** [db/schema.ts](db/schema.ts)
- **Architecture overview:** [ARCHITECTURE.md](ARCHITECTURE.md) → "Database Schema"

### System Architecture
- **Full architecture:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Data flows:** [ARCHITECTURE.md](ARCHITECTURE.md) → "Data Flow" sections
- **Component interaction:** [ARCHITECTURE.md](ARCHITECTURE.md) → "Component Interaction"

---

## ✨ Key Features by Document

### Dual-Mode Generation
- [README.md](README.md) → "Two-Mode System"
- [KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md) → Entire document
- [ARCHITECTURE.md](ARCHITECTURE.md) → "Data Flow" sections

### Auto Quality Pipeline
- [AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md) → Entire document
- [ARCHITECTURE.md](ARCHITECTURE.md) → "Quality Gate Flow"
- [lib/auto-quality-pipeline.ts](lib/auto-quality-pipeline.ts)

### HTML Template System
- [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) → Entire document
- [templates/santehnik/](templates/santehnik/) → All files

### Business Model
- [KEYWORD_BASED_MODE.md](KEYWORD_BASED_MODE.md) → "Бизнес-модель" section
- [ARCHITECTURE.md](ARCHITECTURE.md) → "Business Impact"
- [README.md](README.md) → "Use Cases"

### Performance & Metrics
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) → "Performance & Metrics"
- [ARCHITECTURE.md](ARCHITECTURE.md) → "Performance Metrics"
- [README.md](README.md) → "Use Cases"

---

## 🎓 Learning Outcomes by Document

### README.md
- ✅ What the platform does
- ✅ How it's structured
- ✅ What documentation exists
- ✅ Quick start options

### KEYWORD_BASED_MODE.md
- ✅ How keyword-based mode works
- ✅ The 3-step process (Expand → Generate → Quality)
- ✅ Content types (Blog, Guide, FAQ)
- ✅ Business model & synergy with Mode 1

### AUTO_QUALITY_SYSTEM.md
- ✅ Monitor agent (how it finds duplicates)
- ✅ Regenerate agent (how it fixes them)
- ✅ 95%+ automation achieved
- ✅ Cost of quality pipeline (~$0.08 per batch)

### ARCHITECTURE.md
- ✅ System overview & data flows
- ✅ Database schema (all 9 tables)
- ✅ Quality gate flow
- ✅ Technology stack
- ✅ Performance metrics & business impact

### TEMPLATE_GUIDE.md
- ✅ How to create HTML templates
- ✅ What markers mean (`data-pseo-*`)
- ✅ What placeholders are available
- ✅ How to structure repeating sections

### PROJECT_SUMMARY.md
- ✅ Status of all components
- ✅ What was completed
- ✅ What's pending
- ✅ Success probability assessment

---

## 💡 Tips for Reading

1. **Start with [README.md](README.md)** — Get oriented
2. **Choose a path above** — Pick based on your role
3. **Use index for lookup** — Find specific topics quickly
4. **Read code in context** — Understand concepts first, then code
5. **Check [ARCHITECTURE.md](ARCHITECTURE.md)** — When confused about how pieces fit together

---

## 🔗 Related Resources

- **Example Configuration:** [data/niches/santehnik.json](data/niches/santehnik.json)
- **Example Template:** [templates/santehnik/sample.html](templates/santehnik/sample.html)
- **Example Service TZ:** [templates/santehnik/services/remont-trub/TZ.txt](templates/santehnik/services/remont-trub/TZ.txt)

---

## 📞 Questions?

Use the index above to find the relevant document:
- **"How do I...?"** → [START_HERE.txt](START_HERE.txt) or [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)
- **"How does...work?"** → [AUTO_QUALITY_SYSTEM.md](AUTO_QUALITY_SYSTEM.md) or [ARCHITECTURE.md](ARCHITECTURE.md)
- **"What's the config?"** → [data/niches/schema.ts](data/niches/schema.ts)
- **"What was built?"** → [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

**Last Updated:** 2026-07-03  
**Status:** Complete Documentation (10+ files)
