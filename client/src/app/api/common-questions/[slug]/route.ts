import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const query = db.collection("common_questions").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Common question not found" }, { status: 404 });
    }

    const doc = snapshot.docs[0];
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const body = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const query = db.collection("common_questions").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Common question not found" }, { status: 404 });
    }

    const docRef = snapshot.docs[0].ref;

    await docRef.update({
      ...body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() 
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const query = db.collection("common_questions").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Common question not found" }, { status: 404 });
    }

    await snapshot.docs[0].ref.delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
