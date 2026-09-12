'use client';

import { useEffect, useState } from 'react';
import { Church, Menu, X } from 'lucide-react';
import { PAGES, useSite, type Lang, type PageId } from '@/lib/i18n';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const LANGS: Lang[] = ['ru', 'tj'];

function LanguageSwitcher() {
  const { lang, setLang, t } = useSite();
  return (
    <div
      role="group"
      aria-label={t.common.languageLabel}
      className="flex items-center rounded-full border border-border bg-card p-0.5 shadow-sm"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === 'ru' ? 'Русский' : 'Тоҷикӣ'}
          className={cn(
            'min-h-[32px] rounded-full px-3 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            lang === l
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { lang, page, t, navigate } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: PageId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    navigate(id);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md transition-all duration-300',
        scrolled ? 'border-border shadow-[0_10px_34px_-22px_rgba(34,49,63,0.45)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
        {/* Brand */}
        <a
          href={`#/${lang}/home`}
          onClick={go('home')}
          aria-label={`${t.meta.brand} ${t.meta.brandCity}`}
          className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm md:h-11 md:w-11">
            <Church className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="line-clamp-2 max-w-[11rem] font-display text-[13px] font-bold tracking-tight text-foreground md:max-w-none md:text-[15px]">
              {t.meta.brand}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold md:text-[11px]">
              {t.meta.brandCity}
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label={t.meta.brand} className="hidden items-center gap-1 xl:flex">
          {PAGES.map((id) => (
            <a
              key={id}
              href={`#/${lang}/${id}`}
              onClick={go(id)}
              aria-current={page === id ? 'page' : undefined}
              className={cn(
                'relative rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                page === id
                  ? 'text-primary'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground',
              )}
            >
              {t.nav[id]}
              {page === id && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-[14px] h-[2.5px] rounded-full bg-gold"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.common.close : t.common.menu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label={t.meta.brand}
          className="border-t border-border bg-background/95 shadow-lg backdrop-blur-md xl:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {PAGES.map((id) => (
              <li key={id}>
                <a
                  href={`#/${lang}/${id}`}
                  onClick={go(id)}
                  aria-current={page === id ? 'page' : undefined}
                  className={cn(
                    'flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    page === id
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted',
                  )}
                >
                  {t.navLong[id]}
                  <span
                    aria-hidden="true"
                    className={cn('h-2 w-2 rounded-full', page === id ? 'bg-gold' : 'bg-transparent')}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
