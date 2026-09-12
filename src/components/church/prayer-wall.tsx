'use client';

import { useCallback, useEffect, useState } from 'react';
import { Heart, HandHeart, Quote, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useSite } from '@/lib/i18n';
import { formatEventDate } from '@/lib/events';
import { FadeIn } from './fade-in';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

interface WallItem {
  id: string;
  name: string | null;
  request: string;
  prayedCount: number;
  createdAt: string;
}

const PRAYED_KEY = 'prayed-ids';

function loadPrayedIds(): string[] {
  try {
    const raw = window.localStorage.getItem(PRAYED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function persistPrayedIds(ids: string[]) {
  try {
    window.localStorage.setItem(PRAYED_KEY, JSON.stringify(ids.slice(-500)));
  } catch {
    /* private mode */
  }
}

/**
 * Public prayer wall: shows non-private prayer requests and lets visitors
 * join in prayer with a lightweight "I prayed" counter (one vote per id).
 */
export function PrayerWall() {
  const { t } = useSite();
  const wall = t.prayer.wall;
  const [items, setItems] = useState<WallItem[] | null>(null);
  const [prayedIds, setPrayedIds] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/prayer/public', { cache: 'no-store' });
      const data = await res.json();
      if (data.ok) setItems(data.items as WallItem[]);
      else setItems([]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    setPrayedIds(loadPrayedIds());
    load();
  }, [load]);

  const pray = async (id: string) => {
    if (prayedIds.includes(id)) return;
    const prev = items;
    setPrayedIds((ids) => {
      const next = [...ids, id];
      persistPrayedIds(next);
      return next;
    });
    setItems((cur) =>
      cur?.map((it) => (it.id === id ? { ...it, prayedCount: it.prayedCount + 1 } : it)),
    );
    try {
      const res = await fetch(`/api/prayer/${encodeURIComponent(id)}/pray`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error('failed');
      setItems((cur) =>
        cur?.map((it) =>
          it.id === id ? { ...it, prayedCount: data.prayedCount as number } : it,
        ),
      );
      toast.success(wall.thanks);
    } catch {
      setItems(prev);
      toast.error(t.common.errorGeneric);
    }
  };

  return (
    <section className="border-t border-border/70 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <SectionHeading eyebrow="🙏" title={wall.title} subtitle={wall.subtitle} />

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={load}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-border bg-card px-4 text-xs font-semibold text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {wall.loading.split('…')[0]}
          </button>
        </div>

        {items === null ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">{wall.loading}</p>
        ) : items.length === 0 ? (
          <FadeIn className="mx-auto mt-8 max-w-md">
            <div className="rounded-3xl border border-dashed border-gold/40 bg-card/60 p-8 text-center">
              <HandHeart className="mx-auto h-9 w-9 text-gold" aria-hidden="true" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{wall.empty}</p>
            </div>
          </FadeIn>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const prayed = prayedIds.includes(item.id);
              return (
                <FadeIn key={item.id} delay={(i % 3) * 100}>
                  <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
                    <Quote className="h-5 w-5 text-gold/70" aria-hidden="true" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                      {item.request}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-foreground">
                          {item.name?.trim() || wall.anonymous}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatEventDate(new Date(item.createdAt), t)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => pray(item.id)}
                        disabled={prayed}
                        aria-label={`${wall.pray} — ${item.prayedCount}`}
                        className={cn(
                          'inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          prayed
                            ? 'border-gold/50 bg-gold-soft text-gold-ink'
                            : 'border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold-soft hover:text-gold-ink',
                        )}
                      >
                        <Heart
                          className={cn('h-3.5 w-3.5', prayed && 'fill-gold text-gold')}
                          aria-hidden="true"
                        />
                        {item.prayedCount}
                        <span className="sr-only">{wall.pray}</span>
                      </button>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        )}

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {wall.note}
        </p>
      </div>
    </section>
  );
}
