'use client';

import { Church, Clock, Heart, Mail, MapPin, Phone, Send, Instagram, Youtube } from 'lucide-react';
import { PAGES, useSite, type PageId } from '@/lib/i18n';
import { CHURCH } from '@/lib/site';

const SOCIAL_ICONS = { Telegram: Send, Instagram, YouTube: Youtube } as const;

export function SiteFooter() {
  const { lang, page, t, navigate } = useSite();
  const year = new Date().getFullYear();

  const go = (id: PageId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(id);
  };

  return (
    <footer className="mt-auto bg-navy text-[#E9EEF3]">
      <div
        className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 md:pt-16 lg:px-8"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)' }}
      >
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a
              href={`#/${lang}/home`}
              onClick={go('home')}
              className="flex w-fit items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-gold/60">
                <Church className="h-5 w-5 text-gold" aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-sm font-bold">{t.meta.brand}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                  {t.meta.brandCity}
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{t.footer.about}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {t.footer.followUs}
            </p>
            <div className="mt-2 flex gap-2">
              {t.contact.socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS] ?? Send;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-gold hover:text-[#22435F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={t.footer.quickLinks}>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PAGES.map((id) => (
                <li key={id}>
                  <a
                    href={`#/${lang}/${id}`}
                    onClick={go(id)}
                    aria-current={page === id ? 'page' : undefined}
                    className={`inline-flex min-h-[32px] items-center rounded text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                      page === id ? 'font-semibold text-gold' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {t.navLong[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service times */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
              {t.footer.serviceTimes}
            </h3>
            <ul className="mt-4 space-y-3">
              {t.footer.serviceTimesList.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
                  <span>
                    {item.label}
                    <span className="block text-xs font-semibold text-white/90">{item.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
                <span>{CHURCH.addressFull}</span>
              </li>
              <li>
                <a
                  href={CHURCH.phoneHref}
                  className="flex min-h-[32px] items-center gap-2.5 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
                  {CHURCH.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CHURCH.emailHref}
                  className="flex min-h-[32px] items-center gap-2.5 rounded break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold/80" aria-hidden="true" />
                  {CHURCH.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/55 md:flex-row">
          <p>
            © {year} {t.footer.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {t.footer.madeWith}
            <Heart className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}
