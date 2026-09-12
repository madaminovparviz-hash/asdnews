import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(2000),
  /** Honeypot — must stay empty. */
  website: z.string().optional().default(''),
  /** Milliseconds the user spent on the form before submitting. */
  elapsedMs: z.number().optional().default(0),
});

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { ok: false, error: 'rate_limited' },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
    }

    const { name, email, phone, message, website, elapsedMs } = parsed.data;

    // Spam traps: honeypot filled or submitted implausibly fast → silent drop.
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true, id: 'skipped' });
    }
    if (typeof elapsedMs !== 'number' || elapsedMs < 2500) {
      return NextResponse.json({ ok: false, error: 'too_fast' }, { status: 400 });
    }

    const saved = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone && phone.length > 0 ? phone : null,
        message,
      },
    });

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error('[api/contact] error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
