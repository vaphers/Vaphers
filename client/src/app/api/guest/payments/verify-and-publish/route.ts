import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { extractExternalTargetDomains } from '@/lib/antiAbuse';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      submissionId,
      authorId,
    } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !submissionId) {
      return NextResponse.json(
        { error: 'Missing payment signature verification parameters' },
        { status: 400 }
      );
    }

    // 1. Verify Razorpay cryptographic signature
    const isValid = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Payment signature verification failed. Untrusted transaction.' },
        { status: 400 }
      );
    }

    // 2. Fetch submission draft
    const subRef = db.collection('guestSubmissions').doc(submissionId);
    const subDoc = await subRef.get();

    if (!subDoc.exists) {
      return NextResponse.json({ error: 'Article draft not found' }, { status: 404 });
    }

    const subData = subDoc.data() || {};
    const now = new Date().toISOString();

    // 3. Format URL slug
    const baseSlug = (subData.slug || subData.title || '')
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || `post-${Date.now()}`;

    let finalSlug = baseSlug;
    const existingBlog = await db.collection('blogs').where('slug', '==', finalSlug).get();
    if (!existingBlog.empty) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    // 4. Fetch writer profile for fresh author name and bio
    let authorName = subData.authorName || 'Guest Contributor';
    let authorBio = subData.authorBio || '';
    let authorWebsite = subData.authorWebsite || '';
    let authorEmail = subData.authorEmail || '';

    const effectiveAuthorId = authorId || subData.authorId;
    if (effectiveAuthorId) {
      const writerSnap = await db.collection('guestWriters').doc(effectiveAuthorId).get();
      if (writerSnap.exists) {
        const wData = writerSnap.data() || {};
        if (wData.name) authorName = wData.name;
        if (wData.bio) authorBio = wData.bio;
        if (wData.website) authorWebsite = wData.website;
        if (wData.email) authorEmail = wData.email;
      }
    }

    const targetDomains = extractExternalTargetDomains(
      subData.contentHtml || '',
      authorWebsite
    );

    // 5. Instant Publishing into main blogs collection
    const blogDoc = {
      title: subData.title || 'Untitled Post',
      slug: finalSlug,
      contentHtml: subData.contentHtml || '<p></p>',
      metaTitle: subData.metaTitle || subData.title || '',
      metaDescription: subData.metaDescription || '',
      featuredImage: subData.featuredImage || null,
      categories: subData.categories || ['Marketing'],
      authorId: effectiveAuthorId || null,
      authorName,
      authorBio,
      authorWebsite,
      guestAuthorName: authorName,
      guestAuthorBio: authorBio,
      guestAuthorEmail: authorEmail,
      guestAuthorWebsite: authorWebsite,
      targetDomains,
      status: 'published',
      scheduledAt: null,
      isGuestPost: true,
      guestSubmissionId: submissionId,
      paidAmount: 25,
      currency: 'USD',
      razorpayPaymentId,
      createdAt: now,
      updatedAt: now,
    };

    const newBlogRef = await db.collection('blogs').add(blogDoc);

    // 6. Record payment in payments collection
    await db.collection('payments').add({
      submissionId,
      blogId: newBlogRef.id,
      publishedSlug: finalSlug,
      authorId: effectiveAuthorId,
      authorName,
      authorEmail,
      amount: 25,
      currency: 'USD',
      razorpayOrderId,
      razorpayPaymentId,
      status: 'completed',
      purpose: 'Guest Post Instant Publication ($25)',
      createdAt: now,
    });

    // 7. Update guest submission document
    await subRef.update({
      status: 'approved',
      publishedBlogId: newBlogRef.id,
      publishedSlug: finalSlug,
      paid: true,
      paidAmount: 25,
      currency: 'USD',
      razorpayOrderId,
      razorpayPaymentId,
      publishedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified! Your blog is now published live.',
      publishedSlug: finalSlug,
      blogId: newBlogRef.id,
    });
  } catch (error: any) {
    console.error('Error verifying payment and publishing:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
