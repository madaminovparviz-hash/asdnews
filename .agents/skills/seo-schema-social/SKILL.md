---
name: seo-schema-social
description: Guidelines for local SEO, Schema.org (Church/PlaceOfWorship JSON-LD), bilingual OpenGraph metadata, sitemaps, and social share previews for the church portal. Use when modifying SEO, meta tags, or structured data.
---

# SEO, Schema.org & Social Sharing Guidelines

This skill guides local search optimization and structured data configuration for the Seventh-day Adventist Church in Dushanbe, Tajikistan.

## 1. Schema.org Structured Data (`PlaceOfWorship` / `Church`)
Always maintain valid JSON-LD in `layout.tsx` or a dedicated SEO component:
```typescript
export const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Церковь Христиан Адвентистов Седьмого Дня г. Душанбе",
  "alternateName": "Калисои Масеҳиёни Адвентистони Рӯзи Ҳафтум",
  "url": "https://adventist-dushanbe.tj",
  "telephone": "+992987241279",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Борбад, 117",
    "addressLocality": "Душанбе",
    "addressCountry": "TJ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.5360,
    "longitude": 68.7565
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "13:00",
      "description": "Субботнее богослужение / Ибодати рӯзи шанбе"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "18:00",
      "closes": "19:30",
      "description": "Молитвенное служение / Ибодати дуо"
    }
  ]
};
```

## 2. Dynamic OpenGraph & Meta Tags
- **Bilingual OpenGraph**:
  - `og:locale`: `ru_RU` (primary)
  - `og:locale:alternate`: `tg_TJ`
- **Sharing Previews**:
  - Provide a high-resolution 1200x630 OG image in `public/og-image.jpg`.
  - Include distinct page-level titles and descriptions based on current language (`ru` vs `tj`).

## 3. Sitemaps and Robots
- Implement `src/app/sitemap.ts` returning full URLs with language alternates:
  ```typescript
  import { MetadataRoute } from "next";

  export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://adventist-dushanbe.tj";
    const pages = ["home", "about", "schedule", "news", "faq", "prayer", "contact"];

    return pages.map((page) => ({
      url: `${baseUrl}/#/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "home" ? 1.0 : 0.8,
      alternates: {
        languages: {
          ru: `${baseUrl}/#/ru/${page}`,
          tg: `${baseUrl}/#/tj/${page}`,
        },
      },
    }));
  }
  ```
- Implement `src/app/robots.ts` ensuring public indexing while disallowing `/admin` or private API endpoints.
