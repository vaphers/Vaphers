  // 'use client'

  // import React, { useState } from 'react'
  // import { Card, CardContent } from '@/components/ui/card'
  // import { Input } from '@/components/ui/input'
  // import { Textarea } from '@/components/ui/textarea'
  // import { Button } from '@/components/ui/button'
  // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  // import { Mail, Phone, MapPin, Globe, Twitter, Instagram, Linkedin } from 'lucide-react'
  // import { toast } from 'sonner'

  // const ENDPOINT = 'https://api.web3forms.com/submit' 

  // const ContactForm: React.FC = () => {
  //   const [service, setService] = useState<string | undefined>(undefined)
  //   const [loading, setLoading] = useState(false)

  //   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault()
  //     setLoading(true)

  //     const form = e.currentTarget
  //     const fd = new FormData(form)
  //     fd.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
  //     fd.set('from_name', 'Website Contact Form')
  //     fd.set('subject', 'New contact via website')
  //     if (service) fd.set('service', service)

  //     try {
  //       const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
  //       const data: { success: boolean; message?: string } = await res.json()
  //       if (data.success) {
  //         toast.success('Message sent', { description: 'Thanks! Your message reached the inbox.' })
  //         form.reset()
  //         setService(undefined)
  //       } else {
  //         toast.error('Submission failed', { description: data.message || 'Please try again.' })
  //       }
  //     } catch {
  //       toast.error('Network error', { description: 'Could not send your message. Retry later.' })
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   return (
  //     <div className=" w-full relative ">
  //       <div
  //         className="absolute inset-0 z-0"
  //         style={{
  //           backgroundImage: `
  //             linear-gradient(to right, #e7e5e4 1px, transparent 1px),
  //             linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
  //           `,
  //           backgroundSize: '20px 20px',
  //           backgroundPosition: '0 0, 0 0',
  //           maskImage: `
  //             repeating-linear-gradient(
  //               to right,
  //               black 0px,
  //               black 3px,
  //               transparent 3px,
  //               transparent 8px
  //             ),
  //             repeating-linear-gradient(
  //               to bottom,
  //               black 0px,
  //               black 3px,
  //               transparent 3px,
  //               transparent 8px
  //             )
  //           `,
  //           WebkitMaskImage: `
  //             repeating-linear-gradient(
  //               to right,
  //               black 0px,
  //               black 3px,
  //               transparent 3px,
  //               transparent 8px
  //             ),
  //             repeating-linear-gradient(
  //               to bottom,
  //               black 0px,
  //               black 3px,
  //               transparent 3px,
  //               transparent 8px
  //             )
  //           `,
  //           maskComposite: 'intersect',
  //           WebkitMaskComposite: 'source-in',
  //         }}
  //       />

  //       {/* Content */}
  //       <section className="relative z-10 py-16 px-4 flex flex-col md:flex-row gap-10 max-w-7xl mx-auto w-full">
  //         <div className="flex-1">
  //           <h4 className="text-3xl md:text-4xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
  //             Get A <span className="bg-blue-600 bg-clip-text text-transparent">Free Consultation</span>
  //           </h4>
  //           <p className="text-lg text-muted-foreground mb-10">
  //             Have a project in mind or just want to say hello? I&apos;d love to hear from you. 
  //           </p>

  //           <div className="mb-8">
  //             <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
  //             <p className="mb-6 text-muted-foreground">Feel free to reach out through any of these channels.</p>

  //             <div className="mb-5 flex flex-col gap-4">
  //               <div className="flex items-center gap-3">
  //                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
  //                   <Mail className="w-5 h-5 text-slate-600" />
  //                 </div>
  //                 <div>
  //                   <span className="font-medium block">Email</span>
  //                   <div className="text-muted-foreground text-sm">vaphersonline@gmail.com</div>
  //                 </div>
  //               </div>
  //               <div className="flex items-center gap-3">
  //                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
  //                   <Phone className="w-5 h-5 text-slate-600" />
  //                 </div>
  //                 <div>
  //                   <span className="font-medium block">Phone</span>
  //                   <div className="text-muted-foreground text-sm">+91 964 186 1932</div>
  //                 </div>
  //               </div>
  //               <div className="flex items-center gap-3">
  //                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
  //                   <MapPin className="w-5 h-5 text-slate-600" />
  //                 </div>
  //                 <div>
  //                   <span className="font-medium block">Location</span>
  //                   <div className="text-muted-foreground text-sm">Kolkata, India </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="mt-4">
  //             <span className="font-semibold text-xl block mb-3">Connect</span>
  //             <div className="flex gap-3">

  //               <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
  //                 <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-600" />
  //               </a>
  //               <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
  //                 <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600" />
  //               </a>
  //               <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
  //                 <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
  //               </a>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Right form */}
  //         <div className="flex-1">
  //           <Card className="max-w-full rounded-xl shadow-sm">
  //             <CardContent className="py-8 px-6">
  //               <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
  //                 {/* Honeypot to reduce spam; add captcha from dashboard later if needed [web:13][web:10] */}
  //                 <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

  //                 <div>
  //                   <label className="font-medium mb-2 block" htmlFor="first_name">First name</label>
  //                   <Input id="first_name" name="first_name" type="text" placeholder="Your first name" required />
  //                 </div>
  //                 <div>
  //                   <label className="font-medium mb-2 block" htmlFor="last_name">Last name</label>
  //                   <Input id="last_name" name="last_name" type="text" placeholder="Your last name" />
  //                 </div>
  //                 <div className="md:col-span-2">
  //                   <label className="font-medium mb-2 block" htmlFor="email">Email</label>
  //                   <Input id="email" name="email" type="email" placeholder="youremail@domain.com" required />
  //                 </div>
  //                 <div className="md:col-span-2">
  //                   <label className="font-medium mb-2 block" htmlFor="website">Website</label>
  //                   <Input id="website" name="website" type="text" placeholder="www.yourwebsite.com" />
  //                 </div>
  //                 <div className="md:col-span-2">
  //                   <label className="font-medium mb-2 block">Service</label>
  //                   <Select value={service} onValueChange={setService} name="service">
  //                     <SelectTrigger className="w-full">
  //                       <SelectValue placeholder="Select the service" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="audit">Website Audit (Free)</SelectItem>
  //                       <SelectItem value="seo">Search Engine Optimization</SelectItem>
  //                       <SelectItem value="ppc">Pay Per Click (Paid Ads)</SelectItem>
  //                       <SelectItem value="smo">Social Media Optimization</SelectItem>
  //                       <SelectItem value="webdev">Website Development</SelectItem>
  //                       <SelectItem value="appdev">App Development</SelectItem>
  //                       <SelectItem value="custom">Custom Softwares</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //                 <div className="md:col-span-2">
  //                   <label className="font-medium mb-2 block" htmlFor="message">Message</label>
  //                   <Textarea id="message" name="message" placeholder="Your message" rows={4} required />
  //                 </div>
  //                 <div className="md:col-span-2 ">
  //                   <Button className="w-full mt-2 rounded-lg px-6 bg-blue-600 hover:bg-blue-700 cursor-pointer" type="submit" disabled={loading}>
  //                     {loading ? 'Sending...' : 'Send Message'}
  //                   </Button>
  //                 </div>
  //               </form>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </section>
  //     </div>
  //   )
  // }

  // export default ContactForm




  




  'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { X } from 'lucide-react'

const ContactForm: React.FC = () => {
  const [service, setService] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [contactMethod, setContactMethod] = useState<'email' | 'call'>('email')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
    fd.set('from_name', 'Website Contact Form')
    fd.set('subject', `New contact via website (${contactMethod})`)
    if (service) fd.set('service', service)

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data: { success: boolean; message?: string } = await res.json()
      if (data.success) {
        toast.success('Message sent', { description: 'Thanks! Your message reached the inbox.' })
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-7xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[800px]">
        
        {/* Left Section - Blue Theme */}
        <div className="w-full md:w-5/12 bg-blue-900 text-white p-10 md:p-12 flex flex-col relative rounded-none md:rounded-r-3xl z-10">
          {/* Logo / Brand Placeholder */}
          <div className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-white rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm" />
            <span className="font-semibold text-xl tracking-tight">vaphers</span>
          </div>

          {/* Heading & Text */}
          <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-6">
            Get a free<br />consultation
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-12 opacity-90">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you. 
            Whether you&apos;re planning a custom software build, seeking SEO optimization, 
            or need website development, we provide personalized guidance.
          </p>

          <div className="mt-auto pt-8">
            {/* Testimonial Ticket */}
            <div className="bg-white text-slate-900 p-8 rounded-xl relative">
              {/* Ticket Cutouts */}
              <div className="absolute top-1/2 -left-4 w-8 h-8 bg-blue-900 rounded-full -translate-y-1/2" />
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-blue-900 rounded-full -translate-y-1/2" />
              
              <div className="text-center">
                <h4 className="font-bold text-lg mb-4">Vaphers has saved us thousands of hours of work. We&apos;re able to spin up projects faster.</h4>
                <p className="text-sm font-semibold">Mollie Hall</p>
                <p className="text-xs text-muted-foreground">Web Developer, Sisyphus</p>
              </div>
            </div>
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-6 h-1.5 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-7/12 p-10 md:p-12 bg-white relative">
          {/* Close Icon (Visual only) */}
          <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>

          {/* Contact Toggle */}
          <div className="bg-slate-50 p-1.5 rounded-xl flex gap-1 mb-10 mt-4 md:mt-0 max-w-md mx-auto">
            <button
              onClick={() => setContactMethod('email')}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                contactMethod === 'email' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Contact via email
            </button>
            <button
              onClick={() => setContactMethod('call')}
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                contactMethod === 'call' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Request a call
            </button>
          </div>

          {/* Form */}
          <form className="max-w-xl mx-auto flex flex-col gap-5" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Names Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="first_name">First name</label>
                <Input id="first_name" name="first_name" type="text" placeholder="Enter your first name" className="py-6 rounded-xl bg-white" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="last_name">Last name</label>
                <Input id="last_name" name="last_name" type="text" placeholder="Enter your last name" className="py-6 rounded-xl bg-white" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" className="py-6 rounded-xl bg-white" required />
            </div>

            {/* Website & Service Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="website">Website</label>
                <Input id="website" name="website" type="text" placeholder="www.yourwebsite.com" className="py-6 rounded-xl bg-white" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Service</label>
                <Select value={service} onValueChange={setService} name="service">
                  <SelectTrigger className="w-full py-6 rounded-xl bg-white text-slate-500">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Website Audit (Free)</SelectItem>
                    <SelectItem value="seo">Search Engine Optimization</SelectItem>
                    <SelectItem value="ppc">Pay Per Click (Paid Ads)</SelectItem>
                    <SelectItem value="smo">Social Media Optimization</SelectItem>
                    <SelectItem value="webdev">Website Development</SelectItem>
                    <SelectItem value="appdev">App Development</SelectItem>
                    <SelectItem value="custom">Custom Softwares</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="message">How can we help?</label>
              <Textarea id="message" name="message" placeholder="Tell us a little about your project..." rows={4} className="rounded-xl resize-none p-4 bg-white" required />
            </div>

            {/* Submit */}
            <div className="mt-4">
              <Button className="w-full py-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-base font-medium transition-all" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send message'}
              </Button>
              <p className="text-center text-xs text-slate-400 mt-4">
                By clicking on "Send message" button, you agree to our <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ContactForm