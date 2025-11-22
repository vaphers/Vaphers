import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
// import serviceAccount from '../../../../secrets/vaphers-website-firebase-adminsdk-fbsvc-81d68e1434.json';
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

// POST: Create a blog (with unique slug check)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      slug,
      metaTitle,
      metaDescription,
      featuredImage,
      author,
      categories,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'title, slug and content are required' },
        { status: 400 }
      );
    }

    // Slug uniqueness check
    const existing = await db.collection('blogs').where("slug", "==", slug).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json(
        { error: 'Slug already exists, choose a different one.' },
        { status: 409 }
      );
    }

    const docRef = await db.collection('blogs').add({
      title,
      slug,
      contentHtml: content,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      featuredImage: featuredImage || null,
      authorId: author,
      categories: categories || [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id, slug }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error creating blog', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET: Return blogs list with slug (for frontend navigation)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageSizeParam = searchParams.get("limit");

    const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 9;
    // For real pagination with Firestore, use startAfter, but here is simple limit

    const blogsQuery = db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .limit(pageSize);

    const snapshot = await blogsQuery.get();
    const blogs = snapshot.docs.map(doc => ({
      id: doc.id,             // for admin/internal usage
      slug: doc.data().slug,  // for navigation
      title: doc.data().title,
      featuredImage: doc.data().featuredImage,
      categories: doc.data().categories,
      metaDescription: doc.data().metaDescription,
      createdAt: doc.data().createdAt,
      // Add any other fields you need
    }));

    return NextResponse.json({ blogs });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
