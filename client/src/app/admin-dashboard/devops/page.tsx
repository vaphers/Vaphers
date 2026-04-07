"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";
import { 
  ArrowUpRight, 
  Plus, 
  GitCommit, 
  Play, 
  Square,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video
} from "lucide-react";

// Assuming standard shadcn/ui imports are available in your project
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Mock Data ---
const performanceData = [
  { name: "S", builds: 4, type: "striped" },
  { name: "M", builds: 7, type: "solid" },
  { name: "T", builds: 5, type: "highlight", label: "74%" },
  { name: "W", builds: 9, type: "dark" },
  { name: "T", builds: 6, type: "striped" },
  { name: "F", builds: 5, type: "striped" },
  { name: "S", builds: 3, type: "striped" },
];

const recentCommits = [
  { id: "a1b2c3d", message: "Develop API Endpoints", branch: "main", date: "Nov 26, 2024", color: "#2383e2" },
  { id: "f4e5d6c", message: "Onboarding Flow", branch: "auth", date: "Nov 28, 2024", color: "#135290" },
  { id: "b7a890f", message: "Build Dashboard UI", branch: "ui-updates", date: "Nov 30, 2024", color: "#10b981" },
  { id: "c1d2e3f", message: "Optimize Page Load", branch: "main", date: "Dec 5, 2024", color: "#f59e0b" },
  { id: "e4f5a6b", message: "Cross-Browser Testing", branch: "qa", date: "Dec 6, 2024", color: "#8b5cf6" },
];

const teamBuilds = [
  { name: "erp-core-api", desc: "Working on Multi-tenant Schema", status: "Completed", variant: "success" },
  { name: "vaphers-web", desc: "Working on Integrate Authentication", status: "In Progress", variant: "warning" },
  { name: "analytics-svc", desc: "Working on Develop Search Filter", status: "Pending", variant: "danger" },
  { name: "marketing-site", desc: "Working on Responsive Layout", status: "In Progress", variant: "warning" },
];

// --- Animation Variants ---
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

export default function DevOpsDashboardV2() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 text-slate-900 font-sans">
      
      {/* SVG Patterns for Charts */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <pattern id="diagonalStripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#f1f5f9" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="2" />
          </pattern>
        </defs>
      </svg>

      <motion.div 
        className="max-w-[1400px] mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ROW 1: Stat Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Primary Dark (Replaces Green) */}
          <Card className="rounded-sm bg-[#135290] text-white border-none shadow-sm relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-blue-100">Total Pushes</p>
                  <h2 className="text-4xl font-bold mt-2">24</h2>
                  <div className="flex items-center mt-4 text-xs text-blue-200">
                    <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-sm px-1.5 py-0 mr-2 border-none">
                      5 <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Badge>
                    Increased from last month
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="rounded-sm border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Ended Builds</p>
                  <h2 className="text-4xl font-bold mt-2 text-slate-900">10</h2>
                  <div className="flex items-center mt-4 text-xs text-slate-500">
                    <Badge variant="outline" className="text-slate-500 rounded-sm px-1.5 py-0 mr-2 border-slate-200">
                      6 <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Badge>
                    Increased from last month
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="rounded-sm border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Running Builds</p>
                  <h2 className="text-4xl font-bold mt-2 text-slate-900">12</h2>
                  <div className="flex items-center mt-4 text-xs text-slate-500">
                    <Badge variant="outline" className="text-slate-500 rounded-sm px-1.5 py-0 mr-2 border-slate-200">
                      2 <ArrowUpRight className="h-3 w-3 ml-0.5" />
                    </Badge>
                    Increased from last month
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="rounded-sm border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                  <h2 className="text-4xl font-bold mt-2 text-slate-900">2</h2>
                  <div className="flex items-center mt-4 text-xs text-slate-500">
                    On Discuss
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ROW 2: Complex Layout Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Main Bar Chart - Matches "Project Analytics" */}
          <Card className="rounded-sm border-slate-200 shadow-sm lg:col-span-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-slate-900">Build Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }} barSize={40}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '2px' }} />
                  <Bar dataKey="builds" radius={[2, 2, 2, 2]}>
                    {performanceData.map((entry, index) => {
                      let fillValue = "url(#diagonalStripes)"; // Default striped
                      if (entry.type === "solid") fillValue = "#1d7bc9";
                      if (entry.type === "highlight") fillValue = "#2383e2";
                      if (entry.type === "dark") fillValue = "#135290";
                      
                      return <Cell key={`cell-${index}`} fill={fillValue} stroke={entry.type === "striped" ? "#cbd5e1" : "none"} strokeWidth={1} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Action Card - Matches "Reminders" */}
          <Card className="rounded-sm border-slate-200 shadow-sm lg:col-span-3 flex flex-col justify-center p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Pipeline Actions</h3>
            <h4 className="text-xl font-bold text-slate-900 leading-tight">Sync with Vercel<br/>Production</h4>
            <p className="text-xs text-slate-500 mt-2 mb-6">Last synced : 02.00 pm - 04.00 pm</p>
            <Button className="w-full bg-[#135290] hover:bg-[#0f3d6b] text-white rounded-sm py-6">
              <Video className="mr-2 h-4 w-4" /> Start Deployment
            </Button>
          </Card>

          {/* List Card - Matches "Project" list (Spans 2 rows via flex/grid) */}
          <Card className="rounded-sm border-slate-200 shadow-sm lg:col-span-3 lg:row-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-slate-900">Recent Commits</CardTitle>
              <Button variant="outline" size="sm" className="rounded-sm h-8 px-3 border-slate-200 text-slate-600">
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px] pr-4">
                <div className="space-y-6 mt-4">
                  {recentCommits.map((commit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center" style={{ color: commit.color }}>
                        <GitCommit className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{commit.message}</h4>
                        <p className="text-xs text-slate-500 mt-1">Branch: {commit.branch} · {commit.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

        {/* ROW 3 */}
          {/* Collaboration/List - Matches "Team Collaboration" */}
          <Card className="rounded-sm border-slate-200 shadow-sm lg:col-span-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-slate-900">Active Build Jobs</CardTitle>
              <Button variant="outline" size="sm" className="rounded-sm h-8 px-3 border-slate-200 text-slate-600">
                <Plus className="h-4 w-4 mr-1" /> Add Job
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 mt-4">
                {teamBuilds.map((build, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-slate-100 flex items-center justify-center text-slate-600">
                        <Box className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{build.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{build.desc}</p>
                      </div>
                    </div>
                    {build.variant === "success" && <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border border-emerald-100 rounded-sm shadow-none font-normal">Completed</Badge>}
                    {build.variant === "warning" && <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-50 border border-amber-100 rounded-sm shadow-none font-normal">In Progress</Badge>}
                    {build.variant === "danger" && <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-sm shadow-none font-normal">Pending</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Half Pie Chart - Matches "Project Progress" */}
          <Card className="rounded-sm border-slate-200 shadow-sm lg:col-span-4">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold text-slate-900">Success Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between h-[220px]">
              <div className="w-full h-[140px] relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Completed", value: 41, fill: "#135290" },
                        { name: "In Progress", value: 30, fill: "#2383e2" },
                        { name: "Pending", value: 29, fill: "url(#diagonalStripes)" }
                      ]}
                      cx="50%"
                      cy="100%"
                      startAngle={180}
                      endAngle={0}
                      innerRadius={80}
                      outerRadius={110}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={2}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text for semi-circle */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-2">
                  <span className="text-4xl font-bold text-slate-900">85%</span>
                  <span className="text-xs text-slate-500">Pipeline Success</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-4">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#135290] mr-2"></span>Completed</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#2383e2] mr-2"></span>In Progress</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 bg-[#f1f5f9] border border-slate-300 mr-2 rounded-sm" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M-2 10L10 -2ZM4 12L12 4ZM-4 4L4 -4\' stroke=\'%23cbd5e1\' stroke-width=\'2\'/%3E%3C/svg%3E")'}}></span>Pending</span>
              </div>
            </CardContent>
          </Card>

          {/* Timer Card - Matches "Time Tracker" */}
          <Card className="rounded-sm border-none shadow-sm lg:col-span-3 bg-slate-900 text-white relative overflow-hidden">
            {/* Wavy background decoration */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,100 C150,200 250,0 400,100 L400,400 L0,400 Z" fill="#2383e2" />
                <path d="M0,200 C150,300 250,100 400,200 L400,400 L0,400 Z" fill="#135290" />
              </svg>
            </div>
            
            <CardContent className="p-6 relative z-10 flex flex-col h-full justify-between min-h-[220px]">
              <div className="text-sm font-medium text-blue-200">Current Deployment</div>
              <div className="text-center my-6">
                <div className="text-5xl font-bold font-mono tracking-tight text-white drop-shadow-md">
                  01:24:08
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-auto">
                <Button size="icon" className="h-12 w-12 rounded-full bg-white text-slate-900 hover:bg-slate-200 shadow-lg">
                  <Square className="h-4 w-4 fill-current" />
                </Button>
                <Button size="icon" className="h-12 w-12 rounded-full bg-rose-500 text-white hover:bg-rose-600 shadow-lg">
                  <Square className="h-4 w-4 fill-current" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Quick inline component to fix the missing Box icon in the imports above
function Box(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}