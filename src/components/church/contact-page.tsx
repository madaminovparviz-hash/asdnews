'use client';

import { useRef, useState } from 'react';
import {
  CheckCircle2,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapEmbed } from './map-embed';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';
import { CHURCH } from '@/lib/site';

const SOCIAL_ICONS = { Telegram: Send, Instagram, YouTube: Youtube } as const;

export function ContactPage() {
  const { t } = useSite();
  const form = t.contact.form;
  const c = t.common;

  const mountedAt = useRef(Date.now());
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (values.name.trim().length < 2) nextErrors.name = c.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = c.invalidEmail;
    if (values.message.trim().length < 10) nextErrors.message = c.tooShort;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      if (res.status === 429) {
        toast.error(c.errorRate);
        return;
      }
      if (!res.ok) {
        toast.error(c.errorGeneric);
        return;
      }
      setDone(true);
    } catch {
      toast.error(c.errorGeneric);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setValues({ name: '', email: '', phone: '', message: '' });
    mountedAt.current = Date.now();
    setDone(false);
  };

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
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              {done ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft">
                    <CheckCircle2 className="h-10 w-10 text-gold-ink" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
                    {form.successTitle}
                  </h2>
                  <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
                    {form.successText}
                  </p>
                  <Button onClick={reset} variant="outline" className="mt-6 rounded-full">
                    {form.sendAnother}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {form.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{form.desc}</p>
                  <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">{form.nameLabel}</Label>
                        <Input
                          id="contact-name"
                          required
                          value={values.name}
                          onChange={set('name')}
                          placeholder={form.namePlaceholder}
                          maxLength={80}
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                          className={errors.name ? 'border-destructive' : undefined}
                        />
                        {errors.name && (
                          <p id="contact-name-error" role="alert" className="text-xs font-medium text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">{form.emailLabel}</Label>
                        <Input
                          id="contact-email"
                          required
                          type="email"
                          value={values.email}
                          onChange={set('email')}
                          placeholder={form.emailPlaceholder}
                          maxLength={120}
                          autoComplete="email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                          className={errors.email ? 'border-destructive' : undefined}
                        />
                        {errors.email && (
                          <p id="contact-email-error" role="alert" className="text-xs font-medium text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">{form.phoneLabel}</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={values.phone}
                        onChange={set('phone')}
                        placeholder={form.phonePlaceholder}
                        maxLength={40}
                        autoComplete="tel"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">{form.messageLabel}</Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={values.message}
                        onChange={set('message')}
                        placeholder={form.messagePlaceholder}
                        rows={6}
                        maxLength={2000}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                        className={errors.message ? 'border-destructive' : undefined}
                      />
                      {errors.message && (
                        <p id="contact-message-error" role="alert" className="text-xs font-medium text-destructive">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={sending}
                      size="lg"
                      className="w-full rounded-full font-semibold"
                    >
                      {sending ? (
                        c.sending
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          {form.submit}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
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
