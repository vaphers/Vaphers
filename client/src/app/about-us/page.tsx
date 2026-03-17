"use client"

import OurStorySection from '@/PageComponents/About Components/Story'
import Mission from "@/PageComponents/About Components/Mission"
import CTA from '@/PageComponents/Global Components/CTA'
import Hero from '@/PageComponents/About Components/Hero'
import ContactForm from '@/PageComponents/Global Components/Contact'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero/>
      <OurStorySection />
      <Mission/>
      <CTA/>
      <ContactForm/>
    </main>
  )
}