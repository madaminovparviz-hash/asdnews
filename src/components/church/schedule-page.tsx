'use client';

import {
  ArrowRight,
  CalendarPlus,
  Clock,
  Heart,
  Lightbulb,
  MapPin,
  Phone,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import {
  nextOccurrence,
  parseTimeRange,
  SCHEDULE_WEEKDAYS,
  type LocalizedEvent,
} from '@/lib/events';
import { buildEventIcs, downloadIcs } from '@/lib/ics';
import { CHURCH } from '@/lib/site';
import { MapEmbed } from './map-embed';
import { FadeIn } from './fade-in';
import { PageHeader, SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

export function SchedulePage() {
  const { t, navigate } = useSite();
  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('contact');
  };

  const addToCalendar = (index: number, title: string) => {
    const item = t.schedule.weekly.items[index];
    const { start, duration } = parseTimeRange(item.time);
    const synthetic: LocalizedEvent = {
      id: `schedule-${index}`,
      date: nextOccurrence(SCHEDULE_WEEKDAYS[index] ?? 5, start),
      time: start,
      category: 'worship',
      title,
      description: item.desc,
    };
    const ics = buildEventIcs(synthetic, duration, CHURCH.addressFull, window.location.origin);
    downloadIcs(`adventist-dushanbe-${title.toLowerCase().replace(/\s+/g, '-')}.ics`, ics);
  };

  return (
    <>
      <PageHeader title={t.schedule.title} subtitle={t.schedule.subtitle} />

      {/* ---------- Weekly schedule ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading title={t.schedule.weekly.title} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {t.schedule.weekly.items.map((item, i) => {
            const isSabbath = item.day === t.schedule.weekly.items[0].day;
            return (
              <FadeIn key={item.title} delay={(i % 2) * 120}>
                <article
                  className={cn(
                    'flex h-full gap-5 rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md',
                    isSabbath ? 'border-gold/50' : 'border-border',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
                      isSabbath ? 'bg-gold-soft text-gold-ink' : 'bg-primary/10 text-primary',
                    )}
                  >
                    <Clock className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-primary">
                        {item.time}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCalendar(i, item.title)}
                        aria-label={`${t.common.addToCalendar}: ${item.title}`}
                        title={t.common.addToCalendar}
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gold-soft hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-gold-ink">
                      {item.day}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ---------- First-visit tips ---------- */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <SectionHeading title={t.schedule.tips.title} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.schedule.tips.items.map((tip, i) => (
              <FadeIn key={tip.title} delay={i * 100}>
                <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="font-display text-2xl font-extrabold text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-semibold text-foreground">{tip.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Location & map ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-8 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                {t.schedule.location.title}
              </h2>
              <p className="mt-3 text-lg font-semibold text-primary">{t.schedule.location.address}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.schedule.location.note}
              </p>
              <a
                href={CHURCH.phoneHref}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-gold/50 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                {CHURCH.phoneDisplay}
              </a>
              <a
                href="#/contact"
                onClick={go}
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded text-sm font-semibold text-primary transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.schedule.visitBand.button}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <MapEmbed title={t.contact.mapTitle} linkLabel={t.common.directions} className="h-full [&>div]:h-full [&>iframe]:md:h-full [&>iframe]:h-[360px]" />
          </FadeIn>
        </div>
      </section>

      {/* ---------- Visit band ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/30 bg-gold-soft/50 p-8 md:flex-row md:items-center md:p-10">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold text-white sm:flex">
                <Heart className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="max-w-xl">
                <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  {t.schedule.visitBand.title}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{t.schedule.visitBand.text}</p>
              </div>
            </div>
            <a
              href="#/contact"
              onClick={go}
              className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              {t.schedule.visitBand.button}
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
