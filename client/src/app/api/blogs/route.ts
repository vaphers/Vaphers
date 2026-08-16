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

// POST api
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
      status = 'published',
      scheduledAt = null,
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

    let parsedScheduledAt = null;
    if (status === 'scheduled' && scheduledAt) {
      const d = new Date(scheduledAt);
      if (!isNaN(d.getTime())) {
        parsedScheduledAt = admin.firestore.Timestamp.fromDate(d);
      }
    }

    const docRef = await db.collection('blogs').add({
      title,
      slug,
      contentHtml: content,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      featuredImage: featuredImage || null,
      authorId: author || 'muhammad-asad',
      categories: categories || [],
      status: status || 'published',
      scheduledAt: parsedScheduledAt,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ id: docRef.id, slug, status }, { status: 201 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error creating blog', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get('includeAll') === 'true' || searchParams.get('admin') === 'true';
    const statusFilter = searchParams.get('status');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 100;
    
    const blogsQuery = db
      .collection("blogs")
      .orderBy("createdAt", "desc");

    const snapshot = await blogsQuery.get();
    const now = new Date();

    let blogs = snapshot.docs.map(doc => {
      const data = doc.data();
      let scheduledAtDate: string | null = null;
      if (data.scheduledAt) {
        if (typeof data.scheduledAt.toDate === 'function') {
          scheduledAtDate = data.scheduledAt.toDate().toISOString();
        } else if (data.scheduledAt._seconds) {
          scheduledAtDate = new Date(data.scheduledAt._seconds * 1000).toISOString();
        } else {
          scheduledAtDate = String(data.scheduledAt);
        }
      }

      return {
        id: doc.id,
        slug: data.slug,
        title: data.title,
        featuredImage: data.featuredImage,
        categories: data.categories || [],
        metaDescription: data.metaDescription || '',
        createdAt: data.createdAt,
        authorId: data.authorId,
        status: data.status || 'published',
        scheduledAt: scheduledAtDate,
      };
    });

    // If not admin / includeAll, filter only publicly visible posts
    if (!includeAll) {
      blogs = blogs.filter((b: any) => {
        if (statusFilter) {
          return b.status === statusFilter;
        }
        // Public visibility logic
        if (b.status === 'draft') return false;
        if (b.status === 'scheduled') {
          if (!b.scheduledAt) return false;
          return new Date(b.scheduledAt) <= now;
        }
        // default: published or legacy blogs without status
        return true;
      });
    } else if (statusFilter && statusFilter !== 'all') {
      blogs = blogs.filter((b: any) => b.status === statusFilter);
    }

    if (limit && limit > 0) {
      blogs = blogs.slice(0, limit);
    }

    return NextResponse.json({ blogs });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', blogs: [] }, 
      { status: 500 }
    );
  }
}

