import { z } from 'zod';

// Локальная фактура — что конкретная ниша обязана инжектировать для гейта уникальности
export const LocalFactFieldDef = z.object({
  name: z.string(),
  type: z.enum(['text', 'number', 'list', 'price']),
  required: z.boolean().default(true),
  description: z.string(),
});

export type LocalFactFieldDef = z.infer<typeof LocalFactFieldDef>;

// Сервис-каталог ниши
export const ServiceDef = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  pricingTier: z.enum(['premium', 'standard', 'budget']).optional(),
});

export type ServiceDef = z.infer<typeof ServiceDef>;

// Кластер ключевых слов
export const KeywordCluster = z.object({
  intent: z.enum(['commercial', 'emergency', 'informational', 'navigational']),
  primary: z.string(),
  secondaryKeywords: z.array(z.string()),
  longTail: z.array(z.string()),
});

export type KeywordCluster = z.infer<typeof KeywordCluster>;

// Профиль тона
export const ToneProfile = z.object({
  voice: z.string(), // "профессиональный, но дружелюбный" / "экспертный, авторитетный"
  formality: z.enum(['formal', 'neutral', 'casual']),
  ctaStyle: z.string(), // стиль call-to-action
  forbiddenPhrases: z.array(z.string()).optional(),
});

export type ToneProfile = z.infer<typeof ToneProfile>;

// Маршрутизация модели
export const ModelRouting = z.object({
  topTierCityThreshold: z.number().int().positive(),
  topTierModel: z.literal('claude-sonnet-5'),
  longTailModel: z.literal('claude-haiku-4-5-20251001'),
});

export type ModelRouting = z.infer<typeof ModelRouting>;

// SEO дефолты
export const SEODefaults = z.object({
  titleTemplate: z.string(), // "{service} в {city} — {niche.displayName}"
  metaTemplate: z.string(),
  schemaOrgType: z.string(), // "Plumber" | "Locksmith" | "Electrician"
});

export type SEODefaults = z.infer<typeof SEODefaults>;

// Пороги compliance (если отличаются от дефолтов)
export const ComplianceThresholds = z.object({
  minWordCount: z.number().int().min(300).default(500),
  minWordCountTopTier: z.number().int().min(1000).default(1500),
  minUniqueness: z.number().min(0).max(1).default(0.3), // 30-40%
  humanReviewSampleRate: z.number().min(0).max(1).default(0.05), // 5-10%
});

export type ComplianceThresholds = z.infer<typeof ComplianceThresholds>;

// Главный конфиг ниши
export const NicheConfig = z.object({
  slug: z.string().min(1),
  displayName: z.object({
    ru: z.string(),
    kk: z.string().optional(),
  }),
  serviceCatalog: z.array(ServiceDef).nonempty(),
  keywordClusters: z.array(KeywordCluster).nonempty(),
  toneProfile: ToneProfile,
  localFactSchema: z.array(LocalFactFieldDef).nonempty(
    'localFactSchema is required — define what makes content unique for this niche'
  ),
  modelRouting: ModelRouting,
  seoDefaults: SEODefaults,
  complianceOverrides: ComplianceThresholds.partial().optional(),
  blogTopics: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        perRegion: z.boolean().default(false),
      })
    )
    .optional(),
});

export type NicheConfig = z.infer<typeof NicheConfig>;

// Парсинг и валидация конфига из JSON
export function parseNicheConfig(data: unknown): NicheConfig {
  return NicheConfig.parse(data);
}
