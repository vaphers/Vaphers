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
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 bg-gray-50 p- pt-0">
        {children}
      </main>
    </div>
  )
}
