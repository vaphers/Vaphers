import { NextRequest, NextResponse } from 'next/server';
import { getInteriorBlogsCollection } from '@/lib/mongodb';

// GET: Fetch interior design marketing blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const collection = await getInteriorBlogsCollection();

    const filter: Record<string, any> = {};

    if (categoryParam && categoryParam !== 'all') {
      filter.categories = categoryParam;
    }

    if (searchParam) {
      filter.$or = [
        { title: { $regex: searchParam, $options: 'i' } },
        { metaDescription: { $regex: searchParam, $options: 'i' } },
      ];
    }

    let query = collection.find(filter).sort({ createdAt: -1 });

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        query = query.limit(limit);
      }
    }

    const rawBlogs = await query.toArray();

    const blogs = rawBlogs.map((doc) => ({
      id: doc._id.toString(),
      slug: doc.slug,
      title: doc.title,
      contentHtml: doc.contentHtml,
      metaTitle: doc.metaTitle || doc.title,
      metaDescription: doc.metaDescription || '',
      featuredImage: doc.featuredImage || null,
      authorId: doc.authorId || 'admin',
      authorName: doc.authorName || 'Vaphers Team',
      categories: doc.categories || [],
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
    }));

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (err) {
    console.error('API Error fetching interior design blogs:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: 'Failed to fetch interior design blogs', details: errorMessage, blogs: [] },
      { status: 500 }
    );
  }
}

// POST: Create a new interior design marketing blog
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      content,
      contentHtml,
      slug,
      metaTitle,
      metaDescription,
      featuredImage,
      author,
      authorId,
      authorName,
      categories,
    } = body;

    const postContent = contentHtml || content;

    if (!title || !slug || !postContent) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const cleanSlug = String(slug)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!cleanSlug) {
      return NextResponse.json(
        { error: 'A valid slug is required' },
        { status: 400 }
      );
    }

    const collection = await getInteriorBlogsCollection();

    // Check slug uniqueness
    const existing = await collection.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists. Please choose a different slug.' },
        { status: 409 }
      );
    }

    const now = new Date();
    const newDoc = {
      title: title.trim(),
      slug: cleanSlug,
      contentHtml: postContent,
      metaTitle: metaTitle?.trim() || title.trim(),
      metaDescription: metaDescription?.trim() || '',
      featuredImage: featuredImage || null,
      authorId: authorId || author || 'admin',
      authorName: authorName || 'Vaphers Team',
      categories: Array.isArray(categories) ? categories : [],
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(newDoc);

    return NextResponse.json(
      { success: true, id: result.insertedId.toString(), slug: cleanSlug },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating interior design blog:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
