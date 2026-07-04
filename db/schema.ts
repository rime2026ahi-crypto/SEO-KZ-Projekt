import {
  pgTable,
  serial,
  varchar,
  text,
  jsonb,
  timestamp,
  integer,
  numeric,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Ниши
export const niches = pgTable(
  'niches',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    displayName: jsonb('display_name').notNull(), // { ru, kk? }
    serviceCatalog: jsonb('service_catalog').notNull(), // ServiceDef[]
    keywordClusters: jsonb('keyword_clusters').notNull(), // KeywordCluster[]
    toneProfile: jsonb('tone_profile').notNull(),
    localFactSchema: jsonb('local_fact_schema').notNull(), // LocalFactFieldDef[]
    modelRouting: jsonb('model_routing').notNull(),
    seoDefaults: jsonb('seo_defaults').notNull(),
    complianceOverrides: jsonb('compliance_overrides'), // ComplianceThresholds?
    blogTopics: jsonb('blog_topics'), // { title, description, perRegion }[]?
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('niches_slug_idx').on(table.slug),
  })
);

// Локации (справочник)
export const locations = pgTable(
  'locations',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    region: varchar('region', { length: 255 }).notNull(),
    country: varchar('country', { length: 100 }).notNull().default('Kazakhstan'),
    population: integer('population'),
    timezone: varchar('timezone', { length: 50 }),
    latitude: numeric('latitude', { precision: 10, scale: 8 }),
    longitude: numeric('longitude', { precision: 11, scale: 8 }),
    // Дополнительная локальная фактура per-location (может быть заполнена вручную или LLM)
    localFacts: jsonb('local_facts'), // { field_name: value }
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('locations_slug_idx').on(table.slug),
    regionIdx: index('locations_region_idx').on(table.region),
  })
);

// Шаблоны ниш
export const templates = pgTable(
  'templates',
  {
    id: serial('id').primaryKey(),
    nicheId: integer('niche_id')
      .notNull()
      .references(() => niches.id, { onDelete: 'cascade' }),
    slug: varchar('slug', { length: 100 }).notNull(),
    // Путь до компонента или версия шаблона
    componentPath: varchar('component_path', { length: 500 }).notNull(),
    // Метаданные шаблона (обязательные секции, min word counts и т.д.)
    metadata: jsonb('metadata').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    nicheTemplateIdx: uniqueIndex('templates_niche_id_slug_idx').on(
      table.nicheId,
      table.slug
    ),
  })
);

// Батчи генерации
export const generationBatches = pgTable(
  'generation_batches',
  {
    id: varchar('id', { length: 50 }).primaryKey(), // UUID или snowflake
    nicheId: integer('niche_id')
      .notNull()
      .references(() => niches.id),
    templateId: integer('template_id')
      .notNull()
      .references(() => templates.id),
    // Параметры батча
    locationCount: integer('location_count').notNull(),
    targetPagesPerHour: integer('target_pages_per_hour').default(1000).notNull(),
    estimatedDuration: integer('estimated_duration_seconds').notNull(), // для ETA
    estimatedCost: numeric('estimated_cost', { precision: 10, scale: 2 }).notNull(),
    // Состояние
    status: varchar('status', {
      enum: [
        'queued',
        'running',
        'completed',
        'failed',
        'paused',
      ],
    })
      .default('queued')
      .notNull(),
    // Метрики
    jobsDone: integer('jobs_done').default(0).notNull(),
    jobsFailed: integer('jobs_failed').default(0).notNull(),
    jobsReview: integer('jobs_review').default(0).notNull(), // needs_review
    actualPagesPerHour: numeric('actual_pages_per_hour', {
      precision: 10,
      scale: 2,
    }),
    actualCost: numeric('actual_cost', { precision: 10, scale: 2 }),
    // Конфигурация
    config: jsonb('config').notNull(), // { modelRouting, seed, etc }
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
  },
  (table) => ({
    nicheIdx: index('generation_batches_niche_id_idx').on(table.nicheId),
    statusIdx: index('generation_batches_status_idx').on(table.status),
    createdIdx: index('generation_batches_created_at_idx').on(table.createdAt),
  })
);

// Отдельные джобы генерации (страницы)
export const generationJobs = pgTable(
  'generation_jobs',
  {
    id: varchar('id', { length: 50 }).primaryKey(), // UUID или snowflake
    batchId: varchar('batch_id', { length: 50 })
      .notNull()
      .references(() => generationBatches.id, { onDelete: 'cascade' }),
    nicheSlug: varchar('niche_slug', { length: 100 }).notNull(),
    locationSlug: varchar('location_slug', { length: 100 }).notNull(),
    serviceId: varchar('service_id', { length: 100 }).notNull(),
    // Состояние
    status: varchar('status', {
      enum: [
        'queued',
        'processing',
        'done',
        'failed',
        'needs_review',
      ],
    })
      .default('queued')
      .notNull(),
    // Результаты
    modelUsed: varchar('model_used', { length: 50 }),
    outputTokens: integer('output_tokens'),
    latencyMs: integer('latency_ms'),
    // Генерированный контент (если успешно)
    generatedContent: jsonb('generated_content'), // NicheLandingPageProps
    // Результаты compliance
    complianceResult: jsonb('compliance_result'), // { passed: bool, errors: [], ... }
    // Ошибка (если failed)
    error: text('error'),
    retryCount: integer('retry_count').default(0).notNull(),
    // Ревью
    reviewedBy: varchar('reviewed_by', { length: 100 }),
    reviewAt: timestamp('reviewed_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
  },
  (table) => ({
    batchIdx: index('generation_jobs_batch_id_idx').on(table.batchId),
    statusIdx: index('generation_jobs_status_idx').on(table.status),
    locationIdx: index('generation_jobs_location_slug_idx').on(
      table.locationSlug
    ),
  })
);

// QA Reviews (выборка из батча для ручного ревью)
export const qaReviews = pgTable(
  'qa_reviews',
  {
    id: serial('id').primaryKey(),
    batchId: varchar('batch_id', { length: 50 })
      .notNull()
      .references(() => generationBatches.id, { onDelete: 'cascade' }),
    jobId: varchar('job_id', { length: 50 })
      .notNull()
      .references(() => generationJobs.id, { onDelete: 'cascade' }),
    // Ревьюер
    reviewedBy: varchar('reviewed_by', { length: 100 }).notNull(),
    // Решение
    decision: varchar('decision', {
      enum: ['approved', 'rejected', 'needsEdit'],
    })
      .notNull(),
    // Если rejected — причина
    rejectionReason: text('rejection_reason'),
    // Комментарии
    comments: text('comments'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    batchIdx: index('qa_reviews_batch_id_idx').on(table.batchId),
    jobIdx: index('qa_reviews_job_id_idx').on(table.jobId),
  })
);

// Опубликованные страницы (история)
export const publishedPages = pgTable(
  'published_pages',
  {
    id: serial('id').primaryKey(),
    jobId: varchar('job_id', { length: 50 })
      .notNull()
      .references(() => generationJobs.id),
    batchId: varchar('batch_id', { length: 50 })
      .notNull()
      .references(() => generationBatches.id),
    nicheSlug: varchar('niche_slug', { length: 100 }).notNull(),
    locationSlug: varchar('location_slug', { length: 100 }).notNull(),
    // URL на сайте (для sitemap, robots, GSC tracking)
    url: varchar('url', { length: 500 }).notNull().unique(),
    // Метрики индексации (заполняется позже через GSC API)
    indexStatus: varchar('index_status', {
      enum: ['indexed', 'pending', 'blocked', 'duplicate', 'excluded'],
    }),
    firstIndexedAt: timestamp('first_indexed_at'),
    // CWV метрики (Lighthouse/CrUX)
    cwvMetrics: jsonb('cwv_metrics'), // { lcp, inp, cls }
    publishedAt: timestamp('published_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    batchIdx: index('published_pages_batch_id_idx').on(table.batchId),
    urlIdx: uniqueIndex('published_pages_url_idx').on(table.url),
    nicheLocationIdx: index('published_pages_niche_location_idx').on(
      table.nicheSlug,
      table.locationSlug
    ),
  })
);

// Статьи блога
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: serial('id').primaryKey(),
    batchId: varchar('batch_id', { length: 50 })
      .notNull()
      .references(() => generationBatches.id, { onDelete: 'cascade' }),
    nicheSlug: varchar('niche_slug', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 200 }).notNull(),
    title: varchar('title', { length: 300 }).notNull(),
    content: text('content').notNull(),
    meta: jsonb('meta'), // { description, ogImage }
    // Регион, если blog per-region
    region: varchar('region', { length: 100 }),
    status: varchar('status', {
      enum: ['draft', 'published'],
    })
      .default('draft')
      .notNull(),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    batchIdx: index('blog_posts_batch_id_idx').on(table.batchId),
    slugIdx: uniqueIndex('blog_posts_niche_slug_idx').on(
      table.nicheSlug,
      table.slug
    ),
  })
);

// Логирование (аудит)
export const auditLog = pgTable(
  'audit_log',
  {
    id: serial('id').primaryKey(),
    action: varchar('action', { length: 100 }).notNull(), // "batch_created", "job_completed", "page_published" и т.д.
    entityType: varchar('entity_type', { length: 50 }).notNull(), // "batch", "job", "page"
    entityId: varchar('entity_id', { length: 50 }).notNull(),
    userId: varchar('user_id', { length: 100 }),
    details: jsonb('details'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    entityIdx: index('audit_log_entity_type_id_idx').on(
      table.entityType,
      table.entityId
    ),
    actionIdx: index('audit_log_action_idx').on(table.action),
  })
);
