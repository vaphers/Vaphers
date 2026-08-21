import { NextRequest, NextResponse } from 'next/server';
import { getInteriorBlogBySlug, updateInteriorBlog, deleteInteriorBlog } from '@/lib/interiorBlogs';

export const dynamic = 'force-dynamic';

// GET: Fetch single blog by slug
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    const blog = await getInteriorBlogBySlug(slug);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err: any) {
    console.error('Error fetching interior design blog by slug:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// PUT: Update blog by slug
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    const body = await req.json();
    const updateFields: any = {};

    if (body.title !== undefined) updateFields.title = body.title.trim();
    if (body.slug !== undefined) updateFields.slug = body.slug.trim().toLowerCase();
    if (body.contentHtml !== undefined) updateFields.contentHtml = body.contentHtml;
    if (body.content !== undefined && body.contentHtml === undefined) updateFields.contentHtml = body.content;
    if (body.metaTitle !== undefined) updateFields.metaTitle = body.metaTitle;
    if (body.metaDescription !== undefined) updateFields.metaDescription = body.metaDescription;
    if (body.featuredImage !== undefined) updateFields.featuredImage = body.featuredImage;
    if (body.authorId !== undefined) updateFields.authorId = body.authorId;
    if (body.authorName !== undefined) updateFields.authorName = body.authorName;
    if (body.author !== undefined && body.authorId === undefined) updateFields.authorId = body.author;
    if (body.categories !== undefined) updateFields.categories = body.categories;

    const result = await updateInteriorBlog(slug, updateFields);

    return NextResponse.json({
      success: true,
      slug: result.slug,
      message: 'Interior blog updated successfully',
    });
  } catch (err: any) {
    console.error('Error updating interior design blog:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Delete blog by slug
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
    }

    await deleteInteriorBlog(slug);

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (err: any) {
    console.error('Error deleting interior design blog:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
