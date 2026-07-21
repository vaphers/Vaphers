"use client"

import { useState } from "react"
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  PencilLine,
  ChartArea,
  ListChecks,
  StickyNote,
  Loader2,
  Wallet,
  Upload,
  HelpCircle,
  PlusCircle,
  Inbox,
  FolderKanban
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type MenuItem = {
  title: string
  url: string
  icon: React.ElementType
}

type MenuGroup = {
  groupTitle: string
  items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    groupTitle: "Overview",
    items: [
      { title: "Analytics", url: "/admin-dashboard", icon: ChartArea },
    ]
  },
  {
    groupTitle: "Content",
    items: [
      { title: "Posts", url: "/admin-dashboard/posts", icon: StickyNote },
      { title: "New Post", url: "/admin-dashboard/posts/add-posts", icon: PencilLine },
      { title: "Common Questions", url: "/admin-dashboard/common-questions", icon: HelpCircle },
      { title: "New Question", url: "/admin-dashboard/common-questions/add", icon: PlusCircle },
      { title: "Bulk Upload", url: "/admin-dashboard/bulk-upload", icon: Upload },
    ]
  },
  {
    groupTitle: "Operations",
    items: [
      { title: "Projects", url: "/admin-dashboard/projects", icon: FolderKanban },
      { title: "Leads", url: "/admin-dashboard/leads", icon: Inbox },
      { title: "Expense", url: "/admin-dashboard/expenses", icon: Wallet },
      { title: "Tasks", url: "/admin-dashboard/tasks", icon: ListChecks },
    ]
  }
]

// Flattened list for mobile navigation bar
const flatMenuItems = menuGroups.flatMap(group => group.items)

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/admin-logout", { method: "POST" })
      window.location.href = "/asad-login"
    } catch (error) {
      console.error("Failed to logout:", error)
      setIsLoggingOut(false)
    }
  }

  const isActive = (url: string) => {
    if (url === "/admin-dashboard") return pathname === "/admin-dashboard"
    return pathname.startsWith(url)
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div 
        className={`hidden md:flex flex-col h-screen bg-[#2383e2] text-white transition-all duration-300 sticky top-0 shadow-xl ${isCollapsed ? 'w-18' : 'w-64'}`}
      >
        {/* Header */}
        <div className="border-b border-white/15 p-4 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/admin-dashboard" className="flex items-center gap-2">
              <span className="text-gray-100 bungee-shade text-2xl tracking-wide select-none">Vaphers</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/20 text-white">Admin</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-auto cursor-pointer"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Grouped Menu Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6 custom-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={group.groupTitle} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 text-[11px] font-bold text-blue-100 uppercase tracking-wider mb-2">
                  {group.groupTitle}
                </div>
              ) : (
                groupIdx > 0 && <div className="border-t border-white/15 my-2 mx-1" />
              )}

              {group.items.map((item) => {
                const active = isActive(item.url)
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    title={isCollapsed ? item.title : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm ${
                      active
                        ? "bg-white text-[#2383e2] font-semibold shadow-md"
                        : "text-white/90 hover:bg-white/15 hover:text-white"
                    } ${isCollapsed ? "justify-center px-0" : ""}`}
                  >
                    <item.icon size={19} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/15 p-3">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/20 text-white transition-colors duration-200 w-full cursor-pointer ${isCollapsed ? 'justify-center p-2.5' : ''} ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Logout"
          >
            {isLoggingOut ? <Loader2 size={19} className="animate-spin" /> : <LogOut size={19} />}
            {!isCollapsed && <span className="font-medium text-sm">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
          </button>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#2383e2] text-white flex items-center justify-around z-40 border-t border-white/20 shadow-[0_-4px_10px_rgba(0,0,0,0.15)]">
        {flatMenuItems.slice(0, 4).map((item) => {
          const active = isActive(item.url)
          return (
            <Link 
              key={item.title} 
              href={item.url} 
              className={`p-2.5 rounded-xl transition-colors ${active ? "bg-white text-[#2383e2] shadow-sm" : "hover:bg-white/10"}`}
            >
              <item.icon size={22} />
            </Link>
          )
        })}
        <button onClick={() => setIsMobileOpen(true)} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
          <ChevronUp size={22} />
        </button>
      </div>

      {/* ================= MOBILE BOTTOM DIALOG (DRAWER) ================= */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div 
        className={`md:hidden fixed bottom-0 left-0 w-full bg-[#2383e2] text-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col max-h-[85vh] ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="text-gray-100 bungee-shade text-2xl tracking-wide">Vaphers</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/20 text-white">Admin</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              <div className="px-3 text-[11px] font-bold text-blue-100 uppercase tracking-wider mb-2">
                {group.groupTitle}
              </div>
              {group.items.map((item) => {
                const active = isActive(item.url)
                return (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all ${
                      active ? "bg-white text-[#2383e2] font-semibold shadow-md" : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={22} />
                    <span className="font-medium text-base">{item.title}</span>
                  </Link>
                )
              })}
            </div>
          ))}
          
          <div className="pt-4 border-t border-white/15">
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-red-500/20 text-white w-full transition-colors ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoggingOut ? <Loader2 size={22} className="animate-spin" /> : <LogOut size={22} />}
              <span className="font-medium text-base">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}