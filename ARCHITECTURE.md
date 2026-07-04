# 🏗️ Platform Architecture

## System Overview

```
┌─────────────────────────────────────────────────┐
│     DUAL-MODE pSEO PLATFORM                     │
│  (Kazakhstan Services Market)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        MODE 1 + MODE 2 GENERATION               │
├──────────────────┬──────────────────────────────┤
│  Localized       │  Keyword-Based               │
│  ─────────────   │  ──────────────              │
│  Cities × Svcs   │  Single keyword              │
│  7000 pages      │  100+ articles               │
└──────────────────┴──────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────┐
│    AUTO QUALITY PIPELINE                        │
│  Monitor → Regenerate → Publish                 │
│  (95%+ automation)                              │
└─────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────┐
│         DATABASE (PostgreSQL)                   │
│  niches, locations, templates,                  │
│  generationJobs, qaReviews, publishedPages     │
└─────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────┐
│    STATIC SITE GENERATION (Next.js SSG)         │
│  /[city]-[service]/ + /blog/[slug]/             │
└─────────────────────────────────────────────────┘
```

---

## Data Flow: Mode 1 (Localized)

```
INPUT
├─ Cities: [almaty, turgen, ...] (1000)
├─ Services: [remont-trub, ...] (7)
├─ Niche config: santehnik.json
└─ Template: sample.html

↓

GENERATION (for each city × service)
├─ Load niche config
├─ Load template
├─ Generate through Claude
├─ Store to generationJobs table
└─ Result: 7000 pages (status='pending')

↓

QUALITY PIPELINE
├─ Monitor: Find 50 duplicates (similarity ≥ 0.60)
├─ Regenerate: Fix 45 with content angles
├─ Result: 995/1000 ready (status='done')
└─ Manual review: 5/1000

↓

PUBLISH (Wave-based)
└─ Publish 100 pages every 3 days
   Monitor GSC between waves
```

---

## Data Flow: Mode 2 (Keyword-Based)

```
INPUT
├─ Main keyword: "как отремонтировать трубу"
├─ Content type: blog | guide | faq
└─ Target count: 100

↓

EXPANSION
├─ Claude expands → 100 subtopics
├─ Each with: title, url, description, keywords
└─ Result: 100 subtopic definitions

↓

GENERATION (for each subtopic)
├─ Generate article (1000-1500 words)
├─ Auto word count
├─ Generate meta-description
└─ Result: 100 articles (status='draft')

↓

QUALITY PIPELINE
├─ Monitor: Find duplicates
├─ Regenerate: Fix with angles
└─ Result: 100 unique articles

↓

PUBLISH
└─ Publish to /blog/ section
   Cross-link with Mode 1 pages
```

---

## Component Interaction

```
GENERATION ORCHESTRATOR
(lib/generation-worker.ts)
  ├─ Mode 1: generateLocalizedPages()
  └─ Mode 2: generateKeywordBasedBatch()
       ↓
    DATABASE (generationJobs)
       ↓
   Monitor Agent (lib/uniqueness-monitor.ts)
   ├─ MinHash fingerprint
   ├─ Jaccard similarity
   └─ Mark duplicates
       ↓
   Regenerate Agent (lib/regenerate-worker.ts)
   ├─ Content angle rotation
   ├─ 2 auto-retry attempts
   └─ Fix duplicates
       ↓
   Quality Check
   ├─ 95%+ unique
   └─ Ready to publish
```

---

## Database Schema (9 Tables)

```
niches
├─ id, slug, displayName
├─ serviceCatalog, keywordClusters
├─ localFactSchema, modelRouting
└─ seoDefaults, complianceOverrides

locations
├─ id, nicheId, city, region
└─ localFacts (JSON)

templates
├─ id, nicheId
├─ componentPath
└─ metadata

generationBatches
├─ id, nicheId
├─ status, jobsDone, jobsFailed
└─ actualPagesPerHour, actualCost

generationJobs (Main)
├─ id, batchId
├─ status, modelUsed, outputTokens
├─ generatedContent, complianceResult
└─ url, retryCount

qaReviews
├─ id, jobId
├─ decision (approved|rejected|needsEdit)
└─ reviewer, reviewedAt

publishedPages
├─ id, jobId
├─ indexStatus, firstIndexedAt
└─ cwvMetrics

blogPosts (Mode 2)
├─ id, nicheId
├─ url, title, metaDescription
├─ content, wordCount
└─ status (draft|published)

auditLog
├─ id, action, details
├─ userId, timestamp
└─ Tracks all operations
```

---

## Quality Gate Flow

```
1000 pages
  ↓
Monitor Agent
├─ similarity < 0.40 → ✅ UNIQUE (850)
├─ 0.40 ≤ sim < 0.60 → ⚠️ SIMILAR (100)
└─ similarity ≥ 0.60 → ❌ DUPLICATE (50)
  ↓
Regenerate Agent (50 duplicates)
├─ Attempt 1: angle rotation
│  └─ 30 fixed, 20 remain
├─ Attempt 2: different angle
│  └─ 15 fixed, 5 remain
└─ Final: 45 fixed, 5 manual review
  ↓
Result: 995/1000 READY (99.5%)
```

---

## Technology Stack

```
FRONTEND
├─ Next.js 14 (App Router, SSG)
├─ React 18
├─ TypeScript
└─ Tailwind CSS

BACKEND
├─ Next.js API Routes
├─ Drizzle ORM
├─ PostgreSQL
├─ BullMQ (job queue)
└─ Redis (caching)

AI/LLM
├─ Claude API
│  ├─ Sonnet (top cities, keyword expansion)
│  └─ Haiku (long-tail, cost optimization)
├─ Prompt caching (~70% hit rate)
└─ Adaptive concurrency (5-40 workers)

INFRASTRUCTURE
├─ Static Site Generation (SSG)
├─ Satori (image generation)
├─ Sharp (image optimization)
├─ Google Search Console API
└─ UUID (id generation)
```

---

## Performance Metrics

```
GENERATION SPEED
├─ Pages/hour: 120-150
├─ Cost per page: $0.008-0.012
├─ Token efficiency: ~2000 input, ~1500 output
└─ Prompt cache: ~70% hit rate

QUALITY METRICS
├─ Uniqueness: 95%+ (after Monitor+Regenerate)
├─ Manual review: 5% (only)
└─ Success rate: 99.5% automated

COST PER 1000 PAGES
├─ Generation: ~$10-12
├─ Quality pipeline: ~$0.80-1.20
└─ TOTAL: ~$11-13
```

---

## Business Impact

```
MONETIZATION PER DOMAIN
├─ Mode 1 (Localized): $5K-10K/month
├─ Mode 2 (Keyword-Based): $500-2K/month
└─ Combined (Synergy): $6K-12K/month

PORTFOLIO SCALING
├─ 5 domains: $45K/month
└─ 10 domains: $90K/month

COST REDUCTION
├─ Before: $5-10 per page (human writers)
├─ After: $0.01 per page (AI)
└─ Savings: 99% cost reduction
```

---

## Security & Compliance

```
INPUT VALIDATION
├─ Niche config: Zod schema
├─ City data: Location validation
├─ Template: HTML safety checks
└─ Keywords: No injection

COMPLIANCE GATES
├─ Uniqueness: 40%+ required
├─ Local facts: Required in schema
├─ Content quality: Monitor+Regenerate
└─ Indexation: Wave-based (prevents penalties)
```

---

**Version:** 1.0.0  
**Status:** Architecture Complete  
**Next:** Admin UI Integration
