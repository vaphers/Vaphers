import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Web Development Services | Modern & Responsive Websites',
  description: 'Build high-performance, responsive, and visually stunning websites with our expert web development services. We craft custom solutions using the latest technologies for better user experience and conversions.',
  keywords: 'web development, responsive websites, custom web design, front-end development, React developer, Tailwind CSS',
  openGraph: {
    title: 'Web Development Services | Modern, Fast & Responsive Websites',
    description: 'Create stunning, responsive websites built for performance and growth.',
    type: 'website',
  },
}

export default function WebDevLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
