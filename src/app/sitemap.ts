import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.asdtj.org';
  const lastModified = new Date();
  const pages = ['home', 'about', 'schedule', 'news', 'onevoice', 'faq', 'prayer', 'contact'];

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          ru: `${baseUrl}/#/ru/home`,
          tg: `${baseUrl}/#/tj/home`,
        },
      },
    },
  ];

  for (const page of pages) {
    sitemapEntries.push({
      url: `${baseUrl}/#/ru/${page}`,
      lastModified,
      changeFrequency: page === 'news' || page === 'schedule' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1.0 : page === 'schedule' || page === 'about' ? 0.9 : 0.8,
      alternates: {
        languages: {
          ru: `${baseUrl}/#/ru/${page}`,
          tg: `${baseUrl}/#/tj/${page}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${baseUrl}/#/tj/${page}`,
      lastModified,
      changeFrequency: page === 'news' || page === 'schedule' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1.0 : page === 'schedule' || page === 'about' ? 0.9 : 0.8,
      alternates: {
        languages: {
          ru: `${baseUrl}/#/ru/${page}`,
          tg: `${baseUrl}/#/tj/${page}`,
        },
      },
    });
  }

  return sitemapEntries;
}
