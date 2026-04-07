"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Search, X, Calendar as CalendarIcon, AlertCircle, Clock,
  CheckCircle2, Link2, FileText, ChevronDown, Flag, LayoutList, Trello,
  GanttChartSquare, MoreHorizontal, Paperclip, ChevronRight, Circle,
  ArrowLeft, Bell, Tag, User, MessageSquare, ExternalLink,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  format, differenceInDays, parseISO, isValid,
  addDays, eachDayOfInterval, isSameDay,
} from "date-fns";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "Low" | "Medium" | "High" | "None";
type ViewMode  = "board" | "list" | "gantt";

interface LinkItem { id: string; title: string; url: string; }
interface CommentItem { id: string; text: string; timestamp: string; }
interface CardItem {
  id: string; title: string; description: string; notes: string;
  links: LinkItem[]; comments?: CommentItem[]; priority: Priority; deadline: string; tags?: string[];
}
interface ColumnData { id: string; title: string; color: string; items: CardItem[]; }

// ─── Constants ────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

const PRIORITY_CONFIG: Record<Priority, { fill: string; label: string }> = {
  High:   { fill: "#ef4444", label: "High"   },
  Medium: { fill: "#f59e0b", label: "Medium" },
  Low:    { fill: "#38bdf8", label: "Low"    },
  None:   { fill: "#cbd5e1", label: "None"   },
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
  if (days < 0)  return { color: "text-red-500",   icon: <AlertCircle size={10} />, date: format(parsed,"MMM d") };
  if (days <= 3) return { color: "text-amber-500",  icon: <Clock size={10} />,       date: format(parsed,"MMM d") };
  return              { color: "text-slate-500",   icon: <CalendarIcon size={10} />, date: format(parsed,"MMM d") };
}

const INITIAL_STATE: ColumnData[] = [
  { id: uid(), title: "Backlog",     color: "slate",   items: [] },
  { id: uid(), title: "To Do",       color: "orange",  items: [] },
  { id: uid(), title: "In Progress", color: "blue",    items: [] },
  { id: uid(), title: "For Review",  color: "violet",  items: [] },
  { id: uid(), title: "Done",        color: "emerald", items: [] },
];

// ─── Card Detail Panel ────────────────────────────────────────────────────────

function CardDetailPanel({ card, isNew, columnId, columns, onSave, onDelete, onClose }: {
  card: CardItem | null; isNew: boolean; columnId: string; columns: ColumnData[];
  onSave: (colId: string, card: CardItem) => void;
  onDelete: (colId: string, cardId: string) => void;
  onClose: () => void;
}) {
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
  const [tagInput, setTagInput]       = useState("");
  const [commentText, setCommentText] = useState("");

  const selectedDate = deadline && isValid(parseISO(deadline)) ? parseISO(deadline) : undefined;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(selectedCol, { 
      id: card?.id ?? uid(), title: title.trim(), description, notes, 
      priority, deadline, links, comments, tags 
    });
  };

  const addLink    = () => setLinks(p => [...p, { id: uid(), title: "", url: "" }]);
  const updateLink = (id: string, f: "title"|"url", v: string) => setLinks(p => p.map(l => l.id===id ? {...l,[f]:v} : l));
  const removeLink = (id: string) => setLinks(p => p.filter(l => l.id!==id));
  const addTag     = (e: React.KeyboardEvent) => {
    if (e.key==="Enter" && tagInput.trim()) { setTags(p=>[...p,tagInput.trim().toLowerCase()]); setTagInput(""); }
  };
  const addComment = () => {
    if (!commentText.trim()) return;
    setComments(p => [...p, { id: uid(), text: commentText.trim(), timestamp: new Date().toISOString() }]);
    setCommentText("");
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <motion.div
        className="w-full max-w-[400px] h-full bg-white flex flex-col border-l border-slate-200 shadow-2xl"
        initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
        transition={{ type:"spring", stiffness:400, damping:36 }}
      >
        {/* Top bar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
          <button onClick={onClose} className="flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={12} /> Back
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <button className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
              <Bell size={12} />
            </button>
            {!isNew && (
              deleteConfirm ? (
                <div className="flex items-center gap-1 ml-1">
                  <span className="text-[10px] text-red-500 font-semibold">Delete?</span>
                  <button onClick={() => { onDelete(columnId, card!.id); onClose(); }}
                    className="px-2 py-0.5 rounded-sm bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-colors">Yes</button>
                  <button onClick={() => setDeleteConfirm(false)}
                    className="px-2 py-0.5 rounded-sm bg-slate-200 text-slate-600 text-[10px] font-bold hover:bg-slate-300 transition-colors">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(true)}
                  className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 size={12} />
                </button>
              )
            )}
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors">
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 flex border-b border-slate-200 px-4 bg-white">
          {(["details","links"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-wide capitalize transition-colors border-b-2 -mb-px
                ${activeTab===tab ? "border-[#2383e2] text-[#2383e2]" : "border-transparent text-slate-400 hover:text-slate-600"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "details" && (
            <div className="px-5 py-5 space-y-5">
              {/* ID + status selector */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest">
                  #{card?.id?.slice(0,6).toUpperCase() ?? "NEW"}
                </span>
                <select value={selectedCol} onChange={e => setSelectedCol(e.target.value)}
                  className="text-[11px] font-semibold bg-slate-100 border border-slate-200 rounded-sm px-2 py-1 text-slate-600 focus:outline-none focus:ring-1 focus:ring-
                  [#2383e2] cursor-pointer">
                  {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              {/* Title */}
              <input autoFocus value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Task title…"
                className="w-full text-[16px] font-bold text-slate-900 bg-transparent border-0 border-b-2 border-slate-100 focus:border-[#2383e2] focus:outline-none pb-2 placeholder-slate-300 transition-colors leading-tight" />

              {/* Priority + Deadline */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Priority</p>
                  <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
                    <PopoverTrigger asChild>
                      <button className="flex items-center gap-2 w-full px-3 py-1.5 rounded-sm border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                        <PriorityFlag priority={priority} size={11} />
                        <span className="text-slate-700 text-[12px] font-medium">{PRIORITY_CONFIG[priority].label}</span>
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
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200 uppercase tracking-wide">
                      {tag}
                      <button onClick={() => setTags(p => p.filter(t => t!==tag))} className="text-slate-400 hover:text-red-500 transition-colors ml-0.5">
                        <X size={9} />
                      </button>
                    </span>
                  ))}
                </div>
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}
                  placeholder="Type tag + Enter…"
                  className="w-full px-3 py-1.5 rounded-sm border border-slate-200 bg-slate-50 text-[12px] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-[#2383e2] transition" />
              </div>

              {/* Comments */}
              <div>
                <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  <MessageSquare size={9} /> Comments
                </p>

                {/* Timeline display */}
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
                              ? format(parseISO(comment.timestamp), "MMM d, h:mm a") 
                              : "Just now"}
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

                {/* Comment Input */}
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 border border-[#2383e2] border-0.2">
                    <User size={11} className="text-[#2383e2]  " />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
                      placeholder="Add a comment…" rows={2}
                      className="w-full px-3 py-2 rounded-sm border border-slate-200 bg-slate-50 text-[12px] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-[#2383e2] transition resize-none" />
                    <button onClick={addComment} 
                      disabled={!commentText.trim()}
                      className="self-end px-3 py-1 bg-[#2383e2] text-white text-[10px] font-base rounded-xs hover:bg-[#1a6bc2] disabled:opacity-50 transition-colors cursor-pointer">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
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
        <div className="shrink-0 border-t border-slate-200 px-5 py-3 flex items-center justify-end gap-2 bg-slate-50">
          <button onClick={onClose} className="px-3 py-1.5 rounded-sm text-[12px] font-semibold text-slate-500 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={!title.trim()}
            className="px-4 py-1.5 rounded-xs text-[12px] font-bold bg-[#2383e2] text-white hover:bg-[#1a6bc2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer">
            {isNew ? "Create Task" : "Save Changes"}
          </button>
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
  const matches = !isSearchActive ||
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase());
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
          className={`bg-white cursor-pointer select-none transition-all duration-100
            ${snapshot.isDragging ? "shadow-xl" : "hover:shadow-md hover:border-slate-300"}`}
        >
          <div className="p-3">
            {(card.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {card.tags!.slice(0,2).map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            )}
            <p className="text-[13px] font-semibold text-slate-800 leading-snug mb-1.5">{card.title}</p>
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

function KanbanColumn({ column, colIndex, index, searchQuery, isSearchActive, onAddCard, onEditCard, onDeleteColumn, onRenameColumn }: {
  column: ColumnData; colIndex: number; index: number;
  searchQuery: string; isSearchActive: boolean;
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
                {column.items.map((card, i) => (
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

function ListView({ columns, onEditCard, onAddCard }: {
  columns: ColumnData[]; onEditCard: (id: string, c: CardItem) => void; onAddCard: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string,boolean>>(Object.fromEntries(columns.map(c => [c.id, true])));

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1.5">
      {columns.map((col, ci) => {
        const accent = getColAccent(ci);
        const isOpen = expanded[col.id] !== false;
        return (
          <div key={col.id} className="bg-white border border-slate-200 rounded-sm overflow-hidden">
            <button onClick={() => setExpanded(p => ({ ...p, [col.id]: !isOpen }))}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 transition-colors border-l-2"
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
                  {col.items.length > 0 && (
                    <div className="grid grid-cols-[1fr_100px_80px_90px] gap-3 px-4 py-1.5 border-t border-slate-100 bg-slate-50">
                      {["Task","Deadline","Priority","Status"].map(h => (
                        <span key={h} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{h}</span>
                      ))}
                    </div>
                  )}
                  {col.items.map(card => {
                    const ds = getDeadlineStatus(card.deadline);
                    return (
                      <div key={card.id} onClick={() => onEditCard(col.id, card)}
                        className="grid grid-cols-[1fr_100px_80px_90px] gap-3 px-4 py-2.5 border-t border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-2 min-w-0">
                          <Circle size={11} className="text-slate-300 shrink-0 group-hover:text-violet-400 transition-colors" />
                          <span className="text-[12px] font-semibold text-slate-700 truncate">{card.title}</span>
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
                    );
                  })}
                  <button onClick={() => onAddCard(col.id)}
                    className="w-full flex items-center gap-1.5 px-4 py-2 border-t border-slate-100 text-[11px] font-semibold text-slate-400 hover:text-violet-600 hover:bg-violet-50/30 transition-colors uppercase tracking-wide">
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

// ─── Gantt View ───────────────────────────────────────────────────────────────

function GanttView({ columns, onEditCard }: { columns: ColumnData[]; onEditCard: (id: string, c: CardItem) => void }) {
  const today = new Date();
  const start = addDays(today, -5);
  const end   = addDays(today, 28);
  const days  = eachDayOfInterval({ start, end });
  const DAY_W = 32;

  const allCards    = columns.flatMap((col, ci) => col.items.map(card => ({ card, col, ci })));
  const withDL      = allCards.filter(({ card }) => card.deadline && isValid(parseISO(card.deadline)));

  return (
    <div className="flex-1 overflow-auto px-5 py-4">
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
        <div className="flex border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="w-44 shrink-0 px-3 py-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-200">Task</div>
          <div className="flex">
            {days.map(d => (
              <div key={d.toISOString()} style={{ minWidth: DAY_W }}
                className={`text-center py-2 border-r border-slate-100 ${isSameDay(d, today) ? "bg-violet-50" : ""}`}>
                <div className={`text-[10px] font-bold ${isSameDay(d, today) ? "text-violet-600" : "text-slate-400"}`}>{format(d,"d")}</div>
                <div className="text-[8px] text-slate-300 uppercase">{format(d,"MMM")}</div>
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
          const barW   = 68;
          const accent = getColAccent(ci);
          return (
            <div key={card.id} onClick={() => onEditCard(col.id, card)}
              className="flex border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="w-44 shrink-0 px-3 py-2.5 border-r border-slate-200 flex items-center gap-1.5 min-w-0">
                <PriorityFlag priority={card.priority} size={10} />
                <span className="text-[11px] font-semibold text-slate-700 truncate">{card.title}</span>
              </div>
              <div className="relative flex items-center" style={{ width: days.length * DAY_W }}>
                <div className="absolute top-0 bottom-0 w-px bg-violet-200"
                  style={{ left: differenceInDays(today, start) * DAY_W + DAY_W/2 }} />
                <div className="absolute h-5 rounded-sm flex items-center px-2 text-[9px] font-bold text-white truncate"
                  style={{ left: Math.max(0, offset * DAY_W - barW + DAY_W/2), width: barW, backgroundColor: accent }}>
                  {format(dl,"MMM d")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
  const [modal, setModal]           = useState<{ card: CardItem|null; isNew: boolean; columnId: string }|null>(null);
  const isDraggingRef               = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const ref  = doc(db, "kanban", "vaphers-board");
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().columns) setColumns(snap.data().columns);
        else await setDoc(ref, { columns: INITIAL_STATE });
      } catch (e) { console.error(e); }
      finally { setIsInit(true); setIsMounted(true); }
    })();
  }, []);

  useEffect(() => {
    if (!isInit || !isMounted) return;
    const id = setTimeout(async () => {
      try { await setDoc(doc(db,"kanban","vaphers-board"), { columns }); } catch (e) { console.error(e); }
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

  const handleDelete       = (colId: string, cardId: string) => {
    setColumns(prev => prev.map(c => c.id===colId ? {...c,items:c.items.filter(i=>i.id!==cardId)} : c));
    setModal(null);
  };
  const handleDeleteColumn = (id: string) => setColumns(p => p.filter(c => c.id!==id));
  const handleRenameColumn = (id: string, title: string) => setColumns(p => p.map(c => c.id===id ? {...c,title} : c));
  const handleAddColumn    = () => setColumns(p => [...p, { id: uid(), title: "New Status", color: "slate", items: [] }]);

  if (!isMounted || !isInit) {
    return (
      <div className="h-full w-full bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-9 h-9 border-2 border-[#2383e2] border-t-transparent rounded-full animate-spin mt-120" />
          <p className="text-lg text-slate-400">Loading Boards</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white font-sans">
      {/* ── Header ── */}
      <header className="shrink-0 flex items-center gap-3 px-5 py-2.5 bg-white border-b border-slate-200 z-30">
        {/* View toggles */}
        <div className="flex items-center border border-slate-200 rounded-xs overflow-hidden">
          {([
            { mode: "board", icon: <Trello size={12} />,         label: "Board" },
            { mode: "list",  icon: <LayoutList size={12} />,       label: "List"  },
            { mode: "gantt", icon: <GanttChartSquare size={12} />, label: "Gantt" },
          ] as { mode: ViewMode; icon: React.ReactNode; label: string }[]).map(v => (
            <button key={v.mode} onClick={() => setViewMode(v.mode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-all border-r last:border-r-0 border-slate-200 cursor-pointer
                ${viewMode===v.mode ? "bg-[#2383e2] text-white" : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
              {v.icon}
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input value={searchQuery} onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="w-full pl-7 pr-7 py-1.5 rounded-sm border border-slate-200 bg-slate-50 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2383e2] focus:bg-white transition" />
          {searchQuery && (
            <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X size={11} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {isSearchActive && (
            <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }}
              className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-sm border border-amber-200 uppercase tracking-wide hidden sm:block">
              Drag disabled
            </motion.span>
          )}
          <button onClick={handleAddColumn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#2383e2] text-white text-[11px] font-bold hover:bg-[#1b6fc5] transition-colors shrink-0 uppercase tracking-wide cursor-pointer">
            <Plus size={12} />
            <span className="hidden sm:inline">Add Status</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      {viewMode === "board" && (
        <div className="flex-1 min-h-0 overflow-auto px-5 py-5">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="board">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}
                  className="flex items-start gap-4 w-max min-h-full">
                  {columns.map((col, idx) => (
                    <KanbanColumn key={col.id} column={col} colIndex={idx} index={idx}
                      searchQuery={searchQuery} isSearchActive={isSearchActive}
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
      {viewMode === "list"  && <ListView  columns={columns} onEditCard={openEdit} onAddCard={openAdd} />}
      {viewMode === "gantt" && <GanttView columns={columns} onEditCard={openEdit} />}

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {modal && (
          <CardDetailPanel
            key={modal.card?.id ?? "new"}
            card={modal.card} isNew={modal.isNew} columnId={modal.columnId} columns={columns}
            onSave={handleSave} onDelete={handleDelete} onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}