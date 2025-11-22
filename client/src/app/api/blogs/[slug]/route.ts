import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import serviceAccount from '../../../../../secrets/vaphers-website-firebase-adminsdk-fbsvc-81d68e1434.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    if (!params.slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }
    // Query the blog by slug
    const query = db.collection("blogs").where("slug", "==", params.slug).limit(1);
    const snapshot = await query.get();
    if (snapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const blogDoc = snapshot.docs[0];
    return NextResponse.json({ id: blogDoc.id, ...blogDoc.data() });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
