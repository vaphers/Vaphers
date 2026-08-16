import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const viewerRole = searchParams.get('role'); // 'admin' or 'user'

    const threadRef = db.collection('supportThreads').doc(id);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    // Mark read
    if (viewerRole === 'admin') {
      await threadRef.update({ unreadByAdmin: false });
    } else if (viewerRole === 'user') {
      await threadRef.update({ unreadByUser: false });
    }

    const messagesSnap = await threadRef
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get();

    const messages = messagesSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      thread: { id: threadDoc.id, ...threadDoc.data() },
      messages,
    });
  } catch (error: any) {
    console.error('Error fetching thread messages:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { senderId, senderRole, senderName, text } = body;

    if (!text || !senderRole) {
      return NextResponse.json({ error: 'Message text and sender role required' }, { status: 400 });
    }

    const threadRef = db.collection('supportThreads').doc(id);
    const threadDoc = await threadRef.get();

    if (!threadDoc.exists) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    const now = new Date().toISOString();

    const msgRef = threadRef.collection('messages').doc();
    const msgData = {
      id: msgRef.id,
      senderId: senderId || (senderRole === 'admin' ? 'admin' : 'writer'),
      senderRole,
      senderName: senderName || (senderRole === 'admin' ? 'Vaphers Editorial Team' : 'Writer'),
      text,
      createdAt: now,
    };

    await msgRef.set(msgData);

    // Update parent thread metadata
    await threadRef.update({
      lastMessage: text,
      lastMessageAt: now,
      unreadByAdmin: senderRole === 'user' ? true : false,
      unreadByUser: senderRole === 'admin' ? true : false,
      updatedAt: now,
    });

    return NextResponse.json({ message: msgData });
  } catch (error: any) {
    console.error('Error sending message in thread:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
