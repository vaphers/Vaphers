import { AppSidebar } from "@/PageComponents/Admin Components/app-sidebar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Vaphers ',
  description: 'Admin dashboard for managing internal data and settings.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Changed flex direction to support responsive layout
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">
      <AppSidebar />
      
      {/* Added pb-16 for mobile to account for the 4rem (16) bottom nav height */}
      <main className="flex-1 min-w-0 overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>
    </div>
  )
}