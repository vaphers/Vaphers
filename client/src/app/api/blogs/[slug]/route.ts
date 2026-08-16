import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
// import serviceAccount from '../../../../../secrets/vaphers-website-firebase-adminsdk-fbsvc-81d68e1434.json';
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     if (!params.slug) {
//       return NextResponse.json({ error: "Missing slug" }, { status: 400 });
//     }
//     // Query the blog by slug
//     const query = db.collection("blogs").where("slug", "==", params.slug).limit(1);
//     const snapshot = await query.get();
//     if (snapshot.empty) {
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 });
//     }
//     const blogDoc = snapshot.docs[0];
//     return NextResponse.json({ id: blogDoc.id, ...blogDoc.data() });
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : String(err);
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }



export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(req.url);
    const allowUnpublished = searchParams.get('admin') === 'true' || searchParams.get('preview') === 'true';

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }
    // Query the blog by slug
    const query = db.collection("blogs").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();
    if (snapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const blogDoc = snapshot.docs[0];
    const data = blogDoc.data();

    // Check visibility for public viewers
    if (!allowUnpublished) {
      if (data.status === 'draft') {
        return NextResponse.json({ error: "Blog is in draft mode" }, { status: 404 });
      }
      if (data.status === 'scheduled' && data.scheduledAt) {
        let schedDate: Date | null = null;
        if (typeof data.scheduledAt.toDate === 'function') {
          schedDate = data.scheduledAt.toDate();
        } else if (data.scheduledAt._seconds) {
          schedDate = new Date(data.scheduledAt._seconds * 1000);
        } else {
          schedDate = new Date(data.scheduledAt);
        }
        if (schedDate && schedDate > new Date()) {
          return NextResponse.json({ error: "Blog is scheduled for future publication" }, { status: 404 });
        }
      }
    }

    return NextResponse.json({ id: blogDoc.id, ...data });
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

    const query = db.collection("blogs").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Get the document reference and update it
    const docRef = snapshot.docs[0].ref;

    let updateData = { ...body };
    if (body.status === 'scheduled' && body.scheduledAt) {
      const d = new Date(body.scheduledAt);
      if (!isNaN(d.getTime())) {
        updateData.scheduledAt = admin.firestore.Timestamp.fromDate(d);
      }
    } else if (body.status === 'published' || body.status === 'draft') {
      if (body.scheduledAt === null || body.scheduledAt === '') {
        updateData.scheduledAt = null;
      }
    }

    // Pass the payload sent from the client
    await docRef.update({
      ...updateData,
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

    const query = db.collection("blogs").where("slug", "==", slug).limit(1);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.delete();

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}