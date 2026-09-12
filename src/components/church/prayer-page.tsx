'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { useSite } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';

export function PrayerPage() {
  const { t } = useSite();
  const form = t.prayer.form;
  const c = t.common;

  const mountedAt = useRef(Date.now());
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ request?: string }>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (request.trim().length < 10) nextErrors.request = c.tooShort;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          request: request.trim(),
          isPrivate,
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
    setName('');
    setRequest('');
    setIsPrivate(false);
    mountedAt.current = Date.now();
    setDone(false);
  };

  return (
    <>
      <PageHeader title={t.prayer.title} subtitle={t.prayer.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Form */}
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              {done ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
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
                    {form.again}
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                    {form.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{form.desc}</p>

                  <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
                    {/* Honeypot — invisible to humans */}
                    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                      <label htmlFor="prayer-website">Website</label>
                      <input
                        id="prayer-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prayer-name">{form.nameLabel}</Label>
                      <Input
                        id="prayer-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={form.namePlaceholder}
                        maxLength={80}
                        autoComplete="name"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <Label htmlFor="prayer-request">{form.requestLabel}</Label>
                        <span className="text-xs text-muted-foreground">
                          {request.length}/1000 · {form.charHint}
                        </span>
                      </div>
                      <Textarea
                        id="prayer-request"
                        required
                        value={request}
                        onChange={(e) => setRequest(e.target.value.slice(0, 1000))}
                        placeholder={form.requestPlaceholder}
                        rows={6}
                        aria-invalid={Boolean(errors.request)}
                        aria-describedby={errors.request ? 'prayer-request-error' : undefined}
                        className={errors.request ? 'border-destructive' : undefined}
                      />
                      {errors.request && (
                        <p id="prayer-request-error" role="alert" className="text-xs font-medium text-destructive">
                          {errors.request}
                        </p>
                      )}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gold/30 bg-gold-soft/40 p-4">
                      <Checkbox
                        checked={isPrivate}
                        onCheckedChange={(v) => setIsPrivate(v === true)}
                        className="mt-0.5"
                        aria-label={form.privateLabel}
                      />
                      <span className="flex items-start gap-2 text-sm font-medium leading-snug text-foreground/90">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                        {form.privateLabel}
                      </span>
                    </label>

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

                    <p className="text-center text-xs leading-relaxed text-muted-foreground">
                      {t.prayer.confidentialNote}
                    </p>
                  </form>
                </>
              )}
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
    </>
  );
}
