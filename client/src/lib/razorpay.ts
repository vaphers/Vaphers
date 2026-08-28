import Razorpay from 'razorpay';
import crypto from 'crypto';

export const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      'Server configuration error: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured in Vercel environment variables.'
    );
  }

  return new Razorpay({
    key_id: key_id.trim(),
    key_secret: key_secret.trim(),
  });
};

/**
 * Creates a Razorpay Order for a guest post publication
 */
export async function createGuestPostOrder({
  submissionId,
  authorId,
  authorEmail,
  authorName,
  amountInCents = 2500, // $25.00 USD
  currency = 'USD',
}: {
  submissionId: string;
  authorId: string;
  authorEmail?: string;
  authorName?: string;
  amountInCents?: number;
  currency?: string;
}) {
  const instance = getRazorpayInstance();

  const options = {
    amount: amountInCents,
    currency: currency.toUpperCase(),
    receipt: `rcpt_${submissionId.slice(-8)}_${Date.now().toString().slice(-4)}`,
    notes: {
      submissionId,
      authorId,
      authorEmail: authorEmail || '',
      authorName: authorName || '',
      purpose: `Vaphers Guest Post Instant Publication Fee ($${amountInCents / 100})`,
    },
  };

  try {
    const order = await instance.orders.create(options);
    return order;
  } catch (err: any) {
    const errorDescription =
      err.error?.description ||
      err.description ||
      err.error?.message ||
      err.message ||
      (typeof err === 'object' ? JSON.stringify(err) : String(err));

    console.error('Razorpay Order Creation Failed:', {
      errorDescription,
      rawError: err,
      options,
    });

    if (
      typeof errorDescription === 'string' &&
      (errorDescription.toLowerCase().includes('currency') ||
        errorDescription.toLowerCase().includes('international'))
    ) {
      throw new Error(
        `Razorpay Error: ${errorDescription}. International Payments (USD) may still be under review in your Razorpay Dashboard.`
      );
    }

    throw new Error(`Razorpay Error: ${errorDescription}`);
  }
}

/**
 * Verifies Razorpay payment signature using HMAC SHA256
 */
export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const generatedSignature = crypto
    .createHmac('sha256', secret.trim())
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
