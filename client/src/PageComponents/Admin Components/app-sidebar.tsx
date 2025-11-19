"use client"

import { useState } from "react"
import { Home, Users, Settings, BarChart, FileText, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { title: "Dashboard", url: "admin-dashboard", icon: Home },
  { title: "Posts", url: "/admin-dashboard/posts", icon: Users },
  { title: "Add Post", url: "/admin-dashboard/posts/add-posts", icon: BarChart },
  { title: "Reports", url: "/admin-dashboard/reports", icon: FileText },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Users", url: "/dashboard/settings", icon: Settings },
  { title: "Traffic ", url: "/dashboard/settings", icon: Settings },
  { title: "Country", url: "/dashboard/settings", icon: Settings },
  { title: "Pages", url: "/dashboard/settings", icon: Settings },
  { title: "Traffic Source", url: "/dashboard/settings", icon: Settings },
  { title: "Organic Traffic", url: "/dashboard/settings", icon: Settings },

]

// client\src\app\admin-dashboard\posts\add-posts.tsx

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div 
      className={`${isCollapsed ? 'w-16' : 'w-64'} h-screen bg-gray-200 text-white transition-all duration-300 flex flex-col sticky top-0`}
    >
      {/* Header */}
      <div className="border-b border-indigo`-800 p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 bungee-inline-regular">
              A
            </div>
            <span className="font-semibold text-gray-800 bungee-inline-regular">Admin Panel</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-blue-600 text-gray-800 hover:text-white rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 pl-2 space-y-">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex items-center gap-3 p-3 rounded-lg text-gray-800 hover:bg-gray-300 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4">
        <button className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 text-center text-gray-800 hover:text-white transition-colors transition duration-200 cursor-pointer w-full ${isCollapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
