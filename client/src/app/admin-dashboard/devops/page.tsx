// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell,
// } from "recharts";
// import {
//   GitCommit, GitBranch, CheckCircle2, XCircle, Clock,
//   Zap, Globe, AlertTriangle, TrendingUp, TrendingDown, Calendar,
//   BarChart2, Activity, Package, ExternalLink,
//   Github, Server, ArrowUpRight, ArrowDownRight, Filter,
//   Circle, RefreshCw,
// } from "lucide-react";

// // ─── Mock Data ────────────────────────────────────────────────────────────────

// const MONTHLY_COMMITS = [
//   { month: "Oct", commits: 34 }, { month: "Nov", commits: 52 },
//   { month: "Dec", commits: 28 }, { month: "Jan", commits: 67 },
//   { month: "Feb", commits: 45 }, { month: "Mar", commits: 89 },
//   { month: "Apr", commits: 41 },
// ];

// const DAILY_COMMITS = [
//   { day: "Mon", commits: 8 }, { day: "Tue", commits: 14 },
//   { day: "Wed", commits: 6 }, { day: "Thu", commits: 19 },
//   { day: "Fri", commits: 11 }, { day: "Sat", commits: 3 },
//   { day: "Sun", commits: 2 },
// ];

// const RECENT_COMMITS = [
//   { hash: "a3f82c1", message: "feat: add gantt calendar view with monthly navigation", repo: "vaphers-board", branch: "main", time: "2h ago", additions: 312, deletions: 48 },
//   { hash: "d91e047", message: "fix: undo complete card not persisting across sessions", repo: "vaphers-board", branch: "main", time: "5h ago", additions: 27, deletions: 9 },
//   { hash: "7b2c983", message: "chore: update framer-motion to 11.x", repo: "portfolio", branch: "dev", time: "9h ago", additions: 4, deletions: 4 },
//   { hash: "c55a120", message: "feat: devops dashboard initial scaffold", repo: "devhub", branch: "feat/dashboard", time: "1d ago", additions: 890, deletions: 0 },
//   { hash: "ee82f34", message: "refactor: extract tag input into standalone component", repo: "vaphers-board", branch: "main", time: "1d ago", additions: 68, deletions: 71 },
//   { hash: "198d3a7", message: "fix: gantt timeline bar offset calculation on mobile", repo: "vaphers-board", branch: "main", time: "2d ago", additions: 12, deletions: 15 },
//   { hash: "0f4b99e", message: "docs: update README with new env variables", repo: "devhub", branch: "main", time: "3d ago", additions: 44, deletions: 8 },
// ];

// const VERCEL_PROJECTS = [
//   { name: "vaphers-board", status: "ready",    url: "vaphers-board.vercel.app",  lastDeploy: "2h ago",   framework: "Next.js", totalDeploys: 47, failedDeploys: 2,  avgBuildTime: "43s" },
//   { name: "portfolio",     status: "ready",    url: "vaphers.vercel.app",         lastDeploy: "2d ago",   framework: "Next.js", totalDeploys: 31, failedDeploys: 0,  avgBuildTime: "28s" },
//   { name: "devhub",        status: "building", url: "devhub.vercel.app",          lastDeploy: "just now", framework: "Next.js", totalDeploys: 8,  failedDeploys: 1,  avgBuildTime: "55s" },
//   { name: "api-gateway",   status: "error",    url: "api.vaphers.dev",            lastDeploy: "4h ago",   framework: "Node.js", totalDeploys: 19, failedDeploys: 4,  avgBuildTime: "18s" },
// ];

// const DEPLOY_HISTORY = [
//   { date: "Apr 2", success: 8, failed: 0 }, { date: "Apr 3", success: 5, failed: 1 },
//   { date: "Apr 4", success: 3, failed: 0 }, { date: "Apr 5", success: 7, failed: 2 },
//   { date: "Apr 6", success: 2, failed: 0 }, { date: "Apr 7", success: 6, failed: 1 },
//   { date: "Apr 8", success: 4, failed: 0 },
// ];

// const BUILD_TIME_TREND = [
//   { date: "Mar 30", time: 52 }, { date: "Apr 1", time: 48 }, { date: "Apr 2", time: 61 },
//   { date: "Apr 3", time: 44 }, { date: "Apr 4", time: 39 }, { date: "Apr 5", time: 55 },
//   { date: "Apr 6", time: 43 }, { date: "Apr 7", time: 38 }, { date: "Apr 8", time: 41 },
// ];

// const COMMIT_HEATMAP = Array.from({ length: 52 }, (_, week) =>
//   Array.from({ length: 7 }, (_, day) => ({
//     week, day,
//     count: Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 8),
//   }))
// ).flat();

// const LANG_DATA = [
//   { name: "TypeScript", value: 68, color: "#2383e2" },
//   { name: "CSS",        value: 18, color: "#135290" },
//   { name: "JSON",       value: 8,  color: "#64748b" },
//   { name: "Other",      value: 6,  color: "#cbd5e1" },
// ];

// // ─── Constants & Helpers ──────────────────────────────────────────────────────

// const BLUE      = "#2383e2";
// const BLUE_DARK = "#135290";

// function heatColor(count: number): string {
//   if (count === 0) return "#f1f5f9";
//   if (count <= 2)  return "#bfdbfe";
//   if (count <= 4)  return "#60a5fa";
//   if (count <= 6)  return BLUE;
//   return BLUE_DARK;
// }

// type PeriodKey = "7d" | "30d" | "90d" | "1y";
// type TabKey    = "overview" | "commits" | "deployments" | "projects";

// const stagger = {
//   container: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
//   item: {
//     hidden:  { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
//   },
// };

// // ─── Custom Recharts Tooltip ──────────────────────────────────────────────────

// function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string }) {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-xl text-[12px] font-mono">
//       <p className="font-black text-slate-700 mb-1">{label}</p>
//       {payload.map((p, i) => (
//         <p key={i} className="font-semibold" style={{ color: p.color ?? BLUE }}>
//           {p.name ? `${p.name}: ` : ""}{p.value}{p.name === "time" ? "s" : ""}
//         </p>
//       ))}
//     </div>
//   );
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────

// function StatCard({ label, value, sub, icon, trend }: {
//   label: string; value: string | number; sub?: string;
//   icon: React.ReactNode; trend?: "up" | "down" | "neutral";
// }) {
//   return (
//     <motion.div variants={stagger.item}
//       className="bg-white border border-slate-200 rounded-xl p-5 relative overflow-hidden hover:border-[#2383e2]/40 hover:shadow-lg hover:shadow-[#2383e2]/6 transition-all duration-300 group"
//     >
//       <div className="absolute top-0 right-0 w-28 h-28 rounded-bl-[80px] bg-gradient-to-bl from-[#2383e2]/6 to-transparent pointer-events-none" />
//       <div className="flex items-start justify-between mb-4">
//         <div className="p-2.5 rounded-xl bg-[#2383e2]/10 text-[#2383e2] group-hover:bg-[#2383e2] group-hover:text-white transition-all duration-300">
//           {icon}
//         </div>
//         {trend && (
//           <div className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full border ${
//             trend === "up"
//               ? "bg-emerald-50 text-emerald-600 border-emerald-200"
//               : trend === "down"
//               ? "bg-red-50 text-red-500 border-red-200"
//               : "bg-slate-100 text-slate-400 border-slate-200"
//           }`}>
//             {trend === "up" ? <ArrowUpRight size={10} /> : trend === "down" ? <ArrowDownRight size={10} /> : null}
//             {trend === "up" ? "+12%" : trend === "down" ? "-4%" : "±0%"}
//           </div>
//         )}
//       </div>
//       <p className="text-[32px] font-black text-slate-900 leading-none mb-1.5 tracking-tight">{value}</p>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{label}</p>
//       {sub && <p className="text-[11px] text-slate-400 mt-1">{sub}</p>}
//     </motion.div>
//   );
// }

// function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
//   return (
//     <div className="flex items-end justify-between mb-5">
//       <div>
//         <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-[0.18em]">{title}</h2>
//         {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
//       </div>
//       {action}
//     </div>
//   );
// }

// function ProjectStatusDot({ status }: { status: string }) {
//   const map: Record<string, { color: string; bg: string; label: string; pulse: boolean }> = {
//     ready:    { color: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200 text-emerald-700", label: "Ready",    pulse: false },
//     building: { color: "bg-amber-400",  bg: "bg-amber-50 border-amber-200 text-amber-700",       label: "Building", pulse: true  },
//     error:    { color: "bg-red-500",    bg: "bg-red-50 border-red-200 text-red-600",              label: "Error",    pulse: false },
//     canceled: { color: "bg-slate-400",  bg: "bg-slate-100 border-slate-200 text-slate-500",       label: "Canceled", pulse: false },
//   };
//   const cfg = map[status] ?? map.canceled;
//   return (
//     <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-black uppercase tracking-wide ${cfg.bg}`}>
//       <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${cfg.color}`}>
//         {cfg.pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.color} opacity-60`} />}
//       </span>
//       {cfg.label}
//     </div>
//   );
// }

// // ─── Main Dashboard ───────────────────────────────────────────────────────────

// export default function DevOpsDashboard() {
//   const [activeTab, setActiveTab]     = useState<TabKey>("overview");
//   const [commitPeriod, setPeriod]     = useState<PeriodKey>("30d");
//   const [refreshing, setRefreshing]   = useState(false);
//   const [lastRefresh, setLastRefresh] = useState("just now");

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => { setRefreshing(false); setLastRefresh("just now"); }, 1200);
//   };

//   const weeks: (typeof COMMIT_HEATMAP)[] = [];
//   for (let w = 0; w < 52; w++) weeks.push(COMMIT_HEATMAP.filter(d => d.week === w));

//   const totalCommits  = MONTHLY_COMMITS.reduce((a, b) => a + b.commits, 0);
//   const totalDeploys  = VERCEL_PROJECTS.reduce((a, b) => a + b.totalDeploys, 0);
//   const failedDeploys = VERCEL_PROJECTS.reduce((a, b) => a + b.failedDeploys, 0);
//   const successRate   = Math.round(((totalDeploys - failedDeploys) / totalDeploys) * 100);

//   const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
//     { key: "overview",     label: "Overview",     icon: <Activity size={13} />    },
//     { key: "commits",      label: "Commits",      icon: <GitCommit size={13} />   },
//     { key: "deployments",  label: "Deployments",  icon: <Zap size={13} />         },
//     { key: "projects",     label: "Projects",     icon: <Globe size={13} />       },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: "'DM Mono', 'Fira Code', ui-monospace, monospace" }}>
//       <style>{`
//         * { scrollbar-width: none; }
//         *::-webkit-scrollbar { display: none; }
//       `}</style>

//       {/* ── Header ── */}
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
//         <div className="max-w-[1360px] mx-auto px-6 py-0 flex items-stretch gap-0 h-14">

//           {/* Logo block */}
//           <div className="flex items-center gap-3 pr-6 border-r border-slate-200 mr-4 shrink-0">
//             <div className="w-7 h-7 rounded-lg bg-[#2383e2] flex items-center justify-center shadow-md shadow-[#2383e2]/30">
//               <Activity size={14} className="text-white" />
//             </div>
//             <div>
//               <p className="text-[13px] font-black text-slate-900 uppercase tracking-[0.15em] leading-none">DevHub</p>
//               <p className="text-[8px] text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Operations</p>
//             </div>
//           </div>

//           {/* Nav */}
//           <nav className="flex items-center gap-0">
//             {TABS.map(tab => (
//               <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//                 className={`relative flex items-center gap-2 px-4 h-full text-[11px] font-black uppercase tracking-widest transition-colors
//                   ${activeTab === tab.key ? "text-[#2383e2]" : "text-slate-400 hover:text-slate-700"}`}
//               >
//                 {tab.icon}
//                 <span className="hidden sm:inline">{tab.label}</span>
//                 {activeTab === tab.key && (
//                   <motion.div layoutId="tab-indicator"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2383e2] rounded-full"
//                     transition={{ type: "spring", stiffness: 500, damping: 35 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Right side */}
//           <div className="ml-auto flex items-center gap-3">
//             <div className="hidden md:flex items-center gap-2">
//               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
//                 <Github size={10} /> GitHub
//               </div>
//               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2383e2] text-white text-[9px] font-black uppercase tracking-widest shadow-sm shadow-[#2383e2]/30">
//                 <Zap size={10} /> Vercel
//               </div>
//             </div>
//             <span className="text-[10px] text-slate-400 hidden lg:block">Synced {lastRefresh}</span>
//             <button onClick={handleRefresh}
//               className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#2383e2] hover:border-[#2383e2]/50 transition-colors">
//               <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ── Main ── */}
//       <main className="max-w-[1360px] mx-auto px-6 py-8">
//         <AnimatePresence mode="wait">

//           {/* ══ OVERVIEW ══════════════════════════════════════════════════ */}
//           {activeTab === "overview" && (
//             <motion.div key="overview" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

//               {/* KPI row */}
//               <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//                 <StatCard label="Total Commits"    value={totalCommits}       sub="Last 7 months"       icon={<GitCommit size={17} />}    trend="up"      />
//                 <StatCard label="Total Deploys"    value={totalDeploys}       sub="All projects"        icon={<Zap size={17} />}          trend="up"      />
//                 <StatCard label="Success Rate"     value={`${successRate}%`}  sub={`${failedDeploys} failed`} icon={<CheckCircle2 size={17} />} trend="neutral" />
//                 <StatCard label="Active Projects"  value={VERCEL_PROJECTS.length} sub="On Vercel"      icon={<Globe size={17} />}                        />
//               </div>

//               {/* Charts */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

//                 {/* Commit area */}
//                 <motion.div variants={stagger.item} className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Commits / Month" sub="GitHub — 7-month rolling" action={
//                     <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
//                       <TrendingUp size={10} /> +23% vs prior
//                     </div>
//                   } />
//                   <ResponsiveContainer width="100%" height={210}>
//                     <AreaChart data={MONTHLY_COMMITS} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                       <defs>
//                         <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%"  stopColor={BLUE} stopOpacity={0.18} />
//                           <stop offset="95%" stopColor={BLUE} stopOpacity={0}    />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                       <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Area type="monotone" dataKey="commits" stroke={BLUE} strokeWidth={2.5} fill="url(#cg)"
//                         dot={{ fill: BLUE, r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5.5, fill: BLUE, strokeWidth: 2, stroke: "white" }} />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </motion.div>

//                 {/* Language pie */}
//                 <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Languages" sub="By commit volume" />
//                   <div className="flex justify-center mb-5">
//                     <PieChart width={150} height={150}>
//                       <Pie data={LANG_DATA} cx={71} cy={71} innerRadius={46} outerRadius={68} dataKey="value" paddingAngle={3} strokeWidth={0}>
//                         {LANG_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
//                       </Pie>
//                     </PieChart>
//                   </div>
//                   <div className="space-y-2.5">
//                     {LANG_DATA.map(l => (
//                       <div key={l.name} className="flex items-center gap-2.5">
//                         <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
//                         <span className="text-[11px] font-semibold text-slate-500 flex-1">{l.name}</span>
//                         <span className="text-[12px] font-black text-slate-800">{l.value}%</span>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Lower row */}
//               <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

//                 {/* Deploy bar */}
//                 <motion.div variants={stagger.item} className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Deploy History" sub="Success vs Failed — last 7 days" />
//                   <ResponsiveContainer width="100%" height={190}>
//                     <BarChart data={DEPLOY_HISTORY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                       <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="success" name="Success" fill={BLUE}     radius={[4,4,0,0]} maxBarSize={30} />
//                       <Bar dataKey="failed"  name="Failed"  fill="#ef4444"  radius={[4,4,0,0]} maxBarSize={30} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </motion.div>

//                 {/* Quick stats */}
//                 <motion.div variants={stagger.item} className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="At a Glance" />
//                   <div className="space-y-1">
//                     {[
//                       { label: "Avg Build Time",   value: "41s",  icon: <Clock size={12} />,         color: "text-[#2383e2]" },
//                       { label: "Fastest Build",     value: "18s",  icon: <Zap size={12} />,           color: "text-emerald-500" },
//                       { label: "Slowest Build",     value: "2m 4s",icon: <AlertTriangle size={12} />, color: "text-amber-500" },
//                       { label: "Deploys Today",     value: "4",    icon: <BarChart2 size={12} />,     color: "text-[#135290]" },
//                       { label: "Commits This Week", value: "41",   icon: <GitCommit size={12} />,     color: "text-slate-600" },
//                       { label: "Open Branches",     value: "7",    icon: <GitBranch size={12} />,     color: "text-slate-500" },
//                     ].map(s => (
//                       <div key={s.label} className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
//                         <span className={`${s.color} shrink-0`}>{s.icon}</span>
//                         <span className="text-[11px] text-slate-500 flex-1">{s.label}</span>
//                         <span className="text-[13px] font-black text-slate-800 tabular-nums">{s.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}

//           {/* ══ COMMITS ════════════════════════════════════════════════════ */}
//           {activeTab === "commits" && (
//             <motion.div key="commits" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

//               {/* Period selector */}
//               <motion.div variants={stagger.item} className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
//                   {(["7d","30d","90d","1y"] as PeriodKey[]).map(p => (
//                     <button key={p} onClick={() => setPeriod(p)}
//                       className={`px-4 py-1.5 rounded-md text-[11px] font-black uppercase tracking-widest transition-all
//                         ${commitPeriod === p ? "bg-[#2383e2] text-white shadow-sm shadow-[#2383e2]/30" : "text-slate-400 hover:text-slate-700"}`}>
//                       {p}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
//                   <Calendar size={11} />
//                   {commitPeriod === "7d" ? "Last 7 days" : commitPeriod === "30d" ? "Last 30 days" : commitPeriod === "90d" ? "Last 90 days" : "This year"}
//                 </div>
//               </motion.div>

//               {/* Heatmap */}
//               <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                 <SectionHeader title="Contribution Heatmap" sub="Daily commit activity — GitHub style" />
//                 <div className="overflow-x-auto pb-2">
//                   <div className="flex gap-1 min-w-max">
//                     {weeks.map((week, wi) => (
//                       <div key={wi} className="flex flex-col gap-1">
//                         {week.map((cell, di) => (
//                           <div key={di}
//                             title={`${cell.count} commit${cell.count !== 1 ? "s" : ""}`}
//                             className="w-3.5 h-3.5 rounded-sm hover:scale-110 transition-transform cursor-pointer"
//                             style={{ backgroundColor: heatColor(cell.count) }}
//                           />
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1.5 mt-3 justify-end">
//                   <span className="text-[10px] text-slate-400 mr-1">Less</span>
//                   {[0,2,4,6,8].map(v => (
//                     <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: heatColor(v) }} />
//                   ))}
//                   <span className="text-[10px] text-slate-400 ml-1">More</span>
//                 </div>
//               </motion.div>

//               {/* Charts */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Commits / Day" sub="This week" />
//                   <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={DAILY_COMMITS} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                       <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="commits" fill={BLUE} radius={[5,5,0,0]} maxBarSize={40}
//                         label={{ position: "top", fontSize: 10, fontWeight: 900, fill: "#64748b" }} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </motion.div>

//                 <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Monthly Trend" sub="7-month rolling" />
//                   <ResponsiveContainer width="100%" height={200}>
//                     <LineChart data={MONTHLY_COMMITS} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                       <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Line type="monotone" dataKey="commits" stroke={BLUE_DARK} strokeWidth={2.5}
//                         dot={{ fill: BLUE_DARK, r: 4, strokeWidth: 0 }}
//                         activeDot={{ r: 6, fill: BLUE, strokeWidth: 2, stroke: "white" }} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </motion.div>
//               </div>

//               {/* Recent commits */}
//               <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                 <SectionHeader title="Recent Commits" sub={`${RECENT_COMMITS.length} most recent — GitHub`} action={
//                   <button className="flex items-center gap-1.5 text-[10px] font-black text-[#2383e2] hover:text-[#1d7bc9] transition-colors uppercase tracking-widest">
//                     View all <ExternalLink size={10} />
//                   </button>
//                 } />
//                 <div>
//                   {RECENT_COMMITS.map((c, i) => (
//                     <motion.div key={c.hash}
//                       initial={{ opacity: 0, x: -16 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: i * 0.04, duration: 0.3 }}
//                       className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0 -mx-6 px-6 hover:bg-slate-50 transition-colors cursor-pointer group"
//                     >
//                       <div className="mt-0.5 p-2 rounded-lg bg-[#2383e2]/8 text-[#2383e2] group-hover:bg-[#2383e2] group-hover:text-white transition-all duration-200 shrink-0">
//                         <GitCommit size={13} />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[13px] font-semibold text-slate-800 leading-snug truncate">{c.message}</p>
//                         <div className="flex items-center gap-3 mt-1.5 flex-wrap">
//                           <code className="text-[10px] text-[#2383e2] bg-[#2383e2]/8 px-1.5 py-0.5 rounded font-mono">{c.hash}</code>
//                           <span className="flex items-center gap-1 text-[10px] text-slate-400"><Package size={9} />{c.repo}</span>
//                           <span className="flex items-center gap-1 text-[10px] text-slate-400"><GitBranch size={9} />{c.branch}</span>
//                           <span className="text-[10px] text-emerald-600 font-black">+{c.additions}</span>
//                           <span className="text-[10px] text-red-500 font-black">-{c.deletions}</span>
//                         </div>
//                       </div>
//                       <span className="text-[10px] text-slate-400 shrink-0 mt-1 tabular-nums">{c.time}</span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}

//           {/* ══ DEPLOYMENTS ════════════════════════════════════════════════ */}
//           {activeTab === "deployments" && (
//             <motion.div key="deployments" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

//               {/* KPIs */}
//               <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//                 <StatCard label="Total Deploys"  value={totalDeploys}              icon={<Zap size={17} />}         trend="up"      />
//                 <StatCard label="Successful"      value={totalDeploys - failedDeploys} icon={<CheckCircle2 size={17} />} trend="up"   />
//                 <StatCard label="Failed"          value={failedDeploys}             icon={<XCircle size={17} />}     trend="down"    />
//                 <StatCard label="Success Rate"    value={`${successRate}%`}         icon={<TrendingUp size={17} />}                  />
//               </div>

//               {/* Build time */}
//               <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                 <SectionHeader title="Build Time Trend" sub="Seconds per build — last 10 builds" action={
//                   <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
//                     <TrendingDown size={10} /> -13% Improving
//                   </div>
//                 } />
//                 <ResponsiveContainer width="100%" height={210}>
//                   <AreaChart data={BUILD_TIME_TREND} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                     <defs>
//                       <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%"  stopColor={BLUE_DARK} stopOpacity={0.14} />
//                         <stop offset="95%" stopColor={BLUE_DARK} stopOpacity={0}    />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                     <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <YAxis unit="s" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Area type="monotone" dataKey="time" name="time" stroke={BLUE_DARK} strokeWidth={2.5} fill="url(#bg2)"
//                       dot={{ fill: BLUE_DARK, r: 3.5, strokeWidth: 0 }}
//                       activeDot={{ r: 5.5, fill: BLUE_DARK, strokeWidth: 2, stroke: "white" }} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </motion.div>

//               {/* Two col */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Daily Deploys" sub="Success vs Failed — stacked" />
//                   <ResponsiveContainer width="100%" height={210}>
//                     <BarChart data={DEPLOY_HISTORY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                       <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="success" name="Success" stackId="s" fill={BLUE}    radius={[0,0,0,0]} maxBarSize={34} />
//                       <Bar dataKey="failed"  name="Failed"  stackId="s" fill="#ef4444" radius={[4,4,0,0]} maxBarSize={34} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </motion.div>

//                 <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                   <SectionHeader title="Per-Project Deploys" sub="Total builds per project" />
//                   <ResponsiveContainer width="100%" height={210}>
//                     <BarChart
//                       data={VERCEL_PROJECTS.map(p => ({ name: p.name.slice(0,14), total: p.totalDeploys, failed: p.failedDeploys }))}
//                       layout="vertical" margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
//                       <XAxis type="number" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                       <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: "#64748b" }} axisLine={false} tickLine={false} width={96} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="total"  name="Total"  fill={BLUE}    radius={[0,4,4,0]} maxBarSize={22} />
//                       <Bar dataKey="failed" name="Failed" fill="#f87171" radius={[0,4,4,0]} maxBarSize={22} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}

//           {/* ══ PROJECTS ═══════════════════════════════════════════════════ */}
//           {activeTab === "projects" && (
//             <motion.div key="projects" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

//               <motion.div variants={stagger.item} className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-[0.18em]">Vercel Projects</h2>
//                   <p className="text-[11px] text-slate-400 mt-0.5">
//                     {VERCEL_PROJECTS.length} projects ·&nbsp;
//                     <span className="text-emerald-600 font-bold">{VERCEL_PROJECTS.filter(p => p.status === "ready").length} healthy</span> ·&nbsp;
//                     <span className="text-amber-500 font-bold">{VERCEL_PROJECTS.filter(p => p.status === "building").length} building</span> ·&nbsp;
//                     <span className="text-red-500 font-bold">{VERCEL_PROJECTS.filter(p => p.status === "error").length} error</span>
//                   </p>
//                 </div>
//                 <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2383e2] hover:bg-[#1d7bc9] text-white text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm shadow-[#2383e2]/30">
//                   <Filter size={11} /> Filter
//                 </button>
//               </motion.div>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 {VERCEL_PROJECTS.map((project, i) => (
//                   <motion.div key={project.name} variants={stagger.item}
//                     className={`bg-white border rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group
//                       ${project.status === "error" ? "border-red-200 hover:border-red-300 hover:shadow-red-500/5"
//                       : project.status === "building" ? "border-amber-200 hover:border-amber-300 hover:shadow-amber-500/5"
//                       : "border-slate-200 hover:border-[#2383e2]/40 hover:shadow-[#2383e2]/6"}`}
//                   >
//                     {/* Header */}
//                     <div className="flex items-start justify-between mb-5">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-[16px] shrink-0 shadow-md
//                           ${project.status === "error" ? "bg-red-500 shadow-red-500/30" : project.status === "building" ? "bg-amber-400 shadow-amber-400/30" : "bg-[#2383e2] shadow-[#2383e2]/30"}`}>
//                           {project.name[0].toUpperCase()}
//                         </div>
//                         <div>
//                           <p className="text-[15px] font-black text-slate-800 leading-tight">{project.name}</p>
//                           <a href={`https://${project.url}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
//                             className="flex items-center gap-1 text-[10px] text-[#2383e2] hover:text-[#1d7bc9] transition-colors mt-0.5">
//                             {project.url} <ExternalLink size={8} />
//                           </a>
//                         </div>
//                       </div>
//                       <ProjectStatusDot status={project.status} />
//                     </div>

//                     {/* Stat grid */}
//                     <div className="grid grid-cols-3 gap-3 mb-5">
//                       {[
//                         { label: "Deploys", value: project.totalDeploys,  red: false },
//                         { label: "Failed",  value: project.failedDeploys, red: project.failedDeploys > 0 },
//                         { label: "Avg Build", value: project.avgBuildTime, red: false },
//                       ].map(s => (
//                         <div key={s.label} className="text-center bg-slate-50 border border-slate-100 rounded-xl py-3">
//                           <p className={`text-[18px] font-black leading-none tabular-nums ${s.red ? "text-red-500" : "text-slate-800"}`}>{s.value}</p>
//                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{s.label}</p>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Progress bar */}
//                     <div className="mb-4">
//                       <div className="flex items-center justify-between mb-1.5">
//                         <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Success rate</span>
//                         <span className="text-[11px] font-black text-slate-700 tabular-nums">
//                           {Math.round(((project.totalDeploys - project.failedDeploys) / project.totalDeploys) * 100)}%
//                         </span>
//                       </div>
//                       <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${((project.totalDeploys - project.failedDeploys) / project.totalDeploys) * 100}%` }}
//                           transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
//                           className={`h-full rounded-full ${project.failedDeploys === 0 ? "bg-emerald-500" : project.failedDeploys > 3 ? "bg-red-500" : "bg-[#2383e2]"}`}
//                         />
//                       </div>
//                     </div>

//                     {/* Footer */}
//                     <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                       <div className="flex items-center gap-1.5">
//                         <Clock size={10} className="text-slate-400" />
//                         <span className="text-[10px] text-slate-400">Last deploy:</span>
//                         <span className="text-[10px] font-black text-slate-600">{project.lastDeploy}</span>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <Server size={10} className="text-slate-400" />
//                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">{project.framework}</span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Aggregate deploy chart */}
//               <motion.div variants={stagger.item} className="bg-white border border-slate-200 rounded-xl p-6">
//                 <SectionHeader title="All Projects — Deployment Timeline" sub="Aggregated success vs failed builds" />
//                 <ResponsiveContainer width="100%" height={200}>
//                   <BarChart data={DEPLOY_HISTORY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                     <XAxis dataKey="date" tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                     <Tooltip content={<CustomTooltip />} />
//                     <Bar dataKey="success" name="Success" fill={BLUE}    radius={[4,4,0,0]} maxBarSize={30} />
//                     <Bar dataKey="failed"  name="Failed"  fill="#ef4444" radius={[4,4,0,0]} maxBarSize={30} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </motion.div>
//             </motion.div>
//           )}

//         </AnimatePresence>
//       </main>

//       {/* Footer */}
//       <footer className="max-w-[1360px] mx-auto px-6 py-5 mt-2 border-t border-slate-200">
//         <div className="flex items-center justify-between flex-wrap gap-3">
//           <p className="text-[10px] text-slate-400 uppercase tracking-widest">
//             Powered by&nbsp;
//             <span className="text-[#2383e2] font-black">GitHub API</span>
//             &nbsp;+&nbsp;
//             <span className="text-[#2383e2] font-black">Vercel API</span>
//             &nbsp;· Replace mock data with live calls
//           </p>
//           <div className="flex items-center gap-2 text-[10px] text-slate-400">
//             <Circle size={7} className="text-emerald-500 fill-emerald-500" />
//             All systems nominal
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }







"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import {
  GitCommit, GitBranch, CheckCircle2, XCircle, Clock,
  Zap, Globe, AlertTriangle, TrendingUp, TrendingDown, Calendar,
  BarChart2, Activity, Package, ExternalLink,
  Github, Server, ArrowUpRight, ArrowDownRight, Filter,
  Circle, RefreshCw,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHLY_COMMITS = [
  { month: "Oct", commits: 34 }, { month: "Nov", commits: 52 },
  { month: "Dec", commits: 28 }, { month: "Jan", commits: 67 },
  { month: "Feb", commits: 45 }, { month: "Mar", commits: 89 },
  { month: "Apr", commits: 41 },
];

const DAILY_COMMITS = [
  { day: "Mon", commits: 8 }, { day: "Tue", commits: 14 },
  { day: "Wed", commits: 6 }, { day: "Thu", commits: 19 },
  { day: "Fri", commits: 11 }, { day: "Sat", commits: 3 },
  { day: "Sun", commits: 2 },
];

const RECENT_COMMITS = [
  { hash: "a3f82c1", message: "feat: add gantt calendar view with monthly navigation", repo: "vaphers-board", branch: "main", time: "2h ago", additions: 312, deletions: 48 },
  { hash: "d91e047", message: "fix: undo complete card not persisting across sessions", repo: "vaphers-board", branch: "main", time: "5h ago", additions: 27, deletions: 9 },
  { hash: "7b2c983", message: "chore: update framer-motion to 11.x", repo: "portfolio", branch: "dev", time: "9h ago", additions: 4, deletions: 4 },
  { hash: "c55a120", message: "feat: devops dashboard initial scaffold", repo: "devhub", branch: "feat/dashboard", time: "1d ago", additions: 890, deletions: 0 },
  { hash: "ee82f34", message: "refactor: extract tag input into standalone component", repo: "vaphers-board", branch: "main", time: "1d ago", additions: 68, deletions: 71 },
  { hash: "198d3a7", message: "fix: gantt timeline bar offset calculation on mobile", repo: "vaphers-board", branch: "main", time: "2d ago", additions: 12, deletions: 15 },
  { hash: "0f4b99e", message: "docs: update README with new env variables", repo: "devhub", branch: "main", time: "3d ago", additions: 44, deletions: 8 },
];

const VERCEL_PROJECTS = [
  { name: "vaphers-board", status: "ready",    url: "vaphers-board.vercel.app",  lastDeploy: "2h ago",   framework: "Next.js", totalDeploys: 47, failedDeploys: 2,  avgBuildTime: "43s" },
  { name: "portfolio",     status: "ready",    url: "vaphers.vercel.app",        lastDeploy: "2d ago",   framework: "Next.js", totalDeploys: 31, failedDeploys: 0,  avgBuildTime: "28s" },
  { name: "devhub",        status: "building", url: "devhub.vercel.app",         lastDeploy: "just now", framework: "Next.js", totalDeploys: 8,  failedDeploys: 1,  avgBuildTime: "55s" },
  { name: "api-gateway",   status: "error",    url: "api.vaphers.dev",           lastDeploy: "4h ago",   framework: "Node.js", totalDeploys: 19, failedDeploys: 4,  avgBuildTime: "18s" },
];

const DEPLOY_HISTORY = [
  { date: "Apr 2", success: 8, failed: 0 }, { date: "Apr 3", success: 5, failed: 1 },
  { date: "Apr 4", success: 3, failed: 0 }, { date: "Apr 5", success: 7, failed: 2 },
  { date: "Apr 6", success: 2, failed: 0 }, { date: "Apr 7", success: 6, failed: 1 },
  { date: "Apr 8", success: 4, failed: 0 },
];

const BUILD_TIME_TREND = [
  { date: "Mar 30", time: 52 }, { date: "Apr 1", time: 48 }, { date: "Apr 2", time: 61 },
  { date: "Apr 3", time: 44 }, { date: "Apr 4", time: 39 }, { date: "Apr 5", time: 55 },
  { date: "Apr 6", time: 43 }, { date: "Apr 7", time: 38 }, { date: "Apr 8", time: 41 },
];

const COMMIT_HEATMAP = Array.from({ length: 52 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    week, day,
    count: Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 8),
  }))
).flat();

const LANG_DATA = [
  { name: "TypeScript", value: 68, color: "#2383e2" }, 
  { name: "CSS",        value: 18, color: "#1b6bba" }, 
  { name: "JSON",       value: 8,  color: "#94a3b8" }, 
  { name: "Other",      value: 6,  color: "#cbd5e1" }, 
];

// ─── Constants & Helpers ──────────────────────────────────────────────────────

const BLUE      = "#2383e2"; 
const BLUE_DARK = "#1b6bba"; 

function heatColor(count: number): string {
  if (count === 0) return "#f8fafc";
  if (count <= 2)  return "#2383e225"; 
  if (count <= 4)  return "#2383e260"; 
  if (count <= 6)  return BLUE;
  return BLUE_DARK;
}

type PeriodKey = "7d" | "30d" | "90d" | "1y";
type TabKey    = "overview" | "commits" | "deployments" | "projects";

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
  item: {
    hidden:  { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

// ─── Custom Recharts Tooltip ──────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-sm px-3 py-2 shadow-sm text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600" style={{ color: p.color ?? BLUE }}>
          {p.name ? `${p.name}: ` : ""}{p.value}{p.name === "time" ? "s" : ""}
        </p>
      ))}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, trend }: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; trend?: "up" | "down" | "neutral";
}) {
  return (
    <motion.div variants={stagger.item}
      className="bg-white border border-gray-200 rounded-sm p-5 hover:border-gray-300 transition-colors group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-gray-500 group-hover:text-[#2383e2] transition-colors">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-sm border ${
            trend === "up"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : trend === "down"
              ? "bg-red-50 text-red-700 border-red-100"
              : "bg-gray-50 text-gray-600 border-gray-200"
          }`}>
            {trend === "up" ? <ArrowUpRight size={12} /> : trend === "down" ? <ArrowDownRight size={12} /> : null}
            {trend === "up" ? "+12%" : trend === "down" ? "-4%" : "±0%"}
          </div>
        )}
      </div>
      <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </motion.div>
  );
}

function SectionHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-5 border-b border-gray-100 pb-3">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {sub && <p className="text-sm text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function ProjectStatusDot({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; label: string; pulse: boolean }> = {
    ready:    { color: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-100 text-emerald-700", label: "Ready",    pulse: false },
    building: { color: "bg-amber-400",  bg: "bg-amber-50 border-amber-100 text-amber-700",       label: "Building", pulse: true  },
    error:    { color: "bg-red-500",    bg: "bg-red-50 border-red-100 text-red-700",             label: "Error",    pulse: false },
    canceled: { color: "bg-gray-400",  bg: "bg-gray-50 border-gray-200 text-gray-600",       label: "Canceled", pulse: false },
  };
  const cfg = map[status] ?? map.canceled;
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm border text-xs font-medium ${cfg.bg}`}>
      <span className={`relative inline-flex w-2 h-2 rounded-full ${cfg.color}`}>
        {cfg.pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.color} opacity-60`} />}
      </span>
      {cfg.label}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DevOpsDashboard() {
  const [activeTab, setActiveTab]     = useState<TabKey>("overview");
  const [commitPeriod, setPeriod]     = useState<PeriodKey>("30d");
  const [refreshing, setRefreshing]   = useState(false);
  const [lastRefresh, setLastRefresh] = useState("just now");

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); setLastRefresh("just now"); }, 1200);
  };

  const weeks: (typeof COMMIT_HEATMAP)[] = [];
  for (let w = 0; w < 52; w++) weeks.push(COMMIT_HEATMAP.filter(d => d.week === w));

  const totalCommits  = MONTHLY_COMMITS.reduce((a, b) => a + b.commits, 0);
  const totalDeploys  = VERCEL_PROJECTS.reduce((a, b) => a + b.totalDeploys, 0);
  const failedDeploys = VERCEL_PROJECTS.reduce((a, b) => a + b.failedDeploys, 0);
  const successRate   = Math.round(((totalDeploys - failedDeploys) / totalDeploys) * 100);

  const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "overview",     label: "Overview",     icon: <Activity size={16} />    },
    { key: "commits",      label: "Commits",      icon: <GitCommit size={16} />   },
    { key: "deployments",  label: "Deployments",  icon: <Zap size={16} />         },
    { key: "projects",     label: "Projects",     icon: <Globe size={16} />       },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <style>{`
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-stretch h-14">

          {/* Logo block */}
          <div className="flex items-center gap-2 pr-6 border-r border-gray-200 mr-4 shrink-0">
            <div className="w-8 h-8 rounded-sm bg-[#2383e2] flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 leading-tight">DevHub</p>
              <p className="text-xs text-gray-500 leading-tight">Operations</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1 sm:gap-4 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-2 sm:px-3 h-full text-sm font-medium transition-colors
                  ${activeTab === tab.key ? "text-[#2383e2]" : "text-gray-500 hover:text-gray-900"}`}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2383e2]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                <Github size={12} /> GitHub
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-[#2383e2]/10 text-[#2383e2] text-xs font-medium border border-[#2383e2]/20">
                <Zap size={12} /> Vercel
              </div>
            </div>
            <span className="text-xs text-gray-500 hidden xl:block">Synced {lastRefresh}</span>
            <button onClick={handleRefresh}
              className="p-1.5 rounded-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">

          {/* ══ OVERVIEW ══════════════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

              {/* KPI row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <StatCard label="Total Commits"    value={totalCommits}       sub="Last 7 months"        icon={<GitCommit size={20} />}   trend="up"      />
                <StatCard label="Total Deploys"    value={totalDeploys}       sub="All projects"         icon={<Zap size={20} />}         trend="up"      />
                <StatCard label="Success Rate"     value={`${successRate}%`}  sub={`${failedDeploys} failed`} icon={<CheckCircle2 size={20} />} trend="neutral" />
                <StatCard label="Active Projects"  value={VERCEL_PROJECTS.length} sub="On Vercel"      icon={<Globe size={20} />}                       />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Commit area */}
                <motion.div variants={stagger.item} className="lg:col-span-2 bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Commits / Month" sub="GitHub — 7-month rolling" action={
                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100">
                      <TrendingUp size={12} /> +23% vs prior
                    </div>
                  } />
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={MONTHLY_COMMITS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={BLUE} stopOpacity={0.1} />
                          <stop offset="95%" stopColor={BLUE} stopOpacity={0}    />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="commits" stroke={BLUE} strokeWidth={2} fill="url(#cg)"
                        activeDot={{ r: 5, fill: BLUE, strokeWidth: 2, stroke: "white" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Language pie */}
                <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6 flex flex-col">
                  <SectionHeader title="Languages" sub="By commit volume" />
                  <div className="flex justify-center flex-1 items-center mb-6">
                    <PieChart width={180} height={180}>
                      <Pie data={LANG_DATA} cx={85} cy={85} innerRadius={60} outerRadius={85} dataKey="value" strokeWidth={0}>
                        {LANG_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </div>
                  <div className="space-y-3">
                    {LANG_DATA.map(l => (
                      <div key={l.name} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: l.color }} />
                        <span className="text-sm text-gray-600 flex-1">{l.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{l.value}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Lower row */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Deploy bar */}
                <motion.div variants={stagger.item} className="lg:col-span-3 bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Deploy History" sub="Success vs Failed — last 7 days" />
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={DEPLOY_HISTORY} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="success" name="Success" fill={BLUE}    radius={[2,2,0,0]} maxBarSize={40} />
                      <Bar dataKey="failed"  name="Failed"  fill="#ef4444" radius={[2,2,0,0]} maxBarSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Quick stats */}
                <motion.div variants={stagger.item} className="lg:col-span-2 bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="At a Glance" />
                  <div className="space-y-1 mt-2">
                    {[
                      { label: "Avg Build Time",   value: "41s",  icon: <Clock size={16} />,         color: "text-[#2383e2]" },
                      { label: "Fastest Build",    value: "18s",  icon: <Zap size={16} />,           color: "text-emerald-500" },
                      { label: "Slowest Build",    value: "2m 4s",icon: <AlertTriangle size={16} />, color: "text-amber-500" },
                      { label: "Deploys Today",    value: "4",    icon: <BarChart2 size={16} />,     color: "text-[#1b6bba]" },
                      { label: "Commits This Wk",  value: "41",   icon: <GitCommit size={16} />,     color: "text-gray-600" },
                      { label: "Open Branches",    value: "7",    icon: <GitBranch size={16} />,     color: "text-gray-500" },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                        <span className={`${s.color} shrink-0`}>{s.icon}</span>
                        <span className="text-sm text-gray-600 flex-1">{s.label}</span>
                        <span className="text-sm font-semibold text-gray-900">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ══ COMMITS ════════════════════════════════════════════════════ */}
          {activeTab === "commits" && (
            <motion.div key="commits" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

              {/* Period selector */}
              <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-sm p-1">
                  {(["7d","30d","90d","1y"] as PeriodKey[]).map(p => (
                    <button key={p} onClick={() => setPeriod(p)}
                      className={`px-4 py-1.5 rounded-sm text-sm font-medium transition-all
                        ${commitPeriod === p ? "bg-[#2383e2]/10 text-[#2383e2]" : "text-gray-500 hover:text-gray-700"}`}>
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  {commitPeriod === "7d" ? "Last 7 days" : commitPeriod === "30d" ? "Last 30 days" : commitPeriod === "90d" ? "Last 90 days" : "This year"}
                </div>
              </motion.div>

              {/* Heatmap */}
              <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                <SectionHeader title="Contribution Heatmap" sub="Daily commit activity — GitHub style" />
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-1.5 min-w-max mt-2">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1.5">
                        {week.map((cell, di) => (
                          <div key={di}
                            title={`${cell.count} commit${cell.count !== 1 ? "s" : ""}`}
                            className="w-3.5 h-3.5 rounded-sm hover:ring-2 ring-gray-300 transition-all cursor-pointer"
                            style={{ backgroundColor: heatColor(cell.count) }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 justify-end text-sm text-gray-500">
                  <span>Less</span>
                  {[0,2,4,6,8].map(v => (
                    <div key={v} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: heatColor(v) }} />
                  ))}
                  <span>More</span>
                </div>
              </motion.div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Commits / Day" sub="This week" />
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={DAILY_COMMITS} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="commits" fill={BLUE} radius={[2,2,0,0]} maxBarSize={48}
                        label={{ position: "top", fontSize: 12, fill: "#4b5563", fontWeight: 600 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Monthly Trend" sub="7-month rolling" />
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={MONTHLY_COMMITS} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="commits" stroke={BLUE_DARK} strokeWidth={2}
                        dot={{ fill: BLUE_DARK, r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: BLUE, strokeWidth: 2, stroke: "white" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* Recent commits */}
              <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                <SectionHeader title="Recent Commits" sub={`${RECENT_COMMITS.length} most recent — GitHub`} action={
                  <button className="flex items-center gap-1.5 text-sm font-medium text-[#2383e2] hover:text-[#1b6bba] transition-colors">
                    View all <ExternalLink size={14} />
                  </button>
                } />
                <div className="mt-2">
                  {RECENT_COMMITS.map((c, i) => (
                    <motion.div key={c.hash}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors -mx-5 sm:-mx-6 px-5 sm:px-6 cursor-pointer"
                    >
                      <div className="hidden sm:flex mt-0.5 p-2 rounded-sm bg-gray-100 text-gray-500 shrink-0">
                        <GitCommit size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-snug truncate">{c.message}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <code className="text-xs text-[#2383e2] bg-[#2383e2]/10 px-1.5 py-0.5 rounded-sm font-mono border border-[#2383e2]/20">{c.hash}</code>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><Package size={12} />{c.repo}</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500"><GitBranch size={12} />{c.branch}</span>
                          <span className="text-xs text-emerald-600 font-medium">+{c.additions}</span>
                          <span className="text-xs text-red-500 font-medium">-{c.deletions}</span>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400 shrink-0 mt-1 sm:mt-0">{c.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ══ DEPLOYMENTS ════════════════════════════════════════════════ */}
          {activeTab === "deployments" && (
            <motion.div key="deployments" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                <StatCard label="Total Deploys"  value={totalDeploys}              icon={<Zap size={20} />}         trend="up"      />
                <StatCard label="Successful"      value={totalDeploys - failedDeploys} icon={<CheckCircle2 size={20} />} trend="up"   />
                <StatCard label="Failed"          value={failedDeploys}             icon={<XCircle size={20} />}     trend="down"    />
                <StatCard label="Success Rate"    value={`${successRate}%`}         icon={<TrendingUp size={20} />}                 />
              </div>

              {/* Build time */}
              <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                <SectionHeader title="Build Time Trend" sub="Seconds per build — last 10 builds" action={
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-sm border border-emerald-100">
                    <TrendingDown size={12} /> -13% Improving
                  </div>
                } />
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={BUILD_TIME_TREND} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={BLUE_DARK} stopOpacity={0.1} />
                        <stop offset="95%" stopColor={BLUE_DARK} stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis unit="s" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="time" name="time" stroke={BLUE_DARK} strokeWidth={2} fill="url(#bg2)"
                      activeDot={{ r: 5, fill: BLUE_DARK, strokeWidth: 2, stroke: "white" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Two col */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Daily Deploys" sub="Success vs Failed — stacked" />
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={DEPLOY_HISTORY} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="success" name="Success" stackId="s" fill={BLUE}    radius={[0,0,0,0]} maxBarSize={48} />
                      <Bar dataKey="failed"  name="Failed"  stackId="s" fill="#ef4444" radius={[2,2,0,0]} maxBarSize={48} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                  <SectionHeader title="Per-Project Deploys" sub="Total builds per project" />
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                      data={VERCEL_PROJECTS.map(p => ({ name: p.name.slice(0,14), total: p.totalDeploys, failed: p.failedDeploys }))}
                      layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#4b5563" }} axisLine={false} tickLine={false} width={100} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: '#f3f4f6'}} />
                      <Bar dataKey="total"  name="Total"  fill={BLUE}    radius={[0,2,2,0]} maxBarSize={28} />
                      <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[0,2,2,0]} maxBarSize={28} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ══ PROJECTS ═══════════════════════════════════════════════════ */}
          {activeTab === "projects" && (
            <motion.div key="projects" initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} variants={stagger.container} className="space-y-6">

              <motion.div variants={stagger.item} className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Vercel Projects</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {VERCEL_PROJECTS.length} projects ·&nbsp;
                    <span className="text-emerald-600 font-medium">{VERCEL_PROJECTS.filter(p => p.status === "ready").length} healthy</span> ·&nbsp;
                    <span className="text-amber-600 font-medium">{VERCEL_PROJECTS.filter(p => p.status === "building").length} building</span> ·&nbsp;
                    <span className="text-red-600 font-medium">{VERCEL_PROJECTS.filter(p => p.status === "error").length} error</span>
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Filter size={16} /> Filter
                </button>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {VERCEL_PROJECTS.map((project, i) => (
                  <motion.div key={project.name} variants={stagger.item}
                    className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6 hover:border-gray-300 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-white font-semibold text-lg shrink-0
                          ${project.status === "error" ? "bg-red-500" : project.status === "building" ? "bg-amber-500" : "bg-[#2383e2]"}`}>
                          {project.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-gray-900">{project.name}</p>
                          <a href={`https://${project.url}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1 text-sm text-[#2383e2] hover:text-[#1b6bba] transition-colors mt-0.5">
                            {project.url} <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                      <ProjectStatusDot status={project.status} />
                    </div>

                    {/* Stat grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Deploys", value: project.totalDeploys,  red: false },
                        { label: "Failed",  value: project.failedDeploys, red: project.failedDeploys > 0 },
                        { label: "Avg Build", value: project.avgBuildTime, red: false },
                      ].map(s => (
                        <div key={s.label} className="text-center bg-gray-50 border border-gray-100 rounded-sm py-4">
                          <p className={`text-xl font-semibold leading-none ${s.red ? "text-red-600" : "text-gray-900"}`}>{s.value}</p>
                          <p className="text-xs font-medium text-gray-500 mt-2">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500 font-medium">Success Rate</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {Math.round(((project.totalDeploys - project.failedDeploys) / project.totalDeploys) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((project.totalDeploys - project.failedDeploys) / project.totalDeploys) * 100}%` }}
                          transition={{ delay: i * 0.1 + 0.1, duration: 0.6, ease: "easeOut" }}
                          className={`h-full rounded-sm ${project.failedDeploys === 0 ? "bg-emerald-500" : project.failedDeploys > 3 ? "bg-red-500" : "bg-[#2383e2]"}`}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-500">Last deploy:</span>
                        <span className="font-medium text-gray-700">{project.lastDeploy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Server size={14} />
                        <span>{project.framework}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Aggregate deploy chart */}
              <motion.div variants={stagger.item} className="bg-white border border-gray-200 rounded-sm p-5 sm:p-6">
                <SectionHeader title="All Projects — Deployment Timeline" sub="Aggregated success vs failed builds" />
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={DEPLOY_HISTORY} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f3f4f6'}} />
                    <Bar dataKey="success" name="Success" fill={BLUE}    radius={[2,2,0,0]} maxBarSize={48} />
                    <Bar dataKey="failed"  name="Failed"  fill="#ef4444" radius={[2,2,0,0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-8 py-6 mt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-medium text-gray-700">GitHub API</span> & <span className="font-medium text-gray-700">Vercel API</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Circle size={8} className="text-emerald-500 fill-emerald-500" />
            All systems nominal
          </div>
        </div>
      </footer>
    </div>
  );
}