"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Search, X, Calendar as CalendarIcon, AlertCircle, Clock,
  CheckCircle2, Link2, FileText, ChevronDown, Flag, LayoutList, Trello,
  GanttChartSquare, MoreHorizontal, Paperclip, ChevronRight, Circle,
  ArrowLeft, Bell, Tag, User, MessageSquare, ExternalLink, RotateCcw,
  ArrowUpDown, Edit3, Eye,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  format, differenceInDays, parseISO, isValid,
  addDays, eachDayOfInterval, isSameDay, startOfMonth, endOfMonth,
  eachWeekOfInterval, startOfWeek, endOfWeek, isSameMonth, getMonth, getYear,
  addMonths, subMonths,
} from "date-fns";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "Low" | "Medium" | "High" | "None";
type ViewMode  = "board" | "list" | "gantt";
type SortMode  = "none" | "priority" | "deadline";

interface LinkItem { id: string; title: string; url: string; }
interface CommentItem { id: string; text: string; timestamp: string; }
interface CardItem {
  id: string; title: string; description: string; notes: string;
  links: LinkItem[]; comments?: CommentItem[]; priority: Priority; deadline: string; tags?: string[];
  completed?: boolean;
}
interface ColumnData { id: string; title: string; color: string; items: CardItem[]; }

// ─── Constants ────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

const PRIORITY_CONFIG: Record<Priority, { fill: string; label: string; weight: number }> = {
  High:   { fill: "#ef4444", label: "High",   weight: 3 },
  Medium: { fill: "#f59e0b", label: "Medium", weight: 2 },
  Low:    { fill: "#38bdf8", label: "Low",    weight: 1 },
  None:   { fill: "#cbd5e1", label: "None",   weight: 0 },
};

const COL_ACCENTS = ["#64748b","#f97316","#3b82f6","#8b5cf6","#10b981","#ec4899"];
function getColAccent(idx: number) { return COL_ACCENTS[idx % COL_ACCENTS.length]; }

function PriorityFlag({ priority, size = 13 }: { priority: Priority; size?: number }) {
  const { fill } = PRIORITY_CONFIG[priority];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={priority === "None" ? "none" : fill}
      stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}

function getDeadlineStatus(deadline: string) {
  if (!deadline) return null;
  const parsed = parseISO(deadline);
  if (!isValid(parsed)) return null;
  const days = differenceInDays(parsed, new Date());
  if (days < 0)  return { color: "text-red-500",   icon: <AlertCircle size={10} />, date: format(parsed,"MMM d"), overdue: true };
  if (days <= 3) return { color: "text-amber-500",  icon: <Clock size={10} />,       date: format(parsed,"MMM d"), overdue: false };
  return              { color: "text-slate-500",   icon: <CalendarIcon size={10} />, date: format(parsed,"MMM d"), overdue: false };
}

function sortCards(items: CardItem[], sortMode: SortMode): CardItem[] {
  if (sortMode === "none") return items;
  return [...items].sort((a, b) => {
    if (sortMode === "priority") {
      return (PRIORITY_CONFIG[b.priority].weight) - (PRIORITY_CONFIG[a.priority].weight);
    }
    if (sortMode === "deadline") {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });
}

const INITIAL_STATE: ColumnData[] = [
  { id: uid(), title: "Backlog",     color: "slate",   items: [] },
  { id: uid(), title: "To Do",       color: "orange",  items: [] },
  { id: uid(), title: "In Progress", color: "blue",    items: [] },
  { id: uid(), title: "For Review",  color: "violet",  items: [] },
  { id: uid(), title: "Done",        color: "emerald", items: [] },
];

// ─── Tag Input Component ──────────────────────────────────────────────────────

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");

  const commitTag = (val: string) => {
    const trimmed = val.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.endsWith(",")) {
      commitTag(val.slice(0, -1));
    } else {
      setInput(val);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-sm border border-slate-200 bg-slate-50 focus-within:ring-1 focus-within:ring-[#2383e2] focus-within:border-[#2383e2] transition min-h-[38px]">
      {tags.map(tag => (
        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold border border-violet-200 uppercase tracking-wide">
          {tag}
          <button type="button" onClick={() => onChange(tags.filter(t => t !== tag))} className="text-violet-400 hover:text-red-500 transition-colors">
            <X size={9} />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Add tags (Enter or comma)…" : ""}
        className="flex-1 min-w-[120px] bg-transparent text-[12px] text-slate-700 placeholder-slate-300 focus:outline-none"
      />
    </div>
  );
}

// ─── Card Detail Panel ────────────────────────────────────────────────────────

function CardDetailPanel({ card, isNew, columnId, columns, onSave, onDelete, onClose, onMarkComplete, onUndoComplete }: {
  card: CardItem | null; isNew: boolean; columnId: string; columns: ColumnData[];
  onSave: (colId: string, card: CardItem) => void;
  onDelete: (colId: string, cardId: string) => void;
  onClose: () => void;
  onMarkComplete: (colId: string, card: CardItem) => void;
  onUndoComplete: (card: CardItem) => void;
}) {
  const [viewMode, setViewMode] = useState(!isNew); // view mode by default for existing cards
  const [title, setTitle]             = useState(card?.title ?? "");
  const [description, setDescription] = useState(card?.description ?? "");
  const [notes, setNotes]             = useState(card?.notes ?? "");
  const [priority, setPriority]       = useState<Priority>(card?.priority ?? "None");
  const [deadline, setDeadline]       = useState(card?.deadline ?? "");
  const [links, setLinks]             = useState<LinkItem[]>(card?.links ?? []);
  const [comments, setComments]       = useState<CommentItem[]>(card?.comments ?? []);
  const [selectedCol, setSelectedCol] = useState(columnId);
  const [calOpen, setCalOpen]         = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab]     = useState<"details"|"links">("details");
  const [tags, setTags]               = useState<string[]>(card?.tags ?? []);
  const [commentText, setCommentText] = useState("");
  const [completeConfirm, setCompleteConfirm] = useState(false);
  const [undoConfirm, setUndoConfirm] = useState(false);

  const isCompleted = card?.completed ?? false;
  const selectedDate = deadline && isValid(parseISO(deadline)) ? parseISO(deadline) : undefined;
  const ds = getDeadlineStatus(deadline);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(selectedCol, {
      id: card?.id ?? uid(), title: title.trim(), description, notes,
      priority, deadline, links, comments, tags, completed: isCompleted
    });
  };

  const handleComplete = () => {
    if (!title.trim()) return;
    const updatedCard: CardItem = {
      id: card?.id ?? uid(), title: title.trim(), description, notes,
      priority, deadline, links, comments, tags, completed: true
    };
    onMarkComplete(columnId, updatedCard);
    onClose();
  };

  const handleUndoComplete = () => {
    if (!card) return;
    onUndoComplete({ ...card, completed: false });
    onClose();
  };

  const addLink    = () => setLinks(p => [...p, { id: uid(), title: "", url: "" }]);
  const updateLink = (id: string, f: "title"|"url", v: string) => setLinks(p => p.map(l => l.id===id ? {...l,[f]:v} : l));
  const removeLink = (id: string) => setLinks(p => p.filter(l => l.id!==id));

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments(p => [...p, { id: uid(), text: commentText.trim(), timestamp: new Date().toISOString() }]);
    setCommentText("");
  };

  const colForCard = columns.find(c => c.id === columnId);
  const colIdx = columns.findIndex(c => c.id === columnId);
  const accent = getColAccent(colIdx);

  return (
    <motion.div className="fixed inset-0 z-50 flex" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      <div className="flex-1 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        className="w-full sm:max-w-[420px] h-full bg-white flex flex-col border-l border-slate-200 shadow-2xl"
        initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
        transition={{ type:"spring", stiffness:400, damping:36 }}
        style={{ scrollbarWidth: "none" }}
      >
        {/* Top bar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-white">
          <button onClick={onClose} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors px-2 py-1 rounded-sm hover:bg-slate-100">
            <ArrowLeft size={12} /> Back
          </button>
          <div className="flex-1" />

          {/* Status pill */}
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white" style={{ backgroundColor: accent }}>
            {colForCard?.title ?? ""}
          </span>

          <div className="flex items-center gap-1">
            {/* View / Edit toggle for existing cards */}
            {!isNew && (
              <button
                onClick={() => setViewMode(v => !v)}
                className={`p-1.5 rounded-sm transition-colors ${viewMode ? "text-slate-400 hover:text-[#2383e2] hover:bg-blue-50" : "text-[#2383e2] bg-blue-50"}`}
                title={viewMode ? "Edit card" : "View mode"}
              >
                {viewMode ? <Edit3 size={12} /> : <Eye size={12} />}
              </button>
            )}
            {!isNew && (
              deleteConfirm ? (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-red-500 font-semibold">Delete?</span>
                  <button onClick={() => { onDelete(columnId, card!.id); onClose(); }}
                    className="px-2 py-0.5 rounded-sm bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors">Yes</button>
                  <button onClick={() => setDeleteConfirm(false)}
                    className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600 text-[10px] font-bold hover:bg-slate-200 transition-colors">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(true)}
                  className="p-1.5 rounded-sm text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={12} />
                </button>
              )
            )}
            <button onClick={onClose} className="p-1.5 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 flex border-b border-slate-100 px-4 bg-white">
          {(["details","links"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide capitalize transition-colors border-b-2 -mb-px
                ${activeTab===tab ? "border-[#2383e2] text-[#2383e2]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
              {tab}
              {tab === "links" && links.length > 0 && (
                <span className="ml-1.5 text-[9px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full font-black">{links.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {activeTab === "details" && (
            <div className="px-5 py-5 space-y-5">

              {/* Completed banner */}
              {isCompleted && (
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Completed</p>
                  </div>
                  {undoConfirm ? (
                    <div className="flex items-center gap-1">
                      <button onClick={handleUndoComplete}
                        className="px-2 py-0.5 rounded-sm bg-amber-500 text-white text-[10px] font-bold hover:bg-amber-600 transition-colors">Undo</button>
                      <button onClick={() => setUndoConfirm(false)}
                        className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600 text-[10px] font-bold hover:bg-slate-200 transition-colors">Keep</button>
                    </div>
                  ) : (
                    <button onClick={() => setUndoConfirm(true)}
                      className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-amber-600 transition-colors px-2 py-1 rounded-sm hover:bg-amber-50">
                      <RotateCcw size={10} /> Undo
                    </button>
                  )}
                </div>
              )}

              {/* VIEW MODE */}
              {viewMode && !isNew ? (
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <h2 className={`text-[18px] font-black leading-tight text-slate-900 ${isCompleted ? "line-through text-slate-400" : ""}`}>
                      {title || <span className="text-slate-300 italic font-normal">Untitled</span>}
                    </h2>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-slate-50 border border-slate-200">
                      <PriorityFlag priority={priority} size={11} />
                      <span className="text-[11px] font-semibold text-slate-600">{PRIORITY_CONFIG[priority].label}</span>
                    </div>
                    {deadline && ds && (
                      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[11px] font-semibold ${ds.overdue ? "bg-red-50 border-red-200 text-red-600" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                        {ds.icon} {ds.date}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold border border-violet-200 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {description && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</p>
                      <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap">{description}</p>
                    </div>
                  )}

                  {/* Notes */}
                  {notes && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><FileText size={9} /> Notes</p>
                      <p className="text-[13px] text-slate-500 leading-relaxed whitespace-pre-wrap bg-slate-50 border border-slate-200 rounded-sm px-3 py-2.5">{notes}</p>
                    </div>
                  )}

                  {/* Comments */}
                  {comments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MessageSquare size={9} /> Comments ({comments.length})</p>
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-2 items-start">
                          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                            <User size={11} className="text-violet-600" />
                          </div>
                          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-sm p-2.5">
                            <p className="text-[12px] text-slate-700 whitespace-pre-wrap">{comment.text}</p>
                            <span className="text-[9px] text-slate-400 mt-1 block">
                              {comment.timestamp && isValid(parseISO(comment.timestamp))
                                ? format(parseISO(comment.timestamp), "MMM d, h:mm a") : "Just now"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button onClick={() => setViewMode(false)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-sm border border-dashed border-slate-200 text-[11px] font-bold text-slate-400 hover:text-[#2383e2] hover:border-[#2383e2] hover:bg-blue-50 transition-colors uppercase tracking-wide">
                    <Edit3 size={11} /> Edit this card
                  </button>
                </div>
              ) : (
                /* EDIT MODE */
                <div className="space-y-5">
                  {/* ID + status selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">
                      #{card?.id?.slice(0,6).toUpperCase() ?? "NEW"}
                    </span>
                    <select value={selectedCol} onChange={e => setSelectedCol(e.target.value)}
                      className="text-[11px] font-semibold bg-slate-100 border border-slate-200 rounded-sm px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#2383e2] cursor-pointer">
                      {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>

                  {/* Title */}
                  <input autoFocus={isNew} value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Task title…"
                    className="w-full text-[17px] font-black text-slate-900 bg-transparent border-0 border-b-2 border-slate-100 focus:border-[#2383e2] focus:outline-none pb-2 placeholder-slate-300 transition-colors leading-tight" />

                  {/* Priority + Deadline */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Priority</p>
                      <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-2 w-full px-3 py-1.5 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                            <PriorityFlag priority={priority} size={11} />
                            <span className="text-slate-700 text-[12px] font-semibold">{PRIORITY_CONFIG[priority].label}</span>
                            <ChevronDown size={10} className="ml-auto text-slate-400" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-1 rounded-sm z-[200]" align="start">
                          {(["High","Medium","Low","None"] as Priority[]).map(p => (
                            <button key={p} onClick={() => { setPriority(p); setPriorityOpen(false); }}
                              className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-sm text-[11px] font-medium hover:bg-slate-50 transition-colors ${priority===p ? "bg-slate-100" : ""}`}>
                              <PriorityFlag priority={p} size={11} />
                              <span className="text-slate-700">{PRIORITY_CONFIG[p].label}</span>
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deadline</p>
                      <Popover open={calOpen} onOpenChange={setCalOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline"
                            className="w-full justify-start font-normal text-[12px] rounded-sm border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 h-auto">
                            <CalendarIcon size={11} className="mr-1.5 text-slate-400 shrink-0" />
                            <span className={deadline ? "text-slate-700" : "text-slate-400"}>
                              {selectedDate ? format(selectedDate,"MMM d, yyyy") : "Pick date"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 z-[200]" align="start">
                          <Calendar mode="single" selected={selectedDate}
                            onSelect={d => { setDeadline(d ? format(d,"yyyy-MM-dd") : ""); setCalOpen(false); }} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                      placeholder="What needs to be done?" rows={3}
                      className="w-full px-3 py-2 rounded-sm border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-300 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2383e2] transition resize-none leading-relaxed" />
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <FileText size={9} /> Notes
                    </p>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)}
                      placeholder="Extended context, sub-tasks…" rows={3}
                      className="w-full px-3 py-2 rounded-sm border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-300 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2383e2] transition resize-none" />
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                      <Tag size={9} /> Tags
                    </p>
                    <TagInput tags={tags} onChange={setTags} />
                  </div>

                  {/* Comments */}
                  <div>
                    <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      <MessageSquare size={9} /> Comments
                    </p>
                    {comments.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {comments.map(comment => (
                          <div key={comment.id} className="flex gap-2 items-start group">
                            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                              <User size={11} className="text-violet-600" />
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-sm p-2.5 shadow-sm">
                              <p className="text-[12px] text-slate-700 whitespace-pre-wrap">{comment.text}</p>
                              <span className="text-[9px] text-slate-400 mt-1.5 block">
                                {comment.timestamp && isValid(parseISO(comment.timestamp))
                                  ? format(parseISO(comment.timestamp), "MMM d, h:mm a") : "Just now"}
                              </span>
                            </div>
                            <button onClick={() => setComments(p => p.filter(c => c.id !== comment.id))}
                              className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-[#2383e2]">
                        <User size={11} className="text-[#2383e2]" />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
                          placeholder="Add a comment…" rows={2}
                          className="w-full px-3 py-2 rounded-sm border border-slate-200 bg-slate-50 text-[12px] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-[#2383e2] transition resize-none" />
                        <button onClick={addComment} disabled={!commentText.trim()}
                          className="self-end px-3 py-1 bg-[#2383e2] text-white text-[10px] font-bold rounded-sm hover:bg-[#1a6bc2] disabled:opacity-50 transition-colors cursor-pointer">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "links" && (
            <div className="px-5 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Links & Files</p>
                <button onClick={addLink} className="flex items-center gap-1 text-[11px] font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                  <Plus size={11} /> Add
                </button>
              </div>
              <AnimatePresence>
                {links.map(link => (
                  <motion.div key={link.id} initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }} exit={{ opacity:0,height:0 }} className="mb-2">
                    <div className="flex items-center gap-2 p-2.5 rounded-sm border border-slate-200 bg-slate-50 group hover:border-slate-300 transition-colors">
                      <ExternalLink size={11} className="text-slate-400 shrink-0" />
                      <input value={link.title} onChange={e => updateLink(link.id,"title",e.target.value)}
                        placeholder="Label" className="flex-1 min-w-0 bg-transparent text-[12px] text-slate-700 placeholder-slate-300 focus:outline-none" />
                      <input value={link.url} onChange={e => updateLink(link.id,"url",e.target.value)}
                        placeholder="https://…" className="flex-[2] min-w-0 bg-transparent text-[12px] text-slate-500 placeholder-slate-300 focus:outline-none" />
                      <button onClick={() => removeLink(link.id)} className="text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                        <X size={11} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {links.length === 0 && (
                <div className="flex flex-col items-center py-12 text-slate-300">
                  <Link2 size={24} className="mb-2" />
                  <p className="text-[12px]">No links yet</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 px-5 py-3 flex flex-wrap items-center justify-between gap-2 bg-slate-50">
          {!isNew && !isCompleted && (
            completeConfirm ? (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-600 font-semibold">Mark complete?</span>
                <button onClick={handleComplete}
                  className="px-2 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 transition-colors">Yes</button>
                <button onClick={() => setCompleteConfirm(false)}
                  className="px-2 py-1 rounded-sm bg-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-300 transition-colors">No</button>
              </div>
            ) : (
              <button onClick={() => setCompleteConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
                <CheckCircle2 size={12} /> Mark Complete
              </button>
            )
          )}
          {(isNew || isCompleted) && <div />}

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="px-3 py-1.5 rounded-sm text-[12px] font-semibold text-slate-500 hover:bg-slate-200 transition-colors">Cancel</button>
            {(!viewMode || isNew) && (
              <button onClick={handleSave} disabled={!title.trim()}
                className="px-4 py-1.5 rounded-sm text-[12px] font-bold bg-[#2383e2] text-white hover:bg-[#1a6bc2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
                {isNew ? "Create Task" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Kanban Card ──────────────────────────────────────────────────────────────

function KanbanCard({ card, index, colIndex, searchQuery, isSearchActive, onClick }: {
  card: CardItem; index: number; colIndex: number;
  searchQuery: string; isSearchActive: boolean; onClick: () => void;
}) {
  const ds      = getDeadlineStatus(card.deadline);
  const q       = searchQuery.toLowerCase();
  const matches = !isSearchActive ||
    card.title.toLowerCase().includes(q) ||
    card.description.toLowerCase().includes(q) ||
    (card.tags ?? []).some(t => t.toLowerCase().includes(q));
  const accent = getColAccent(colIndex);

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isSearchActive}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          style={{
            ...provided.draggableProps.style,
            display: matches ? undefined : "none",
            borderRadius: "4px",
            borderLeft: `3px solid ${accent}`,
            borderTop: "1px solid #e2e8f0",
            borderRight: "1px solid #e2e8f0",
            borderBottom: "1px solid #e2e8f0",
            transform: snapshot.isDragging ? `${provided.draggableProps.style?.transform} rotate(0.5deg)` : provided.draggableProps.style?.transform,
          }}
          className={`bg-white cursor-pointer select-none transition-all duration-100 relative overflow-hidden
            ${snapshot.isDragging ? "shadow-xl" : "hover:shadow-md hover:border-slate-300"}
            ${card.completed ? "opacity-90" : ""}`}
        >
          {/* Improved COMPLETED stamp */}
          {card.completed && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
              <div style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(16,185,129,0.04) 18px, rgba(16,185,129,0.04) 20px)",
              }} />
              <span style={{
                transform: "rotate(-28deg)",
                fontSize: "13px",
                fontWeight: 900,
                letterSpacing: "0.35em",
                whiteSpace: "nowrap",
                color: "#10b981",
                opacity: 0.18,
                userSelect: "none",
                textTransform: "uppercase",
                fontFamily: "monospace",
                border: "2.5px solid #10b981",
                padding: "2px 10px",
                borderRadius: "2px",
              }}>
                ✓ DONE
              </span>
            </div>
          )}

          <div className="p-3">
            {(card.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {card.tags!.slice(0,3).map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200 uppercase tracking-wide">{tag}</span>
                ))}
              </div>
            )}
            <div className="flex items-start gap-1.5">
              {card.completed && <CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />}
              <p className={`text-[13px] font-semibold leading-snug mb-1.5 ${card.completed ? "line-through text-slate-400" : "text-slate-800"}`}>
                {card.title}
              </p>
            </div>
            {card.description && (
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2">{card.description}</p>
            )}
            <div className="flex items-center justify-between gap-1 pt-2 mt-1 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {ds && (
                  <span className={`flex items-center gap-1 text-[10px] font-semibold ${ds.color}`}>
                    {ds.icon}{ds.date}
                  </span>
                )}
                <div className="flex items-center gap-2 text-slate-400">
                  {(card.comments?.length ?? 0) > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px]">
                      <MessageSquare size={10} />{card.comments!.length}
                    </span>
                  )}
                  {(card.links?.length ?? 0) > 0 && (
                    <span className="flex items-center gap-0.5 text-[10px]">
                      <Paperclip size={10} />{card.links!.length}
                    </span>
                  )}
                </div>
              </div>
              <PriorityFlag priority={card.priority} size={11} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// ─── Kanban Column ────────────────────────────────────────────────────────────

function KanbanColumn({ column, colIndex, index, searchQuery, isSearchActive, sortMode, onAddCard, onEditCard, onDeleteColumn, onRenameColumn }: {
  column: ColumnData; colIndex: number; index: number;
  searchQuery: string; isSearchActive: boolean; sortMode: SortMode;
  onAddCard: (id: string) => void; onEditCard: (id: string, c: CardItem) => void;
  onDeleteColumn: (id: string) => void; onRenameColumn: (id: string, t: string) => void;
}) {
  const [hovered, setHovered]               = useState(false);
  const [deleteConfirm, setDeleteConfirm]   = useState(false);
  const [editingTitle, setEditingTitle]     = useState(false);
  const [titleVal, setTitleVal]             = useState(column.title);
  const accent = getColAccent(colIndex);

  const commitTitle = () => {
    setEditingTitle(false);
    if (titleVal.trim()) onRenameColumn(column.id, titleVal.trim());
    else setTitleVal(column.title);
  };

  const sortedItems = sortCards(column.items, sortMode);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}
          className={`flex flex-col w-[260px] shrink-0 transition-all duration-150 border border-slate-200 bg-slate-50/50 rounded-md p-2 ${snapshot.isDragging ? "opacity-95 rotate-[0.3deg] shadow-lg bg-white" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setDeleteConfirm(false); }}
        >
          {/* Header */}
          <div {...provided.dragHandleProps}
            className="flex items-center gap-2 px-3 py-2 mb-2 bg-white border border-slate-200 rounded-sm cursor-grab active:cursor-grabbing shadow-sm"
            style={{ borderTop: `2px solid ${accent}` }}
          >
            {editingTitle ? (
              <input autoFocus value={titleVal} onChange={e => setTitleVal(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={e => { if (e.key==="Enter") commitTitle(); if (e.key==="Escape") { setTitleVal(column.title); setEditingTitle(false); } }}
                onClick={e => e.stopPropagation()}
                className="flex-1 min-w-0 bg-transparent text-[12px] font-bold text-slate-800 focus:outline-none" />
            ) : (
              <span className="text-[12px] font-bold text-slate-700 flex-1 truncate cursor-text uppercase tracking-wide"
                onDoubleClick={() => setEditingTitle(true)}>
                {column.title}
              </span>
            )}
            <span className="text-[10px] font-bold text-white shrink-0 px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: accent }}>
              {column.items.length}
            </span>
            <AnimatePresence>
              {hovered && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                  <button onClick={() => onAddCard(column.id)} className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                    <Plus size={12} />
                  </button>
                  {deleteConfirm ? (
                    <>
                      <button onClick={() => onDeleteColumn(column.id)} className="px-1.5 py-0.5 rounded-sm bg-red-500 text-white text-[10px] font-bold">Del</button>
                      <button onClick={() => setDeleteConfirm(false)} className="px-1.5 py-0.5 rounded-sm bg-slate-200 text-slate-600 text-[10px] font-bold">No</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteConfirm(true)} className="p-1 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                      <MoreHorizontal size={12} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drop zone */}
          <Droppable droppableId={column.id} type="card">
            {(drop, dropSnap) => (
              <div ref={drop.innerRef} {...drop.droppableProps}
                className={`flex-1 space-y-2 min-h-[60px] p-1 rounded-sm transition-colors duration-100 ${dropSnap.isDraggingOver ? "bg-violet-50" : ""}`}>
                {sortedItems.map((card, i) => (
                  <KanbanCard key={card.id} card={card} index={i} colIndex={colIndex}
                    searchQuery={searchQuery} isSearchActive={isSearchActive}
                    onClick={() => onEditCard(column.id, card)} />
                ))}
                {drop.placeholder}
              </div>
            )}
          </Droppable>

          {/* Add task */}
          <button onClick={() => onAddCard(column.id)}
            className="flex items-center gap-1.5 mt-2 px-3 py-2 rounded-sm text-[11px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-dashed border-slate-200 hover:border-slate-300 transition-all uppercase tracking-wide">
            <Plus size={11} /> Add task
          </button>
        </div>
      )}
    </Draggable>
  );
}

// ─── List View ────────────────────────────────────────────────────────────────

function ListView({ columns, onEditCard, onAddCard, searchQuery, sortMode }: {
  columns: ColumnData[]; onEditCard: (id: string, c: CardItem) => void; onAddCard: (id: string) => void;
  searchQuery: string; sortMode: SortMode;
}) {
  const [expanded, setExpanded] = useState<Record<string,boolean>>(Object.fromEntries(columns.map(c => [c.id, true])));
  const q = searchQuery.toLowerCase();

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-5 py-4 space-y-1.5" style={{ scrollbarWidth: "none" }}>
      {columns.map((col, ci) => {
        const accent = getColAccent(ci);
        const isOpen = expanded[col.id] !== false;
        const sortedItems = sortCards(col.items, sortMode);
        const filteredItems = q ? sortedItems.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.tags ?? []).some(t => t.toLowerCase().includes(q))
        ) : sortedItems;

        return (
          <div key={col.id} className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            <button onClick={() => setExpanded(p => ({ ...p, [col.id]: !isOpen }))}
              className="w-full flex items-center gap-2.5 px-3 sm:px-4 py-2.5 hover:bg-slate-50 transition-colors border-l-2"
              style={{ borderLeftColor: accent }}>
              <span className="text-[11px] font-bold text-slate-700 flex-1 text-left uppercase tracking-wide">{col.title}</span>
              <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: accent }}>
                {col.items.length}
              </span>
              <ChevronRight size={12} className={`text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ height:0 }} animate={{ height:"auto" }} exit={{ height:0 }} className="overflow-hidden">
                  {filteredItems.length > 0 && (
                    <div className="hidden sm:grid sm:grid-cols-[1fr_100px_80px_90px] gap-3 px-4 py-1.5 border-t border-slate-100 bg-slate-50">
                      {["Task","Deadline","Priority","Status"].map(h => (
                        <span key={h} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                      ))}
                    </div>
                  )}
                  {filteredItems.length > 0 && (
                    <div className="sm:hidden grid grid-cols-[1fr_auto] gap-2 px-3 py-1.5 border-t border-slate-100 bg-slate-50">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Task</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Due</span>
                    </div>
                  )}
                  {filteredItems.map(card => {
                    const ds = getDeadlineStatus(card.deadline);
                    return (
                      <div key={card.id} onClick={() => onEditCard(col.id, card)}
                        className="relative overflow-hidden border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                        {card.completed && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.25em] select-none"
                              style={{ transform: "rotate(-8deg)", opacity: 0.15, whiteSpace: "nowrap", color: "#10b981", fontWeight: 900 }}>
                              ✓ DONE ✓ DONE ✓ DONE ✓ DONE
                            </span>
                          </div>
                        )}
                        <div className="hidden sm:grid sm:grid-cols-[1fr_100px_80px_90px] gap-3 px-4 py-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            {card.completed
                              ? <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                              : <Circle size={11} className="text-slate-300 shrink-0 group-hover:text-violet-400 transition-colors" />
                            }
                            <div className="min-w-0">
                              <span className={`block text-[12px] font-semibold truncate ${card.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{card.title}</span>
                              {(card.tags?.length ?? 0) > 0 && (
                                <div className="flex gap-1 mt-0.5 flex-wrap">
                                  {card.tags!.slice(0,2).map(t => (
                                    <span key={t} className="text-[8px] font-bold px-1 py-0.5 rounded-full bg-violet-50 text-violet-500 border border-violet-100 uppercase">{t}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {ds && card.deadline
                              ? <span className={`flex items-center gap-1 text-[10px] font-semibold ${ds.color}`}>{ds.icon}{ds.date}</span>
                              : <span className="text-[10px] text-slate-300">—</span>}
                          </div>
                          <div className="flex items-center gap-1">
                            <PriorityFlag priority={card.priority} size={10} />
                            <span className="text-[10px] text-slate-500">{PRIORITY_CONFIG[card.priority].label}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm text-white truncate uppercase tracking-wide"
                              style={{ backgroundColor: accent }}>{col.title}</span>
                          </div>
                        </div>
                        <div className="sm:hidden grid grid-cols-[1fr_auto] gap-2 px-3 py-2.5 items-center">
                          <div className="flex items-center gap-2 min-w-0">
                            {card.completed
                              ? <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                              : <Circle size={11} className="text-slate-300 shrink-0 group-hover:text-violet-400 transition-colors" />
                            }
                            <div className="min-w-0">
                              <span className={`block text-[12px] font-semibold truncate ${card.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{card.title}</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <PriorityFlag priority={card.priority} size={9} />
                                <span className="text-[9px] font-bold px-1 py-0.5 rounded-sm text-white uppercase" style={{ backgroundColor: accent }}>{col.title}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center shrink-0">
                            {ds && card.deadline
                              ? <span className={`flex items-center gap-1 text-[10px] font-semibold ${ds.color}`}>{ds.icon}{ds.date}</span>
                              : <span className="text-[10px] text-slate-300">—</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={() => onAddCard(col.id)}
                    className="w-full flex items-center gap-1.5 px-3 sm:px-4 py-2 border-t border-slate-100 text-[11px] font-semibold text-slate-400 hover:text-violet-600 hover:bg-violet-50/30 transition-colors uppercase tracking-wide">
                    <Plus size={11} /> Add task
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Gantt / Calendar View ────────────────────────────────────────────────────

function GanttView({ columns, onEditCard }: { columns: ColumnData[]; onEditCard: (id: string, c: CardItem) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [ganttTab, setGanttTab] = useState<"calendar" | "timeline">("calendar");

  const allCards = columns.flatMap((col, ci) => col.items.map(card => ({ card, col, ci })));

  // ── Calendar Sub-view ──
  const CalendarView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd   = endOfMonth(currentMonth);
    const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 0 });

    const getCardsForDay = (day: Date) => allCards.filter(({ card }) => {
      if (!card.deadline) return false;
      const dl = parseISO(card.deadline);
      return isValid(dl) && isSameDay(dl, day);
    });

    return (
      <div className="flex-1 overflow-y-auto px-2 sm:px-5 py-4" style={{ scrollbarWidth: "none" }}>
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4 bg-white border border-slate-200 rounded-sm px-4 py-2.5">
          <button onClick={() => setCurrentMonth(m => subMonths(m, 1))}
            className="p-1.5 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ChevronDown size={14} className="rotate-90" />
          </button>
          <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button onClick={() => setCurrentMonth(m => addMonths(m, 1))}
            className="p-1.5 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ChevronDown size={14} className="-rotate-90" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
          {/* Day names */}
          <div className="grid grid-cols-7 border-b border-slate-200">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="text-center py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-r last:border-r-0 border-slate-100">
                {d}
              </div>
            ))}
          </div>

          {weeks.map((weekStart, wi) => {
            const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart, { weekStartsOn: 0 }) });
            return (
              <div key={wi} className="grid grid-cols-7 border-b last:border-b-0 border-slate-100">
                {weekDays.map((day, di) => {
                  const inMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());
                  const dayCards = getCardsForDay(day);

                  return (
                    <div key={di}
                      className={`min-h-[80px] sm:min-h-[100px] p-1.5 border-r last:border-r-0 border-slate-100 relative
                        ${!inMonth ? "bg-slate-50/50" : "bg-white"}
                        ${isToday ? "bg-blue-50" : ""}`}
                    >
                      {/* Day number */}
                      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-black mb-1 leading-none
                        ${isToday ? "bg-[#2383e2] text-white" : inMonth ? "text-slate-700" : "text-slate-300"}`}>
                        {format(day, "d")}
                      </div>

                      {/* Task pills */}
                      <div className="space-y-0.5">
                        {dayCards.slice(0, 3).map(({ card, col, ci }) => {
                          const acc = getColAccent(ci);
                          return (
                            <button key={card.id} onClick={() => onEditCard(col.id, card)}
                              className="w-full text-left px-1.5 py-0.5 rounded-sm text-[9px] font-bold text-white truncate transition-opacity hover:opacity-80"
                              style={{ backgroundColor: card.completed ? "#10b981" : acc }}>
                              {card.completed && "✓ "}{card.title}
                            </button>
                          );
                        })}
                        {dayCards.length > 3 && (
                          <div className="text-[9px] text-slate-400 font-bold px-1">+{dayCards.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* All tasks for month */}
        <div className="mt-4 space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2">
            All deadlines in {format(currentMonth, "MMMM")}
          </p>
          {allCards
            .filter(({ card }) => {
              if (!card.deadline) return false;
              const dl = parseISO(card.deadline);
              return isValid(dl) && getMonth(dl) === getMonth(currentMonth) && getYear(dl) === getYear(currentMonth);
            })
            .sort((a, b) => new Date(a.card.deadline).getTime() - new Date(b.card.deadline).getTime())
            .map(({ card, col, ci }) => {
              const acc = getColAccent(ci);
              const ds = getDeadlineStatus(card.deadline);
              return (
                <div key={card.id} onClick={() => onEditCard(col.id, card)}
                  className="flex items-center gap-3 px-3 py-2 bg-white border border-slate-200 rounded-sm hover:bg-slate-50 cursor-pointer transition-colors group">
                  <div className="w-1.5 h-8 rounded-full shrink-0" style={{ backgroundColor: card.completed ? "#10b981" : acc }} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-[12px] font-semibold truncate ${card.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{card.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] font-bold text-white px-1.5 py-0.5 rounded-sm uppercase" style={{ backgroundColor: acc }}>{col.title}</span>
                      <PriorityFlag priority={card.priority} size={9} />
                    </div>
                  </div>
                  {ds && <span className={`flex items-center gap-1 text-[10px] font-semibold ${ds.color} shrink-0`}>{ds.icon}{ds.date}</span>}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  // ── Timeline Sub-view ──
  const TimelineView = () => {
    const today = new Date();
    const start = addDays(today, -5);
    const end   = addDays(today, 28);
    const days  = eachDayOfInterval({ start, end });
    const containerRef = useRef<HTMLDivElement>(null);
    const [dayWidth, setDayWidth] = useState(32);

    useEffect(() => {
      const update = () => {
        if (containerRef.current) {
          const w = containerRef.current.clientWidth;
          setDayWidth(w < 480 ? 22 : w < 768 ? 26 : 32);
        }
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    const TASK_COL_W = dayWidth < 26 ? 110 : 176;
    const withDL = allCards.filter(({ card }) => card.deadline && isValid(parseISO(card.deadline)));

    return (
      <div className="flex-1 overflow-auto px-2 sm:px-5 py-4" ref={containerRef} style={{ scrollbarWidth: "none" }}>
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden" style={{ minWidth: TASK_COL_W + days.length * dayWidth }}>
          {/* Header */}
          <div className="flex border-b border-slate-200 sticky top-0 bg-white z-10">
            <div className="shrink-0 px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-200"
              style={{ width: TASK_COL_W }}>Task</div>
            <div className="flex overflow-hidden">
              {days.map(d => (
                <div key={d.toISOString()} style={{ minWidth: dayWidth, width: dayWidth }}
                  className={`text-center py-2 border-r border-slate-100 ${isSameDay(d, today) ? "bg-violet-50" : ""}`}>
                  <div className={`text-[10px] font-bold leading-none ${isSameDay(d, today) ? "text-violet-600" : "text-slate-400"}`}>{format(d,"d")}</div>
                  {(dayWidth >= 26 || d.getDate() % 7 === 1) && (
                    <div className="text-[8px] text-slate-300 uppercase leading-none mt-0.5">{format(d,"MMM")}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {withDL.length === 0 && (
            <div className="flex flex-col items-center py-14 text-slate-300">
              <GanttChartSquare size={24} className="mb-2" />
              <p className="text-[12px]">No tasks with deadlines</p>
            </div>
          )}

          {withDL.map(({ card, col, ci }) => {
            const dl     = parseISO(card.deadline);
            const offset = Math.max(0, differenceInDays(dl, start));
            const barW   = dayWidth < 26 ? 44 : 68;
            const accent = getColAccent(ci);
            return (
              <div key={card.id} onClick={() => onEditCard(col.id, card)}
                className="flex border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="shrink-0 px-2 sm:px-3 py-2.5 border-r border-slate-200 flex items-center gap-1.5 min-w-0"
                  style={{ width: TASK_COL_W }}>
                  {card.completed
                    ? <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                    : <PriorityFlag priority={card.priority} size={10} />}
                  <span className={`text-[11px] font-semibold truncate ${card.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{card.title}</span>
                </div>
                <div className="relative flex items-center" style={{ width: days.length * dayWidth, minWidth: days.length * dayWidth }}>
                  <div className="absolute top-0 bottom-0 w-px bg-violet-200"
                    style={{ left: differenceInDays(today, start) * dayWidth + dayWidth/2 }} />
                  <div className={`absolute h-5 rounded-sm flex items-center px-1.5 text-[9px] font-bold text-white truncate ${card.completed ? "opacity-60" : ""}`}
                    style={{
                      left: Math.max(0, offset * dayWidth - barW + dayWidth/2),
                      width: barW,
                      backgroundColor: card.completed ? "#10b981" : accent,
                    }}>
                    {dayWidth >= 26 ? format(dl,"MMM d") : format(dl,"d")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Sub-tabs */}
      <div className="shrink-0 flex items-center gap-0 px-5 pt-3 border-b border-slate-100">
        {([
          { key: "calendar", label: "Calendar", icon: <CalendarIcon size={11} /> },
          { key: "timeline", label: "Timeline", icon: <GanttChartSquare size={11} /> },
        ] as { key: "calendar"|"timeline"; label: string; icon: React.ReactNode }[]).map(t => (
          <button key={t.key} onClick={() => setGanttTab(t.key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wide border-b-2 -mb-px transition-colors
              ${ganttTab === t.key ? "border-[#2383e2] text-[#2383e2]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {ganttTab === "calendar" ? <CalendarView /> : <TimelineView />}
    </div>
  );
}

// ─── Main Board ───────────────────────────────────────────────────────────────

export default function KanbanBoard() {
  const [columns, setColumns]       = useState<ColumnData[]>(INITIAL_STATE);
  const [isMounted, setIsMounted]   = useState(false);
  const [isInit, setIsInit]         = useState(false);
  const [searchQuery, setSearch]    = useState("");
  const [viewMode, setViewMode]     = useState<ViewMode>("board");
  const [sortMode, setSortMode]     = useState<SortMode>("none");
  const [sortOpen, setSortOpen]     = useState(false);
  const [modal, setModal]           = useState<{ card: CardItem|null; isNew: boolean; columnId: string }|null>(null);
  const isDraggingRef               = useRef(false);

  // Load from API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/tasks");
        const data = await res.json();
        if (data.success && data.columns) setColumns(data.columns);
      } catch (e) {
        console.error("Failed to load tasks", e);
      } finally {
        setIsInit(true);
        setIsMounted(true);
      }
    })();
  }, []);

  // Auto-move overdue cards to Backlog (not completed, not already in Backlog)
  useEffect(() => {
    if (!isInit) return;
    const today = new Date();
    today.setHours(0,0,0,0);

    setColumns(prev => {
      const backlog = prev.find(c => c.title.toLowerCase() === "backlog");
      if (!backlog) return prev;

      let changed = false;
      const overdue: CardItem[] = [];
      const next = prev.map(col => {
        if (col.id === backlog.id) return col;
        const kept: CardItem[] = [];
        for (const card of col.items) {
          if (card.completed) { kept.push(card); continue; }
          if (!card.deadline) { kept.push(card); continue; }
          const dl = parseISO(card.deadline);
          if (isValid(dl) && dl < today) {
            overdue.push(card);
            changed = true;
          } else {
            kept.push(card);
          }
        }
        return kept.length !== col.items.length ? { ...col, items: kept } : col;
      });

      if (!changed) return prev;

      return next.map(col => {
        if (col.id !== backlog.id) return col;
        const existingIds = new Set(col.items.map(i => i.id));
        const toAdd = overdue.filter(c => !existingIds.has(c.id));
        return { ...col, items: [...col.items, ...toAdd] };
      });
    });
  }, [isInit]);

  // Auto-save
  useEffect(() => {
    if (!isInit || !isMounted) return;
    const id = setTimeout(async () => {
      try {
        await fetch("/api/admin/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ columns })
        });
      } catch (e) {
        console.error("Failed to save tasks", e);
      }
    }, 500);
    return () => clearTimeout(id);
  }, [columns, isInit, isMounted]);

  const isSearchActive = searchQuery.trim().length > 0;

  const onDragEnd = useCallback((result: DropResult) => {
    isDraggingRef.current = true;
    setTimeout(() => { isDraggingRef.current = false; }, 120);
    const { source: s, destination: d, type } = result;
    if (!d || (s.droppableId===d.droppableId && s.index===d.index)) return;
    if (type==="board") {
      setColumns(prev => { const n=[...prev]; const [m]=n.splice(s.index,1); n.splice(d.index,0,m); return n; });
    } else {
      setColumns(prev => {
        const n=prev.map(c=>({...c,items:[...c.items]}));
        const src=n.find(c=>c.id===s.droppableId)!;
        const dst=n.find(c=>c.id===d.droppableId)!;
        const [m]=src.items.splice(s.index,1);
        dst.items.splice(d.index,0,m);
        return n;
      });
    }
  }, []);

  const openAdd  = (columnId: string) => setModal({ card: null, isNew: true, columnId });
  const openEdit = (columnId: string, card: CardItem) => {
    if (isDraggingRef.current) return;
    setModal({ card, isNew: false, columnId });
  };

  const handleSave = (targetColId: string, card: CardItem) => {
    const srcId = modal?.columnId;
    setColumns(prev => {
      let n = prev.map(c => ({ ...c, items: [...c.items] }));
      if (!modal?.isNew && srcId && srcId !== targetColId)
        n = n.map(c => c.id===srcId ? {...c, items: c.items.filter(i => i.id!==card.id)} : c);
      n = n.map(c => {
        if (c.id!==targetColId) return c;
        const ex = c.items.find(i => i.id===card.id);
        return { ...c, items: ex ? c.items.map(i => i.id===card.id ? card : i) : [...c.items, card] };
      });
      return n;
    });
    setModal(null);
  };

  const handleMarkComplete = (srcColId: string, card: CardItem) => {
    const completedCard: CardItem = { ...card, completed: true };
    setColumns(prev => {
      const doneCol = prev.find(c => c.title.toLowerCase() === "done") ?? prev[prev.length - 1];
      return prev.map(c => {
        if (c.id === srcColId && c.id !== doneCol.id) return { ...c, items: c.items.filter(i => i.id !== card.id) };
        if (c.id === doneCol.id && c.id !== srcColId) {
          const exists = c.items.some(i => i.id === card.id);
          return { ...c, items: exists ? c.items.map(i => i.id === card.id ? completedCard : i) : [...c.items, completedCard] };
        }
        if (c.id === srcColId && c.id === doneCol.id) return { ...c, items: c.items.map(i => i.id === card.id ? completedCard : i) };
        return c;
      });
    });
  };

  // Undo complete: set completed=false, keep in current column
  const handleUndoComplete = (card: CardItem) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      items: col.items.map(i => i.id === card.id ? { ...card, completed: false } : i)
    })));
  };

  const handleDelete       = (colId: string, cardId: string) => {
    setColumns(prev => prev.map(c => c.id===colId ? {...c,items:c.items.filter(i=>i.id!==cardId)} : c));
    setModal(null);
  };
  const handleDeleteColumn = (id: string) => setColumns(p => p.filter(c => c.id!==id));
  const handleRenameColumn = (id: string, title: string) => setColumns(p => p.map(c => c.id===id ? {...c,title} : c));
  const handleAddColumn    = () => setColumns(p => [...p, { id: uid(), title: "New Status", color: "slate", items: [] }]);

  const sortLabels: Record<SortMode, string> = { none: "Default", priority: "Priority", deadline: "Deadline" };

  if (!isMounted || !isInit) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="w-9 h-9 border-2 border-[#2383e2] border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-slate-400">Loading Boards</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white font-sans" style={{ scrollbarWidth: "none" }}>
      <style>{`
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Header ── */}
      <header className="shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 bg-white border-b border-slate-200 z-30 flex-wrap sm:flex-nowrap">
        {/* View toggles */}
        <div className="flex items-center border border-slate-200 rounded-sm overflow-hidden shrink-0">
          {([
            { mode: "board", icon: <Trello size={12} />,         label: "Board" },
            { mode: "list",  icon: <LayoutList size={12} />,     label: "List"  },
            { mode: "gantt", icon: <GanttChartSquare size={12} />, label: "Gantt" },
          ] as { mode: ViewMode; icon: React.ReactNode; label: string }[]).map(v => (
            <button key={v.mode} onClick={() => setViewMode(v.mode)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all border-r last:border-r-0 border-slate-200 cursor-pointer
                ${viewMode===v.mode ? "bg-[#2383e2] text-white" : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
              {v.icon}
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input value={searchQuery} onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks, tags…"
            className="w-full pl-7 pr-7 py-1.5 rounded-sm border border-slate-200 bg-slate-50 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2383e2] focus:bg-white transition" />
          {searchQuery && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={11} />
            </button>
          )}
        </div>

        {/* Sort */}
        <Popover open={sortOpen} onOpenChange={setSortOpen}>
          <PopoverTrigger asChild>
            <button className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[11px] font-bold uppercase tracking-wide transition-colors shrink-0
              ${sortMode !== "none" ? "bg-[#2383e2] text-white border-[#2383e2]" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"}`}>
              <ArrowUpDown size={11} />
              <span className="hidden sm:inline">{sortLabels[sortMode]}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-1 rounded-sm z-[100]" align="end">
            {(["none","priority","deadline"] as SortMode[]).map(s => (
              <button key={s} onClick={() => { setSortMode(s); setSortOpen(false); }}
                className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-sm text-[11px] font-semibold hover:bg-slate-50 transition-colors capitalize ${sortMode===s ? "bg-slate-100 text-[#2383e2]" : "text-slate-600"}`}>
                {sortLabels[s]}
                {sortMode===s && <span className="ml-auto text-[#2383e2]">✓</span>}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2 shrink-0">
          {isSearchActive && (
            <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-sm border border-amber-200 uppercase tracking-wide hidden sm:block">
              Drag disabled
            </motion.span>
          )}
          <button onClick={handleAddColumn}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-sm bg-[#2383e2] text-white text-[11px] font-bold hover:bg-[#1b6fc5] transition-colors shrink-0 uppercase tracking-wide cursor-pointer">
            <Plus size={12} />
            <span className="hidden sm:inline">Add Status</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      {viewMode === "board" && (
        <div className="flex-1 min-h-0 overflow-auto px-3 sm:px-5 py-4 sm:py-5" style={{ scrollbarWidth: "none" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="board">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}
                  className="flex items-start gap-3 sm:gap-4 w-max min-h-full">
                  {columns.map((col, idx) => (
                    <KanbanColumn key={col.id} column={col} colIndex={idx} index={idx}
                      searchQuery={searchQuery} isSearchActive={isSearchActive} sortMode={sortMode}
                      onAddCard={openAdd} onEditCard={openEdit}
                      onDeleteColumn={handleDeleteColumn} onRenameColumn={handleRenameColumn} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
      {viewMode === "list" && (
        <ListView columns={columns} onEditCard={openEdit} onAddCard={openAdd}
          searchQuery={searchQuery} sortMode={sortMode} />
      )}
      {viewMode === "gantt" && <GanttView columns={columns} onEditCard={openEdit} />}

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {modal && (
          <CardDetailPanel
            key={modal.card?.id ?? "new"}
            card={modal.card} isNew={modal.isNew} columnId={modal.columnId} columns={columns}
            onSave={handleSave} onDelete={handleDelete} onClose={() => setModal(null)}
            onMarkComplete={handleMarkComplete} onUndoComplete={handleUndoComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}