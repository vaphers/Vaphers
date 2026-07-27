"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Briefcase, 
  User, 
  ArrowUpRight, 
  Loader2, 
  X,
  SlidersHorizontal,
  Code2,
  TrendingUp,
  Zap,
  Smartphone,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  BarChart3,
  PieChart,
  LayoutDashboard,
  FileText,
  Layers,
  Trash2,
  ExternalLink,
  Check,
  Building2,
  Tag,
  CreditCard,
  AlertTriangle,
  Repeat
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdminLoader from "../Components/AdminLoader";

type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed" | "On Hold" | "Stopped" | "Cancelled";
type PaymentStatus = "Paid" | "Partial" | "Payment Due" | "Overdue" | "Cancelled";
type BillingType = "One-Time" | "Monthly Subscription" | "Quarterly Subscription" | "Yearly Subscription";

interface Project {
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
  billingType?: BillingType;
  paymentStatus?: PaymentStatus;
  requirements?: Record<string, any>;
  budget?: number;
  startDate?: string;
  dueDate?: string;
  status: ProjectStatus;
  description?: string;
  createdAt: string;
}

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "INR", symbol: "₹", label: "INR (₹)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
  { code: "CAD", symbol: "C$", label: "CAD (C$)" },
  { code: "AED", symbol: "AED", label: "AED" },
];

const SERVICE_META: Record<string, { icon: any; color: string; label: string }> = {
  "Search Engine Optimization": { icon: Search, color: "#2383e2", label: "SEO Optimization" },
  "Website Development": { icon: Code2, color: "#9333ea", label: "Web Development" },
  "Pay Per Click (Ads)": { icon: TrendingUp, color: "#16a34a", label: "PPC Paid Ads" },
  "Social Media Optimization": { icon: Sparkles, color: "#ec4899", label: "Social Media" },
  "App Development": { icon: Smartphone, color: "#ea580c", label: "App Development" },
  "Custom Softwares": { icon: Zap, color: "#0891b2", label: "Custom Software" },
};

const SEO_SUB_TYPES = [
  "Technical SEO",
  "Local SEO",
  "E-Commerce SEO",
  "International SEO",
  "Content SEO",
  "AI Overviews (GEO SEO)",
];

const WEB_DEV_SUB_TYPES = [
  "Next.js App Router",
  "WordPress Custom Theme",
  "Shopify E-Commerce",
  "Custom Web Application",
];

const PPC_SUB_TYPES = [
  "Google Ads",
  "Meta Ads (FB/IG)",
  "LinkedIn Ads",
  "Retargeting Campaigns",
];

const fmtCurr = (amount: number, currCode: string = "USD") => {
  const meta = CURRENCIES.find(c => c.code === currCode) || CURRENCIES[0];
  return `${meta.symbol}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount || 0)}`;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"portfolio" | "analytics">("portfolio");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Filters
  const [search, setSearch] = useState("");
  const [filterService, setFilterService] = useState("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Search Engine Optimization"]);
  const [selectedSeoSubTypes, setSelectedSeoSubTypes] = useState<string[]>(["Technical SEO", "Local SEO"]);
  const [selectedWebDevSubTypes, setSelectedWebDevSubTypes] = useState<string[]>(["Next.js App Router"]);
  const [selectedPpcSubTypes, setSelectedPpcSubTypes] = useState<string[]>(["Google Ads"]);
  const [billingType, setBillingType] = useState<BillingType>("One-Time");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("Paid");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planning");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (res.ok && data.success) {
        setProjects(data.projects || []);
      } else {
        toast.error("Failed to load projects");
      }
    } catch {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (srv: string) => {
    setSelectedServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const toggleSeoSubType = (sub: string) => {
    setSelectedSeoSubTypes(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const toggleWebDevSubType = (sub: string) => {
    setSelectedWebDevSubTypes(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const togglePpcSubType = (sub: string) => {
    setSelectedPpcSubTypes(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    setCreating(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          clientName,
          clientEmail,
          currency,
          services: selectedServices,
          serviceType: selectedServices[0],
          seoSubTypes: selectedSeoSubTypes,
          webDevSubTypes: selectedWebDevSubTypes,
          ppcSubTypes: selectedPpcSubTypes,
          billingType,
          paymentStatus,
          budget,
          startDate,
          dueDate,
          status,
          description,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Enterprise Project Initialized!");
        setShowCreateModal(false);
        resetForm();
        fetchProjects();
      } else {
        toast.error(data.error || "Failed to create project");
      }
    } catch {
      toast.error("Error creating project");
    } finally {
      setCreating(false);
    }
  };

  const resetForm = () => {
    setName("");
    setClientName("");
    setClientEmail("");
    setCurrency("USD");
    setSelectedServices(["Search Engine Optimization"]);
    setSelectedSeoSubTypes(["Technical SEO", "Local SEO"]);
    setSelectedWebDevSubTypes(["Next.js App Router"]);
    setSelectedPpcSubTypes(["Google Ads"]);
    setBillingType("One-Time");
    setPaymentStatus("Paid");
    setBudget("");
    setDueDate("");
    setStatus("Planning");
    setDescription("");
  };

  const handleDeleteProject = async (projectId: string, projectName: string) => {
    if (!confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
        setProjects(projects.filter(p => p.id !== projectId));
      }
    } catch {
      toast.error("Failed to delete project");
    }
  };

  // Filtered List
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filterService !== "all") {
        const hasService = Array.isArray(p.services) ? p.services.includes(filterService) : p.serviceType === filterService;
        if (!hasService) return false;
      }
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      if (filterPayment !== "all" && p.paymentStatus !== filterPayment) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.serviceType.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, filterService, filterStatus, filterPayment, search]);

  // Total portfolio value by currency
  const totalValueByCurrency = useMemo(() => {
    const map: Record<string, number> = {};
    projects.forEach(p => {
      const c = p.currency || "USD";
      map[c] = (map[c] || 0) + (Number(p.budget) || 0);
    });
    return map;
  }, [projects]);

  const activeProjectsCount = projects.filter(p => p.status === "In Progress" || p.status === "Planning").length;
  const paymentDueCount = projects.filter(p => p.paymentStatus === "Payment Due" || p.paymentStatus === "Overdue" || p.status === "Stopped").length;
  const subscriptionCount = projects.filter(p => p.billingType?.includes("Subscription")).length;

  if (loading) {
    return <AdminLoader message="Loading project portfolio..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />

      {/* ── Enterprise Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>

          <div className="hidden sm:flex bg-slate-100 rounded-sm p-1 gap-1">
            <button 
              onClick={() => setActiveTab("portfolio")} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === 'portfolio' ? 'bg-white shadow-xs text-[#2383e2]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <LayoutDashboard size={13} /> Project Portfolio
            </button>
            <button 
              onClick={() => setActiveTab("analytics")} 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-all cursor-pointer ${activeTab === 'analytics' ? 'bg-white shadow-xs text-[#2383e2]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <PieChart size={13} /> Service Analytics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button onClick={fetchProjects} className="p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer" title="Refresh">
            <RefreshCw size={14} />
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#2383e2] hover:bg-[#1c6ebf] text-white text-xs montserrat-medium transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={14} /> New Enterprise Project
          </button>
        </div>
      </header>

      <div className="w-full px-4 md:px-8 py-6 space-y-6 max-w-[1600px] mx-auto">

        {/* TAB 1: PORTFOLIO */}
        {activeTab === "portfolio" && (
          <>
            {/* Executive KPI Header Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-5 shadow-xs relative overflow-hidden">
                <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider block mb-1">Portfolio Valuation</span>
                <div className="space-y-0.5">
                  {Object.entries(totalValueByCurrency).map(([cCode, val]) => (
                    <p key={cCode} className="text-xl montserrat-medium text-slate-950">
                      {fmtCurr(val, cCode)} <span className="text-[10px] text-slate-400 font-normal">({cCode})</span>
                    </p>
                  ))}
                  {Object.keys(totalValueByCurrency).length === 0 && (
                    <p className="text-xl montserrat-medium text-slate-950">$0</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-5 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider">Active Contracts</span>
                  <Clock size={16} className="text-[#2383e2]" />
                </div>
                <h2 className="text-2xl md:text-3xl montserrat-medium text-slate-950 mt-2">{activeProjectsCount} Projects</h2>
                <p className="text-[11px] text-blue-600 mt-1">{subscriptionCount} Recurring Subscriptions</p>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-5 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider">Payment Alerts</span>
                  <AlertTriangle size={16} className="text-amber-500" />
                </div>
                <h2 className="text-2xl md:text-3xl montserrat-medium text-amber-600 mt-2">{paymentDueCount} Action Needed</h2>
                <p className="text-[11px] text-slate-500 mt-1">Payment Due / Overdue / Stopped</p>
              </div>

              <div className="bg-white rounded-sm border border-slate-200 p-4 md:p-5 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] montserrat-medium text-slate-400 uppercase tracking-wider">Total Portfolio</span>
                  <FolderKanban size={16} className="text-purple-600" />
                </div>
                <h2 className="text-2xl md:text-3xl montserrat-medium text-slate-950 mt-2">{projects.length} Campaigns</h2>
                <p className="text-[11px] text-slate-500 mt-1">All service lines tracked</p>
              </div>
            </div>

            {/* Service Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setFilterService("all")}
                className={`px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${filterService === "all" ? "bg-[#2383e2] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                All Services ({projects.length})
              </button>

              {Object.entries(SERVICE_META).map(([sKey, sMeta]) => {
                const count = projects.filter(p => (Array.isArray(p.services) ? p.services.includes(sKey) : p.serviceType === sKey)).length;
                const IconComp = sMeta.icon;
                return (
                  <button
                    key={sKey}
                    onClick={() => setFilterService(sKey)}
                    className={`px-3 py-1.5 rounded-sm text-xs montserrat-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${filterService === sKey ? "bg-[#2383e2] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >
                    <IconComp size={13} /> {sMeta.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white rounded-sm border border-slate-200 p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between shadow-xs">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search project name, client, or services..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#2383e2]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <select
                  value={filterPayment}
                  onChange={e => setFilterPayment(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-sm text-xs px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Payment Due">Payment Due</option>
                  <option value="Partial">Partial</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-sm text-xs px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Stopped">Stopped / Paused</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <div className="flex border border-slate-200 rounded-sm bg-slate-100 p-0.5">
                  <button onClick={() => setViewMode("table")} className={`px-2.5 py-1 rounded-sm text-[11px] montserrat-medium transition-colors ${viewMode === "table" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}>
                    Table
                  </button>
                  <button onClick={() => setViewMode("grid")} className={`px-2.5 py-1 rounded-sm text-[11px] montserrat-medium transition-colors ${viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"}`}>
                    Grid
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise Table View */}
            {loading ? (
              <div className="bg-white rounded-sm border border-slate-200 p-12 text-center text-slate-400">
                <Loader2 size={24} className="animate-spin text-[#2383e2] mx-auto mb-2" />
                <p className="text-xs">Loading enterprise portfolio...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-white rounded-sm border border-slate-200 p-12 text-center text-slate-400">
                <FolderKanban size={32} className="mx-auto mb-2 opacity-20 text-slate-900" />
                <p className="text-xs montserrat-medium">No project records found.</p>
                <button onClick={() => setShowCreateModal(true)} className="mt-3 px-3 py-1.5 bg-[#2383e2] text-white text-xs rounded-sm">
                  Add First Project
                </button>
              </div>
            ) : viewMode === "table" ? (
              <div className="bg-white rounded-sm border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-[10px] montserrat-medium text-slate-500 uppercase tracking-wider">
                        <th className="p-3">Project & Client</th>
                        <th className="p-3">Service Lines & Sub-Types</th>
                        <th className="p-3">Billing & Payment</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Contract Value</th>
                        <th className="p-3">Target Due</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredProjects.map((p) => {
                        const mainSrv = (p.services && p.services[0]) || p.serviceType;
                        const sMeta = SERVICE_META[mainSrv] || { icon: Search, color: "#64748b", label: mainSrv };
                        const IconComp = sMeta.icon;

                        return (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white shrink-0" style={{ backgroundColor: sMeta.color }}>
                                  <IconComp size={15} />
                                </div>
                                <div>
                                  <Link href={`/admin-dashboard/projects/${p.id}`} className="montserrat-medium text-slate-900 hover:text-[#2383e2] text-sm block">
                                    {p.name}
                                  </Link>
                                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                    <Building2 size={11} className="text-slate-400" /> {p.clientName}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="space-y-1">
                                <div className="flex flex-wrap gap-1">
                                  {(p.services || [p.serviceType]).map((srv) => (
                                    <span key={srv} className="text-[10px] montserrat-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm">
                                      {srv}
                                    </span>
                                  ))}
                                </div>
                                {p.seoSubTypes && p.seoSubTypes.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {p.seoSubTypes.map(sub => (
                                      <span key={sub} className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded-sm border border-blue-100">
                                        {sub}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="space-y-1">
                                <span className={`text-[10px] montserrat-medium px-2 py-0.5 rounded-sm ${
                                  p.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                                  p.paymentStatus === "Payment Due" ? "bg-amber-50 text-amber-600 border border-amber-200" :
                                  p.paymentStatus === "Overdue" ? "bg-red-50 text-red-600 border border-red-200" :
                                  "bg-slate-100 text-slate-600"
                                }`}>
                                  {p.paymentStatus || "Paid"}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-medium">
                                  {p.billingType || "One-Time"}
                                </span>
                              </div>
                            </td>

                            <td className="p-3">
                              <span className={`text-[10px] montserrat-medium px-2 py-0.5 rounded-sm ${
                                p.status === "Completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                                p.status === "In Progress" ? "bg-blue-50 text-blue-600 border border-blue-200" :
                                p.status === "Stopped" ? "bg-red-50 text-red-600 border border-red-200" :
                                "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}>
                                {p.status}
                              </span>
                            </td>

                            <td className="p-3 montserrat-medium text-slate-900">
                              {p.budget ? fmtCurr(Number(p.budget), p.currency) : "—"}
                            </td>

                            <td className="p-3 text-slate-500 text-[11px]">
                              {p.dueDate || "Not set"}
                            </td>

                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Link href={`/admin-dashboard/projects/${p.id}`} className="p-1.5 rounded-sm bg-blue-50 text-[#2383e2] hover:bg-blue-100 transition-colors" title="Workspace">
                                  <ExternalLink size={13} />
                                </Link>
                                <button onClick={() => handleDeleteProject(p.id, p.name)} className="p-1.5 rounded-sm bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((p) => {
                  const mainSrv = (p.services && p.services[0]) || p.serviceType;
                  const sMeta = SERVICE_META[mainSrv] || { icon: Search, color: "#64748b", label: mainSrv };

                  return (
                    <div key={p.id} className="bg-white rounded-sm border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] montserrat-medium px-2 py-0.5 rounded-sm text-white" style={{ backgroundColor: sMeta.color }}>
                            {sMeta.label}
                          </span>
                          <span className={`text-[10px] montserrat-medium px-2 py-0.5 rounded-sm ${
                            p.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                            p.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                            p.status === "Stopped" ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
                          }`}>
                            {p.status}
                          </span>
                        </div>

                        <Link href={`/admin-dashboard/projects/${p.id}`} className="text-base montserrat-medium text-slate-950 hover:text-[#2383e2] block mb-1">
                          {p.name}
                        </Link>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <User size={12} className="text-slate-400" /> {p.clientName}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[10px] montserrat-medium px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700">
                            {p.billingType || "One-Time"}
                          </span>
                          <span className={`text-[10px] montserrat-medium px-2 py-0.5 rounded-sm ${
                            p.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          }`}>
                            {p.paymentStatus || "Paid"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="montserrat-medium text-slate-900">{fmtCurr(Number(p.budget), p.currency)}</span>
                        <Link href={`/admin-dashboard/projects/${p.id}`} className="text-[#2383e2] montserrat-medium hover:underline">
                          Workspace &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* TAB 2: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-6">
            <h3 className="text-xs montserrat-medium text-slate-400 uppercase tracking-wider">Service Line Revenue Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SERVICE_META).map(([sKey, sMeta]) => {
                const catProjs = projects.filter(p => (Array.isArray(p.services) ? p.services.includes(sKey) : p.serviceType === sKey));
                const IconComp = sMeta.icon;

                return (
                  <div key={sKey} className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center text-white" style={{ backgroundColor: sMeta.color }}>
                        <IconComp size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm montserrat-medium text-slate-900">{sMeta.label}</h4>
                        <p className="text-xs text-slate-500">{catProjs.length} Active Contracts</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ── CREATE ENTERPRISE PROJECT MODAL ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-sm border border-slate-200 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FolderKanban className="text-[#2383e2]" size={18} />
                <h3 className="text-sm montserrat-medium text-slate-900">Initialize Enterprise Project</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-900 rounded-sm">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Project Name *</label>
                  <Input 
                    value={name} onChange={e => setName(e.target.value)} required
                    placeholder="e.g., Enterprise SEO & Next.js Website"
                    className="h-9 text-xs border-slate-200"
                  />
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Currency *</label>
                  <select 
                    value={currency} onChange={e => setCurrency(e.target.value)}
                    className="w-full h-9 bg-white border border-slate-200 rounded-sm px-2 text-xs text-slate-900 outline-none"
                  >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Multi-Service Checkbox Selection */}
              <div>
                <label className="montserrat-medium text-slate-700 block mb-1">Services Scope (Select Multiple) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(SERVICE_META).map(srv => {
                    const isChecked = selectedServices.includes(srv);
                    return (
                      <label key={srv} className={`flex items-center gap-2 p-2 rounded-sm border text-[11px] cursor-pointer transition-colors ${isChecked ? "bg-blue-50 border-blue-200 text-[#2383e2] montserrat-medium" : "bg-white border-slate-200 text-slate-700"}`}>
                        <input type="checkbox" checked={isChecked} onChange={() => toggleService(srv)} className="rounded text-[#2383e2]" />
                        <span className="truncate">{srv}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* SEO Sub-Services */}
              {selectedServices.includes("Search Engine Optimization") && (
                <div className="p-3 bg-blue-50/60 rounded-sm border border-blue-100 space-y-2">
                  <span className="text-[10px] montserrat-medium text-blue-700 uppercase tracking-wider block">SEO Specific Sub-Types</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {SEO_SUB_TYPES.map(sub => {
                      const isSubChecked = selectedSeoSubTypes.includes(sub);
                      return (
                        <label key={sub} className="flex items-center gap-1.5 text-[10px] text-slate-700 cursor-pointer">
                          <input type="checkbox" checked={isSubChecked} onChange={() => toggleSeoSubType(sub)} className="rounded text-[#2383e2]" />
                          <span>{sub}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Billing Model</label>
                  <select value={billingType} onChange={e => setBillingType(e.target.value as BillingType)} className="w-full h-9 bg-white border border-slate-200 rounded-sm px-2 text-xs text-slate-900 outline-none">
                    <option value="One-Time">One-Time Project</option>
                    <option value="Monthly Subscription">Monthly Subscription</option>
                    <option value="Quarterly Subscription">Quarterly Subscription</option>
                    <option value="Yearly Subscription">Yearly Subscription</option>
                  </select>
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Payment Status</label>
                  <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value as PaymentStatus)} className="w-full h-9 bg-white border border-slate-200 rounded-sm px-2 text-xs text-slate-900 outline-none">
                    <option value="Paid">Paid</option>
                    <option value="Payment Due">Payment Due</option>
                    <option value="Partial">Partial Payment</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Client Name</label>
                  <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Acme Corp" className="h-9 text-xs border-slate-200" />
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Client Email</label>
                  <Input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="client@acme.com" className="h-9 text-xs border-slate-200" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Contract Budget</label>
                  <Input value={budget} onChange={e => setBudget(e.target.value)} placeholder="2500" className="h-9 text-xs border-slate-200" />
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Start Date</label>
                  <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="h-9 text-xs border-slate-200" />
                </div>
                <div>
                  <label className="montserrat-medium text-slate-700 block mb-1">Target Due</label>
                  <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="h-9 text-xs border-slate-200" />
                </div>
              </div>

              <div>
                <label className="montserrat-medium text-slate-700 block mb-1">Description / Notes</label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Scope milestones & objectives..." className="text-xs border-slate-200 resize-none" />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-3 py-1.5 rounded-sm bg-slate-100 text-slate-600 hover:bg-slate-200">
                  Cancel
                </button>
                <button type="submit" disabled={creating} className="px-4 py-1.5 rounded-sm bg-[#2383e2] text-white hover:bg-[#1c6ebf] font-medium flex items-center gap-1">
                  {creating ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />} Initialize Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
