'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  User,
  Send,
  CheckCircle,
  Clock,
  Search,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Loader2,
  DollarSign,
  Plus,
  ArrowRight,
  FileText,
  ExternalLink,
  Edit,
} from 'lucide-react';
import AdminLoader from '../Components/AdminLoader';

type Thread = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  topic: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadByAdmin: boolean;
  postId?: string;
  postTitle?: string;
  postSlug?: string;
  initiatedBy?: 'admin' | 'user';
};

type Message = {
  id: string;
  senderId: string;
  senderRole: 'admin' | 'user';
  senderName: string;
  text: string;
  createdAt: string;
};

export default function AdminSupportInboxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchThreads = async () => {
    try {
      const res = await fetch('/api/support/threads');
      const data = await res.json();
      const threadList: Thread[] = data.threads || [];
      setThreads(threadList);
      if (!selectedThread && threadList.length > 0) {
        setSelectedThread(threadList[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingThreads(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/support/threads/${threadId}/messages?role=admin`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchThreads();
    const interval = setInterval(fetchThreads, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedThread) {
      fetchMessages(selectedThread.id);
    }
  }, [selectedThread?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputText).trim();
    if (!textToSend || !selectedThread || sending) return;

    if (!customText) setInputText('');
    setSending(true);

    try {
      const res = await fetch(`/api/support/threads/${selectedThread.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: 'admin_desk',
          senderRole: 'admin',
          senderName: 'Vaphers Editorial Desk',
          text: textToSend,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  const filteredThreads = threads.filter((t) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.userName?.toLowerCase().includes(q) ||
      t.userEmail?.toLowerCase().includes(q) ||
      t.topic?.toLowerCase().includes(q) ||
      t.postTitle?.toLowerCase().includes(q) ||
      t.lastMessage?.toLowerCase().includes(q)
    );
  });

  if (loadingThreads) {
    return <AdminLoader message="Loading writer support desk..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular flex flex-col">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      `,
        }}
      />

      {/* Sticky Header matching Posts.tsx */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6 shrink-0">
        <div className="flex items-center gap-6">
          <h1
            className="text-2xl tracking-tight text-slate-900 leading-none font-normal"
            style={{ fontFamily: '"Bungee Shade", cursive' }}
          >
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            Writer Support Desk &amp; Post Dispute Resolution
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchThreads}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <Link href="/admin-dashboard/guest-posts">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-sm cursor-pointer">
              <FileText size={13} />
              <span>Guest Posts</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Inbox & Chat Layout */}
      <div className="flex-1 w-full px-4 md:px-8 flex flex-col md:flex-row gap-6 min-h-[580px]">
        {/* Left Side: Threads List */}
        <div className="w-full md:w-80 lg:w-96 bg-white border border-gray-200 rounded-sm shadow-xs flex flex-col shrink-0">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets by writer, post, or topic..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 font-normal"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 no-scrollbar">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs font-normal">
                <MessageSquare className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                No support tickets found.
              </div>
            ) : (
              filteredThreads.map((thread) => {
                const isSelected = selectedThread?.id === thread.id;
                return (
                  <div
                    key={thread.id}
                    onClick={() => setSelectedThread(thread)}
                    className={`p-4 transition-colors cursor-pointer text-left ${
                      isSelected ? 'bg-blue-50/70 border-l-4 border-[#2383e2]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-medium text-xs text-slate-900 truncate max-w-[170px]">
                        {thread.userName || 'Guest Contributor'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {thread.lastMessageAt
                          ? new Date(thread.lastMessageAt).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                            })
                          : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-100/70 text-blue-800 font-medium truncate max-w-[200px]">
                        {thread.topic || 'Inquiry'}
                      </span>
                      {thread.postTitle && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-medium truncate max-w-[150px]">
                          📄 {thread.postTitle}
                        </span>
                      )}
                      {thread.unreadByAdmin && (
                        <span className="w-2 h-2 rounded-full bg-[#2383e2]"></span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">
                      {thread.lastMessage || 'No messages yet'}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active Ticket Thread */}
        <div className="flex-1 bg-white border border-gray-200 rounded-sm shadow-xs flex flex-col min-h-[500px]">
          {selectedThread ? (
            <>
              {/* Active Ticket Top Bar */}
              <div className="px-6 py-3.5 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium text-xs">
                    {selectedThread.userName ? selectedThread.userName[0].toUpperCase() : 'W'}
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-slate-900 flex items-center gap-2">
                      <span>{selectedThread.userName}</span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        ({selectedThread.userEmail})
                      </span>
                    </h3>
                    <p className="text-[11px] text-[#2383e2] font-medium">
                      Topic: {selectedThread.topic}
                    </p>
                  </div>
                </div>

                {/* Linked Post Direct Actions */}
                {selectedThread.postId && (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin-dashboard/guest-posts/edit/${selectedThread.postId}`}
                      className="px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center gap-1 transition-colors border border-gray-200"
                    >
                      <Edit size={12} />
                      <span>Edit Linked Post</span>
                    </Link>
                    {selectedThread.postSlug && (
                      <Link
                        href={`/blogs/${selectedThread.postSlug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium flex items-center gap-1 border border-emerald-200"
                      >
                        <ExternalLink size={12} />
                        <span>Live Post</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Linked Post Notice Strip */}
              {selectedThread.postTitle && (
                <div className="p-2.5 px-6 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText size={14} className="text-amber-700 shrink-0" />
                    <span className="truncate">
                      <strong>Linked Article:</strong> {selectedThread.postTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold shrink-0">
                    Active Dispute / Resolution
                  </span>
                </div>
              )}

              {/* Chat Message History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
                {loadingMessages ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-xs gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#2383e2]" />
                    <span>Loading conversation...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                    No messages in this ticket yet.
                  </div>
                ) : (
                  messages.map((m) => {
                    const isAdmin = m.senderRole === 'admin';
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-gray-400 font-mono">
                          <span>{isAdmin ? 'Vaphers Editorial Desk' : m.senderName}</span>
                          <span>&bull;</span>
                          <span>
                            {new Date(m.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div
                          className={`max-w-xl p-3.5 rounded text-xs leading-relaxed ${
                            isAdmin
                              ? 'bg-[#2383e2] text-white rounded-tr-none'
                              : 'bg-white text-slate-800 border border-gray-200 rounded-tl-none shadow-xs'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Composer */}
              <div className="p-4 border-t border-gray-200 bg-white space-y-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-medium">Quick Replies:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInputText(
                        'Please revise your article according to our content guidelines: ensure a real individual author byline is provided and images are under 200 KB.'
                      )
                    }
                    className="px-2 py-0.5 rounded text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                  >
                    Policy Guidelines
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setInputText(
                        'Thank you for updating the draft! Your changes have been reviewed and your post is live.'
                      )
                    }
                    className="px-2 py-0.5 rounded text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                  >
                    Resolved &amp; Live
                  </button>
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type an official editorial reply..."
                    className="flex-1 p-2.5 text-xs border border-gray-300 rounded-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 font-normal"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || sending}
                    className="px-4 py-2 bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                    <span>Reply</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-xs font-normal">
              <MessageSquare className="w-8 h-8 text-gray-300 mb-2" />
              Select a support ticket on the left to review the conversation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
