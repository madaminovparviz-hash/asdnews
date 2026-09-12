'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { ru, type Translation } from './ru';
import { tj } from './tj';

export type Lang = 'ru' | 'tj';
export type PageId = 'home' | 'about' | 'schedule' | 'news' | 'faq' | 'prayer' | 'contact';

export const PAGES: PageId[] = ['home', 'about', 'schedule', 'news', 'faq', 'prayer', 'contact'];

const DICTS: Record<Lang, Translation> = { ru, tj };

export interface SiteState {
  lang: Lang;
  page: PageId;
}

interface SiteContextValue extends SiteState {
  t: Translation;
  navigate: (page: PageId) => void;
  setLang: (lang: Lang) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function parseHash(): SiteState {
  if (typeof window === 'undefined') return { lang: 'ru', page: 'home' };
  const match = /^#\/(ru|tj)(?:\/([a-z-]+))?/i.exec(window.location.hash);
  const lang = match?.[1] === 'tj' ? 'tj' : 'ru';
  const requested = match?.[2]?.toLowerCase() as PageId | undefined;
  const page: PageId = requested && PAGES.includes(requested) ? requested : 'home';
  return { lang, page };
}

function hashFor(lang: Lang, page: PageId): string {
  return `#/${lang}/${page}`;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteState>({ lang: 'ru', page: 'home' });

  // Restore state from URL hash / saved preference on first mount.
  // Deferred with rAF so the first client render stays hydration-safe.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const fromHash = parseHash();
      if (window.location.hash) {
        setState(fromHash);
      } else {
        const saved = window.localStorage.getItem('preferred-lang');
        if (saved === 'ru' || saved === 'tj') {
          setState((s) => ({ ...s, lang: saved }));
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Follow browser back/forward
  useEffect(() => {
    const onHashChange = () => setState(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Persist language, reflect lang/meta into <head> for SEO & a11y
  useEffect(() => {
    try {
      window.localStorage.setItem('preferred-lang', state.lang);
    } catch {
      /* private mode */
    }
    document.documentElement.lang = state.lang === 'ru' ? 'ru' : 'tg';
    const t = DICTS[state.lang];
    document.title = `${t.meta.pageTitles[state.page]} — ${t.meta.brand} ${t.meta.brandCity}`;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', t.meta.description);
  }, [state]);

  const commit = (lang: Lang, page: PageId, scrollToTop: boolean) => {
    setState({ lang, page });
    const next = hashFor(lang, page);
    if (typeof window !== 'undefined' && window.location.hash !== next) {
      // Assigning the hash fires 'hashchange', which parses back to the same
      // state — this keeps the address bar shareable without extra effects.
      window.location.hash = next;
    }
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  const navigate = (page: PageId) => {
    commit(state.lang, page, page !== state.page);
  };

  const setLang = (lang: Lang) => {
    commit(lang, state.page, false);
  };

  return (
    <SiteContext.Provider
      value={{ lang: state.lang, page: state.page, t: DICTS[state.lang], navigate, setLang }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}

export function useT(): Translation {
  return useSite().t;
}

export type { Translation };
export { ru as ruDict, tj as tjDict };
