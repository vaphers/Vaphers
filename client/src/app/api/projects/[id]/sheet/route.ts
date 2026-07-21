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

    const doc = await db.collection("projects").doc(id).collection("sheet").doc("main").get();
    if (!doc.exists) {
      const defaultRows = [
        ["Kickoff & Briefing", "Setup", "Done", "Admin", "Completed on start"],
        ["Target Keyword Strategy", "SEO", "In Progress", "Admin", "High priority keywords"],
      ];
      const defaultSheet = {
        columns: ["A", "B", "C", "D", "E"],
        headers: ["Task / Item", "Category", "Status", "Owner", "Notes"],
        rows: defaultRows,
      };
      return NextResponse.json({ success: true, sheet: defaultSheet });
    }

    const data = doc.data()!;
    let rows: string[][] = [];
    if (data.rowsJson) {
      try {
        rows = JSON.parse(data.rowsJson);
      } catch {
        rows = [];
      }
    } else if (Array.isArray(data.rows)) {
      rows = data.rows;
    }

    const sheet = {
      columns: data.columns || ["A", "B", "C", "D", "E"],
      headers: data.headers || ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"],
      rows,
    };

    return NextResponse.json({ success: true, sheet });
  } catch (error: any) {
    console.error("[Project Sheet GET Error]:", error);
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
    const { columns, headers, rows } = body;

    const sheetData = {
      columns: columns || ["A", "B", "C", "D", "E"],
      headers: headers || ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"],
      rowsJson: JSON.stringify(rows || []),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("projects").doc(id).collection("sheet").doc("main").set(sheetData);

    return NextResponse.json({ success: true, message: "Spreadsheet saved successfully" });
  } catch (error: any) {
    console.error("[Project Sheet PUT Error]:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
