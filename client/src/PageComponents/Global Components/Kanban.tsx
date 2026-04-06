"use client"

import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus, Trash2, Calendar, X, AlignLeft } from 'lucide-react';

// --- Types ---
type Priority = 'Low' | 'Medium' | 'High';

type CardItem = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: string; // YYYY-MM-DD
};

type ColumnData = {
  id: string;
  title: string;
  items: CardItem[];
};

// --- Mock Data ---
const initialData: Record<string, ColumnData> = {
  'col-1': {
    id: 'col-1',
    title: 'To Do',
    items: [
      {
        id: 'card-1',
        title: 'Design Database Schema',
        description: 'Create the initial Prisma schema for the multi-tenant architecture. Ensure we have isolated environments for different orgs. This includes setting up the pgvector extension for future AI features.',
        priority: 'High',
        deadline: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday (Red)
      },
      {
        id: 'card-2',
        title: 'Setup GitHub Actions',
        description: 'Configure CI/CD pipeline for automated deployments to Hostinger. Needs to run linting, type checks, and build steps before pushing.',
        priority: 'Medium',
        deadline: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // In 2 days (Yellow)
      },
    ]
  },
  'col-2': {
    id: 'col-2',
    title: 'In Progress',
    items: [
      {
        id: 'card-3',
        title: 'Kanban Board Component',
        description: 'Build a drag and drop kanban board using @hello-pangea/dnd with shadcn styling and dynamic deadlines.',
        priority: 'High',
        deadline: new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0], // In 10 days (Green)
      }
    ]
  }
};

// --- Helper for Deadline Colors ---
const getDeadlineStatus = (dateString: string) => {
  if (!dateString) return { color: 'text-gray-500', text: 'No deadline' };
  
  const deadline = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { color: 'text-red-600 font-bold', text: 'Overdue' };
  if (diffDays <= 3) return { color: 'text-yellow-600 font-bold', text: 'Soon' };
  return { color: 'text-green-600 font-medium', text: 'On track' };
};

const priorityColors: Record<Priority, { bg: string; text: string }> = {
  Low: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  High: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Record<string, ColumnData>>(initialData);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardItem | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  // --- Drag and Drop Logic ---
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    if (sourceCol.id === destCol.id) {
      const copiedItems = [...sourceCol.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({ ...columns, [sourceCol.id]: { ...sourceCol, items: copiedItems } });
      return;
    }

    const sourceItems = [...sourceCol.items];
    const destItems = [...destCol.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [sourceCol.id]: { ...sourceCol, items: sourceItems },
      [destCol.id]: { ...destCol, items: destItems }
    });
  };

  // --- Board Actions ---
  const addColumn = () => {
    const id = `col-${Date.now()}`;
    setColumns({
      ...columns,
      [id]: { id, title: 'New Board', items: [] }
    });
  };

  const deleteColumn = (colId: string) => {
    if (confirm('Are you sure you want to delete this board and all its cards?')) {
      const newCols = { ...columns };
      delete newCols[colId];
      setColumns(newCols);
    }
  };

  const updateColumnTitle = (colId: string, newTitle: string) => {
    setColumns({
      ...columns,
      [colId]: { ...columns[colId], title: newTitle }
    });
  };

  // --- Card Actions ---
  const openNewCardModal = (colId: string) => {
    setActiveColumnId(colId);
    setEditingCard({
      id: `card-${Date.now()}`,
      title: '',
      description: '',
      priority: 'Medium',
      deadline: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const openEditCardModal = (card: CardItem, colId: string) => {
    setActiveColumnId(colId);
    setEditingCard({ ...card });
    setIsModalOpen(true);
  };

  const deleteCard = (cardId: string, colId: string) => {
    if (confirm('Delete this card?')) {
      const col = columns[colId];
      setColumns({
        ...columns,
        [colId]: { ...col, items: col.items.filter(c => c.id !== cardId) }
      });
      setIsModalOpen(false);
    }
  };

  const saveCard = () => {
    if (!editingCard || !activeColumnId) return;
    
    const col = columns[activeColumnId];
    const existingIndex = col.items.findIndex(c => c.id === editingCard.id);
    
    const newItems = [...col.items];
    if (existingIndex >= 0) {
      newItems[existingIndex] = editingCard; // Update
    } else {
      newItems.push(editingCard); // Add new
    }

    setColumns({
      ...columns,
      [activeColumnId]: { ...col, items: newItems }
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 overflow-x-auto">
      <div className="flex gap-6 items-start">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.values(columns).map((column) => (
            <div key={column.id} className="flex flex-col w-[320px] flex-shrink-0">
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 bg-white px-3 py-2.5 rounded-sm border border-gray-200 shadow-sm group">
                <input 
                  className="font-semibold text-gray-800 text-sm bg-transparent outline-none focus:border-b focus:border-indigo-500 w-full mr-2"
                  value={column.title}
                  onChange={(e) => updateColumnTitle(column.id, e.target.value)}
                />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openNewCardModal(column.id)} className="p-1 text-gray-400 hover:text-indigo-600 rounded-sm hover:bg-indigo-50">
                    <Plus size={16} />
                  </button>
                  <button onClick={() => deleteColumn(column.id)} className="p-1 text-gray-400 hover:text-red-600 rounded-sm hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex flex-col gap-3 min-h-[150px] transition-colors rounded-sm ${
                      snapshot.isDraggingOver ? 'bg-gray-100/50' : ''
                    }`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => openEditCardModal(item, column.id)}
                            className={`bg-white rounded-sm p-3.5 border border-gray-200 shadow-sm flex flex-col gap-3 cursor-pointer hover:border-indigo-300 transition-colors ${
                              snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500/20' : ''
                            }`}
                            style={{ ...provided.draggableProps.style }}
                          >
                            {/* Card Header: Priority */}
                            <div className="flex justify-between items-start">
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${priorityColors[item.priority].bg} ${priorityColors[item.priority].text}`}>
                                {item.priority}
                              </span>
                            </div>

                            {/* Card Body: Title & Excerpt */}
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-1.5">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-xs text-gray-500 line-clamp-4 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Card Footer: Deadline */}
                            <div className="flex items-center gap-1.5 text-xs mt-1 pt-3 border-t border-gray-100">
                              <Calendar size={14} className="text-gray-400" />
                              <span className={getDeadlineStatus(item.deadline).color}>
                                {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No date'} 
                                <span className="text-gray-400 font-normal ml-1">({getDeadlineStatus(item.deadline).text})</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>

        {/* Add New Board Button */}
        <button 
          onClick={addColumn}
          className="flex items-center gap-2 w-[320px] flex-shrink-0 bg-gray-100/50 hover:bg-gray-200/50 text-gray-600 font-medium text-sm py-3 px-4 rounded-sm border border-dashed border-gray-300 transition-colors"
        >
          <Plus size={16} />
          Add New Board
        </button>
      </div>

      {/* --- Card Edit/Add Modal --- */}
      {isModalOpen && editingCard && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                {columns[activeColumnId!]?.items.find(c => c.id === editingCard.id) ? 'Edit Card' : 'New Card'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title</label>
                <input 
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({...editingCard, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  placeholder="Task title..."
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                  <AlignLeft size={14} /> Description
                </label>
                <textarea 
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({...editingCard, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-indigo-500 min-h-[120px] resize-y"
                  placeholder="Add a more detailed description..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
                  <select 
                    value={editingCard.priority}
                    onChange={(e) => setEditingCard({...editingCard, priority: e.target.value as Priority})}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Deadline</label>
                  {/* NOTE: You can replace this native input with your shadcn <DatePicker /> here */}
                  <input 
                    type="date"
                    value={editingCard.deadline}
                    onChange={(e) => setEditingCard({...editingCard, deadline: e.target.value})}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={() => activeColumnId && deleteCard(editingCard.id, activeColumnId)}
                className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-sm text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={16} /> Delete
              </button>
              <div className="flex gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-sm transition-colors">
                  Cancel
                </button>
                <button onClick={saveCard} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-sm transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}