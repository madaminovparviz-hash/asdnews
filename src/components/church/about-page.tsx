'use client';

import Image from 'next/image';
import {
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Star,
  Sunrise,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { FadeIn } from './fade-in';
import { PageHeader, SectionHeading } from './section-heading';

const BELIEF_ICONS = [BookOpen, Sunrise, Star, Leaf, ShieldCheck, HeartHandshake];

export function AboutPage() {
  const { t } = useSite();

  return (
    <>
      <PageHeader title={t.about.title} subtitle={t.about.subtitle} />

      {/* ---------- History ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-gold/25 shadow-xl">
              <Image
                src="/images/about.jpg"
                alt={t.about.history.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg md:-left-6">
              <p className="font-display text-2xl font-extrabold text-primary">40+</p>
              <p className="text-xs font-medium text-muted-foreground">
                {t.home.welcome.stats[0].label}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="order-1 lg:order-2">
            <SectionHeading align="left" eyebrow={t.meta.brandCity} title={t.about.history.title} />
            <p className="mt-6 leading-relaxed text-muted-foreground md:text-lg">
              {t.about.history.p1}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground md:text-lg">
              {t.about.history.p2}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <div className="flex h-full flex-col justify-center rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
                <h2 className="font-display text-2xl font-bold md:text-3xl">{t.about.mission.title}</h2>
                <p className="mt-4 leading-relaxed text-white/85 md:text-lg">{t.about.mission.text}</p>
                <span aria-hidden="true" className="mt-6 block h-[3px] w-14 rounded-full bg-gold" />
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <ul className="flex h-full flex-col justify-center gap-4">
                {t.about.mission.points.map((point, i) => (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-semibold leading-snug text-foreground">{point}</p>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ---------- Beliefs ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <SectionHeading title={t.about.beliefs.title} subtitle={t.about.beliefs.intro} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.about.beliefs.items.map((belief, i) => {
            const Icon = BELIEF_ICONS[i % BELIEF_ICONS.length];
            return (
              <FadeIn key={belief.title} delay={(i % 3) * 100}>
                <article className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-ink">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{belief.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{belief.text}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className="bg-secondary/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <SectionHeading title={t.about.team.title} subtitle={t.about.team.subtitle} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.team.members.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <article className="h-full rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-md">
                  <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-extrabold text-primary ring-2 ring-gold/50">
                    {member.name
                      .split(' ')
                      .map((w) => w.charAt(0))
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-foreground">{member.name}</h3>
                  <span className="mt-2 inline-block rounded-full bg-gold-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-ink">
                    {member.role}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <p className="mt-6 text-center text-xs italic text-muted-foreground">{t.about.team.note}</p>
        </div>
      </section>
    </>
  );
}
