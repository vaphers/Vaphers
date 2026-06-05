"use client"

import { useState } from "react"
import { LogOut, ChevronLeft, ChevronRight, ChevronUp, X, PencilLine, ChartArea, ListChecks, StickyNote, Loader2, Wallet } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { title: "Analytics", url: "/admin-dashboard", icon: ChartArea },
  { title: "Posts", url: "/admin-dashboard/posts", icon: StickyNote },
  { title: "New Post", url: "/admin-dashboard/posts/add-posts", icon: PencilLine },
  { title: "Tasks", url: "/admin-dashboard/tasks", icon: ListChecks },
  { title: "Expense", url: "/admin-dashboard/expense", icon: Wallet },

]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Hit the API to clear the httpOnly cookie
      await fetch("/api/admin-logout", { method: "POST" });
      
      // Hard redirect to login so Next.js clears router cache
      window.location.href = "/asad-login";
    } catch (error) {
      console.error("Failed to logout:", error);
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div 
        className={`hidden md:flex flex-col h-screen bg-[#2383e2] text-white transition-all duration-300 sticky top-0 ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
        {/* Header */}
        <div className="border-b border-indigo-800 p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span className="text-gray-200 bungee-shade text-3xl tracking-wide">Vaphers</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-gray-200 hover:text-white rounded-lg transition-colors ml-auto cursor-pointer"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 p-3 rounded-lg text-white font-medium hover:bg-white/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
              <item.icon size={20} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-indigo-800 p-4">
            <button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 text-white transition-colors duration-200 w-full cursor-pointer ${isCollapsed ? 'justify-center' : ''} ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoggingOut ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
              {!isCollapsed && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
            </button>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#2383e2] text-white flex items-center justify-around z-40 border-t border-indigo-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {/* First 4 main links */}
        {menuItems.slice(0, 4).map((item) => (
          <Link key={item.title} href={item.url} className="p-3 hover:bg-white/10 rounded-full transition-colors">
            <item.icon size={24} />
          </Link>
        ))}
        {/* Dialog Trigger */}
        <button onClick={() => setIsMobileOpen(true)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
          <ChevronUp size={24} />
        </button>
      </div>

      {/* ================= MOBILE BOTTOM DIALOG (DRAWER) ================= */}
      {/* Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Slide-up Content */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 w-full bg-[#2383e2] text-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col max-h-[80vh] ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-indigo-800">
          <span className="text-gray-200 bungee-shade text-2xl tracking-wide">Vaphers</span>
          <button onClick={() => setIsMobileOpen(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              <item.icon size={24} />
              <span className="font-medium text-lg">{item.title}</span>
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-indigo-800">
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/20 text-white w-full transition-colors ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                 {isLoggingOut ? <Loader2 size={24} className="animate-spin" /> : <LogOut size={24} />}
                <span className="font-medium text-lg">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
          </div>
        </nav>
      </div>
    </>
  )
}