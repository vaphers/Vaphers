import { NextRequest, NextResponse } from 'next/server';
import { getAllInteriorBlogs, createInteriorBlog } from '@/lib/interiorBlogs';

export const dynamic = 'force-dynamic';

// GET: Fetch interior design marketing blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const blogs = await getAllInteriorBlogs({
      category: categoryParam,
      search: searchParam,
      limit: !isNaN(Number(limit)) ? Number(limit) : undefined,
    });

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

    const result = await createInteriorBlog({
      title,
      slug,
      contentHtml: postContent,
      metaTitle,
      metaDescription,
      featuredImage,
      authorId: authorId || author || 'admin',
      authorName: authorName || 'Vaphers Team',
      categories: Array.isArray(categories) ? categories : ['Interior Design Marketing'],
    });

    return NextResponse.json(
      { success: true, id: result.id, slug: result.slug },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating interior design blog:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create interior design blog' },
      { status: err.message?.includes('already exists') ? 409 : 500 }
    );
  }
}
