import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const postId = searchParams.get('postId');

    let query: any = db.collection('supportThreads');

    if (userId) {
      query = query.where('userId', '==', userId);
    }

    if (postId) {
      query = query.where('postId', '==', postId);
    }

    const snapshot = await query.get();
    const threads = snapshot.docs
      .map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => {
        const timeA = new Date(a.lastMessageAt || a.createdAt || 0).getTime();
        const timeB = new Date(b.lastMessageAt || b.createdAt || 0).getTime();
        return timeB - timeA;
      });

    return NextResponse.json({ threads });
  } catch (error: any) {
    console.error('Error fetching support threads:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      userName,
      userEmail,
      topic,
      initialMessage,
      postId,
      postTitle,
      postSlug,
      initiatedBy = 'user',
    } = body;

    if (!userId || !initialMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = new Date().toISOString();

    const threadRef = db.collection('supportThreads').doc();
    const threadData: any = {
      id: threadRef.id,
      userId,
      userName: userName || 'Writer',
      userEmail: userEmail || '',
      topic: topic || 'General Inquiry',
      lastMessage: initialMessage,
      lastMessageAt: now,
      unreadByAdmin: initiatedBy === 'user',
      unreadByUser: initiatedBy === 'admin',
      initiatedBy,
      createdAt: now,
      updatedAt: now,
    };

    if (postId) threadData.postId = postId;
    if (postTitle) threadData.postTitle = postTitle;
    if (postSlug) threadData.postSlug = postSlug;

    await threadRef.set(threadData);

    // Add first message into messages subcollection
    const msgRef = threadRef.collection('messages').doc();
    await msgRef.set({
      id: msgRef.id,
      senderId: initiatedBy === 'admin' ? 'admin_desk' : userId,
      senderRole: initiatedBy === 'admin' ? 'admin' : 'user',
      senderName: initiatedBy === 'admin' ? 'Vaphers Editorial Desk' : (userName || 'Writer'),
      text: initialMessage,
      createdAt: now,
    });

    return NextResponse.json({ thread: threadData });
  } catch (error: any) {
    console.error('Error creating support thread:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
