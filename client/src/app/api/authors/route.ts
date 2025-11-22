import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
// import serviceAccount from "../../../../secrets/vaphers-website-firebase-adminsdk-fbsvc-81d68e1434.json";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export async function GET(request: NextRequest) {
  try {
    const snapshot = await db.collection('authors').get();
    const authors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(authors);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, avatar } = data;
    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    }
    const docRef = await db.collection('authors').add({ name, avatar: avatar || null });
    return NextResponse.json({ id: docRef.id });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
