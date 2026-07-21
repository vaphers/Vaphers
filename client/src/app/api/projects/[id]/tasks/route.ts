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
      .collection("tasks")
      .orderBy("createdAt", "desc")
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    console.error("[Project Tasks GET Error]:", error);
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
    const { title, description, column, priority, assignee, dueDate } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Task title is required" }, { status: 400 });
    }

    const taskData = {
      title,
      description: description || "",
      column: column || "Backlog", // Backlog, In Progress, In Review, Completed
      priority: priority || "Medium", // Low, Medium, High, Urgent
      assignee: assignee || "Unassigned",
      dueDate: dueDate || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("projects").doc(id).collection("tasks").add(taskData);

    return NextResponse.json({
      success: true,
      message: "Task created successfully",
      task: { id: docRef.id, ...taskData, createdAt: new Date().toISOString() },
    });
  } catch (error: any) {
    console.error("[Project Tasks POST Error]:", error);
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
    const { taskId, ...updates } = body;

    if (!taskId) {
      return NextResponse.json({ success: false, error: "Task ID is required" }, { status: 400 });
    }

    const updateData = {
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("projects").doc(id).collection("tasks").doc(taskId).update(updateData);

    return NextResponse.json({ success: true, message: "Task updated successfully" });
  } catch (error: any) {
    console.error("[Project Tasks PUT Error]:", error);
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

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json({ success: false, error: "Task ID is required" }, { status: 400 });
    }

    await db.collection("projects").doc(id).collection("tasks").doc(taskId).delete();

    return NextResponse.json({ success: true, message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("[Project Tasks DELETE Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
