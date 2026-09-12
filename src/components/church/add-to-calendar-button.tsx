'use client';

import { CalendarPlus } from 'lucide-react';
import { useSite } from '@/lib/i18n';
import { getEventDuration, type LocalizedEvent } from '@/lib/events';
import { buildEventIcs, downloadIcs } from '@/lib/ics';
import { CHURCH } from '@/lib/site';
import { cn } from '@/lib/utils';

interface Props {
  event: LocalizedEvent;
  className?: string;
}

/** Downloads an .ics file so visitors can save the gathering to any calendar app. */
export function AddToCalendarButton({ event, className }: Props) {
  const { t } = useSite();

  const onClick = () => {
    const ics = buildEventIcs(
      event,
      getEventDuration(event),
      CHURCH.addressFull,
      window.location.origin,
    );
    const pad = (n: number) => String(n).padStart(2, '0');
    downloadIcs(
      `adventist-dushanbe-${event.date.getFullYear()}-${pad(event.date.getMonth() + 1)}-${pad(event.date.getDate())}-${event.time.replace(':', '')}.ics`,
      ics,
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t.common.addToCalendar}: ${event.title}`}
      title={t.common.addToCalendar}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-gold-soft hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
