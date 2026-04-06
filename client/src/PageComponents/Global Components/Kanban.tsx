"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Search,
  X,
  Calendar as CalendarIcon,
  GripVertical,
  AlertCircle,
  Clock,
  CheckCircle2,
  Link2,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, differenceInDays, parseISO, isValid } from "date-fns";

// Firebase Imports (Adjust the path to match your project structure)
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; 

// ─── Types ───────────────────────────────────────────────────────────────────

type Priority = "Low" | "Medium" | "High";

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

interface CardItem {
  id: string;
  title: string;
  description: string;
  notes: string;
  links: LinkItem[];
  priority: Priority;
  deadline: string; // YYYY-MM-DD
}

interface ColumnData {
  id: string;
  title: string;
  items: CardItem[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

const PRIORITY_CONFIG: Record<Priority, { label: string; bg: string; text: string; dot: string }> = {
  High: {
    label: "High",
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
  Medium: {
    label: "Medium",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  Low: {
    label: "Low",
    bg: "bg-sky-50",
    text: "text-sky-600",
    dot: "bg-sky-400",
  },
};

function getDeadlineStatus(deadline: string): {
  label: string;
  color: string;
  icon: React.ReactNode;
} | null {
  if (!deadline) return null;
  const parsed = parseISO(deadline);
  if (!isValid(parsed)) return null;
  const days = differenceInDays(parsed, new Date());
  if (days < 0)
    return {
      label: "Overdue",
      color: "text-red-600 font-bold",
      icon: <AlertCircle className="w-3 h-3" />,
    };
  if (days <= 3)
    return {
      label: `Due in ${days}d`,
      color: "text-amber-600 font-bold",
      icon: <Clock className="w-3 h-3" />,
    };
  return {
    label: "On track",
    color: "text-emerald-600",
    icon: <CheckCircle2 className="w-3 h-3" />,
  };
}

// ─── Mock Initial State (Fallback if DB is empty) ────────────────────────────

const INITIAL_STATE: ColumnData[] = [
  {
    id: uid(),
    title: "📋 Backlog",
    items: [],
  },
  {
    id: uid(),
    title: "🚧 In Progress",
    items: [],
  },
  {
    id: uid(),
    title: "✅ Done",
    items: [],
  },
];

// ─── Card Modal ───────────────────────────────────────────────────────────────

interface CardModalProps {
  card: CardItem | null;
  isNew: boolean;
  columnId: string;
  onSave: (columnId: string, card: CardItem) => void;
  onDelete: (columnId: string, cardId: string) => void;
  onClose: () => void;
}

function CardModal({
  card,
  isNew,
  columnId,
  onSave,
  onDelete,
  onClose,
}: CardModalProps) {
  const [title, setTitle] = useState(card?.title ?? "");
  const [description, setDescription] = useState(card?.description ?? "");
  const [notes, setNotes] = useState(card?.notes ?? "");
  const [priority, setPriority] = useState<Priority>(card?.priority ?? "Medium");
  const [deadline, setDeadline] = useState<string>(card?.deadline ?? "");
  const [links, setLinks] = useState<LinkItem[]>(card?.links ?? []);
  const [calOpen, setCalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(columnId, {
      id: card?.id ?? uid(),
      title: title.trim(),
      description,
      notes,
      priority,
      deadline,
      links,
    });
  };

  const addLink = () =>
    setLinks((prev) => [...prev, { id: uid(), title: "", url: "" }]);

  const updateLink = (id: string, field: "title" | "url", value: string) =>
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );

  const removeLink = (id: string) =>
    setLinks((prev) => prev.filter((l) => l.id !== id));

  const selectedDate = deadline && isValid(parseISO(deadline)) ? parseISO(deadline) : undefined;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 backdrop-blur px-6 pt-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">
            {isNew ? "Add New Card" : "Edit Card"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Title</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title…"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done?"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition pr-8"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Deadline</label>
              <Popover open={calOpen} onOpenChange={setCalOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal text-sm rounded-xl border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2.5 h-auto"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
                    <span className={deadline ? "text-slate-800" : "text-slate-400"}>
                      {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Pick date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setDeadline(d ? format(d, "yyyy-MM-dd") : "");
                      setCalOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              <FileText className="w-3.5 h-3.5" /> Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extended thoughts, sub-tasks, context…"
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <Link2 className="w-3.5 h-3.5" /> Links & Attachments
              </label>
              <button
                onClick={addLink}
                className="flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Link
              </button>
            </div>
            <AnimatePresence>
              {links.map((link) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-2 mb-2"
                >
                  <input
                    value={link.title}
                    onChange={(e) => updateLink(link.id, "title", e.target.value)}
                    placeholder="Title (optional)"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                  />
                  <input
                    value={link.url}
                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                    placeholder="https://…"
                    className="flex-[2] px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                  />
                  <button
                    onClick={() => removeLink(link.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-3">
          {!isNew && (
            <>
              {deleteConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600 font-medium">Confirm delete?</span>
                  <button
                    onClick={() => {
                      onDelete(columnId, card!.id);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete Card
                </button>
              )}
            </>
          )}
          {isNew && <div />}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm shadow-violet-200"
            >
              Save Card
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card Component ───────────────────────────────────────────────────────────

interface KanbanCardProps {
  card: CardItem;
  index: number;
  columnId: string;
  searchQuery: string;
  isSearchActive: boolean;
  onClick: () => void;
}

function KanbanCard({ card, index, searchQuery, isSearchActive, onClick }: KanbanCardProps) {
  const p = PRIORITY_CONFIG[card.priority];
  const deadlineStatus = getDeadlineStatus(card.deadline);
  const matchesSearch =
    !isSearchActive ||
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isSearchActive}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            display: matchesSearch ? undefined : "none",
          }}
          onClick={onClick}
          className={`
            group relative bg-white rounded-xl border cursor-pointer select-none
            transition-all duration-150
            ${snapshot.isDragging
              ? "border-violet-300 shadow-lg shadow-violet-100/60 rotate-1 scale-[1.02]"
              : "border-slate-200 hover:border-violet-300 hover:shadow-md hover:shadow-slate-100"
            }
          `}
        >
          <div className="p-3.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${p.bg} ${p.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                {p.label}
              </span>
              {card.links.length > 0 && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Link2 className="w-3 h-3" />
                  {card.links.length}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-snug mb-1">{card.title}</p>
            {card.description && (
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 mb-2.5">
                {card.description}
              </p>
            )}
            {deadlineStatus && (
              <div className={`flex items-center gap-1 text-[11px] ${deadlineStatus.color}`}>
                {deadlineStatus.icon}
                {deadlineStatus.label}
                {card.deadline && (
                  <span className="text-slate-400 font-normal ml-1">
                    · {format(parseISO(card.deadline), "MMM d")}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

// ─── Column Component ────────────────────────────────────────────────────────

interface KanbanColumnProps {
  column: ColumnData;
  index: number;
  searchQuery: string;
  isSearchActive: boolean;
  onAddCard: (columnId: string) => void;
  onEditCard: (columnId: string, card: CardItem) => void;
  onDeleteColumn: (columnId: string) => void;
  onRenameColumn: (columnId: string, title: string) => void;
}

function KanbanColumn({
  column,
  index,
  searchQuery,
  isSearchActive,
  onAddCard,
  onEditCard,
  onDeleteColumn,
  onRenameColumn,
}: KanbanColumnProps) {
  const [hovered, setHovered] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleVal, setTitleVal] = useState(column.title);

  const commitTitle = () => {
    setEditingTitle(false);
    if (titleVal.trim()) onRenameColumn(column.id, titleVal.trim());
    else setTitleVal(column.title);
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`
            flex flex-col w-80 shrink-0 rounded-2xl bg-slate-50/80 border
            transition-all duration-200
            ${snapshot.isDragging ? "border-violet-300 shadow-xl shadow-violet-100/40 rotate-1" : "border-slate-200/80"}
          `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setDeleteConfirm(false); }}
        >
          <div
            {...provided.dragHandleProps}
            className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
              {editingTitle ? (
                <input
                  autoFocus
                  value={titleVal}
                  onChange={(e) => setTitleVal(e.target.value)}
                  onBlur={commitTitle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitTitle();
                    if (e.key === "Escape") {
                      setTitleVal(column.title);
                      setEditingTitle(false);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 min-w-0 bg-white border border-violet-300 rounded-lg px-2 py-0.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              ) : (
                <span
                  className="text-sm font-semibold text-slate-700 truncate cursor-text"
                  onDoubleClick={() => setEditingTitle(true)}
                  title="Double-click to rename"
                >
                  {column.title}
                </span>
              )}
              <span className="ml-auto shrink-0 min-w-[20px] text-center text-xs font-bold text-slate-400 bg-slate-200/80 rounded-full px-2 py-0.5">
                {column.items.length}
              </span>
            </div>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => onAddCard(column.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors" title="Add card">
                    <Plus className="w-4 h-4" />
                  </button>
                  {deleteConfirm ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => onDeleteColumn(column.id)} className="px-2 py-1 rounded-lg bg-red-500 text-white text-[11px] font-bold hover:bg-red-600 transition-colors">
                        Delete
                      </button>
                      <button onClick={() => setDeleteConfirm(false)} className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-[11px] font-bold hover:bg-slate-300 transition-colors">
                        No
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(true)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete column">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Droppable droppableId={column.id} type="card">
            {(dropProvided, dropSnapshot) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className={`flex-1 px-3 py-3 space-y-2.5 min-h-[80px] rounded-b-2xl transition-colors duration-150 ${dropSnapshot.isDraggingOver ? "bg-violet-50/60" : ""}`}
              >
                {column.items.map((card, cardIndex) => (
                  <KanbanCard key={card.id} card={card} index={cardIndex} columnId={column.id} searchQuery={searchQuery} isSearchActive={isSearchActive} onClick={() => onEditCard(column.id, card)} />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>

          <button onClick={() => onAddCard(column.id)} className="flex items-center gap-2 mx-3 mb-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors border border-dashed border-slate-200 hover:border-violet-300">
            <Plus className="w-3.5 h-3.5" /> Add a card
          </button>
        </div>
      )}
    </Draggable>
  );
}

// ─── Main Kanban Board ────────────────────────────────────────────────────────

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnData[]>(INITIAL_STATE);
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New flag for Firebase
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<{
    card: CardItem | null;
    isNew: boolean;
    columnId: string;
  } | null>(null);
  const isDraggingRef = useRef(false);

  // 1. Fetch Board State from Firestore on Mount
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardRef = doc(db, "kanban", "vaphers-board");
        const boardSnap = await getDoc(boardRef);
        
        if (boardSnap.exists() && boardSnap.data().columns) {
          setColumns(boardSnap.data().columns);
        } else {
          // If no board exists yet, save the INITIAL_STATE to the db
          await setDoc(boardRef, { columns: INITIAL_STATE });
        }
      } catch (error) {
        console.error("Error fetching board state:", error);
      } finally {
        setIsInitialized(true);
        setIsMounted(true);
      }
    };

    fetchBoard();
  }, []);

  // 2. Save Board State to Firestore when `columns` change
  useEffect(() => {
    if (isInitialized && isMounted) {
      const saveBoard = async () => {
        try {
          const boardRef = doc(db, "kanban", "vaphers-board");
          await setDoc(boardRef, { columns });
        } catch (error) {
          console.error("Error saving board state:", error);
        }
      };

      // Simple debounce to prevent slamming Firestore during fast typing/dragging
      const timeoutId = setTimeout(saveBoard, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [columns, isInitialized, isMounted]);

  const isSearchActive = searchQuery.trim().length > 0;

  // ── DnD ────────────────────────────────────────────────────────────────────

  const onDragEnd = useCallback(
    (result: DropResult) => {
      isDraggingRef.current = true;
      setTimeout(() => { isDraggingRef.current = false; }, 120);

      const { source, destination, type } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      if (type === "board") {
        setColumns((prev) => {
          const next = [...prev];
          const [moved] = next.splice(source.index, 1);
          next.splice(destination.index, 0, moved);
          return next;
        });
      } else {
        setColumns((prev) => {
          const next = prev.map((c) => ({ ...c, items: [...c.items] }));
          const srcCol = next.find((c) => c.id === source.droppableId)!;
          const dstCol = next.find((c) => c.id === destination.droppableId)!;
          const [movedCard] = srcCol.items.splice(source.index, 1);
          dstCol.items.splice(destination.index, 0, movedCard);
          return next;
        });
      }
    },
    []
  );

  // ── Modal handlers ─────────────────────────────────────────────────────────

  const openAdd = (columnId: string) =>
    setModal({ card: null, isNew: true, columnId });

  const openEdit = (columnId: string, card: CardItem) => {
    if (isDraggingRef.current) return;
    setModal({ card, isNew: false, columnId });
  };

  const handleSave = (columnId: string, card: CardItem) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;
        const exists = col.items.find((c) => c.id === card.id);
        return {
          ...col,
          items: exists
            ? col.items.map((c) => (c.id === card.id ? card : c))
            : [...col.items, card],
        };
      })
    );
    setModal(null);
  };

  const handleDelete = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, items: col.items.filter((c) => c.id !== cardId) }
          : col
      )
    );
    setModal(null);
  };

  const handleDeleteColumn = (columnId: string) =>
    setColumns((prev) => prev.filter((c) => c.id !== columnId));

  const handleRenameColumn = (columnId: string, title: string) =>
    setColumns((prev) =>
      prev.map((c) => (c.id === columnId ? { ...c, title } : c))
    );

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      { id: uid(), title: "New Board", items: [] },
    ]);
  };

  if (!isMounted || !isInitialized) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">Connecting to Firestore...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-violet-50/30 font-sans relative">
      <header className="shrink-0 flex items-center gap-4 px-6 py-3.5 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm z-30">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl text-blue-700 bungee-shade tracking-tight">
            V<span className="text-2xl text-slate-800">aphers</span>
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cards…"
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-100 border border-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:bg-white focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isSearchActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-violet-600 font-medium bg-violet-50 px-2.5 py-1 rounded-full border border-violet-200 hidden sm:block"
            >
              Drag disabled
            </motion.span>
          )}

          <button
            onClick={handleAddColumn}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm shadow-violet-200 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Board
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 min-w-0 overflow-x-auto overflow-y-auto px-6 py-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="board">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex items-start gap-4 w-max h-full"
              >
                {columns.map((col, idx) => (
                  <KanbanColumn
                    key={col.id}
                    column={col}
                    index={idx}
                    searchQuery={searchQuery}
                    isSearchActive={isSearchActive}
                    onAddCard={openAdd}
                    onEditCard={openEdit}
                    onDeleteColumn={handleDeleteColumn}
                    onRenameColumn={handleRenameColumn}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <AnimatePresence>
        {modal && (
          <CardModal
            key={modal.card?.id ?? "new"}
            card={modal.card}
            isNew={modal.isNew}
            columnId={modal.columnId}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}