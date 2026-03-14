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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
    fd.set('from_name', 'Website Partner Form')
    fd.set('subject', 'New partner application via website')
    if (service) fd.set('service', service)

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
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
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center p-6 md:p-12 relative"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773495466/ContactBG_yh5k2r.png')` }}
    >
      {/* Headings */}
      <div className="text-center text-white mb-8 max-w-2xl z-10">
        <h4 className="text-4xl md:text-5xl bungee-shade tracking-tight">
          Get A Free Consultation
        </h4>
      </div>

      {/* Form Container */}
      <form className="w-full max-w-md flex flex-col gap-4 z-10" onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

        <Input 
          id="first_name" 
          name="first_name" 
          type="text" 
          placeholder="First name*" 
          required 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-14 rounded-xl px-6 text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />
        
        <Input 
          id="last_name" 
          name="last_name" 
          type="text" 
          placeholder="Last name" 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-14 rounded-xl px-6 text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="Email*" 
          required 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-14 rounded-xl px-6 text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Input 
          id="website" 
          name="website" 
          type="text" 
          placeholder="Website" 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium h-14 rounded-xl px-6 text-base focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Select value={service} onValueChange={setService} name="service">
          <SelectTrigger className="bg-[#FFF9EA] border-none text-slate-800 h-14 rounded-xl px-6 text-base w-full data-[placeholder]:text-slate-400 data-[placeholder]:font-medium focus:ring-2 focus:ring-white/50">
            <SelectValue placeholder="Select service*" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-none shadow-xl">
            <SelectItem value="audit">Website Audit (Free)</SelectItem>
            <SelectItem value="seo">Search Engine Optimization</SelectItem>
            <SelectItem value="ppc">Pay Per Click (Paid Ads)</SelectItem>
            <SelectItem value="smo">Social Media Optimization</SelectItem>
            <SelectItem value="webdev">Website Development</SelectItem>
            <SelectItem value="appdev">App Development</SelectItem>
            <SelectItem value="custom">Custom Softwares</SelectItem>
          </SelectContent>
        </Select>

        <Textarea 
          id="message" 
          name="message" 
          placeholder="Message*" 
          rows={4} 
          required 
          className="bg-[#FFF9EA] border-none text-slate-800 placeholder:text-slate-400 placeholder:font-medium min-h-[120px] rounded-2xl px-6 py-4 text-base resize-none focus-visible:ring-2 focus-visible:ring-white/50" 
        />

        <Button 
          type="submit" 
          disabled={loading} 
          className="bg-blue-600 hover:bg-blue-700 border border-white text-white h-14 rounded-xl text-base font-semibold w-full mt-2 transition-all cursor-pointer"
        >
          {loading ? 'Sending...' : 'Submit application'}
        </Button>
      </form>
    </div>
  )
}

export default ContactSection