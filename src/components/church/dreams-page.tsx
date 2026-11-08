'use client';

import { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Quote,
  Send,
  ShieldCheck,
  Heart,
  Moon,
  ChevronDown,
} from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';
import { CHURCH } from '@/lib/site';
import { WhatsappIcon } from './messenger-icons';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type TabKey = 'all' | 'stories' | 'scriptures' | 'faq' | 'contact';

export function DreamsPage() {
  const { t } = useSite();
  const d = t.dreams;
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const encodedPrefill = encodeURIComponent(d.contactSection.prefillMsg);
  const waUrl = `${CHURCH.whatsappUrl}?text=${encodedPrefill}`;
  const tgUrl = `${CHURCH.telegramUrl}`;

  const scrollToSection = (id: string) => {
    setActiveTab('all');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <PageHeader title={d.title} subtitle={d.subtitle} />

      {/* Navigation sub-tabs for convenient jumping/filtering */}
      <nav aria-label="Разделы темы снов" className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-all md:top-20">
        <div className="mx-auto flex max-w-7xl items-center justify-start gap-2 overflow-x-auto px-4 py-3 sm:px-6 md:justify-center lg:px-8">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {d.tabs.intro}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('stories');
              scrollToSection('stories-section');
            }}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'stories'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {d.tabs.stories}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('scriptures');
              scrollToSection('scriptures-section');
            }}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'scriptures'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {d.tabs.scriptures}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('faq');
              scrollToSection('faq-section');
            }}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'faq'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {d.tabs.faq}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('contact');
              scrollToSection('contact-section');
            }}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'contact'
                ? 'bg-gold-ink bg-gold-soft font-bold text-gold-ink shadow-sm ring-1 ring-gold'
                : 'border border-gold/40 bg-gold-soft/30 text-gold-ink hover:bg-gold-soft',
            )}
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {d.tabs.contact}
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION: "Вы не одни" */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-14 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-soft/40 via-transparent to-transparent opacity-60" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-sm backdrop-blur-sm md:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-ink">
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                {d.badge}
              </div>

              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {d.hero.title}
              </h2>

              <p className="mt-5 text-base font-medium leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
                {d.hero.lead}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {d.hero.description}
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact-section')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {d.hero.ctaShare}
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('stories-section')}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Sparkles className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                  {d.hero.ctaStories}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. REAL STORIES SECTION */}
      <section id="stories-section" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {d.tabs.stories}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              {d.storiesSection.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {d.storiesSection.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {d.storiesSection.items.map((story, i) => (
            <FadeIn key={story.name} delay={i * 100}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-gold/40 hover:shadow-md md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2.5 py-0.5 text-xs font-bold text-gold-ink">
                      <Heart className="h-3 w-3" aria-hidden="true" />
                      {story.tag}
                    </span>
                    <Quote className="h-6 w-6 text-muted-foreground/30" aria-hidden="true" />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-foreground/90 italic md:text-[15px]">
                    «{story.text}»
                  </p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="font-display text-sm font-bold text-foreground">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.city}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. SCRIPTURES SECTION: Quran & Injil */}
      <section id="scriptures-section" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {d.tabs.scriptures}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                {d.scripturesSection.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {d.scripturesSection.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Quran quotes */}
            <FadeIn delay={100}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {d.scripturesSection.quranTitle}
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {d.scripturesSection.quranQuotes.map((q) => (
                    <blockquote
                      key={q.ref}
                      className="rounded-2xl border-l-4 border-emerald-500 bg-muted/40 p-4 transition-colors"
                    >
                      <p className="text-sm leading-relaxed text-foreground/90 italic">{q.text}</p>
                      <footer className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        — {q.ref}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Injil quotes */}
            <FadeIn delay={200}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {d.scripturesSection.injilTitle}
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  {d.scripturesSection.injilQuotes.map((q) => (
                    <blockquote
                      key={q.ref}
                      className="rounded-2xl border-l-4 border-primary bg-muted/40 p-4 transition-colors"
                    >
                      <p className="text-sm leading-relaxed text-foreground/90 italic">{q.text}</p>
                      <footer className="mt-2 text-xs font-semibold text-primary">
                        — {q.ref}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidenote about dreams in prophecy */}
          <FadeIn delay={300}>
            <div className="mt-8 rounded-2xl border border-border/80 bg-card p-5 text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <span className="font-semibold text-foreground">{d.scripturesSection.dreamsTitle}: </span>
              {d.scripturesSection.dreamsText}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. FAQ ACCORDION SECTION */}
      <section id="faq-section" className="mx-auto max-w-4xl scroll-mt-32 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              {d.tabs.faq}
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              {d.faqSection.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {d.faqSection.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="mt-10">
          <FadeIn delay={100}>
            <Accordion type="single" collapsible className="space-y-4">
              {d.faqSection.items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 shadow-sm transition-colors data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left font-display text-sm font-semibold text-foreground hover:no-underline sm:text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* 5. CONTACT FORM VIA TELEGRAM & WHATSAPP */}
      <section id="contact-section" className="scroll-mt-32 border-t border-border bg-gradient-to-b from-background via-gold-soft/10 to-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-gold/40 bg-card p-6 shadow-lg backdrop-blur-sm sm:p-10 md:p-12">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft px-3.5 py-1 text-xs font-bold text-gold-ink">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  {d.contactSection.badge}
                </span>

                <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                  {d.contactSection.title}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {d.contactSection.desc}
                </p>

                {/* Big direct messenger buttons */}
                <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:w-auto">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20ba59] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
                    {d.contactSection.whatsappBtn}
                  </a>

                  <a
                    href={tgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-[#229ED9] px-8 text-base font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e8bc0] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Send className="h-5 w-5" aria-hidden="true" />
                    {d.contactSection.telegramBtn}
                  </a>
                </div>

                {/* Privacy and trust guarantee note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span>{d.contactSection.privacyNote}</span>
                </div>

                <div className="mt-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  {d.contactSection.directNote}{' '}
                  <a
                    href={CHURCH.phoneHref}
                    className="font-semibold text-foreground underline hover:text-primary"
                  >
                    {CHURCH.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

