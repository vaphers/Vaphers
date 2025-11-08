import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Affordable Digital Marketing Company',
  description: 'Learn about our journey as an affordable digital marketing company dedicated to helping businesses grow online with expert SEO, web development, and digital solutions.',
  keywords: 'affordable digital marketing company, digital marketing services, SEO services, web development',
  openGraph: {
    title: 'About Us | Affordable Digital Marketing Company',
    description: 'Learn about our journey as an affordable digital marketing company dedicated to helping businesses grow online.',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
