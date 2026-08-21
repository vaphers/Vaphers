import Razorpay from 'razorpay';
import crypto from 'crypto';

export const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are missing in environment variables.');
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
};

/**
 * Creates a Razorpay Order for a guest post publication ($25.00 USD)
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
    currency,
    receipt: `rcpt_${submissionId.slice(-8)}_${Date.now().toString().slice(-4)}`,
    notes: {
      submissionId,
      authorId,
      authorEmail: authorEmail || '',
      authorName: authorName || '',
      purpose: 'Vaphers Guest Post Instant Publication Fee ($25)',
    },
  };

  const order = await instance.orders.create(options);
  return order;
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
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
