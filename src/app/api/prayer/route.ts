import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

const prayerSchema = z.object({
  name: z.string().trim().max(80).optional().or(z.literal('')),
  request: z.string().trim().min(10).max(1000),
  isPrivate: z.boolean().optional().default(true),
  /** Honeypot — must stay empty. */
  website: z.string().optional().default(''),
  /** Milliseconds the user spent on the form before submitting. */
  elapsedMs: z.number().optional().default(0),
});

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit(`prayer:${ip}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = prayerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
    }

    const { name, request, isPrivate, website, elapsedMs } = parsed.data;

    // Spam traps: honeypot filled or submitted implausibly fast → silent drop.
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true, id: 'skipped' });
    }
    if (typeof elapsedMs !== 'number' || elapsedMs < 2500) {
      return NextResponse.json({ ok: false, error: 'too_fast' }, { status: 400 });
    }

    const saved = await db.prayerRequest.create({
      data: {
        name: name && name.length > 0 ? name : null,
        request,
        isPrivate,
      },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error('[api/prayer] error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
