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
        updatedAt: data.updatedAt || null,
        updatedBy: data.updatedBy || null,
      });
    }

    return NextResponse.json({
      price: 25,
      currency: 'USD',
      updatedAt: null,
      updatedBy: null,
    });
  } catch (error: any) {
    console.error('Error fetching admin pricing:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { price, currency = 'USD', updatedBy } = body;

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice < 1) {
      return NextResponse.json(
        { error: 'Invalid price. Price must be a positive number.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const payload = {
      price: numericPrice,
      currency: currency.toUpperCase(),
      updatedAt: now,
      updatedBy: updatedBy || 'admin',
    };

    await db.collection('systemSettings').doc('guestPostPricing').set(payload, { merge: true });

    return NextResponse.json({
      success: true,
      message: `Guest post pricing successfully updated to $${numericPrice} ${currency}.`,
      pricing: payload,
    });
  } catch (error: any) {
    console.error('Error updating admin pricing:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
