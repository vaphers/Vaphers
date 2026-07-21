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

    const doc = await db.collection("projects").doc(id).get();
    if (!doc.exists) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const data = doc.data()!;
    const project = {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    };

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("[Project GET Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();
    const docRef = db.collection("projects").doc(id);
    const existingDoc = await docRef.get();

    if (!existingDoc.exists) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    const existingData = existingDoc.data()!;
    let priceHistory = existingData.priceHistory || [];

    // Check if price / budget has changed to append to priceHistory
    if (body.budget !== undefined && Number(body.budget) !== Number(existingData.budget)) {
      priceHistory = [
        ...priceHistory,
        {
          date: new Date().toISOString(),
          amount: Number(body.budget),
          oldAmount: Number(existingData.budget) || 0,
          reason: body.priceChangeReason || "Contract Price Revision",
          author: "Admin"
        }
      ];
    }

    const updateData = {
      ...body,
      priceHistory,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Remove temporary client field before saving
    delete updateData.priceChangeReason;

    await docRef.update(updateData);
    return NextResponse.json({ success: true, message: "Project updated successfully" });
  } catch (error: any) {
    console.error("[Project PUT Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const { id } = params;

    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    await db.collection("projects").doc(id).delete();
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("[Project DELETE Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
