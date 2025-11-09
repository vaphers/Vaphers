// 'use client'

// import React from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Mail, Phone, MapPin, Globe, Twitter, Instagram, Dribbble, Linkedin } from 'lucide-react'

// const ContactForm: React.FC = () => {
//   return (
//     <div className=" w-full relative ">
//       {/* Dashed Grid Background */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//             linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//           `,
//           backgroundSize: "20px 20px",
//           backgroundPosition: "0 0, 0 0",
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
//           maskComposite: "intersect",
//           WebkitMaskComposite: "source-in",
//         }}
//       />

//       {/* Content */}
//       <section className="relative z-10 py-16 px-4 flex flex-col md:flex-row gap-10 max-w-7xl mx-auto w-full">
//         {/* Left contact info */}
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
//                   <div className="text-muted-foreground text-sm">+91-9641861932</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
//                   <MapPin className="w-5 h-5 text-slate-600" />
//                 </div>
//                 <div>
//                   <span className="font-medium block">Location</span>
//                   <div className="text-muted-foreground text-sm">Kolkata, India</div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-4">
//             <span className="font-semibold text-xl block mb-3">Connect</span>
//             <div className="flex gap-3">
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
//                 <Globe className="w-5 h-5 text-gray-600 hover:text-blue-600" />
//               </a>
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
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="font-medium mb-2 block">First name</label>
//                   <Input type="text" placeholder="Your first name" />
//                 </div>
//                 <div>
//                   <label className="font-medium mb-2 block">Last name</label>
//                   <Input type="text" placeholder="Your last name" />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="font-medium mb-2 block">Email</label>
//                   <Input type="email" placeholder="youremail@domain.com" />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="font-medium mb-2 block">Website</label>
//                   <Input type="url" placeholder="www.yourwebsite.com" />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="font-medium mb-2 block">Service</label>
//                   <Select>
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
//                   <label className="font-medium mb-2 block">Message</label>
//                   <Textarea placeholder="Your message" rows={4} />
//                 </div>
//                 <div className="md:col-span-2 ">
//                   <Button className="w-full mt-2 rounded-lg px-6 bg-blue-600">
//                     Send Message
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
  import { Card, CardContent } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Textarea } from '@/components/ui/textarea'
  import { Button } from '@/components/ui/button'
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
  import { Mail, Phone, MapPin, Globe, Twitter, Instagram, Linkedin } from 'lucide-react'
  import { toast } from 'sonner' // Sonner toast API [web:102]

  const ENDPOINT = 'https://api.web3forms.com/submit' // Web3Forms endpoint [web:9]

  const ContactForm: React.FC = () => {
    const [service, setService] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setLoading(true)

      const form = e.currentTarget
      const fd = new FormData(form)
      fd.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
      fd.set('from_name', 'Website Contact Form')
      fd.set('subject', 'New contact via website')
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
      <div className=" w-full relative ">
        {/* Dashed Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e7e5e4 1px, transparent 1px),
              linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 0',
            maskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            WebkitMaskImage: `
              repeating-linear-gradient(
                to right,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              ),
              repeating-linear-gradient(
                to bottom,
                black 0px,
                black 3px,
                transparent 3px,
                transparent 8px
              )
            `,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />

        {/* Content */}
        <section className="relative z-10 py-16 px-4 flex flex-col md:flex-row gap-10 max-w-7xl mx-auto w-full">
          {/* Left contact info */}
          <div className="flex-1">
            <h4 className="text-3xl md:text-4xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
              Get A <span className="bg-blue-600 bg-clip-text text-transparent">Free Consultation</span>
            </h4>
            <p className="text-lg text-muted-foreground mb-10">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you. [web:12]
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
              <p className="mb-6 text-muted-foreground">Feel free to reach out through any of these channels. [web:12]</p>

              <div className="mb-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <span className="font-medium block">Email</span>
                    <div className="text-muted-foreground text-sm">vaphersonline@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <span className="font-medium block">Phone</span>
                    <div className="text-muted-foreground text-sm">+91-9641861932</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <span className="font-medium block">Location</span>
                    <div className="text-muted-foreground text-sm">Kolkata, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="font-semibold text-xl block mb-3">Connect</span>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-100 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="flex-1">
            <Card className="max-w-full rounded-xl shadow-sm">
              <CardContent className="py-8 px-6">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                  {/* Honeypot to reduce spam; add captcha from dashboard later if needed [web:13][web:10] */}
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div>
                    <label className="font-medium mb-2 block" htmlFor="first_name">First name</label>
                    <Input id="first_name" name="first_name" type="text" placeholder="Your first name" required />
                  </div>
                  <div>
                    <label className="font-medium mb-2 block" htmlFor="last_name">Last name</label>
                    <Input id="last_name" name="last_name" type="text" placeholder="Your last name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-medium mb-2 block" htmlFor="email">Email</label>
                    <Input id="email" name="email" type="email" placeholder="youremail@domain.com" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-medium mb-2 block" htmlFor="website">Website</label>
                    <Input id="website" name="website" type="text" placeholder="www.yourwebsite.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-medium mb-2 block">Service</label>
                    <Select value={service} onValueChange={setService} name="service">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the service" />
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
                  <div className="md:col-span-2">
                    <label className="font-medium mb-2 block" htmlFor="message">Message</label>
                    <Textarea id="message" name="message" placeholder="Your message" rows={4} required />
                  </div>
                  <div className="md:col-span-2 ">
                    <Button className="w-full mt-2 rounded-lg px-6 bg-blue-600" type="submit" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  export default ContactForm
