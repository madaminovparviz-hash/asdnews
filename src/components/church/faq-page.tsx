'use client';

import { MessageCircleQuestion, Phone } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useSite } from '@/lib/i18n';
import { CHURCH } from '@/lib/site';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';

export function FaqPage() {
  const { t, navigate } = useSite();

  const goContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('contact');
  };

  return (
    <>
      <PageHeader title={t.faq.title} subtitle={t.faq.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-5 shadow-sm transition-colors data-[state=open]:border-gold/40"
              >
                <AccordionTrigger className="py-4 text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-sm font-extrabold text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-8 leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>

        <FadeIn delay={150} className="mx-auto mt-12 max-w-2xl">
          <div className="rounded-3xl bg-primary p-8 text-center text-primary-foreground shadow-lg">
            <MessageCircleQuestion className="mx-auto h-9 w-9 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-bold">{t.faq.band.title}</h2>
            <p className="mx-auto mt-2 max-w-md leading-relaxed text-white/85">{t.faq.band.text}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#/contact"
                onClick={goContact}
                className="inline-flex min-h-[48px] items-center rounded-full bg-gold px-6 text-sm font-bold text-[#3A2E10] shadow transition-all hover:-translate-y-0.5 hover:bg-[#cfab52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.faq.band.button}
              </a>
              <a
                href={CHURCH.phoneHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CHURCH.phoneDisplay}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
