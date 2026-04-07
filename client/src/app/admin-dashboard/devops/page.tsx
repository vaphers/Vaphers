"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  GitCommit, 
  Box, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowUpRight,
  Activity
} from "lucide-react";

// Assuming standard shadcn/ui imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Mock Data ---
const performanceData = [
  { name: "Mon", pushes: 4, builds: 5, failures: 0 },
  { name: "Tue", pushes: 7, builds: 8, failures: 2 },
  { name: "Wed", pushes: 5, builds: 5, failures: 0 },
  { name: "Thu", pushes: 12, builds: 14, failures: 3 },
  { name: "Fri", pushes: 8, builds: 9, failures: 1 },
  { name: "Sat", pushes: 2, builds: 2, failures: 0 },
  { name: "Sun", pushes: 3, builds: 4, failures: 1 },
];

const recentCommits = [
  { id: "a1b2c3d", message: "feat: implement continuous deployment pipeline", branch: "main", time: "2 hours ago" },
  { id: "f4e5d6c", message: "fix: resolve pgvector indexing issue", branch: "main", time: "5 hours ago" },
  { id: "b7a890f", message: "chore: update clerk webhook handlers", branch: "auth-refactor", time: "1 day ago" },
  { id: "c1d2e3f", message: "feat: add multi-tenant schema to prisma", branch: "main", time: "1 day ago" },
  { id: "e4f5a6b", message: "fix: gsaps animations on landing page", branch: "ui-updates", time: "2 days ago" },
];

const recentBuilds = [
  { id: "bld_12345", project: "erp-core", status: "success", duration: "1m 42s", time: "2 hours ago" },
  { id: "bld_12346", project: "analytics-dashboard", status: "error", duration: "45s", time: "4 hours ago" },
  { id: "bld_12347", project: "erp-core", status: "success", duration: "1m 38s", time: "5 hours ago" },
  { id: "bld_12348", project: "vaphers-web", status: "success", duration: "2m 10s", time: "1 day ago" },
];

// --- Animation Variants (Fixed TypeScript Error) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function DevOpsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">DevOps Overview</h1>
            <p className="text-slate-500 mt-1">Pipeline health, build frequency, and commit history.</p>
          </div>
          <Button className="rounded-sm bg-[#2383e2] hover:bg-[#1d7bc9] text-white transition-colors duration-200">
            Trigger Manual Build
          </Button>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">Avg Daily Pushes</p>
                <GitCommit className="h-4 w-4 text-[#135290]" />
              </div>
              <div className="text-2xl font-bold text-slate-900">5.8</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">Avg Daily Builds</p>
                <Box className="h-4 w-4 text-[#135290]" />
              </div>
              <div className="text-2xl font-bold text-slate-900">6.7</div>
              <p className="text-xs text-emerald-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" /> +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">Avg Build Breaks/Day</p>
                <AlertTriangle className="h-4 w-4 text-rose-500" />
              </div>
              <div className="text-2xl font-bold text-slate-900">1.0</div>
              <p className="text-xs text-slate-500 mt-1">Industry standard: &lt; 2.0</p>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-slate-500">Pipeline Success Rate</p>
                <Activity className="h-4 w-4 text-[#135290]" />
              </div>
              <div className="text-2xl font-bold text-slate-900">85.1%</div>
              <p className="text-xs text-rose-500 flex items-center mt-1">
                -2.3% from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1 rounded-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Push & Build Frequency</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBuilds" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#135290" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#135290" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '2px', border: '1px solid #e2e8f0', color: '#0f172a' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Area type="monotone" dataKey="builds" stroke="#135290" strokeWidth={2} fillOpacity={1} fill="url(#colorBuilds)" />
                  <Line type="monotone" dataKey="pushes" stroke="#2383e2" strokeWidth={2} dot={{ r: 4, fill: '#2383e2' }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 rounded-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Build Failures Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '2px', border: '1px solid #e2e8f0', color: '#0f172a' }}
                  />
                  <Line type="stepAfter" dataKey="failures" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: '#ef4444' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lists Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GitHub Commits */}
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-900 flex items-center">
                <GitCommit className="mr-2 h-5 w-5 text-[#135290]" />
                Recent GitHub Commits
              </CardTitle>
              <Button variant="ghost" className="rounded-sm text-[#2383e2] hover:text-[#1d7bc9] hover:bg-slate-100 text-sm h-8">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px] pr-4 rounded-sm">
                <div className="space-y-4 mt-4">
                  {recentCommits.map((commit) => (
                    <div key={commit.id} className="flex flex-col border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm text-slate-900 truncate max-w-[280px]">
                          {commit.message}
                        </span>
                        <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded-sm">
                          {commit.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                        <span className="flex items-center">
                          <GitCommit className="h-3 w-3 mr-1" /> {commit.branch}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {commit.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Vercel Builds */}
          <Card className="rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-slate-900 flex items-center">
                <Box className="mr-2 h-5 w-5 text-[#135290]" />
                Recent Vercel Builds
              </CardTitle>
              <Button variant="ghost" className="rounded-sm text-[#2383e2] hover:text-[#1d7bc9] hover:bg-slate-100 text-sm h-8">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px] pr-4 rounded-sm">
                <div className="space-y-4 mt-4">
                  {recentBuilds.map((build) => (
                    <div key={build.id} className="flex flex-col border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm text-slate-900">
                          {build.project}
                        </span>
                        {build.status === "success" ? (
                          <Badge className="rounded-sm bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Success
                          </Badge>
                        ) : (
                          <Badge className="rounded-sm bg-rose-100 text-rose-700 hover:bg-rose-100 border-none">
                            <XCircle className="w-3 h-3 mr-1" /> Failed
                          </Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-500">
                        <span className="font-mono">{build.id}</span>
                        <div className="flex space-x-3">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {build.duration}
                          </span>
                          <span>{build.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
}