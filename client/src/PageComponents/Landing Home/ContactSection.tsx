'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const ContactSection: React.FC = () => {
  const [service, setService] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [renderTime] = useState<number>(() => Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('formType', 'Partner Consultation Form')
    fd.set('pageUrl', typeof window !== 'undefined' ? window.location.href : '')
    fd.set('_ts', String(renderTime))
    if (service) fd.set('service', service)

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd })
      const data: { success: boolean; message?: string } = await res.json()
      if (data.success) {
        toast.success('Application sent', { description: 'Thanks! Your application reached the inbox.' })
        form.reset()
        setService(undefined)
      } else {
        toast.error('Submission failed', { description: data.message || 'Please try again.' })
      }
    } catch {
      toast.error('Network error', { description: 'Could not send your message. Retry later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      // FIXED: Dropped base padding to p-4 so tiny screens have maximum horizontal room for the form
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 relative"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773495466/ContactBG_yh5k2r.png')` }}
    >
      {/* Headings */}
      <div className="text-center text-white mb-6 sm:mb-8 max-w-2xl z-10 px-2">
        {/* FIXED: Scaled to text-[28px] for mobile, added a forced line break so "Consultation" doesn't hit the screen edges */}
        <h4 className="text-[28px] sm:text-4xl md:text-5xl bungee-shade tracking-tight leading-[1.2]">
          Get A Free Studio <br className="block sm:hidden" /> Consultation
        </h4>
      </div>

      {/* Form Container */}
      <form className="w-full max-w-md flex flex-col gap-3 sm:gap-4 z-10" onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* FIXED: Grouped First and Last name into a grid. Stacks on mobile, side-by-side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input 
            id="first_name" 
            name="first_name" 
            type="text" 
            placeholder="First name*" 
            required 
            // FIXED: Fluid height (h-12 to h-14) and padding (px-4 to px-6)
            className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-12 sm:h-14 rounded-xl px-4 sm:px-6 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white/50" 
          />
          
          <Input 
            id="last_name" 
            name="last_name" 
            type="text" 
            placeholder="Last name" 
            className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-12 sm:h-14 rounded-xl px-4 sm:px-6 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white/50" 
          />
        </div>

        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email*" 
          required 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-12 sm:h-14 rounded-xl px-4 sm:px-6 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Input 
          id="website" 
          name="website" 
          type="text" 
          placeholder="Studio / Portfolio Website" 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-12 sm:h-14 rounded-xl px-4 sm:px-6 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Select value={service} onValueChange={setService} name="service">
          <SelectTrigger className="bg-[#FFF9EA] border-none text-slate-800 h-12 sm:h-14 rounded-xl px-4 sm:px-6 text-sm sm:text-base w-full data-[placeholder]:text-slate-400 data-[placeholder]:font-medium focus:ring-2 focus:ring-white/50">
            <SelectValue placeholder="Select service*" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-none shadow-xl">
            <SelectItem value="audit">Interior Design Marketing Audit (Free)</SelectItem>
            <SelectItem value="website">Luxury Studio Website & Portfolio</SelectItem>
            <SelectItem value="seo">Interior Design SEO & Local Visibility</SelectItem>
            <SelectItem value="ai-seo">AI Search & LLM Visibility (GEO)</SelectItem>
            <SelectItem value="leads">High-End Client Acquisition</SelectItem>
            <SelectItem value="full-growth">Full-Service Studio Growth</SelectItem>
          </SelectContent>
        </Select>

        <Textarea 
          id="message" 
          name="message" 
          placeholder="Tell us about your design studio and project goals*" 
          rows={4} 
          required 
          // FIXED: Adjusted min-height and padding for tiny screens
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium min-h-[100px] sm:min-h-[120px] rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base resize-none focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Button 
          type="submit" 
          disabled={loading} 
          className="bg-blue-600 hover:bg-blue-700 border border-white text-white h-12 sm:h-14 rounded-xl text-sm sm:text-base font-semibold w-full mt-1 sm:mt-2 transition-all cursor-pointer"
        >
          {loading ? 'Sending...' : 'Submit application'}
        </Button>
      </form>
    </div>
  )
}

export default ContactSection