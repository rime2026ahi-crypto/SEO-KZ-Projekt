import { z } from 'zod';

// Хлебные крошки (программные, не от LLM)
export const BreadcrumbItem = z.object({
  label: z.string(),
  href: z.string().url(),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItem>;

// Hero-секция
export const HeroContent = z.object({
  h1: z.string().min(10).max(200),
  leadParagraph: z.string().min(20).max(500),
  ctaText: z.string(),
  ctaHref: z.string().url(),
});

export type HeroContent = z.infer<typeof HeroContent>;

// Обычная секция контента
export const ContentSection = z.object({
  id: z.string(),
  heading: z.string().min(5).max(150),
  level: z.enum(['2', '3']).default('2'),
  bodyMarkdown: z.string().min(50), // минимум, чтобы не быть пустой
  type: z.enum([
    'intro',
    'services',
    'pricing',
    'local-problems',
    'coverage-area',
    'why-us',
  ]),
});

export type ContentSection = z.infer<typeof ContentSection>;

// FAQ-пара
export const FAQItem = z.object({
  question: z.string().min(5).max(150),
  answer: z.string().min(20).max(1000),
});

export type FAQItem = z.infer<typeof FAQItem>;

// Перелинковка
export const InterlinkingLink = z.object({
  label: z.string(),
  href: z.string().url(),
});

export type InterlinkingLink = z.infer<typeof InterlinkingLink>;

export const InterlinkingBlock = z.object({
  nearby: z.array(InterlinkingLink),
  regionLinks: z.array(InterlinkingLink),
  serviceLinks: z.array(InterlinkingLink),
});

export type InterlinkingBlock = z.infer<typeof InterlinkingBlock>;

// Trust / NAP (Name, Address, Phone)
export const NAP = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string().regex(/^\+?[\d\s\-()]+$/),
});

export type NAP = z.infer<typeof NAP>;

export const TrustBlock = z.object({
  nap: NAP,
  reviews: z
    .object({
      rating: z.number().min(1).max(5),
      count: z.number().int().nonnegative(),
    })
    .optional(),
  certifications: z.array(z.string()).optional(),
});

export type TrustBlock = z.infer<typeof TrustBlock>;

// Изображение
export const ImageData = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export type ImageData = z.infer<typeof ImageData>;

export const ImagesBlock = z.object({
  hero: ImageData,
  og: ImageData,
});

export type ImagesBlock = z.infer<typeof ImagesBlock>;

// Мета-информация
export const MetaBlock = z.object({
  title: z.string().min(10).max(70),
  description: z.string().min(20).max(160),
  canonical: z.string().url(),
  robotsDirectives: z.string().optional(),
});

export type MetaBlock = z.infer<typeof MetaBlock>;

// Данные локации (from context)
export const LocationData = z.object({
  slug: z.string(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  population: z.number().int().optional(),
  // локальная фактура (зависит от ниши)
  localFacts: z.record(z.string(), z.unknown()).optional(),
});

export type LocationData = z.infer<typeof LocationData>;

// Ниша (from context)
export const NicheContextBlock = z.object({
  slug: z.string(),
  displayName: z.string(),
});

export type NicheContextBlock = z.infer<typeof NicheContextBlock>;

// Compliance info (для дебага)
export const ComplianceInfo = z.object({
  wordCount: z.number().int().nonnegative(),
  uniquenessScore: z.number().min(0).max(1),
  generatedAt: z.string().datetime(),
  reviewedBy: z.string().optional(),
});

export type ComplianceInfo = z.infer<typeof ComplianceInfo>;

// Главный контракт пропсов шаблона
export const NicheLandingPageProps = z.object({
  meta: MetaBlock,
  breadcrumbs: z.array(BreadcrumbItem),
  hero: HeroContent,
  sections: z.array(ContentSection).min(1),
  faq: z.array(FAQItem).min(5),
  interlinking: InterlinkingBlock,
  trust: TrustBlock,
  images: ImagesBlock,
  schema: z.object({
    jsonLd: z.array(z.record(z.string(), z.unknown())),
  }),
  location: LocationData,
  niche: NicheContextBlock,
  compliance: ComplianceInfo,
});

export type NicheLandingPageProps = z.infer<typeof NicheLandingPageProps>;

// Утилита для валидации
export function validatePageProps(data: unknown): NicheLandingPageProps {
  return NicheLandingPageProps.parse(data);
}
