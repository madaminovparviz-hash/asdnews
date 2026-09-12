import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, clientIp } from '@/lib/rate-limit';

/** Public prayer wall: latest non-private requests. */
export async function GET(req: Request) {
  try {
    const ip = clientIp(req);
    if (!checkRateLimit(`wall:${ip}`, 120, 60 * 60 * 1000)) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const items = await db.prayerRequest.findMany({
      where: { isPrivate: false },
      orderBy: { createdAt: 'desc' },
      take: 12,
      select: {
        id: true,
        name: true,
        request: true,
        prayedCount: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error('[api/prayer/public] error:', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
