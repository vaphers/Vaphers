import Mission from "@/PageComponents/About Components/Mission"
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from "@/PageComponents/Global Components/HeroSubpage"
import PricingComponent from "@/PageComponents/Global Components/Pricing"
import Stats from "@/PageComponents/Global Components/Stats"
import Testimonial from "@/PageComponents/Global Components/Testimonial"


export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
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
