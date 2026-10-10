'use client';

import {
  Clock,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Youtube,
} from 'lucide-react';
import { toast } from 'sonner';
import { useSite } from '@/lib/i18n';
import { MapEmbed } from './map-embed';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';
import { CHURCH } from '@/lib/site';
import { WhatsappIcon } from './messenger-icons';

const SOCIAL_ICONS = { Telegram: Send, WhatsApp: WhatsappIcon, Instagram, YouTube: Youtube } as const;

export function ContactPage() {
  const { t } = useSite();
  const c = t.common;

  const copyPhone = async () => {
    await navigator.clipboard.writeText(CHURCH.phoneDisplay);
    toast.success(c.linkCopied);
  };

  const infoCards = [
    { icon: MapPin, title: t.contact.info.addressTitle, main: t.contact.info.address, href: undefined },
    { icon: Phone, title: t.contact.info.phoneTitle, main: CHURCH.phoneDisplay, href: CHURCH.phoneHref },
    { icon: Mail, title: t.contact.info.emailTitle, main: CHURCH.email, href: CHURCH.emailHref },
    { icon: Clock, title: t.contact.info.hoursTitle, main: t.contact.info.hoursValue, href: undefined },
  ];

  return (
    <>
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      {/* Info cards */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, i) => {
            const Icon = card.icon;
            const body = card.href ? (
              <a
                href={card.href}
                className="mt-2 block break-words font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {card.main}
              </a>
            ) : (
              <p className="mt-2 font-semibold leading-snug text-foreground">{card.main}</p>
            );
            return (
              <FadeIn key={card.title} delay={i * 90}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {card.title}
                    </h3>
                    {body}
                    {card.icon === Phone && (
                      <button
                        type="button"
                        onClick={copyPhone}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        {c.linkCopied.split(' ')[0]}…
                      </button>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Form + map/socials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <FadeIn>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                <Send className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                {t.contact.form.title}
              </h2>

              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                Задайте вопрос, оставьте пожелание или договоритесь о встрече — мы ответим в течение 1–2 дней. Напишите нам:
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={CHURCH.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20ba59] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </a>

                <a
                  href={CHURCH.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#229ED9] px-6 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e8bc0] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Telegram
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-border/70 bg-muted/40 p-4 text-xs text-muted-foreground">
                <p>
                  Телефон для прямой связи: <a href={CHURCH.phoneHref} className="font-semibold text-foreground underline hover:text-primary">{CHURCH.phoneDisplay}</a>
                  {' '}· Email: <a href={CHURCH.emailHref} className="font-semibold text-foreground underline hover:text-primary">{CHURCH.email}</a>
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={100}>
              <MapEmbed title={t.contact.mapTitle} linkLabel={c.directions} />
              <p className="mt-2 text-xs text-muted-foreground">{t.contact.mapNote}</p>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-display text-base font-bold text-foreground">{t.contact.socialTitle}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {t.contact.socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS] ?? Send;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {s.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
