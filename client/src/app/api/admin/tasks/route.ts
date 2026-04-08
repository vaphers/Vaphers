import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; 

export async function GET() {
  try {
    const ref = doc(db, "kanban", "vaphers-board");
    const snap = await getDoc(ref);
    
    if (snap.exists() && snap.data().columns) {
      return NextResponse.json({ success: true, columns: snap.data().columns });
    } else {
      return NextResponse.json({ success: true, columns: null });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch board" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { columns } = await request.json();
    const ref = doc(db, "kanban", "vaphers-board");
    
    await setDoc(ref, { columns });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save board" }, { status: 500 });
  }
}