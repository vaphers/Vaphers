'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  ShieldCheck,
  Loader2,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

type Message = {
  id: string;
  senderId: string;
  senderRole: 'admin' | 'user';
  senderName: string;
  text: string;
  createdAt: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userName?: string;
  userEmail?: string;
  user?: {
    uid: string;
    displayName?: string | null;
    email?: string | null;
  };
  initialTopic?: string;
  initialMessageText?: string;
};

const TOPICS = [
  'Extra Post Quota Request ($35)',
  'Article Review & Publishing Inquiry',
  'Technical Issue or Bug Report',
  'General Editorial Question',
];

export default function SupportChatModal({
  isOpen,
  onClose,
  userId,
  userName,
  userEmail,
  user,
  initialTopic = 'Extra Post Quota Request ($35)',
  initialMessageText = '',
}: Props) {
  const effectiveUserId = userId || user?.uid || '';
  const effectiveUserName = userName || user?.displayName || 'Writer';
  const effectiveUserEmail = userEmail || user?.email || '';

  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(initialMessageText);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initThread = async () => {
    if (!effectiveUserId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/support/threads?userId=${effectiveUserId}`);
      const data = await res.json();
      const existingThreads = data.threads || [];

      if (existingThreads.length > 0) {
        const active = existingThreads[0];
        setThreadId(active.id);
        fetchMessages(active.id);
      } else {
        const createRes = await fetch('/api/support/threads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: effectiveUserId,
            userName: effectiveUserName,
            userEmail: effectiveUserEmail,
            topic: selectedTopic,
            initialMessage:
              selectedTopic === 'Extra Post Quota Request ($35)'
                ? `Hi Editorial Team, I would like to request an extra blog publication slot ($35). Please provide payment and approval details.`
                : `Hello Editorial Team, I have a question regarding my contributor account.`,
          }),
        });
        const createData = await createRes.json();
        if (createData.thread) {
          setThreadId(createData.thread.id);
          fetchMessages(createData.thread.id);
        }
      }
    } catch (err) {
      console.error('Error initializing support thread:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (tId: string) => {
    try {
      const res = await fetch(`/api/support/threads/${tId}/messages?role=user`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  useEffect(() => {
    if (isOpen && effectiveUserId) {
      initThread();
    }
  }, [isOpen, effectiveUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !threadId || sending) return;

    const textToSend = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const res = await fetch(`/api/support/threads/${threadId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: effectiveUserId,
          senderRole: 'user',
          senderName: effectiveUserName,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1b6fc2] to-[#165fab] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <span>Editorial Support Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </h3>
              <p className="text-[11px] text-blue-100 font-light">
                Direct desk for quota upgrades &amp; publishing assistance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quota Banner */}
        <div className="p-3 bg-blue-50/80 border-b border-blue-200 text-xs text-blue-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <DollarSign size={15} className="text-[#2383e2] shrink-0" />
            <span>
              <strong>Extra Blog Quota:</strong> $35 per slot (Instant quota boost).
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-100 font-semibold text-blue-800">
            Fast Response
          </span>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400 gap-2 text-xs">
              <Loader2 className="w-5 h-5 animate-spin text-[#2383e2]" />
              <span>Connecting to Editorial Desk...</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <MessageSquare size={32} className="text-slate-300" />
              <p className="text-xs text-slate-600 font-medium">No messages in this ticket yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs">
                Type your inquiry or quota upgrade request below. An editor will reply directly.
              </p>
            </div>
          ) : (
            messages.map((m) => {
              const isMe = m.senderRole === 'user';
              return (
                <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-semibold text-slate-600">
                      {isMe ? 'You' : 'Vaphers Editorial Desk'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-[#2383e2] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
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

        {/* Input Composer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to the editorial team..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || sending}
            className="px-4 py-2 rounded-xl bg-[#2383e2] hover:bg-[#1a6cb8] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
