import { AppSidebar } from "@/PageComponents/Admin Components/app-sidebar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Vaphers Technologies',
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
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  )
}
