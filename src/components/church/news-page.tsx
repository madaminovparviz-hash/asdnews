'use client';

import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Megaphone,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useSite, type Lang } from '@/lib/i18n';
import {
  CATEGORY_STYLES,
  dayKey,
  formatEventDate,
  getEventsForMonth,
  getUpcomingEvents,
  type LocalizedEvent,
} from '@/lib/events';
import { FadeIn } from './fade-in';
import { PageHeader } from './section-heading';
import { AddToCalendarButton } from './add-to-calendar-button';
import { cn } from '@/lib/utils';

function EventShareButton({ event }: { event: LocalizedEvent }) {
  const { t, lang } = useSite();
  const share = async () => {
    const text = `${event.title} — ${formatEventDate(event.date, t)} ${event.time}`;
    const url = `${window.location.origin}/#/${lang}/news`;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: event.title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success(t.common.linkCopied);
    } catch {
      /* user dismissed the share sheet */
    }
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label={`${t.common.share}: ${event.title}`}
      title={t.common.share}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gold-soft hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Share2 className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function EventRow({ event, compact }: { event: LocalizedEvent; compact?: boolean }) {
  const { t } = useSite();
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-sm',
        compact && 'p-3.5',
      )}
    >
      <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-bold tabular-nums text-primary">
        {event.time}
      </span>
      <div className="min-w-0 flex-1">
        <h4 className={cn('font-semibold leading-snug text-foreground', compact ? 'text-sm' : 'text-[15px]')}>
          {event.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <span
          className={cn(
            'mt-2 inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            CATEGORY_STYLES[event.category].chip,
          )}
        >
          {t.news.categories[event.category]}
        </span>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        <EventShareButton event={event} />
        <AddToCalendarButton event={event} />
      </div>
    </div>
  );
}

function EventCalendar() {
  const { t, lang } = useSite();
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState<string>(() => dayKey(today));

  const monthEvents = useMemo(
    () => getEventsForMonth(view.y, view.m, t),
    [view.y, view.m, t],
  );

  const firstWeekday = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const todayKey = dayKey(today);

  const move = (delta: number) => {
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };

  const selectedDate = useMemo(() => {
    const [y, m, d] = selected.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [selected]);
  const selectedEvents = monthEvents.get(selected) ?? [];

  const monthLabel = `${t.common.months[view.m]} ${view.y}`;
  const selectedLabel = `${t.common.days[(selectedDate.getDay() + 6) % 7]}, ${selectedDate.getDate()} ${t.common.monthsGenitive[selectedDate.getMonth()]}`;

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <CalendarDays className="h-5 w-5 text-gold" aria-hidden="true" />
          {t.news.calendarTitle}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={t.common.prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-[9.5rem] text-center text-sm font-semibold text-foreground" aria-live="polite">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label={t.common.nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{t.news.calendarHint}</p>

      <div role="grid" aria-label={monthLabel} className="mt-4">
        <div className="grid grid-cols-7 gap-1" role="row">
          {t.common.daysShort.map((d) => (
            <div
              key={d}
              role="columnheader"
              className="py-1.5 text-center text-[11px] font-bold uppercase tracking-wide text-muted-foreground"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`empty-${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = dayKey(new Date(view.y, view.m, day));
            const events = monthEvents.get(key);
            const isSelected = key === selected;
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                aria-label={`${day} ${t.common.months[view.m]}${events ? ` — ${events.length}` : ''}`}
                aria-pressed={isSelected}
                className={cn(
                  'relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : isToday
                      ? 'border-2 border-gold bg-gold-soft/40 text-gold-ink'
                      : 'text-foreground/80 hover:bg-muted',
                )}
              >
                {day}
                {events && (
                  <span className="absolute bottom-1 flex gap-0.5">
                    {events.slice(0, 3).map((ev) => (
                      <span
                        key={ev.id}
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          isSelected ? 'bg-white/80' : CATEGORY_STYLES[ev.category].dot,
                        )}
                      />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 border-t border-border/70 pt-4">
        <h4 className="text-sm font-bold text-foreground" aria-live="polite">
          {t.common.eventsOn}: {selectedLabel}
        </h4>
        {selectedEvents.length === 0 ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {t.common.noEvents}
          </p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {selectedEvents.map((ev) => (
              <li key={ev.id}>
                <EventRow event={ev} compact />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function UpcomingList() {
  const { t } = useSite();
  const upcoming = useMemo(() => getUpcomingEvents(12, t), [t]);
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
      <h3 className="font-display text-lg font-bold text-foreground">{t.news.upcomingTitle}</h3>
      <ul className="scrollbar-thin mt-4 max-h-[26rem] space-y-3 overflow-y-auto pr-1">
        {upcoming.map((ev) => (
          <li key={ev.id}>
            <div className="flex gap-3.5 rounded-2xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/50">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <span className="font-display text-lg font-extrabold leading-none">{ev.date.getDate()}</span>
                <span className="mt-0.5 text-[10px] font-medium uppercase opacity-90">
                  {t.common.monthsGenitive[ev.date.getMonth()].slice(0, 3)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-foreground">{ev.title}</h4>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {formatEventDate(ev.date, t)} · {ev.time}
                </p>
                <span
                  className={cn(
                    'mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                    CATEGORY_STYLES[ev.category].chip,
                  )}
                >
                  {t.news.categories[ev.category]}
                </span>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <EventShareButton event={ev} />
                <AddToCalendarButton event={ev} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NewsPage() {
  const { t, lang } = useSite();

  const announcements = t.news.announcements.items.map((a) => {
    const d = new Date();
    d.setDate(d.getDate() + a.dateOffset);
    return { ...a, date: d };
  });

  return (
    <>
      <PageHeader title={t.news.title} subtitle={t.news.subtitle} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <EventCalendar />
          </FadeIn>
          <FadeIn delay={120}>
            <UpcomingList />
          </FadeIn>
        </div>

        {/* Announcements */}
        <div className="mt-14">
          <FadeIn>
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold text-foreground">
              <Megaphone className="h-6 w-6 text-gold" aria-hidden="true" />
              {t.news.announcementsTitle}
            </h2>
          </FadeIn>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {announcements.map((a, i) => (
              <FadeIn key={a.title} delay={i * 100}>
                <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                        CATEGORY_STYLES[a.tag as keyof typeof CATEGORY_STYLES].chip,
                      )}
                    >
                      {t.news.categories[a.tag as keyof typeof CATEGORY_STYLES]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {a.date.getDate()} {t.common.monthsGenitive[a.date.getMonth()]}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold leading-snug text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
