import Mission from "@/PageComponents/About Components/Mission"
import ContactForm from '@/PageComponents/Global Components/Contact'
import SubHero from "@/PageComponents/Global Components/HeroSubpage"
import Stats from "@/PageComponents/Global Components/Stats"
import Testimonial from "@/PageComponents/Global Components/Testimonial"


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
        <SubHero
        heading="Let's Build Something Great Together"
        subtext="Ready to boost your online presence? Get in touch and let's discuss how we can help your business grow."
        badgeText="Get Started Today"
        />
        <ContactForm/>
        <Mission/>
        <Stats/>
        <Testimonial/>
    </main>
  )
}
