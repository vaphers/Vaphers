import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// ─── TRANSACTIONS ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource') || 'transactions';

    if (resource === 'accounts') {
      const snapshot = await db.collection('accounts').orderBy('createdAt', 'asc').get();
      const accounts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(accounts);
    }

    // Default: transactions
    const snapshot = await db.collection('transactions').orderBy('date', 'desc').get();
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(transactions);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('GET Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource') || 'transactions';
    const data = await request.json();

    // ── Create / update account ──────────────────────────────────────────────
    if (resource === 'accounts') {
      if (!data.name || data.balance === undefined) {
        return NextResponse.json({ error: 'Missing name or balance' }, { status: 400 });
      }
      const docRef = await db.collection('accounts').add({
        name: data.name,
        type: data.type || 'bank',          // bank | card | cash | wallet
        color: data.color || '#6366f1',
        balance: Number(data.balance),
        currency: data.currency || 'INR',
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
    }

    // ── Create transaction ───────────────────────────────────────────────────
    if (!data.amount || !data.mainCategory || !data.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const batch = db.batch();

    // Save transaction
    const txRef = db.collection('transactions').doc();
    const txPayload = {
      type: data.type,                        // expense | income | transfer
      amount: Number(data.amount),
      mainCategory: data.mainCategory,
      subCategory: data.subCategory || '',
      date: data.date,
      note: data.note || '',
      tags: data.tags || [],
      accountId: data.accountId || null,      // source account
      toAccountId: data.toAccountId || null,  // destination (transfers)
      payee: data.payee || '',                // who you paid / received from
      createdAt: new Date().toISOString(),
    };
    batch.set(txRef, txPayload);

    // Update account balance(s)
    if (data.accountId) {
      const accRef = db.collection('accounts').doc(data.accountId);
      const delta =
        data.type === 'income' ? Number(data.amount) :
        data.type === 'expense' ? -Number(data.amount) :
        data.type === 'transfer' ? -Number(data.amount) : 0;
      batch.update(accRef, { balance: admin.firestore.FieldValue.increment(delta) });
    }
    if (data.type === 'transfer' && data.toAccountId) {
      const toRef = db.collection('accounts').doc(data.toAccountId);
      batch.update(toRef, { balance: admin.firestore.FieldValue.increment(Number(data.amount)) });
    }

    await batch.commit();
    return NextResponse.json({ id: txRef.id, ...txPayload }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('POST Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const resource = searchParams.get('resource') || 'transactions';
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await db.collection(resource).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const resource = searchParams.get('resource') || 'transactions';
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const data = await request.json();
    await db.collection(resource).doc(id).update({ ...data, updatedAt: new Date().toISOString() });
    return NextResponse.json({ id, ...data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}