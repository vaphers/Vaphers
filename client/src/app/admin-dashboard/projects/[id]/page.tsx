"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  FolderKanban, 
  Calendar, 
  User, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Table as TableIcon, 
  History, 
  Download, 
  Upload, 
  Trash2, 
  Loader2, 
  Edit3, 
  Save, 
  Check, 
  AlertCircle,
  FileText,
  RefreshCw,
  Building2,
  Tag,
  ChevronRight,
  ChevronLeft,
  PieChart,
  BarChart3,
  SlidersHorizontal,
  Send,
  ArrowLeftRight,
  Coins,
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Lock,
  ExternalLink,
  Target,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLoader from "../../Components/AdminLoader";

// Types
type Project = {
  id: string;
  name: string;
  clientName: string;
  clientEmail?: string;
  currency?: string;
  services?: string[];
  serviceType: string;
  seoSubTypes?: string[];
  webDevSubTypes?: string[];
  ppcSubTypes?: string[];
  billingType?: string;
  paymentStatus?: string;
  requirements?: Record<string, any>;
  budget?: number;
  priceHistory?: { date: string; amount: number; oldAmount?: number; reason: string; author: string }[];
  startDate?: string;
  dueDate?: string;
  status: string;
  description?: string;
  vaultNotes?: { driveLink?: string; figmaLink?: string; credentials?: string; notes?: string };
  milestones?: Milestone[];
};

type Milestone = {
  id: string;
  title: string;
  month?: string;
  dueDate?: string;
  status: "Pending" | "In Progress" | "Completed";
  deliverables?: string;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  column: "Backlog" | "In Progress" | "In Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  assignee?: string;
  dueDate?: string;
};

type Log = {
  id: string;
  content: string;
  hoursSpent: number;
  category: string;
  author: string;
  dateStr: string;
  createdAt: string;
};

type SheetData = {
  columns: string[];
  headers: string[];
  rows: string[][];
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$", INR: "₹", EUR: "€", GBP: "£", AUD: "A$", CAD: "C$", AED: "AED "
};

const fmtCurr = (amount: number, currCode: string = "USD") => {
  const sym = CURRENCY_SYMBOLS[currCode] || "$";
  return `${sym}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount || 0)}`;
};

export default function SingleProjectWorkspace() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<"snapshot" | "milestones" | "kanban" | "excel" | "vault">("snapshot");
  
  // Data States
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [sheet, setSheet] = useState<SheetData>({
    columns: ["A", "B", "C", "D", "E"],
    headers: ["Deliverable / Item", "Category", "Status", "Owner", "Notes / URL"],
    rows: [
      ["Client Requirements Audit", "Setup", "Completed", "Admin", "Briefing document verified"],
      ["Technical SEO Optimization", "Execution", "In Progress", "Admin", "Core Web Vitals tuning"],
    ],
  });

  const [loading, setLoading] = useState(true);

  // Today's Work Logger Form State
  const [workLogContent, setWorkLogContent] = useState("");
  const [hoursSpent, setHoursSpent] = useState("1");
  const [logCategory, setLogCategory] = useState("Execution");
  const [loggingWork, setLoggingWork] = useState(false);

  // New Milestone State
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneDueDate, setMilestoneDueDate] = useState("");
  const [milestoneDeliverables, setMilestoneDeliverables] = useState("");
  const [addingMilestone, setAddingMilestone] = useState(false);

  // Price Adjustment State
  const [newBudget, setNewBudget] = useState("");
  const [priceReason, setPriceReason] = useState("");
  const [updatingPrice, setUpdatingPrice] = useState(false);

  // Status & Payment Adjustment State
  const [projectStatus, setProjectStatus] = useState<string>("Planning");
  const [paymentStatus, setPaymentStatus] = useState<string>("Paid");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Vault State
  const [driveLink, setDriveLink] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [vaultCredentials, setVaultCredentials] = useState("");
  const [savingVault, setSavingVault] = useState(false);

  // Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskColumn, setNewTaskColumn] = useState<Task["column"]>("Backlog");
  const [newTaskPriority, setNewTaskPriority] = useState<Task["priority"]>("Medium");
  const [addingTask, setAddingTask] = useState(false);

  // Spreadsheet State
  const [savingSheet, setSavingSheet] = useState(false);

  useEffect(() => {
    if (id) {
      loadProjectData();
    }
  }, [id]);

  const loadProjectData = async () => {
    setLoading(true);
    try {
      // Load Project Details
      const resProj = await fetch(`/api/projects/${id}`);
      const dataProj = await resProj.json();
      if (dataProj.success && dataProj.project) {
        setProject(dataProj.project);
        setNewBudget(String(dataProj.project.budget || ""));
        setProjectStatus(dataProj.project.status || "Planning");
        setPaymentStatus(dataProj.project.paymentStatus || "Paid");
        if (dataProj.project.vaultNotes) {
          setDriveLink(dataProj.project.vaultNotes.driveLink || "");
          setFigmaLink(dataProj.project.vaultNotes.figmaLink || "");
          setVaultCredentials(dataProj.project.vaultNotes.credentials || "");
        }
      }

      // Load Tasks
      const resTasks = await fetch(`/api/projects/${id}/tasks`);
      const dataTasks = await resTasks.json();
      if (dataTasks.success) setTasks(dataTasks.tasks || []);

      // Load Daily Logs
      const resLogs = await fetch(`/api/projects/${id}/logs`);
      const dataLogs = await resLogs.json();
      if (dataLogs.success) setLogs(dataLogs.logs || []);

      // Load Sheet Data
      const resSheet = await fetch(`/api/projects/${id}/sheet`);
      const dataSheet = await resSheet.json();
      if (dataSheet.success && dataSheet.sheet) setSheet(dataSheet.sheet);

    } catch {
      toast.error("Failed to load project workspace");
    } finally {
      setLoading(false);
    }
  };

  // --- WORK LOG ACTIONS ---
  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workLogContent.trim()) {
      toast.error("Please enter a summary of work done");
      return;
    }

    setLoggingWork(true);
    try {
      const res = await fetch(`/api/projects/${id}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: workLogContent,
          hoursSpent: Number(hoursSpent) || 0,
          category: logCategory,
          author: "Admin",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Work logged for today!");
        setWorkLogContent("");
        setHoursSpent("1");
        setLogs([data.log, ...logs]);
      } else {
        toast.error("Failed to log work");
      }
    } catch {
      toast.error("Error logging work");
    } finally {
      setLoggingWork(false);
    }
  };

  // --- MILESTONES ACTIONS ---
  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneTitle.trim() || !project) return;

    setAddingMilestone(true);
    const newM: Milestone = {
      id: `m-${Date.now()}`,
      title: milestoneTitle.trim(),
      dueDate: milestoneDueDate || project.dueDate || "",
      status: "In Progress",
      deliverables: milestoneDeliverables.trim(),
    };

    const updatedMilestones = [...(project.milestones || []), newM];

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestones: updatedMilestones }),
      });

      if (res.ok) {
        toast.success("Milestone added!");
        setProject({ ...project, milestones: updatedMilestones });
        setMilestoneTitle("");
        setMilestoneDeliverables("");
      }
    } catch {
      toast.error("Failed to add milestone");
    } finally {
      setAddingMilestone(false);
    }
  };

  const handleToggleMilestoneStatus = async (milestoneId: string, newStatus: Milestone["status"]) => {
    if (!project) return;
    const updatedMs = (project.milestones || []).map(m => m.id === milestoneId ? { ...m, status: newStatus } : m);
    setProject({ ...project, milestones: updatedMs });

    try {
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestones: updatedMs }),
      });
    } catch {
      toast.error("Failed to update milestone");
    }
  };

  // --- PRICE REVISION ACTIONS ---
  const handleUpdatePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudget || !project) return;

    setUpdatingPrice(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: Number(newBudget),
          priceChangeReason: priceReason || "Scope / contract adjustment",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Contract budget updated!");
        setPriceReason("");
        loadProjectData();
      }
    } catch {
      toast.error("Failed to update budget");
    } finally {
      setUpdatingPrice(false);
    }
  };

  // --- STATUS & PAYMENT UPDATES ---
  const handleUpdateStatusAndPayment = async () => {
    if (!project) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: projectStatus, paymentStatus }),
      });
      if (res.ok) {
        toast.success("Project status updated!");
        setProject({ ...project, status: projectStatus, paymentStatus });
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // --- VAULT ACTIONS ---
  const handleSaveVault = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSavingVault(true);
    try {
      const vaultNotes = { driveLink, figmaLink, credentials: vaultCredentials };
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vaultNotes }),
      });
      if (res.ok) {
        toast.success("Vault notes saved!");
        setProject({ ...project, vaultNotes });
      }
    } catch {
      toast.error("Failed to save vault notes");
    } finally {
      setSavingVault(false);
    }
  };

  // --- KANBAN ACTIONS ---
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setAddingTask(true);
    try {
      const res = await fetch(`/api/projects/${id}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          column: newTaskColumn,
          priority: newTaskPriority,
          assignee: "Admin",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Task added to board");
        setNewTaskTitle("");
        setTasks([data.task, ...tasks]);
      }
    } catch {
      toast.error("Error adding task");
    } finally {
      setAddingTask(false);
    }
  };

  const handleMoveTask = async (taskId: string, newColumn: Task["column"]) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
    try {
      await fetch(`/api/projects/${id}/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, column: newColumn }),
      });
    } catch {
      toast.error("Failed to move task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    try {
      await fetch(`/api/projects/${id}/tasks?taskId=${taskId}`, { method: "DELETE" });
    } catch {
      toast.error("Failed to delete task");
    }
  };

  // --- EXCEL SPREADSHEET & CSV FILE UPLOAD ---
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...sheet.rows];
    newRows[rowIndex][colIndex] = value;
    setSheet({ ...sheet, rows: newRows });
  };

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...sheet.headers];
    newHeaders[colIndex] = value;
    setSheet({ ...sheet, headers: newHeaders });
  };

  const handleAddRow = () => {
    const emptyRow = new Array(sheet.headers.length).fill("");
    setSheet({ ...sheet, rows: [...sheet.rows, emptyRow] });
  };

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = sheet.rows.filter((_, idx) => idx !== rowIndex);
    setSheet({ ...sheet, rows: newRows });
  };

  const handleAddColumn = () => {
    const nextColName = String.fromCharCode(65 + sheet.columns.length);
    const newCols = [...sheet.columns, nextColName];
    const newHeaders = [...sheet.headers, `Column ${sheet.headers.length + 1}`];
    const newRows = sheet.rows.map(r => [...r, ""]);
    setSheet({ columns: newCols, headers: newHeaders, rows: newRows });
  };

  const handleSaveSheet = async () => {
    setSavingSheet(true);
    try {
      const res = await fetch(`/api/projects/${id}/sheet`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheet),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Spreadsheet saved!");
      }
    } catch {
      toast.error("Error saving spreadsheet");
    } finally {
      setSavingSheet(false);
    }
  };

  // CSV File Importer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
      if (lines.length === 0) return;

      const headers = lines[0].split(",").map(h => h.replace(/^"(.*)"$/, "$1").trim());
      const rows = lines.slice(1).map(line => 
        line.split(",").map(cell => cell.replace(/^"(.*)"$/, "$1").trim())
      );

      const columns = headers.map((_, idx) => String.fromCharCode(65 + idx));
      setSheet({ columns, headers, rows });
      toast.success(`Imported ${rows.length} rows from CSV! Click 'Save Sheet' to persist.`);
    };

    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csvContent = [
      sheet.headers.join(","),
      ...sheet.rows.map(row => row.map(cell => `"${(cell || "").replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${project?.name || "Project"}_Sheet.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Today Calculations
  const todayStr = new Date().toISOString().split("T")[0];
  const todayLogs = logs.filter(l => l.dateStr === todayStr || l.createdAt.startsWith(todayStr));
  const todayHours = todayLogs.reduce((sum, l) => sum + (l.hoursSpent || 0), 0);
  const completedTasksCount = tasks.filter(t => t.column === "Completed").length;

  if (loading) {
    return <AdminLoader message="Loading project workspace..." />;
  }

  if (!project) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-sm m-8">
        <h2 className="text-lg montserrat-medium text-slate-800">Project Record Not Found</h2>
        <Link href="/admin-dashboard/projects" className="text-[#2383e2] underline text-xs mt-2 inline-block">
          Return to Projects Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />

      {/* ── Enterprise Header Bar ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/admin-dashboard/projects" className="p-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <ArrowLeft size={14} />
          </Link>
          <h1 className="text-xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>

          <div className="hidden lg:flex bg-slate-100 rounded-sm p-1 gap-1">
            <button onClick={() => setActiveTab("snapshot")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === "snapshot" ? "bg-white shadow-xs text-[#2383e2]" : "text-slate-500 hover:text-slate-900"}`}>
              <History size={13} /> Work Logs
            </button>
            <button onClick={() => setActiveTab("milestones")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === "milestones" ? "bg-white shadow-xs text-[#2383e2]" : "text-slate-500 hover:text-slate-900"}`}>
              <Target size={13} /> Milestones ({project.milestones?.length || 0})
            </button>
            <button onClick={() => setActiveTab("kanban")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === "kanban" ? "bg-white shadow-xs text-[#2383e2]" : "text-slate-500 hover:text-slate-900"}`}>
              <FolderKanban size={13} /> Tasks ({tasks.length})
            </button>
            <button onClick={() => setActiveTab("excel")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === "excel" ? "bg-white shadow-xs text-[#2383e2]" : "text-slate-500 hover:text-slate-900"}`}>
              <TableIcon size={13} /> Excel Matrix
            </button>
            <button onClick={() => setActiveTab("vault")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === "vault" ? "bg-white shadow-xs text-[#2383e2]" : "text-slate-500 hover:text-slate-900"}`}>
              <Shield size={13} /> Contract & Vault
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className={`text-[10px] montserrat-medium px-2.5 py-1 rounded-sm ${
            project.status === "Completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
            project.status === "In Progress" ? "bg-blue-50 text-blue-600 border border-blue-200" :
            project.status === "Stopped" ? "bg-red-50 text-red-600 border border-red-200" :
            "bg-slate-100 text-slate-600 border border-slate-200"
          }`}>
            {project.status}
          </span>
          <button onClick={loadProjectData} className="p-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" title="Refresh">
            <RefreshCw size={14} />
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex overflow-x-auto bg-white border-b border-slate-200 p-2 gap-2 scrollbar-none">
        <button onClick={() => setActiveTab("snapshot")} className={`px-3 py-1.5 text-xs montserrat-medium rounded-sm shrink-0 ${activeTab === "snapshot" ? "bg-slate-100 text-[#2383e2]" : "text-slate-500"}`}>Logs</button>
        <button onClick={() => setActiveTab("milestones")} className={`px-3 py-1.5 text-xs montserrat-medium rounded-sm shrink-0 ${activeTab === "milestones" ? "bg-slate-100 text-[#2383e2]" : "text-slate-500"}`}>Milestones</button>
        <button onClick={() => setActiveTab("kanban")} className={`px-3 py-1.5 text-xs montserrat-medium rounded-sm shrink-0 ${activeTab === "kanban" ? "bg-slate-100 text-[#2383e2]" : "text-slate-500"}`}>Tasks</button>
        <button onClick={() => setActiveTab("excel")} className={`px-3 py-1.5 text-xs montserrat-medium rounded-sm shrink-0 ${activeTab === "excel" ? "bg-slate-100 text-[#2383e2]" : "text-slate-500"}`}>Excel</button>
        <button onClick={() => setActiveTab("vault")} className={`px-3 py-1.5 text-xs montserrat-medium rounded-sm shrink-0 ${activeTab === "vault" ? "bg-slate-100 text-[#2383e2]" : "text-slate-500"}`}>Vault & Price</button>
      </div>

      <div className="w-full px-4 md:px-8 py-6 space-y-6 max-w-[1600px] mx-auto">

        {/* Project Meta Card Header */}
        <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {(project.services || [project.serviceType]).map((srv) => (
                <span key={srv} className="text-[10px] montserrat-medium text-[#2383e2] bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100">
                  {srv}
                </span>
              ))}
              <span className="text-[10px] montserrat-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm">
                {project.billingType || "One-Time"}
              </span>
              <span className={`text-[10px] montserrat-medium px-2 py-0.5 rounded-sm ${
                project.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {project.paymentStatus || "Paid"}
              </span>
            </div>

            <h2 className="text-2xl montserrat-medium text-slate-950">{project.name}</h2>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <Building2 size={12} className="text-slate-400" /> Client: {project.clientName} ({project.clientEmail || "No email"})
            </p>

            {/* SEO Sub-Types Pills */}
            {project.seoSubTypes && project.seoSubTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.seoSubTypes.map(sub => (
                  <span key={sub} className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded-sm border border-blue-100">
                    {sub}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
            <div>
              <span className="text-[10px] montserrat-medium text-slate-400 uppercase block">Target Due</span>
              <span className="montserrat-medium text-slate-900">{project.dueDate || "N/A"}</span>
            </div>
            <div>
              <span className="text-[10px] montserrat-medium text-slate-400 uppercase block">Contract Budget</span>
              <span className="montserrat-medium text-emerald-600">{fmtCurr(Number(project.budget || 0), project.currency)}</span>
            </div>
          </div>
        </div>

        {/* ================= TAB 1: WORK LOG & TODAY'S SNAPSHOT ================= */}
        {activeTab === "snapshot" && (
          <div className="space-y-6">
            
            {/* Today Snapshot Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-xs">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Logged Today</span>
                <p className="text-2xl montserrat-medium text-[#2383e2] mt-1">{todayHours} Hours</p>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-xs">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Today's Work Entries</span>
                <p className="text-2xl montserrat-medium text-slate-900 mt-1">{todayLogs.length} Entries</p>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-xs">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block">Completed Deliverables</span>
                <p className="text-2xl montserrat-medium text-emerald-600 mt-1">{completedTasksCount} Tasks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form: Log What I Did Today */}
              <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs h-fit space-y-4">
                <div>
                  <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 size={14} className="text-[#2383e2]" /> Log What I Did Today
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Record daily work output for client reporting.</p>
                </div>

                <form onSubmit={handleAddLog} className="space-y-3 text-xs">
                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Work Summary *</label>
                    <Textarea 
                      value={workLogContent} 
                      onChange={e => setWorkLogContent(e.target.value)} 
                      required rows={3}
                      placeholder="e.g. Completed technical SEO audit, optimized top 5 landing page titles..."
                      className="text-xs border-slate-200 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="montserrat-medium text-slate-700 block mb-1">Hours</label>
                      <Input type="number" step="0.5" value={hoursSpent} onChange={e => setHoursSpent(e.target.value)} className="h-8 text-xs border-slate-200" />
                    </div>
                    <div>
                      <label className="montserrat-medium text-slate-700 block mb-1">Category</label>
                      <select 
                        value={logCategory} onChange={e => setLogCategory(e.target.value)}
                        className="w-full h-8 bg-white border border-slate-200 rounded-sm text-[11px] px-2 text-slate-900 outline-none"
                      >
                        <option value="Execution">Execution</option>
                        <option value="SEO & Content">SEO & Content</option>
                        <option value="PPC & Ads">PPC & Ads</option>
                        <option value="Client Call">Client Call</option>
                        <option value="Audit">Audit</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" disabled={loggingWork} 
                    className="w-full py-2 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white font-medium text-xs shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {loggingWork ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Log Work Entry
                  </button>
                </form>
              </div>

              {/* Activity Timeline Ledger */}
              <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider">Daily Activity History</h3>
                  <span className="text-[10px] text-slate-400">{logs.length} Logged Entries</span>
                </div>

                {logs.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <FileText size={24} className="mx-auto mb-2 opacity-20 text-slate-900" />
                    <p className="text-[11px]">No activity logged yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {logs.map((log) => (
                      <div key={log.id} className="py-3 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span className="montserrat-medium text-[#2383e2] bg-blue-50 px-2 py-0.5 rounded-sm">
                            {log.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="montserrat-medium text-slate-700">{log.hoursSpent} hrs</span>
                            <span>{new Date(log.createdAt).toLocaleDateString("en-IN", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </div>
                        <p className="text-slate-800 montserrat-regular whitespace-pre-wrap">{log.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 2: MILESTONES & MONTHLY TRACKER ================= */}
        {activeTab === "milestones" && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Add New Milestone Form */}
              <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs h-fit space-y-3">
                <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Target size={14} className="text-[#2383e2]" /> Create New Milestone
                </h3>

                <form onSubmit={handleAddMilestone} className="space-y-3 text-xs">
                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Milestone Title *</label>
                    <Input 
                      value={milestoneTitle} onChange={e => setMilestoneTitle(e.target.value)} required
                      placeholder="e.g. Month 2 Technical SEO & Backlinks"
                      className="h-8 text-xs border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Target Completion Date</label>
                    <Input 
                      type="date" value={milestoneDueDate} onChange={e => setMilestoneDueDate(e.target.value)}
                      className="h-8 text-xs border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Deliverables & Scope</label>
                    <Textarea 
                      value={milestoneDeliverables} onChange={e => setMilestoneDeliverables(e.target.value)} rows={3}
                      placeholder="List key deliverables included in this milestone..."
                      className="text-xs border-slate-200 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" disabled={addingMilestone}
                    className="w-full py-2 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white font-medium text-xs shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {addingMilestone ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />} Add Milestone
                  </button>
                </form>
              </div>

              {/* Milestones List */}
              <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider">Project Milestones & Deliverables</h3>
                  <span className="text-[10px] text-slate-400">{project.milestones?.length || 0} Milestones</span>
                </div>

                {(!project.milestones || project.milestones.length === 0) ? (
                  <div className="py-12 text-center text-slate-400">
                    <Target size={24} className="mx-auto mb-2 opacity-20 text-slate-900" />
                    <p className="text-[11px]">No milestones created yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {project.milestones.map((m) => (
                      <div key={m.id} className="py-3 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] montserrat-medium px-2 py-0.5 rounded-sm ${
                              m.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            }`}>
                              {m.status}
                            </span>
                            <h4 className="text-xs montserrat-medium text-slate-900">{m.title}</h4>
                          </div>
                          {m.deliverables && (
                            <p className="text-xs text-slate-500">{m.deliverables}</p>
                          )}
                          <p className="text-[10px] text-slate-400">Due: {m.dueDate || "N/A"}</p>
                        </div>

                        <select
                          value={m.status}
                          onChange={e => handleToggleMilestoneStatus(m.id, e.target.value as Milestone["status"])}
                          className="text-[10px] bg-slate-50 border border-slate-200 rounded-sm px-2 py-1 text-slate-700 outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 3: KANBAN TASK BOARD ================= */}
        {activeTab === "kanban" && (
          <div className="space-y-4">
            
            <form onSubmit={handleAddTask} className="bg-white p-3 rounded-sm border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-2">
              <Input 
                value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required
                placeholder="Add task title..."
                className="flex-1 h-8 text-xs border-slate-200"
              />
              <select 
                value={newTaskColumn} onChange={e => setNewTaskColumn(e.target.value as Task["column"])}
                className="h-8 px-2 bg-white border border-slate-200 rounded-sm text-xs text-slate-800 outline-none"
              >
                <option value="Backlog">Backlog</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
              <select 
                value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value as Task["priority"])}
                className="h-8 px-2 bg-white border border-slate-200 rounded-sm text-xs text-slate-800 outline-none"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button type="submit" disabled={addingTask} className="px-3 py-1.5 rounded-sm bg-[#2383e2] text-white hover:bg-[#1c6ebf] text-xs montserrat-medium flex items-center justify-center gap-1 cursor-pointer">
                {addingTask ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />} Add
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(["Backlog", "In Progress", "In Review", "Completed"] as const).map((col) => {
                const colTasks = tasks.filter(t => t.column === col);
                return (
                  <div key={col} className="bg-slate-100 rounded-sm border border-slate-200 p-3 min-h-[400px] flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] montserrat-medium text-slate-700 uppercase tracking-wider">{col}</span>
                      <span className="text-[10px] montserrat-medium bg-white px-2 py-0.5 rounded-sm text-slate-600 border border-slate-200">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {colTasks.map((t) => (
                        <div key={t.id} className="bg-white p-3 rounded-sm border border-slate-200 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] montserrat-medium px-1.5 py-0.5 rounded-sm ${
                              t.priority === "Urgent" ? "bg-red-50 text-red-600" :
                              t.priority === "High" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-600"
                            }`}>
                              {t.priority}
                            </span>
                            <button onClick={() => handleDeleteTask(t.id)} className="text-slate-300 hover:text-red-600">
                              <Trash2 size={12} />
                            </button>
                          </div>

                          <p className="text-xs montserrat-medium text-slate-900">{t.title}</p>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Status:</span>
                            <select
                              value={t.column}
                              onChange={e => handleMoveTask(t.id, e.target.value as Task["column"])}
                              className="text-[10px] bg-slate-50 border border-slate-200 rounded-sm px-1 py-0.5 text-slate-700 outline-none"
                            >
                              <option value="Backlog">Backlog</option>
                              <option value="In Progress">In Progress</option>
                              <option value="In Review">In Review</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB 4: ENTERPRISE EXCEL MATRIX & FILE IMPORTER ================= */}
        {activeTab === "excel" && (
          <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4">
            
            <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} className="text-[#2383e2]" />
                <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider">Enterprise Spreadsheet Matrix</h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button onClick={() => fileInputRef.current?.click()} className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#2383e2] text-[11px] montserrat-medium rounded-sm flex items-center gap-1 cursor-pointer">
                  <Upload size={12} /> Import CSV
                </button>
                <button onClick={handleAddRow} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] montserrat-medium rounded-sm">
                  + Row
                </button>
                <button onClick={handleAddColumn} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] montserrat-medium rounded-sm">
                  + Column
                </button>
                <button onClick={handleExportCSV} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] montserrat-medium rounded-sm flex items-center gap-1">
                  <Download size={12} /> CSV
                </button>
                <button onClick={handleSaveSheet} disabled={savingSheet} className="px-3 py-1 bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-[11px] montserrat-medium rounded-sm flex items-center gap-1 cursor-pointer">
                  {savingSheet ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Save Matrix
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-[11px] montserrat-medium">
                    <th className="p-2 w-10 text-center border-r border-slate-800">#</th>
                    {sheet.headers.map((header, colIdx) => (
                      <th key={colIdx} className="p-2 border-r border-slate-800 min-w-[140px]">
                        <input
                          type="text"
                          value={header}
                          onChange={e => handleHeaderChange(colIdx, e.target.value)}
                          className="bg-transparent font-medium text-white text-xs outline-none w-full focus:bg-slate-800 px-1 py-0.5 rounded-sm"
                        />
                      </th>
                    ))}
                    <th className="p-2 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {sheet.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-2 text-[10px] montserrat-medium text-slate-400 bg-slate-50 text-center border-r border-slate-200">
                        {rowIdx + 1}
                      </td>
                      {row.map((cellValue, colIdx) => (
                        <td key={colIdx} className="p-1 border-r border-slate-200">
                          <input
                            type="text"
                            value={cellValue || ""}
                            onChange={e => handleCellChange(rowIdx, colIdx, e.target.value)}
                            className="w-full px-2 py-1 bg-transparent text-slate-800 text-xs outline-none focus:bg-white focus:ring-1 focus:ring-[#2383e2] rounded-sm"
                          />
                        </td>
                      ))}
                      <td className="p-1.5 text-center">
                        <button onClick={() => handleDeleteRow(rowIdx)} className="text-slate-300 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= TAB 5: PRICE REVISION AUDIT & CLIENT VAULT ================= */}
        {activeTab === "vault" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Price Revision & Status Adjustment Tool */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#2383e2]" /> Contract Price & Status Adjustment
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Adjust budget (increase/decrease) or change project lifecycle state.</p>
              </div>

              {/* Status & Payment Status */}
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Project Status</label>
                    <select value={projectStatus} onChange={e => setProjectStatus(e.target.value)} className="w-full h-8 bg-white border border-slate-200 rounded-sm px-2 text-xs">
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Review">Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Stopped">Stopped / Paused</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="montserrat-medium text-slate-700 block mb-1">Payment Status</label>
                    <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="w-full h-8 bg-white border border-slate-200 rounded-sm px-2 text-xs">
                      <option value="Paid">Paid</option>
                      <option value="Payment Due">Payment Due</option>
                      <option value="Partial">Partial Payment</option>
                      <option value="Overdue">Overdue</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleUpdateStatusAndPayment} disabled={updatingStatus} className="w-full py-1.5 rounded-sm bg-slate-800 text-white text-xs montserrat-medium">
                  {updatingStatus ? <Loader2 size={12} className="animate-spin mx-auto" /> : "Save Status Changes"}
                </button>
              </div>

              {/* Price Revision */}
              <form onSubmit={handleUpdatePrice} className="space-y-3 text-xs pt-2 border-t border-slate-100">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">New Contract Budget ({project.currency || "USD"})</label>
                  <Input type="number" value={newBudget} onChange={e => setNewBudget(e.target.value)} className="h-8 text-xs border-slate-200 font-semibold" />
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Revision Reason</label>
                  <Input value={priceReason} onChange={e => setPriceReason(e.target.value)} placeholder="e.g. Expanded SEO keyword scope, added PPC budget..." className="h-8 text-xs border-slate-200" />
                </div>
                <button type="submit" disabled={updatingPrice} className="w-full py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium">
                  {updatingPrice ? <Loader2 size={12} className="animate-spin mx-auto" /> : "Log Price Adjustment"}
                </button>
              </form>

              {/* Price Change Audit History */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <h4 className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider">Price Revision History</h4>
                {(!project.priceHistory || project.priceHistory.length === 0) ? (
                  <p className="text-[11px] text-slate-400">No revisions logged yet.</p>
                ) : (
                  <div className="divide-y divide-slate-100 text-xs max-h-48 overflow-y-auto pr-1">
                    {project.priceHistory.map((ph, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-slate-800">{fmtCurr(ph.amount, project.currency)}</span>
                          <p className="text-[10px] text-slate-400">{ph.reason}</p>
                        </div>
                        <span className="text-[10px] text-slate-400">{new Date(ph.date).toLocaleDateString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Client Vault & Access Credentials */}
            <div className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs montserrat-medium text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={14} className="text-[#2383e2]" /> Client Vault & Asset Links
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Securely store Google Drive, Figma, and server access info.</p>
              </div>

              <form onSubmit={handleSaveVault} className="space-y-3 text-xs">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Google Drive / Asset Folder URL</label>
                  <Input value={driveLink} onChange={e => setDriveLink(e.target.value)} placeholder="https://drive.google.com/..." className="h-8 text-xs border-slate-200" />
                </div>

                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Figma / Design File URL</label>
                  <Input value={figmaLink} onChange={e => setFigmaLink(e.target.value)} placeholder="https://figma.com/file/..." className="h-8 text-xs border-slate-200" />
                </div>

                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Vault Credentials & Access Notes</label>
                  <Textarea value={vaultCredentials} onChange={e => setVaultCredentials(e.target.value)} rows={4} placeholder="Store staging URLs, WP Logins, GA4 Access IDs..." className="text-xs border-slate-200 resize-none font-mono" />
                </div>

                <button type="submit" disabled={savingVault} className="w-full py-2 rounded-sm bg-slate-800 text-white text-xs montserrat-medium">
                  {savingVault ? <Loader2 size={13} className="animate-spin mx-auto" /> : "Save Vault Settings"}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
