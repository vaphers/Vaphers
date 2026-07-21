import { NextResponse } from "next/server";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}");
if (!admin.apps.length && Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}
const db = admin.apps.length ? admin.firestore() : null;

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    const snapshot = await db
      .collection("projects")
      .doc(id)
      .collection("logs")
      .orderBy("createdAt", "desc")
      .get();

    const logs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    console.error("[Project Logs GET Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { content, hoursSpent, category, author } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: "Work description is required" }, { status: 400 });
    }

    const logData = {
      content: content.trim(),
      hoursSpent: Number(hoursSpent) || 0,
      category: category || "General Work", // e.g. Development, Optimization, SEO Audit, Client Call
      author: author || "Admin",
      dateStr: new Date().toISOString().split("T")[0],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("projects").doc(id).collection("logs").add(logData);

    return NextResponse.json({
      success: true,
      message: "Daily work logged successfully",
      log: { id: docRef.id, ...logData, createdAt: new Date().toISOString() },
    });
  } catch (error: any) {
    console.error("[Project Logs POST Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
