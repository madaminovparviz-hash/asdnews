import { MAP_EMBED_SRC, MAP_DIRECTIONS_URL } from '@/lib/site';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface MapEmbedProps {
  title: string;
  linkLabel: string;
  className?: string;
}

/**
 * OpenStreetMap embed — no API key required, lazy-loaded.
 * A text link below keeps the address reachable without iframes.
 */
export function MapEmbed({ title, linkLabel, className }: MapEmbedProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
        <iframe
          title={title}
          src={MAP_EMBED_SRC}
          loading="lazy"
          className="h-[320px] w-full border-0 md:h-[420px]"
        />
      </div>
      <a
        href={MAP_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-gold/50 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        {linkLabel}
      </a>
    </div>
  );
}
