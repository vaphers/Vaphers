import Mission from "@/PageComponents/About Components/Mission"
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from "@/PageComponents/Global Components/HeroSubpage"
import PricingComponent from "@/PageComponents/Global Components/Pricing"
import Stats from "@/PageComponents/Global Components/Stats"
import Testimonial from "@/PageComponents/Global Components/Testimonial"
import Script from 'next/script'

export default function PricingPage() {
  
  // Breadcrumb JSON-LD Data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.vaphers.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing",
        "item": "https://www.vaphers.com/pricing"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <SubHero
          heading="Simple, Transparent Pricing for Every Business"
          subtext="Choose the perfect plan to grow your online presence. No hidden fees, no surprises—just results-driven solutions tailored to your goals."
          badgeText="View Pricing Plans"
        />
        <PricingComponent/>
        <Mission/>
        <Stats/>
        <Testimonial/>
        <ContactForm/>
    </main>
  )
}
