import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

const paramsSchema = z.object({ id: z.string().min(1).max(64) });

/** Increment the "I prayed" counter of a public prayer request. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit(`pray:${ip}`, 60, 60 * 60 * 1000)) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const parsedId = paramsSchema.safeParse(await ctx.params);
    if (!parsedId.success) {
      return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
    }

    const existing = await db.prayerRequest.findUnique({
      where: { id: parsedId.data.id },
      select: { isPrivate: true },
    });
    if (!existing || existing.isPrivate) {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
    }

    const updated = await db.prayerRequest.update({
      where: { id: parsedId.data.id },
      data: { prayedCount: { increment: 1 } },
      select: { prayedCount: true },
    });

    return NextResponse.json({ ok: true, prayedCount: updated.prayedCount });
  } catch (err) {
    console.error('[api/prayer/pray] error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
