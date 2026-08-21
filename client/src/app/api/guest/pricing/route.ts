import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const doc = await db.collection('systemSettings').doc('guestPostPricing').get();
    if (doc.exists) {
      const data = doc.data() || {};
      return NextResponse.json({
        price: typeof data.price === 'number' ? data.price : 25,
        currency: data.currency || 'USD',
      });
    }

    return NextResponse.json({
      price: 25,
      currency: 'USD',
    });
  } catch (error: any) {
    console.error('Error fetching guest post pricing:', error);
    return NextResponse.json({
      price: 25,
      currency: 'USD',
    });
  }
}
