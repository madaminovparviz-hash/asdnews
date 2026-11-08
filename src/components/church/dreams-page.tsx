'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  Compass,
  Sun,
  Eye,
  ArrowRight,
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

type TabKey = 'all' | 'understanding' | 'stories' | 'scriptures' | 'faq' | 'contact';

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

      {/* Navigation sub-tabs for convenient jumping */}
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
              setActiveTab('understanding');
              scrollToSection('understanding-section');
            }}
            className={cn(
              'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeTab === 'understanding'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            {d.tabs.understanding}
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

      {/* 1. HERO SECTION WITH RICH VISUAL BANNER */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-ink">
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  {d.badge}
                </div>

                <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                  {d.hero.title}
                </h1>

                <p className="mt-5 text-base font-medium leading-relaxed text-foreground/90 sm:text-lg">
                  {d.hero.lead}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {d.hero.description}
                </p>

                {/* Prophecy quote block inspired by maninwhite */}
                <div className="mt-6 rounded-2xl border-l-4 border-gold bg-gold-soft/30 p-4">
                  <p className="text-sm italic text-foreground/90">{d.hero.prophecyQuote}</p>
                  <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-gold-ink">
                    — {d.hero.prophecyRef}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact-section')}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {d.hero.ctaShare}
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('stories-section')}
                    className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Sparkles className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                    {d.hero.ctaStories}
                    <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <FadeIn delay={150}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-muted shadow-xl sm:aspect-[5/4] lg:aspect-square">
                  <Image
                    src="/images/dreams-hero.jpg"
                    alt={d.hero.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      <Sun className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      Человек в белых одеждах
                    </span>
                    <p className="mt-2 font-display text-sm font-medium sm:text-base">
                      «Не бойся. Я — твой Спаситель. Я — Путь, Истина и Жизнь»
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 2. UNDERSTANDING DREAMS (ПОНИМАНИЕ СНОВ) */}
      <section id="understanding-section" className="scroll-mt-32 border-y border-border bg-muted/30 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                {d.understandingSection.badge}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                {d.understandingSection.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {d.understandingSection.subtitle}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-foreground/80 sm:text-base">
              {d.understandingSection.intro}
            </p>
          </FadeIn>

          {/* 4 Key Principles Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.understandingSection.principles.map((p, idx) => (
              <FadeIn key={p.num} delay={idx * 80}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                  <div>
                    <span className="font-display text-2xl font-black text-gold-ink sm:text-3xl">
                      {p.num}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Deep Insight Banner with photo */}
          <FadeIn delay={250}>
            <div className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-12">
              <div className="relative min-h-[220px] md:col-span-5 md:min-h-full">
                <Image
                  src="/images/dreams-light.jpg"
                  alt="Свет во тьме"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7 md:p-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-ink">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Духовное озарение
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                  {d.understandingSection.ramadanNote.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {d.understandingSection.ramadanNote.text}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. REAL STORIES SECTION WITH VISUALS */}
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

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {d.storiesSection.items.map((story, i) => (
            <FadeIn key={story.name} delay={i * 90}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:border-gold/40 hover:shadow-md md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold-ink">
                      <Heart className="h-3 w-3" aria-hidden="true" />
                      {story.tag}
                    </span>
                    <Quote className="h-6 w-6 text-muted-foreground/30" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {story.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/90 italic md:text-[15px]">
                    {story.text}
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

        {/* Story Illustration Feature (Salim's Rescue from Water) */}
        <FadeIn delay={200}>
          <div className="mt-8 grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-12">
            <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7 md:p-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Спасённые среди шторма
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                «Я тот, кто может спасти тебя от жизненных бурь»
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Многие свидетельства с сайта maninwhite рассказывают о том, как посреди безнадёжности, болезни или глубокого отчаяния Человек в белом протягивает руку. В этот миг буря внутри сердца сменяется тишиной и уверенностью.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => scrollToSection('contact-section')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3 hover:underline"
                >
                  Поделиться своей историей
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="relative min-h-[220px] md:col-span-5 md:min-h-full">
              <Image
                src="/images/dreams-water.jpg"
                alt="Рука спасения в воде"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. SCRIPTURES SECTION: Quran & Injil */}
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                      {d.scripturesSection.quranTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground">Калиматуллах (Слово Аллаха) и Рухуллах (Дух от Него)</p>
                  </div>
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                      {d.scripturesSection.injilTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground">Вечные слова мира, прощения и надежды</p>
                  </div>
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

          {/* Sidenote about dreams in prophecy with scripture photo */}
          <FadeIn delay={300}>
            <div className="mt-8 grid items-center overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-12">
              <div className="relative min-h-[160px] md:col-span-4 md:min-h-full">
                <Image
                  src="/images/dreams-scripture.jpg"
                  alt="Священное Писание"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:col-span-8 md:p-8">
                <span className="font-display text-sm font-bold text-foreground">
                  {d.scripturesSection.dreamsTitle}:{' '}
                </span>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {d.scripturesSection.dreamsText}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. FAQ ACCORDION SECTION */}
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

      {/* 6. CONTACT VIA TELEGRAM & WHATSAPP */}
      <section id="contact-section" className="scroll-mt-32 border-t border-border bg-gradient-to-b from-background via-gold-soft/15 to-background py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-3xl border border-gold/40 bg-card p-6 shadow-xl backdrop-blur-sm sm:p-10 md:p-12">
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
