'use client';

import Image from 'next/image';
import {
  Heart,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';
import { PrayerWall } from './prayer-wall';
import { CHURCH } from '@/lib/site';
import { WhatsappIcon } from './messenger-icons';

export function PrayerPage() {
  const { t } = useSite();

  return (
    <>
      <PageHeader title={t.prayer.title} subtitle={t.prayer.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Action block */}
          <FadeIn>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                <Heart className="h-6 w-6" aria-hidden="true" />
              </span>

              <h2 className="mt-5 font-display text-2xl font-bold text-foreground md:text-3xl">
                Отправить молитвенную нужду
              </h2>

              <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                Ваша просьба будет передана пастору и молитвенной группе. Напишите нам в WhatsApp или Telegram, и мы обязательно поддержим вас в молитве.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={CHURCH.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20ba59] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
                  Написать в WhatsApp
                </a>

                <a
                  href={CHURCH.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#229ED9] px-6 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e8bc0] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Написать в Telegram
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-gold/30 bg-gold-soft/30 p-4 text-xs leading-relaxed text-muted-foreground">
                <p>
                  {t.prayer.confidentialNote}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Side column */}
          <div className="space-y-6">
            <FadeIn delay={100}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/25 shadow-lg">
                <Image
                  src="/images/prayer.jpg"
                  alt={t.prayer.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            <FadeIn delay={180}>
              <div className="rounded-3xl bg-navy p-6 text-[#E9EEF3] shadow-md md:p-7">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-gold">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  {t.prayer.promises.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {t.prayer.promises.items.map((p) => (
                    <li key={p.ref} className="border-l-2 border-gold/50 pl-4">
                      <p className="text-sm leading-relaxed">{p.text}</p>
                      <cite className="mt-1 block text-xs font-bold uppercase tracking-wider text-gold not-italic">
                        {p.ref}
                      </cite>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {t.prayer.privacy.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t.prayer.privacy.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <PrayerWall />
    </>
  );
}
