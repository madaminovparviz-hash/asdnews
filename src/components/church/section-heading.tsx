'use client';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-gold-ink">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
      <span
        aria-hidden="true"
        className={cn('mt-5 block h-[3px] w-14 rounded-full bg-gold', align === 'center' && 'mx-auto')}
      />
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

/** Decorative page banner used at the top of every inner page. */
export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-border/70 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8">
        <h1 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
        <span aria-hidden="true" className="mx-auto mt-6 block h-[3px] w-16 rounded-full bg-gold" />
      </div>
    </section>
  );
}
