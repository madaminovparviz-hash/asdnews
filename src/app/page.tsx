'use client';

import { useEffect } from 'react';
import { SiteProvider, useSite, type PageId } from '@/lib/i18n';
import { SiteHeader } from '@/components/church/site-header';
import { SiteFooter } from '@/components/church/site-footer';
import { HomePage } from '@/components/church/home-page';
import { AboutPage } from '@/components/church/about-page';
import { SchedulePage } from '@/components/church/schedule-page';
import { NewsPage } from '@/components/church/news-page';
import { FaqPage } from '@/components/church/faq-page';
import { PrayerPage } from '@/components/church/prayer-page';
import { ContactPage } from '@/components/church/contact-page';
import { ScrollToTop } from '@/components/church/scroll-to-top';

const PAGE_COMPONENTS: Record<PageId, () => React.JSX.Element> = {
  home: HomePage,
  about: AboutPage,
  schedule: SchedulePage,
  news: NewsPage,
  faq: FaqPage,
  prayer: PrayerPage,
  contact: ContactPage,
};

function Shell() {
  const { page, t } = useSite();
  const Page = PAGE_COMPONENTS[page];

  // Ensure the language switcher is always reachable & announce page changes
  useEffect(() => {
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
  }, [page]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
      >
        {t.common.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Page />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}

export default function Page() {
  return (
    <SiteProvider>
      <Shell />
    </SiteProvider>
  );
}
