import { AppSidebar } from "@/PageComponents/Admin Components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
