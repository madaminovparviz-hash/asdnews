import { ru, type Translation } from '@/lib/i18n/ru';

export type EventCategory = 'worship' | 'community' | 'youth' | 'children' | 'mercy';

export interface LocalizedEvent {
  id: string;
  date: Date;
  time: string;
  category: EventCategory;
  title: string;
  description: string;
}

/** Weekly recurring gatherings (weekday: 0=Mon … 6=Sun, matching common.days arrays). */
const RECURRING = [
  { weekday: 5, time: '09:00', category: 'worship' as const, scheduleIndex: 0 },
  { weekday: 5, time: '10:30', category: 'worship' as const, scheduleIndex: 1 },
  { weekday: 2, time: '18:00', category: 'worship' as const, scheduleIndex: 2 },
  { weekday: 4, time: '17:00', category: 'youth' as const, scheduleIndex: 3 },
];

interface SpecialEvent {
  /** Days from "today" at build/render time — keeps the calendar alive. */
  offsetDays: number;
  time: string;
  category: EventCategory;
  title: { ru: string; tj: string };
  description: { ru: string; tj: string };
}

const SPECIAL: SpecialEvent[] = [
  {
    offsetDays: 5,
    time: '18:30',
    category: 'community',
    title: { ru: 'Семинар здоровья: «Рецепты долголетия»', tj: 'Семинари саломатӣ: «Рецептҳои дарозумрӣ»' },
    description: {
      ru: 'Практическое занятие о принципах здорового образа жизни: питание, сон, движение. Приглашаются все желающие.',
      tj: 'Машғулияти амалӣ дар бораи усулҳои тарзи зиндагии солим: ғизо, хоб, ҳаракат. Ҳама даъват мешаванд.',
    },
  },
  {
    offsetDays: 12,
    time: '10:00',
    category: 'mercy',
    title: { ru: 'День милосердия: визиты к пожилым', tj: 'Рӯзи раҳм: ташриф ба солхӯрдагон' },
    description: {
      ru: 'Волонтёры навещают старших членов общины и нуждающихся семей с продуктами и словами заботы.',
      tj: 'Ихтиёриён ба аъзои солхӯрдаи ҷамоат ва оилаҳои муҳтоҷ бо маҳсулот ва калимаҳои ғамхорӣ меоянд.',
    },
  },
  {
    offsetDays: 19,
    time: '11:00',
    category: 'children',
    title: { ru: 'Библейский праздник для детей', tj: 'Иди Библиявии кӯдакон' },
    description: {
      ru: 'Истории, песни, игры и поделки для детей 5–12 лет. Родители могут остаться рядом.',
      tj: 'Ҳикоятҳо, сурудҳо, бозиҳо ва корҳои дастӣ барои кӯдакони 5–12 сола. Волидайн метавонанд канор бошанд.',
    },
  },
  {
    offsetDays: 26,
    time: '18:00',
    category: 'worship',
    title: { ru: 'Вечер хвалы и благодарения', tj: 'Шоми ситоиш ва сипосгузорӣ' },
    description: {
      ru: 'Особое вечернее богослужение с музыкой, свидетельствами и молитвой благодарности.',
      tj: 'Ибодати махсуси бегоҳ бо мусиқӣ, шаҳодатҳо ва дуои сипос.',
    },
  },
  {
    offsetDays: 40,
    time: '10:30',
    category: 'worship',
    title: { ru: 'Причастие (вечеря Господня)', tj: 'Шарикӣ (шоми Худованд)' },
    description: {
      ru: 'Особая суббота с обрядом смирения и причастием — открыта для всех членов и гостей.',
      tj: 'Шанбеи махсус бо маросими фотиҳа ва Шарикӣ — барои ҳамаи аъзо ва меҳмонон кушода аст.',
    },
  },
  {
    offsetDays: 47,
    time: '12:30',
    category: 'community',
    title: { ru: 'Семейный пикник общины', tj: 'Пикники оилавии ҷамоат' },
    description: {
      ru: 'После богослужения выезжаем на природу: обед, игры и общение для всей семьи.',
      tj: 'Баъди ибодат ба табиат мебароем: нон, бозиҳо ва ҳамсуҳбат барои тамоми оила.',
    },
  },
];

export const CATEGORY_STYLES: Record<EventCategory, { dot: string; chip: string }> = {
  worship: {
    dot: 'bg-[#2F5A7C] dark:bg-[#9FC1DC]',
    chip: 'border-[#2F5A7C]/25 bg-[#2F5A7C]/10 text-[#2F5A7C] dark:border-[#9FC1DC]/30 dark:bg-[#9FC1DC]/10 dark:text-[#B7D2E7]',
  },
  community: {
    dot: 'bg-[#C29B40] dark:bg-[#D8B25B]',
    chip: 'border-[#C29B40]/30 bg-[#C29B40]/15 text-[#7A611F] dark:border-[#D8B25B]/35 dark:bg-[#D8B25B]/10 dark:text-[#E7CD96]',
  },
  youth: {
    dot: 'bg-[#4E8D6E] dark:bg-[#7DBB9C]',
    chip: 'border-[#4E8D6E]/25 bg-[#4E8D6E]/10 text-[#3A6B52] dark:border-[#7DBB9C]/30 dark:bg-[#7DBB9C]/10 dark:text-[#A3D0B8]',
  },
  children: {
    dot: 'bg-[#C87A3C] dark:bg-[#E0A26B]',
    chip: 'border-[#C87A3C]/25 bg-[#C87A3C]/10 text-[#96591F] dark:border-[#E0A26B]/30 dark:bg-[#E0A26B]/10 dark:text-[#EBBE93]',
  },
  mercy: {
    dot: 'bg-[#B05F5F] dark:bg-[#D39393]',
    chip: 'border-[#B05F5F]/25 bg-[#B05F5F]/10 text-[#8A4646] dark:border-[#D39393]/30 dark:bg-[#D39393]/10 dark:text-[#E3B4B4]',
  },
};

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function eventsForDate(date: Date, t: Translation): LocalizedEvent[] {
  const lang = t.meta.brand === ru.meta.brand ? 'ru' : 'tj';
  const events: LocalizedEvent[] = [];

  // Recurring weekly meetings
  for (const r of RECURRING) {
    // JS getDay(): 0=Sun … 6=Sat → our 0=Mon scheme
    const weekday = (date.getDay() + 6) % 7;
    if (weekday !== r.weekday) continue;
    const item = t.schedule.weekly.items[r.scheduleIndex];
    events.push({
      id: `${dayKey(date)}-rec-${r.scheduleIndex}`,
      date: new Date(date),
      time: r.time,
      category: r.category,
      title: item.title,
      description: item.desc,
    });
  }

  // Special one-time events anchored to today
  const today = startOfToday();
  for (const s of SPECIAL) {
    const d = addDays(today, s.offsetDays);
    if (d.getTime() !== date.getTime()) continue;
    events.push({
      id: `${dayKey(date)}-sp-${s.offsetDays}`,
      date: new Date(date),
      time: s.time,
      category: s.category,
      title: s.title[lang],
      description: s.description[lang],
    });
  }

  events.sort((a, b) => a.time.localeCompare(b.time));
  return events;
}

/** All events of a month, grouped by ISO day key. */
export function getEventsForMonth(year: number, month: number, t: Translation): Map<string, LocalizedEvent[]> {
  const map = new Map<string, LocalizedEvent[]>();
  const last = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= last; day++) {
    const date = new Date(year, month, day);
    const list = eventsForDate(date, t);
    if (list.length) map.set(dayKey(date), list);
  }
  return map;
}

/** Next `count` events starting from today. */
export function getUpcomingEvents(count: number, t: Translation, from: Date = startOfToday()): LocalizedEvent[] {
  const out: LocalizedEvent[] = [];
  const cursor = new Date(from);
  for (let i = 0; i < 90 && out.length < count; i++) {
    const list = eventsForDate(cursor, t);
    for (const e of list) {
      if (out.length >= count) break;
      out.push(e);
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

export function formatEventDate(date: Date, t: Translation): string {
  return `${date.getDate()} ${t.common.monthsGenitive[date.getMonth()]}`;
}

/** Approximate duration (minutes) per event type — used for .ics exports. */
export function getEventDuration(event: LocalizedEvent): number {
  const recMatch = /-rec-(\d)$/.exec(event.id);
  if (recMatch) return [75, 90, 60, 120][Number(recMatch[1])] ?? 90;
  return 90; // special gatherings
}

/** Weekday (0=Mon … 6=Sun) of each schedule item, matching RECURRING order. */
export const SCHEDULE_WEEKDAYS = [5, 5, 2, 4];

/** Start time ("09:00") and duration (minutes) parsed from a "09:00 – 10:15" range. */
export function parseTimeRange(range: string): { start: string; duration: number } {
  const parts = range.split('–').map((s) => s.trim());
  const start = parts[0] ?? range;
  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const duration = parts[1] ? Math.max(30, toMin(parts[1]) - toMin(start)) : 90;
  return { start, duration };
}

/** Next date (today included) on which the given weekday falls. */
export function nextOccurrence(weekday: number, time: string, from: Date = new Date()): Date {
  const d = new Date(from);
  d.setHours(Number(time.split(':')[0]), Number(time.split(':')[1] ?? 0), 0, 0);
  let delta = (weekday - ((d.getDay() + 6) % 7) + 7) % 7;
  if (delta === 0 && d.getTime() <= from.getTime()) delta = 7;
  d.setDate(d.getDate() + delta);
  return d;
}

export { dayKey };
