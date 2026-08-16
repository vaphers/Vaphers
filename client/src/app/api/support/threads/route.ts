import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    let query: any = db.collection('supportThreads');

    if (userId) {
      query = query.where('userId', '==', userId);
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
    const { userId, userName, userEmail, topic, initialMessage } = body;

    if (!userId || !initialMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Check if user already has an active thread with this topic or open thread
    const threadRef = db.collection('supportThreads').doc();
    const threadData = {
      id: threadRef.id,
      userId,
      userName: userName || 'Writer',
      userEmail: userEmail || '',
      topic: topic || 'General Inquiry',
      lastMessage: initialMessage,
      lastMessageAt: now,
      unreadByAdmin: true,
      unreadByUser: false,
      createdAt: now,
      updatedAt: now,
    };

    await threadRef.set(threadData);

    // Add first message into messages subcollection
    const msgRef = threadRef.collection('messages').doc();
    await msgRef.set({
      id: msgRef.id,
      senderId: userId,
      senderRole: 'user',
      senderName: userName || 'Writer',
      text: initialMessage,
      createdAt: now,
    });

    return NextResponse.json({ thread: threadData });
  } catch (error: any) {
    console.error('Error creating support thread:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
