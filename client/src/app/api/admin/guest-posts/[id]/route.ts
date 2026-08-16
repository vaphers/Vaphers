import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await db.collection('guestSubmissions').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ submission: { id: doc.id, ...doc.data() } });
  } catch (error: any) {
    console.error('Error fetching submission:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, feedbackNote } = body;

    const submissionRef = db.collection('guestSubmissions').doc(id);
    const submissionDoc = await submissionRef.get();

    if (!submissionDoc.exists) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const subData = submissionDoc.data() || {};
    const now = new Date().toISOString();

    if (action === 'approve') {
      // 1. Publish into main blogs collection
      const slug = (subData.slug || subData.title || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `post-${Date.now()}`;

      // Check if slug exists in blogs
      let finalSlug = slug;
      const existingBlog = await db.collection('blogs').where('slug', '==', finalSlug).get();
      if (!existingBlog.empty) {
        finalSlug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      // Fetch writer profile for fresh bio and name
      let authorName = subData.authorName || 'Guest Contributor';
      let authorBio = subData.authorBio || '';
      let authorWebsite = subData.authorWebsite || '';

      if (subData.authorId) {
        const writerSnap = await db.collection('guestWriters').doc(subData.authorId).get();
        if (writerSnap.exists) {
          const wData = writerSnap.data() || {};
          if (wData.name) authorName = wData.name;
          if (wData.bio) authorBio = wData.bio;
          if (wData.website) authorWebsite = wData.website;
        }
      }

      const blogDoc = {
        title: subData.title || 'Untitled Post',
        slug: finalSlug,
        contentHtml: subData.contentHtml || '',
        metaTitle: subData.metaTitle || subData.title || '',
        metaDescription: subData.metaDescription || '',
        featuredImage: subData.featuredImage || null,
        categories: subData.categories || ['Marketing'],
        authorId: subData.authorId || null,
        authorName,
        authorBio,
        authorWebsite,
        guestAuthorName: authorName,
        guestAuthorBio: authorBio,
        guestAuthorEmail: subData.authorEmail || '',
        guestAuthorWebsite: authorWebsite,
        status: 'published',
        scheduledAt: null,
        isGuestPost: true,
        guestSubmissionId: id,
        createdAt: now,
        updatedAt: now,
      };

      const newBlogRef = await db.collection('blogs').add(blogDoc);

      // 2. Update submission record
      await submissionRef.update({
        status: 'approved',
        publishedBlogId: newBlogRef.id,
        publishedSlug: finalSlug,
        approvedAt: now,
        updatedAt: now,
      });

      return NextResponse.json({
        message: 'Guest post successfully approved and published to /blogs',
        publishedBlogId: newBlogRef.id,
        publishedSlug: finalSlug,
      });
    }

    if (action === 'request_revision') {
      await submissionRef.update({
        status: 'needs_revision',
        feedbackNote: feedbackNote || 'Please review editorial feedback and revise your post.',
        updatedAt: now,
      });

      return NextResponse.json({
        message: 'Revision requested from author',
      });
    }

    if (action === 'reject') {
      await submissionRef.update({
        status: 'rejected',
        feedbackNote: feedbackNote || 'Submission does not meet our content quality guidelines.',
        updatedAt: now,
      });

      return NextResponse.json({
        message: 'Guest submission rejected',
      });
    }

    return NextResponse.json({ error: 'Invalid action provided' }, { status: 400 });
  } catch (error: any) {
    console.error('Error handling guest submission review:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
