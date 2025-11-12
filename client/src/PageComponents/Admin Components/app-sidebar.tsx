"use client"

import { useState } from "react"
import { Home, Users, Settings, BarChart, FileText, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-blue-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="border-b border-blue-800 p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              A
            </div>
            <span className="font-semibold">Admin Panel</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-blue-800 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-blue-800 p-4">
        <button className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800 transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
