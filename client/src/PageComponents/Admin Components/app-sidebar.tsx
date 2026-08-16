'use client';

import React, { useState } from 'react';
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  PencilLine,
  ChartArea,
  StickyNote,
  Loader2,
  Upload,
  HelpCircle,
  PlusCircle,
  Inbox,
  Palette,
  ExternalLink,
  Compass,
  FilePlus2,
  Calendar,
  SearchCheck,
  FileCheck2,
  MessageSquareText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type MenuGroup = {
  groupTitle: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    groupTitle: 'Management & Insights',
    items: [
      { title: 'Analytics', url: '/admin-dashboard', icon: ChartArea },
      { title: 'Content Calendar', url: '/admin-dashboard/calendar', icon: Calendar },
      { title: 'Lead Inquiries', url: '/admin-dashboard/leads', icon: Inbox },
    ],
  },
  {
    groupTitle: 'Guest Post Network',
    items: [
      { title: 'Guest Submissions', url: '/admin-dashboard/guest-posts', icon: FileCheck2 },
      { title: 'Contributor Writers', url: '/admin-dashboard/contributors', icon: SearchCheck },
      { title: 'Support Tickets & Quota', url: '/admin-dashboard/support', icon: MessageSquareText },
      { title: 'Live Writer Portal', url: '/write-for-us', icon: Compass },
    ],
  },
  {
    groupTitle: 'Content & Publishing',
    items: [
      { title: 'All Blog Posts', url: '/admin-dashboard/posts', icon: StickyNote },
      { title: 'Add New Post', url: '/admin-dashboard/posts/add-posts', icon: PencilLine },
      { title: 'Interior Design Posts', url: '/admin-dashboard/interior-design-marketing/posts', icon: Palette },
      { title: 'New Interior Post', url: '/admin-dashboard/interior-design-marketing/new', icon: FilePlus2 },
      { title: 'FAQ Questions', url: '/admin-dashboard/common-questions', icon: HelpCircle },
      { title: 'Bulk Upload', url: '/admin-dashboard/bulk-upload', icon: Upload },
    ],
  },
];

const flatMenuItems = menuGroups.flatMap((group) => group.items);

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin-logout', { method: 'POST' });
      window.location.href = '/asad-login';
    } catch (error) {
      console.error('Failed to logout:', error);
      setIsLoggingOut(false);
    }
  };

  const isActive = (url: string) => {
    if (url === '/admin-dashboard') return pathname === '/admin-dashboard';
    if (url === '/admin-dashboard/posts') {
      return pathname === '/admin-dashboard/posts' || pathname.startsWith('/admin-dashboard/edit-post');
    }
    if (url === '/admin-dashboard/interior-design-marketing/posts') {
      return (
        pathname === '/admin-dashboard/interior-design-marketing/posts' ||
        pathname.startsWith('/admin-dashboard/interior-design-marketing/edit')
      );
    }
    if (url === '/admin-dashboard/common-questions') {
      return (
        pathname === '/admin-dashboard/common-questions' ||
        pathname.startsWith('/admin-dashboard/common-questions/edit')
      );
    }
    return pathname.startsWith(url);
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col h-screen bg-gradient-to-b from-[#1b6fc2] via-[#165fab] to-[#104a88] text-white transition-all duration-300 sticky top-0 shadow-xl z-30 select-none border-r border-white/10 ${
          isCollapsed ? 'w-[76px]' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between bg-black/10">
          {!isCollapsed && (
            <Link href="/admin-dashboard" className="flex items-center gap-2 group">
              <span className="text-white bungee-shade text-2xl tracking-wider group-hover:opacity-90 transition-opacity">
                Vaphers
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer ${
              isCollapsed ? 'mx-auto' : 'ml-auto'
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Scrollable Navigation Area (Scrollbar Hidden) */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5 no-scrollbar">
          {menuGroups.map((group, groupIdx) => (
            <div key={group.groupTitle} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 mb-1.5">
                  <span className="text-[11px] font-semibold text-blue-100/75 uppercase tracking-wider">
                    {group.groupTitle}
                  </span>
                </div>
              ) : (
                groupIdx > 0 && <div className="border-t border-white/10 my-2 mx-1" />
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      title={isCollapsed ? item.title : undefined}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors ${
                        active
                          ? 'bg-white text-[#165fab] font-semibold shadow-xs'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                      } ${isCollapsed ? 'justify-center px-0 h-10 w-10 mx-auto' : ''}`}
                    >
                      <item.icon
                        size={17}
                        className={`shrink-0 transition-transform ${
                          active ? 'text-[#165fab]' : 'text-white/80 group-hover:scale-105'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Live Site Quick Links */}
        {!isCollapsed && (
          <div className="px-3 py-2 border-t border-white/10 bg-black/5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-blue-100/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Compass size={14} className="text-amber-300" />
                Visit Website
              </span>
              <ExternalLink size={12} className="opacity-60" />
            </Link>
          </div>
        )}

        {/* User / Logout Footer */}
        <div className="border-t border-white/10 p-3 bg-black/10">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-white transition-colors w-full cursor-pointer text-xs font-semibold ${
              isCollapsed ? 'justify-center px-0' : ''
            } ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Sign Out"
          >
            {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            {!isCollapsed && <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>}
          </button>
        </div>
      </aside>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-15 bg-gradient-to-r from-[#1b6fc2] via-[#165fab] to-[#104a88] text-white flex items-center justify-around z-40 border-t border-white/15 shadow-lg">
        {flatMenuItems.slice(0, 4).map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`p-2 rounded-lg transition-colors ${
                active ? 'bg-white text-[#165fab]' : 'hover:bg-white/10 text-white/85'
              }`}
            >
              <item.icon size={19} />
            </Link>
          );
        })}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white cursor-pointer"
          title="More menu items"
        >
          <ChevronUp size={20} />
        </button>
      </div>

      {/* ================= MOBILE BOTTOM DRAWER ================= */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-50 transition-opacity duration-200 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div
        className={`md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-b from-[#1b6fc2] via-[#165fab] to-[#104a88] text-white rounded-t-2xl shadow-2xl z-50 transition-transform duration-200 ease-out flex flex-col max-h-[80vh] border-t border-white/20 ${
          isMobileOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/15">
          <span className="text-white bungee-shade text-xl tracking-wider">Vaphers</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-5 no-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              <div className="px-2 mb-1">
                <span className="text-[11px] font-semibold text-blue-100/75 uppercase tracking-wider">
                  {group.groupTitle}
                </span>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                        active
                          ? 'bg-white text-[#165fab] font-semibold'
                          : 'hover:bg-white/10 text-white/90'
                      }`}
                    >
                      <item.icon size={18} className={active ? 'text-[#165fab]' : 'text-white/80'} />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="pt-3 border-t border-white/15">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-white w-full transition-colors cursor-pointer text-sm font-semibold ${
                isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
              <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}