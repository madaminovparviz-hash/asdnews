'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Radio,
  Play,
  Flame,
  BookOpen,
  Share2,
  ExternalLink,
  Calendar,
  Sparkles,
  HeartHandshake,
  Clock,
  ArrowRight,
  CheckCircle2,
  Globe,
  Quote,
  Copy,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { SectionHeading } from '@/components/church/section-heading';
import { FadeIn } from '@/components/church/fade-in';
import { toast } from 'sonner';

const TARGET_DATE = new Date('2027-09-01T00:00:00Z').getTime();

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCountdown(): TimeRemaining {
  const diff = Math.max(0, TARGET_DATE - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const PILLAR_ICONS = {
  prayer: Flame,
  scripture: BookOpen,
  digital: Globe,
  service: HeartHandshake,
};

export function OneVoicePage() {
  const { t, navigate } = useSite();
  const ov = t.onevoice;
  const [countdown, setCountdown] = useState<TimeRemaining>(calculateCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyPageLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t.common.linkCopied);
    }
  };

  const handlePillarClick = (id: string) => {
    if (id === 'prayer') navigate('prayer');
    else if (id === 'service') navigate('schedule');
    else if (id === 'scripture') {
      const el = document.getElementById('ov-resources');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      copyPageLink();
    }
  };

  return (
    <div className="space-y-16 pb-20 md:space-y-24 md:pb-28">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/onevoice.jpg"
            alt={ov.heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold shadow-sm backdrop-blur-sm">
              <Radio className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
              {ov.badge}
            </span>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {ov.heroTitle}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              {ov.heroSubtitle}
            </p>

            {/* Live Countdown */}
            <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold md:text-sm">
                {ov.countdownLabel}
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
                <div className="flex flex-col items-center rounded-xl bg-navy/80 p-3 sm:p-4 border border-white/10 shadow-inner">
                  <span className="font-display text-2xl font-black text-white sm:text-4xl md:text-5xl">
                    {countdown.days}
                  </span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/60 sm:text-xs">
                    {ov.countdownDays}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-navy/80 p-3 sm:p-4 border border-white/10 shadow-inner">
                  <span className="font-display text-2xl font-black text-white sm:text-4xl md:text-5xl">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/60 sm:text-xs">
                    {ov.countdownHours}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-navy/80 p-3 sm:p-4 border border-white/10 shadow-inner">
                  <span className="font-display text-2xl font-black text-white sm:text-4xl md:text-5xl">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/60 sm:text-xs">
                    {ov.countdownMinutes}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-navy/80 p-3 sm:p-4 border border-white/10 shadow-inner">
                  <span className="font-display text-2xl font-black text-gold sm:text-4xl md:text-5xl">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-gold/80 sm:text-xs">
                    {ov.countdownSeconds}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#ov-video"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-[#22435F] shadow-lg transition-all hover:bg-gold-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                {ov.watchVideo}
              </a>
              <button
                type="button"
                onClick={copyPageLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {ov.sharePageBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section id="ov-video" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-border/80 bg-card p-4 shadow-xl sm:p-6 md:p-8">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {ov.videoBadge}
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                    {ov.videoTitle}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{ov.videoDesc}</p>
                </div>

                <a
                  href="https://youtu.be/YpLD6p-z00g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  {ov.openInYoutube}
                </a>
              </div>

              {/* Responsive 16:9 Video Embed */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner ring-1 ring-border/50">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/YpLD6p-z00g?rel=0&modestbranding=1"
                  title={ov.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Historical Anniversary Context (2000 years of Christ's ministry) */}
      <section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  {ov.anniversaryBadge}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {ov.anniversaryTitle}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>{ov.anniversaryText1}</p>
                  <p>{ov.anniversaryText2}</p>
                </div>

                {/* Scripture Callout */}
                <div className="mt-8 rounded-2xl border-l-4 border-gold bg-secondary/70 p-5 sm:p-6 shadow-sm">
                  <Quote className="h-6 w-6 text-gold/70" aria-hidden="true" />
                  <p className="mt-2 font-serif text-sm italic text-foreground sm:text-base">
                    {ov.scriptureText}
                  </p>
                  <p className="mt-3 text-right text-xs font-bold tracking-wider text-gold-ink">
                    — {ov.scriptureRef}
                  </p>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border shadow-2xl">
                  <Image
                    src="/images/onevoice.jpg"
                    alt={ov.anniversaryTitle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="rounded-full bg-gold/90 px-3 py-1 text-[11px] font-bold text-navy uppercase tracking-wider">
                      27 г. н.э. — 2027 г.
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">
                      2000 лет благовестия
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="bg-secondary/40 py-16 md:py-20 border-y border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="✝️" title={ov.pillarsTitle} subtitle={ov.pillarsSubtitle} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ov.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] ?? Flame;
              return (
                <FadeIn key={pillar.id}>
                  <div className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-gold group-hover:text-[#22435F]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {pillar.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePillarClick(pillar.id)}
                      className="mt-6 flex items-center gap-1.5 text-xs font-bold text-primary transition-colors group-hover:text-gold-ink focus-visible:outline-none"
                    >
                      {pillar.action}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Roadmap */}
      <section>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="🗺️" title={ov.timelineTitle} subtitle={ov.timelineSubtitle} />

          <div className="mt-12 space-y-6">
            {ov.timeline.map((step, idx) => (
              <FadeIn key={step.stage}>
                <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-gold/50 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold ring-1 ring-gold/40">
                    0{idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {step.stage}
                      </h3>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-gold-ink">
                        {step.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                  <div className="sm:self-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        idx === 1
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : idx === 3
                            ? 'bg-gold text-[#22435F]'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Actionable Steps: "Как принять участие лично вам" */}
      <section className="bg-secondary/30 py-16 md:py-20 border-t border-border/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="🙌" title={ov.participateTitle} subtitle={ov.participateSubtitle} />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ov.steps.map((item) => (
              <FadeIn key={item.step}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="font-display text-3xl font-black text-gold/60">{item.step}</span>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Official Resources & Links Section */}
      <section id="ov-resources" className="scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-secondary/50 p-6 shadow-xl sm:p-8 md:p-10">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                  {ov.officialResourcesBadge}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {ov.officialResourcesTitle}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {ov.officialResourcesDesc}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href="https://esd.onevoice27.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-gold hover:bg-gold/5"
                >
                  <span className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gold" />
                    <span>{ov.officialSiteBtn}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                </a>

                <a
                  href="https://esd.adventist.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-gold hover:bg-gold/5"
                >
                  <span className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span>{ov.officialEsdBtn}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                </a>

                <a
                  href={ov.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-gold hover:bg-gold/5 sm:col-span-2"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-gold" />
                    <span>{ov.readArticleBtn}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                </a>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Церковь христиан адвентистов седьмого дня в Душанбе • ул. Борбад, 117
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyPageLink}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm hover:bg-muted"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {ov.sharePageBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('contact')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                  >
                    {t.nav.contact}
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
