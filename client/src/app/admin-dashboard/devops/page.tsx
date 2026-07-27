"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  GitCommit, 
  Zap, 
  Globe, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Github, 
  Server,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers
} from "lucide-react";
import AdminLoader from "../Components/AdminLoader";

const RECENT_COMMITS = [
  { hash: "a3f82c1", message: "feat: add gantt calendar view with monthly navigation", repo: "vaphers-board", branch: "main", time: "2h ago", additions: 312, deletions: 48 },
  { hash: "d91e047", message: "fix: complete card persistence across sessions", repo: "vaphers-board", branch: "main", time: "5h ago", additions: 27, deletions: 9 },
  { hash: "7b2c983", message: "chore: update framer-motion to latest release", repo: "portfolio", branch: "dev", time: "9h ago", additions: 4, deletions: 4 },
  { hash: "c55a120", message: "feat: devops dashboard initial scaffold", repo: "devhub", branch: "main", time: "1d ago", additions: 890, deletions: 0 },
];

const VERCEL_PROJECTS = [
  { name: "vaphers-client", status: "ready", url: "vaphers.com", lastDeploy: "2h ago", framework: "Next.js 15", totalDeploys: 147, avgBuildTime: "43s" },
  { name: "vaphers-api", status: "ready", url: "api.vaphers.com", lastDeploy: "5h ago", framework: "Node.js", totalDeploys: 89, avgBuildTime: "24s" },
  { name: "admin-portal", status: "building", url: "admin.vaphers.com", lastDeploy: "just now", framework: "Next.js 15", totalDeploys: 62, avgBuildTime: "38s" },
];

export default function DevOpsPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  if (loading) {
    return <AdminLoader message="Connecting to Vercel & GitHub APIs..." />;
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 pb-12 montserrat-regular">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        .montserrat-regular { font-family: 'Montserrat', sans-serif !important; font-weight: 400 !important; }
        .montserrat-medium { font-family: 'Montserrat', sans-serif !important; font-weight: 500 !important; }
      ` }} />

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl tracking-tight text-slate-900 leading-none" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            V<span className="text-[#2383e2]">aphers</span>
          </h1>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline border-l border-slate-200 pl-4">
            DevOps & Infrastructure
          </span>
        </div>

        <button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs montserrat-medium transition-colors cursor-pointer"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin text-[#2383e2]" : ""} /> Sync Telemetry
        </button>
      </header>

      <div className="w-full px-4 md:px-8 space-y-6">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] montserrat-medium uppercase tracking-wider">System Health</span>
              <ShieldCheck size={16} className="text-emerald-500" />
            </div>
            <p className="text-xl font-bold text-slate-900">100% Operational</p>
            <p className="text-xs text-slate-500 mt-1">All production edges active</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] montserrat-medium uppercase tracking-wider">Total Deployments</span>
              <Zap size={16} className="text-[#2383e2]" />
            </div>
            <p className="text-xl font-bold text-slate-900">298 Builds</p>
            <p className="text-xs text-slate-500 mt-1">Avg build time 35s</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] montserrat-medium uppercase tracking-wider">Active Repos</span>
              <Github size={16} className="text-purple-600" />
            </div>
            <p className="text-xl font-bold text-slate-900">4 Repositories</p>
            <p className="text-xs text-slate-500 mt-1">Main branch protected</p>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] montserrat-medium uppercase tracking-wider">CDN Bandwidth</span>
              <Server size={16} className="text-amber-500" />
            </div>
            <p className="text-xl font-bold text-slate-900">1.4 TB / mo</p>
            <p className="text-xs text-slate-500 mt-1">Vercel Edge Network</p>
          </div>
        </div>

        {/* Vercel Projects List */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap size={16} className="text-[#2383e2]" /> Vercel Edge Deployments
            </h3>
            <span className="text-[11px] montserrat-medium text-slate-500">Live Telemetry</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] montserrat-medium text-slate-500 uppercase tracking-wider">
                  <th className="p-3">Project</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Framework</th>
                  <th className="p-3">Last Deploy</th>
                  <th className="p-3">Total Builds</th>
                  <th className="p-3 text-right">URL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {VERCEL_PROJECTS.map((proj) => (
                  <tr key={proj.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                      <Layers size={14} className="text-[#2383e2]" /> {proj.name}
                    </td>
                    <td className="p-3">
                      {proj.status === "ready" ? (
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 font-medium text-[11px] border border-emerald-100 inline-flex items-center gap-1">
                          <CheckCircle2 size={12} /> Ready
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 font-medium text-[11px] border border-amber-100 inline-flex items-center gap-1 animate-pulse">
                          <Clock size={12} /> Building
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-600">{proj.framework}</td>
                    <td className="p-3 text-slate-500">{proj.lastDeploy}</td>
                    <td className="p-3 text-slate-600 font-medium">{proj.totalDeploys} deploys</td>
                    <td className="p-3 text-right">
                      <a href={`https://${proj.url}`} target="_blank" rel="noreferrer" className="text-[#2383e2] hover:underline inline-flex items-center gap-1 font-medium">
                        {proj.url} <ArrowUpRight size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Commits Stream */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
            <GitCommit size={16} className="text-purple-600" /> Recent Git Commits
          </h3>

          <div className="space-y-3">
            {RECENT_COMMITS.map((c) => (
              <div key={c.hash} className="p-3 bg-slate-50 rounded-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">{c.hash}</span>
                  <p className="font-medium text-slate-900">{c.message}</p>
                </div>
                <div className="flex items-center gap-4 text-slate-500 text-[11px] shrink-0">
                  <span className="text-emerald-600 font-medium">+{c.additions}</span>
                  <span className="text-rose-600 font-medium">-{c.deletions}</span>
                  <span>{c.repo} ({c.branch})</span>
                  <span className="text-slate-400">{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}