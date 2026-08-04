import { NextRequest, NextResponse } from 'next/server';
import { getInteriorBlogsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Helper to build a query matching either slug or _id (if valid ObjectId)
function buildSlugOrIdQuery(slugOrId: string) {
  if (ObjectId.isValid(slugOrId) && slugOrId.length === 24) {
    return {
      $or: [{ slug: slugOrId }, { _id: new ObjectId(slugOrId) }],
    };
  }
  return { slug: slugOrId };
}

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

    const collection = await getInteriorBlogsCollection();
    const query = buildSlugOrIdQuery(slug);
    const blogDoc = await collection.findOne(query);

    if (!blogDoc) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const formattedBlog = {
      id: blogDoc._id.toString(),
      slug: blogDoc.slug,
      title: blogDoc.title,
      contentHtml: blogDoc.contentHtml,
      metaTitle: blogDoc.metaTitle || blogDoc.title,
      metaDescription: blogDoc.metaDescription || '',
      featuredImage: blogDoc.featuredImage || null,
      authorId: blogDoc.authorId || 'admin',
      authorName: blogDoc.authorName || 'Vaphers Team',
      categories: blogDoc.categories || [],
      createdAt: blogDoc.createdAt ? new Date(blogDoc.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: blogDoc.updatedAt ? new Date(blogDoc.updatedAt).toISOString() : new Date().toISOString(),
    };

    return NextResponse.json(formattedBlog, { status: 200 });
  } catch (err) {
    console.error('Error fetching interior design blog by slug:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
    const collection = await getInteriorBlogsCollection();
    const query = buildSlugOrIdQuery(slug);

    const existing = await collection.findOne(query);
    if (!existing) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Check if slug is being updated and ensure it is not taken by another post
    let updatedSlug = existing.slug;
    if (body.slug && body.slug !== existing.slug) {
      const cleanSlug = String(body.slug)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const slugClash = await collection.findOne({
        slug: cleanSlug,
        _id: { $ne: existing._id },
      });

      if (slugClash) {
        return NextResponse.json(
          { error: 'The new slug is already in use by another blog post.' },
          { status: 409 }
        );
      }
      updatedSlug = cleanSlug;
    }

    const updateFields: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateFields.title = body.title.trim();
    if (body.slug !== undefined) updateFields.slug = updatedSlug;
    if (body.contentHtml !== undefined) updateFields.contentHtml = body.contentHtml;
    if (body.content !== undefined && body.contentHtml === undefined) updateFields.contentHtml = body.content;
    if (body.metaTitle !== undefined) updateFields.metaTitle = body.metaTitle;
    if (body.metaDescription !== undefined) updateFields.metaDescription = body.metaDescription;
    if (body.featuredImage !== undefined) updateFields.featuredImage = body.featuredImage;
    if (body.authorId !== undefined) updateFields.authorId = body.authorId;
    if (body.authorName !== undefined) updateFields.authorName = body.authorName;
    if (body.author !== undefined && body.authorId === undefined) updateFields.authorId = body.author;
    if (body.categories !== undefined) updateFields.categories = body.categories;

    await collection.updateOne({ _id: existing._id }, { $set: updateFields });

    return NextResponse.json({
      success: true,
      id: existing._id.toString(),
      slug: updatedSlug,
      message: 'Blog updated successfully',
    });
  } catch (err) {
    console.error('Error updating interior design blog:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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

    const collection = await getInteriorBlogsCollection();
    const query = buildSlugOrIdQuery(slug);

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting interior design blog:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
