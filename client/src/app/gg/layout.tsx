import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
}

export default function NoIndexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* You can add a specific Navbar or Sidebar here if needed */}
      {children}
    </section>
  )
}