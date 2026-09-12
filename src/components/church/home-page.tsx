'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Quote,
  Sunrise,
  Timer,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { CATEGORY_STYLES, formatEventDate, getUpcomingEvents } from '@/lib/events';
import { CHURCH } from '@/lib/site';
import { FadeIn } from './fade-in';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

/** Next Saturday 09:00 local time. */
function getNextSabbath(now: Date): Date {
  const d = new Date(now);
  d.setHours(9, 0, 0, 0);
  const delta = (6 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + delta);
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7);
  return d;
}

function NextServiceCard() {
  const { t, navigate } = useSite();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Defer first tick past hydration, then refresh every 30s
    const raf = requestAnimationFrame(() => setNow(new Date()));
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, []);

  const sabbath = useMemo(() => getNextSabbath(now ?? new Date()), [now]);
  const dateLabel = now
    ? `${sabbath.getDate()} ${t.common.monthsGenitive[sabbath.getMonth()]}`
    : t.home.nextService.weekday;

  const diff = now ? Math.max(0, sabbath.getTime() - now.getTime()) : 0;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const c = t.common.countdown;

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('schedule');
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card/85 p-6 shadow-[0_24px_70px_-30px_rgba(34,49,63,0.5)] backdrop-blur-md md:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-ink">
          {t.home.nextService.title}
        </p>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {t.home.nextService.weekday}
        </span>
      </div>

      <p className="mt-3 font-display text-2xl font-bold text-foreground">{dateLabel}</p>

      <ul className="mt-4 space-y-2.5">
        {t.home.nextService.items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-muted/80 px-4 py-2.5"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
              {item.label}
            </span>
            <span className="text-sm font-bold text-primary">{item.time}</span>
          </li>
        ))}
      </ul>

      {now && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gold/30 bg-gold-soft/60 px-4 py-3">
          <Timer className="h-5 w-5 shrink-0 text-gold-ink" aria-hidden="true" />
          <div className="flex items-baseline gap-1.5 text-gold-ink">
            <span className="font-display text-xl font-bold tabular-nums">{days}</span>
            <span className="text-xs font-semibold">{c.days}</span>
            <span className="font-display text-xl font-bold tabular-nums">{hours}</span>
            <span className="text-xs font-semibold">{c.hours}</span>
            <span className="font-display text-xl font-bold tabular-nums">{minutes}</span>
            <span className="text-xs font-semibold">{c.minutes}</span>
          </div>
          <span className="ml-auto text-[11px] uppercase tracking-wide text-gold-ink/80">
            {c.title}
          </span>
        </div>
      )}

      <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        {t.home.nextService.address}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground/80">{t.home.nextService.welcome}</p>
      <a
        href="#/schedule"
        onClick={go}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
      >
        {t.home.nextService.link}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function HomePage() {
  const { t, navigate } = useSite();
  const go = (id: 'schedule' | 'about' | 'news' | 'contact') => (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    navigate(id);
  };
  const upcoming = useMemo(() => getUpcomingEvents(3, t), [t]);

  const sermonImages = ['/images/sermon-1.jpg', '/images/sermon-2.jpg', '/images/sermon-3.jpg'];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/hero.jpg"
            alt={t.home.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/80 px-4 py-1.5 text-xs font-semibold text-gold-ink shadow-sm backdrop-blur">
                <Sunrise className="h-3.5 w-3.5" aria-hidden="true" />
                {t.home.hero.badge}
              </span>
              <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {t.home.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.home.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#/schedule"
                  onClick={go('schedule')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#274C69] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t.home.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#/about"
                  onClick={go('about')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-border bg-card/80 px-7 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t.home.hero.ctaSecondary}
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
                {t.home.hero.note}
              </p>
            </FadeIn>

            <FadeIn delay={150} className="lg:justify-self-end lg:w-full lg:max-w-md">
              <NextServiceCard />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ---------- Welcome ---------- */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <FadeIn className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/25 shadow-xl">
                <Image
                  src="/images/about.jpg"
                  alt={t.home.welcome.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 hidden h-28 w-28 rounded-3xl border-2 border-gold/40 md:block"
              />
            </FadeIn>

            <FadeIn delay={120}>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-ink">
                {t.meta.tagline}
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t.home.welcome.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">
                {t.home.welcome.p1}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground md:text-lg">
                {t.home.welcome.p2}
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {t.home.welcome.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                      {s.value}
                    </dd>
                    <dd className="mt-1 text-xs leading-snug text-muted-foreground md:text-sm">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="#/about"
                onClick={go('about')}
                className="mt-7 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.home.welcome.moreLink}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ---------- Sermons ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading
          eyebrow={t.meta.brandCity}
          title={t.home.sermons.title}
          subtitle={t.home.sermons.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.home.sermons.items.map((sermon, i) => (
            <FadeIn key={sermon.title} delay={i * 120}>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={sermonImages[i]}
                    alt={sermon.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {sermon.duration}
                  </span>
                </div>
                <div className="p-5">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {sermon.dateLabel}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sermon.summary}</p>
                  <p className="mt-4 flex items-center gap-2.5 border-t border-border/70 pt-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-soft text-xs font-bold text-gold-ink">
                      {sermon.speaker.trim().charAt(0).toUpperCase()}
                    </span>
                    <span className="text-xs font-medium text-foreground/80">{sermon.speaker}</span>
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#/schedule"
            onClick={go('schedule')}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-gold/50 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t.home.sermons.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ---------- Upcoming events preview ---------- */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow={t.common.today}
              title={t.home.events.title}
              subtitle={t.home.events.subtitle}
            />
            <a
              href="#/news"
              onClick={go('news')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {t.home.events.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {upcoming.map((ev, i) => (
              <FadeIn key={ev.id} delay={i * 100}>
                <article className="flex h-full gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                    <span className="font-display text-xl font-extrabold leading-none">{ev.date.getDate()}</span>
                    <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wide opacity-90">
                      {t.common.months[ev.date.getMonth()].slice(0, 3)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span
                      className={cn(
                        'inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                        CATEGORY_STYLES[ev.category].chip,
                      )}
                    >
                      {t.news.categories[ev.category]}
                    </span>
                    <h3 className="mt-2 line-clamp-2 font-semibold leading-snug text-foreground">
                      {ev.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatEventDate(ev.date, t)} · {ev.time}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Verse ---------- */}
      <section className="relative overflow-hidden bg-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(620px 260px at 50% 0%, rgba(194,155,64,0.18), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-20">
          <FadeIn>
            <Quote className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
            <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-[#F3E9D2] md:text-2xl">
              {t.home.verse.text}
            </blockquote>
            <cite className="mt-4 block text-xs font-bold uppercase tracking-[0.2em] text-gold not-italic">
              {t.home.verse.ref}
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[#4A7BA6] p-8 shadow-xl dark:from-[#274C69] dark:to-[#18314a] md:p-12">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  {t.home.ctaBand.title}
                </h2>
                <p className="mt-3 leading-relaxed text-white/85">{t.home.ctaBand.text}</p>
              </div>
              <a
                href="#/contact"
                onClick={go('contact')}
                className="inline-flex min-h-[52px] shrink-0 items-center gap-2 rounded-full bg-gold px-8 text-sm font-bold text-[#3A2E10] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#cfab52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {t.home.ctaBand.button}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
