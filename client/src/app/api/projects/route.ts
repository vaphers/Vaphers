import { NextResponse } from "next/server";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}");
if (!admin.apps.length && Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}
const db = admin.apps.length ? admin.firestore() : null;

export async function GET(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const serviceFilter = searchParams.get("service");
    const statusFilter = searchParams.get("status");

    let query: admin.firestore.Query = db.collection("projects").orderBy("createdAt", "desc");

    if (statusFilter && statusFilter !== "all") {
      query = query.where("status", "==", statusFilter);
    }

    const snapshot = await query.get();
    let projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    }));

    if (serviceFilter && serviceFilter !== "all") {
      projects = projects.filter((p: any) => {
        if (Array.isArray(p.services)) {
          return p.services.includes(serviceFilter);
        }
        return p.serviceType === serviceFilter;
      });
    }

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("[Projects GET Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { 
      name, 
      clientName, 
      clientEmail, 
      currency,
      services, 
      serviceType,
      seoSubTypes,
      webDevSubTypes,
      ppcSubTypes,
      billingType,
      paymentStatus,
      requirements, 
      budget, 
      startDate, 
      dueDate, 
      status, 
      description,
      vaultNotes,
      milestones
    } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Project name is required" }, { status: 400 });
    }

    const initialBudget = Number(budget) || 0;

    const projectData = {
      name,
      clientName: clientName || "Internal / Unassigned",
      clientEmail: clientEmail || "",
      currency: currency || "USD",
      services: Array.isArray(services) && services.length > 0 ? services : [serviceType || "Search Engine Optimization"],
      serviceType: serviceType || "Search Engine Optimization",
      seoSubTypes: seoSubTypes || [],
      webDevSubTypes: webDevSubTypes || [],
      ppcSubTypes: ppcSubTypes || [],
      billingType: billingType || "One-Time",
      paymentStatus: paymentStatus || "Paid",
      status: status || "Planning",
      requirements: requirements || {},
      budget: initialBudget,
      priceHistory: [
        {
          date: new Date().toISOString(),
          amount: initialBudget,
          reason: "Initial Contract Value",
          author: "Admin"
        }
      ],
      startDate: startDate || new Date().toISOString().split("T")[0],
      dueDate: dueDate || "",
      description: description || "",
      vaultNotes: vaultNotes || {},
      milestones: Array.isArray(milestones) && milestones.length > 0 ? milestones : [
        {
          id: "m-1",
          title: "Month 1 / Initial Kickoff & Audit",
          dueDate: dueDate || new Date().toISOString().split("T")[0],
          status: "In Progress",
          deliverables: "Requirements gathering, initial setup, technical audit"
        }
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("projects").add(projectData);

    // Default sheet stored safely without 2D nested arrays for Firestore
    const defaultRows = [
      ["Project Briefing", "Setup", "Completed", "Admin", "Requirements verified"],
      ["Initial Audit & Setup", "Execution", "In Progress", "Admin", "In progress"],
    ];

    const defaultSheet = {
      columns: ["A", "B", "C", "D", "E"],
      headers: ["Deliverable / Item", "Category", "Status", "Owner", "Notes / URL"],
      rowsJson: JSON.stringify(defaultRows),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.collection("sheet").doc("main").set(defaultSheet);

    return NextResponse.json({
      success: true,
      message: "Enterprise project initialized successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    console.error("[Projects POST Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
