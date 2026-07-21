import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}");

if (!admin.apps.length && Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.apps.length ? admin.firestore() : null;

export async function GET(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
  }

  try {
    const snapshot = await db.collection("leads").orderBy("createdAt", "desc").get();
    
    const leads = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ leads });
  } catch (error: any) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid request, 'ids' array is required." }, { status: 400 });
    }

    const batch = db.batch();
    ids.forEach((id: string) => {
      const ref = db.collection("leads").doc(id);
      batch.delete(ref);
    });

    await batch.commit();

    return NextResponse.json({ success: true, message: `Deleted ${ids.length} leads successfully.` });
  } catch (error: any) {
    console.error("Failed to delete leads:", error);
    return NextResponse.json({ error: "Failed to delete leads", details: error.message }, { status: 500 });
  }
}
