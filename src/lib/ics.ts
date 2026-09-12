import type { LocalizedEvent } from './events';

/** Pad a number to 2 digits. */
const p2 = (n: number) => String(n).padStart(2, '0');

function toIcsStamp(d: Date): string {
  return `${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}T${p2(d.getHours())}${p2(d.getMinutes())}00`;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Build a downloadable .ics (iCalendar) file for an event.
 * Uses floating local time, which every calendar app understands.
 */
export function buildEventIcs(event: LocalizedEvent, durationMinutes: number, location: string, url: string): string {
  const start = event.date;
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const [hh, mm] = event.time.split(':');
  // Combine the event's calendar date with its HH:mm time.
  start.setHours(Number(hh), Number(mm), 0, 0);
  end.setHours(Number(hh), Number(mm), 0, 0);
  end.setTime(end.getTime() + durationMinutes * 60_000);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Adventist Dushanbe//Site//RU',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@adventist-dushanbe.tj`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(start)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

/** Trigger a client-side download of an .ics file. */
export function downloadIcs(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
