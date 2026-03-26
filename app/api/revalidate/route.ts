import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-webhook-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    revalidatePath('/');
    revalidatePath('/stories/[slug]', 'page');
    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: String(err) }, { status: 500 });
  }
}
