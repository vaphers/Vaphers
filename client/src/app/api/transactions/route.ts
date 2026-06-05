import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Safe helper to lazily initialize Firebase Admin on demand
function getDb() {
  if (admin.apps.length === 0) {
    const serviceAccountStr = process.env.GOOGLE_SERVICE_ACCOUNT;
    
    if (!serviceAccountStr) {
      throw new Error(
        'GOOGLE_SERVICE_ACCOUNT environment variable is not defined. Please check your .env or .env.local file.'
      );
    }

    try {
      const serviceAccount = JSON.parse(serviceAccountStr);

      // Replace escaped literal '\n' characters with real newlines for the PEM key
      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    } catch (parseError: any) {
      throw new Error(`Failed to parse or initialize Firebase Admin: ${parseError.message}`);
    }
  }
  return admin.firestore();
}

// ─── GET HANDLER ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource') || 'transactions';

    if (resource === 'accounts') {
      const snapshot = await db.collection('accounts').orderBy('createdAt', 'asc').get();
      const accounts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(accounts);
    }

    if (resource === 'budgets') {
      const snapshot = await db.collection('budgets').get();
      const budgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(budgets);
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

// ─── POST HANDLER ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource') || 'transactions';
    const data = await request.json();

    // Create / update account
    if (resource === 'accounts') {
      if (!data.name || data.balance === undefined) {
        return NextResponse.json({ error: 'Missing name or balance' }, { status: 400 });
      }
      const docRef = await db.collection('accounts').add({
        name: data.name,
        type: data.type || 'bank',
        color: data.color || '#6366f1',
        balance: Number(data.balance),
        currency: data.currency || 'INR',
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ id: docRef.id, ...data }, { status: 201 });
    }

    // Create / update budget limits
    if (resource === 'budgets') {
      if (!data.category || data.limit === undefined) {
        return NextResponse.json({ error: 'Missing category or limit' }, { status: 400 });
      }
      const budgetRef = db.collection('budgets').doc(data.category);
      await budgetRef.set({
        category: data.category,
        limit: Number(data.limit),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return NextResponse.json({ id: data.category, ...data });
    }

    // Create transaction
    if (!data.amount || !data.mainCategory || !data.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const batch = db.batch();

    // Save transaction
    const txRef = db.collection('transactions').doc();
    const txPayload = {
      type: data.type,
      amount: Number(data.amount),
      mainCategory: data.mainCategory,
      subCategory: data.subCategory || '',
      date: data.date,
      note: data.note || '',
      tags: data.tags || [],
      accountId: data.accountId || null,
      toAccountId: data.toAccountId || null,
      payee: data.payee || '',
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

// ─── DELETE HANDLER ──────────────────────────────────────────────────────────
export async function DELETE(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const resource = searchParams.get('resource') || 'transactions';
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    // When deleting a transaction, gracefully revert the account balance changes!
    if (resource === 'transactions') {
      const txRef = db.collection('transactions').doc(id);
      const txSnap = await txRef.get();
      
      if (txSnap.exists) {
        const txData = txSnap.data();
        const batch = db.batch();

        if (txData?.accountId) {
          const accRef = db.collection('accounts').doc(txData.accountId);
          const reverseDelta =
            txData.type === 'income' ? -Number(txData.amount) :
            txData.type === 'expense' ? Number(txData.amount) :
            txData.type === 'transfer' ? Number(txData.amount) : 0;
          batch.update(accRef, { balance: admin.firestore.FieldValue.increment(reverseDelta) });
        }

        if (txData?.type === 'transfer' && txData.toAccountId) {
          const toRef = db.collection('accounts').doc(txData.toAccountId);
          batch.update(toRef, { balance: admin.firestore.FieldValue.increment(-Number(txData.amount)) });
        }

        batch.delete(txRef);
        await batch.commit();
        return NextResponse.json({ success: true });
      }
    }

    await db.collection(resource).doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// ─── PATCH HANDLER ───────────────────────────────────────────────────────────
export async function PATCH(request: NextRequest) {
  try {
    const db = getDb();
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