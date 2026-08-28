import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { createGuestPostOrder } from '@/lib/razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submissionId, authorId, authorEmail, authorName } = body;

    if (!submissionId || !authorId) {
      return NextResponse.json(
        { error: 'Missing required parameters (submissionId or authorId).' },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in environment variables on Vercel.');
      return NextResponse.json(
        {
          error:
            'Server configuration error: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured in Vercel Environment Variables.',
        },
        { status: 500 }
      );
    }

    // Verify submission exists and belongs to author
    const submissionRef = db.collection('guestSubmissions').doc(submissionId);
    const submissionDoc = await submissionRef.get();

    if (!submissionDoc.exists) {
      return NextResponse.json({ error: 'Article draft not found in database.' }, { status: 404 });
    }

    const subData = submissionDoc.data() || {};
    if (subData.authorId && subData.authorId !== authorId) {
      return NextResponse.json({ error: 'Unauthorized: Draft does not belong to this author.' }, { status: 403 });
    }

    // Fetch dynamic pricing from systemSettings (fallback: $25 USD)
    let currentPrice = 25;
    let currentCurrency = 'USD';

    try {
      const pricingDoc = await db.collection('systemSettings').doc('guestPostPricing').get();
      if (pricingDoc.exists) {
        const pData = pricingDoc.data() || {};
        if (typeof pData.price === 'number' && pData.price > 0) {
          currentPrice = pData.price;
        }
        if (pData.currency) {
          currentCurrency = pData.currency;
        }
      }
    } catch (priceErr) {
      console.warn('Failed to read dynamic pricing from Firestore, defaulting to 25 USD:', priceErr);
    }

    const amountInCents = Math.round(currentPrice * 100);

    // Create Razorpay order dynamically for the configured amount
    const order = await createGuestPostOrder({
      submissionId,
      authorId,
      authorEmail: authorEmail || subData.authorEmail,
      authorName: authorName || subData.authorName,
      amountInCents,
      currency: currentCurrency,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      price: currentPrice,
      keyId: keyId.trim(),
      submissionTitle: subData.title || 'Untitled Post',
    });
  } catch (error: any) {
    console.error('Error in create-order endpoint:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize payment order.' },
      { status: 500 }
    );
  }
}
