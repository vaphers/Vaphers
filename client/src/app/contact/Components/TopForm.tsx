// 'use client'

// import React, { useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { toast } from 'sonner'
// import { CheckCircle2 } from 'lucide-react'

// const TopForm: React.FC = () => {
//   const [service, setService] = useState<string | undefined>(undefined)
//   const [loading, setLoading] = useState(false)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setLoading(true)

//     const form = e.currentTarget
//     const fd = new FormData(form)
//     fd.set('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
//     fd.set('from_name', 'Website Partner Form')
//     fd.set('subject', 'New partner application via website')
//     if (service) fd.set('service', service)

//     try {
//       const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
//       const data: { success: boolean; message?: string } = await res.json()
//       if (data.success) {
//         toast.success('Application sent', { description: 'Thanks! Your application reached the inbox.' })
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
//     <section className="min-h-screen w-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 py-16 px-4 sm:px-6 md:px-12 lg:py-24 font-sans text-white relative overflow-hidden lg:-mt-34">
      
//       {/* Top Heading */}
//       <div className="text-center max-w-6xl mx-auto mb-16 relative z-10 lg:pt-20">
//         <h2 className="text-3xl md:text-5xl text-white bungee-inline-regular mb-4 tracking-tight">
//           Let's Bring Dollars To Your Pocket
//         </h2>
//         <p className="text-base md:text-lg text-blue-100">
//           Request your custom strategy from the experts behind our data-driven success.
//         </p>
//       </div>

//       {/* CHANGED: items-stretch reverted to items-start so columns dictate their own height */}
//       <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
        
//         {/* LEFT COLUMN: The Form Card */}
//         {/* CHANGED: Removed h-full and flex/flex-col so it fits its content */}
//         <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 text-slate-900 shadow-2xl relative mt-8 lg:mt-0">
          
//           {/* Decorative Overlapping Avatars */}
//           <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex -space-x-3">
//             <img src="https://i.pravatar.cc/150?img=11" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-blue-100" />
//             <img src="https://i.pravatar.cc/150?img=44" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-yellow-100 z-10" />
//             <img src="https://i.pravatar.cc/150?img=5" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-purple-100" />
//           </div>

//           <h3 className="text-2xl md:text-4xl bungee-shade text-blue-700 text-center mt-6 mb-8 tracking-tight">
//             Get a FREE Proposal!
//           </h3>

//           <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
//             <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

//             {/* 2-Column Row: Names */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <div className="flex flex-col gap-1.5">
//                 <label htmlFor="first_name" className="text-sm font-semibold text-slate-800">First Name *</label>
//                 <Input 
//                   id="first_name" name="first_name" type="text" required 
//                   className="bg-white border-slate-200 text-slate-900 h-12 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-blue-500" 
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label htmlFor="last_name" className="text-sm font-semibold text-slate-800">Last Name</label>
//                 <Input 
//                   id="last_name" name="last_name" type="text" 
//                   className="bg-white border-slate-200 text-slate-900 h-12 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-blue-500" 
//                 />
//               </div>
//             </div>

//             {/* 2-Column Row: Contact Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//               <div className="flex flex-col gap-1.5">
//                 <label htmlFor="email" className="text-sm font-semibold text-slate-800">Work Email Address *</label>
//                 <Input 
//                   id="email" name="email" type="email" required 
//                   className="bg-white border-slate-200 text-slate-900 h-12 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-blue-500" 
//                 />
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <label htmlFor="website" className="text-sm font-semibold text-slate-800">Website</label>
//                 <Input 
//                   id="website" name="website" type="text" placeholder="https://"
//                   className="bg-white border-slate-200 text-slate-900 h-12 rounded-lg px-4 focus-visible:ring-2 focus-visible:ring-blue-500" 
//                 />
//               </div>
//             </div>

//             {/* Full Width Row: Service */}
//             <div className="flex flex-col gap-1.5">
//               <label htmlFor="service" className="text-sm font-semibold text-slate-800">Interested Service *</label>
//               <Select value={service} onValueChange={setService} name="service">
//                 <SelectTrigger className="bg-white border-slate-200 text-slate-900 h-12 rounded-lg px-4 w-full focus:ring-2 focus:ring-blue-500">
//                   <SelectValue placeholder="Select service..." />
//                 </SelectTrigger>
//                 <SelectContent className="rounded-xl shadow-xl">
//                   <SelectItem value="audit">Website Audit (Free)</SelectItem>
//                   <SelectItem value="seo">Search Engine Optimization</SelectItem>
//                   <SelectItem value="ppc">Pay Per Click (Paid Ads)</SelectItem>
//                   <SelectItem value="smo">Social Media Optimization</SelectItem>
//                   <SelectItem value="webdev">Website Development</SelectItem>
//                   <SelectItem value="appdev">App Development</SelectItem>
//                   <SelectItem value="custom">Custom Softwares</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Full Width Row: Message */}
//             <div className="flex flex-col gap-1.5">
//               <label htmlFor="message" className="text-sm font-semibold text-slate-800">Comments or Questions *</label>
//               <Textarea 
//                 id="message" name="message" required rows={3}
//                 placeholder="Looking to get more leads? Frustrated with your current results? Tell us what's going on."
//                 className="bg-white border-slate-200 text-slate-900 min-h-[100px] rounded-lg px-4 py-3 resize-none focus-visible:ring-2 focus-visible:ring-blue-500" 
//               />
//             </div>

//             <Button 
//               type="submit" 
//               disabled={loading} 
//               className="bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-lg text-lg font-bold w-full mt-2 transition-all cursor-pointer"
//             >
//               {loading ? 'Sending...' : 'Get My Custom Quote'}
//             </Button>
//           </form>
//         </div>

//         {/* RIGHT COLUMN: Information & Badges */}
//         {/* CHANGED: Removed h-full and justify-between so elements stack naturally */}
//         <div className="flex flex-col lg:pl-6 py-2 gap-8">
          
//           <div>
//             <h3 className="text-xl md:text-2xl font-bold mb-6">Here's what will happen next:</h3>
//             <div className="space-y-6">
              
//               <div className="flex items-start gap-4">
//                 <CheckCircle2 className="text-blue-400 mt-1 flex-shrink-0" fill="currentColor" size={24} />
//                 <div>
//                   <h4 className="font-bold text-lg">Get To Know Your Business</h4>
//                   <p className="text-blue-100 text-sm md:text-base mt-1 leading-relaxed">
//                     From our first conversation, we begin researching your business, competitors, and industry. We'll audit your site to craft a fully customized proposal.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <CheckCircle2 className="text-blue-400 mt-1 flex-shrink-0" fill="currentColor" size={24} />
//                 <div>
//                   <h4 className="font-bold text-lg">Put Together Your Flight Plan</h4>
//                   <p className="text-blue-100 text-sm md:text-base mt-1 leading-relaxed">
//                     Based on their research, your strategist will compile personalized recommendations for how your business can drive more revenue.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <CheckCircle2 className="text-blue-400 mt-1 flex-shrink-0" fill="currentColor" size={24} />
//                 <div>
//                   <h4 className="font-bold text-lg">Prepare For Takeoff</h4>
//                   <p className="text-blue-100 text-sm md:text-base mt-1 leading-relaxed">
//                     Your flight plan will include pricing, timelines, a detailed view of what a partnership with Vaphers will look like, and how we'll help your business grow.
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Testimonial Box */}
//           <div className="bg-[#053268] rounded-xl p-6 md:p-8 border border-blue-800/50 shadow-inner relative overflow-hidden">
//             <div className="absolute bottom-4 right-4 flex gap-1">
//               {[1,2,3,4].map((i) => (
//                 <div key={i} className="flex flex-col gap-1">
//                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400/30"></div>
//                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400/30"></div>
//                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400/30"></div>
//                 </div>
//               ))}
//             </div>
//             <p className="text-base md:text-lg font-medium italic relative z-10 text-blue-50 leading-relaxed">
//               "Vaphers has always worked hard to make sure that we're getting what we need out of the partnership, not just what may seem like the best result."
//             </p>
//             <p className="font-bold mt-4 text-white relative z-10">— Verified Client</p>
//           </div>

//           {/* Badges / Awards */}
//           <div className="flex items-center gap-4 md:gap-6 pt-2">
//             <div className="p-2 h-16 md:h-20 flex items-center justify-center">
//               <img 
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773496852/Facebook-Partner_1_z2dmm2.png" 
//                 alt="Meta Business Partner" 
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//             <div className="p-2 h-16 md:h-20 flex items-center justify-center">
//               <img 
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064257/google-premier-partner-no-year-1_k2zdgi.png" 
//                 alt="Google Premier Partner" 
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//             <div className="h-16 md:h-20 flex items-center justify-center">
//               <img 
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064256/top_clutch.co_local_seo_company_yjydm4.png" 
//                 alt="Clutch Top Local SEO Company" 
//                 className="h-full w-auto object-contain drop-shadow-md"
//               />
//             </div>
//             <div className="p-2 h-16 md:h-20 flex items-center justify-center">
//               <img 
//                 src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064255/microsoftbadge1-1-1-1_kdggsc.png" 
//                 alt="Microsoft Advertising Partner" 
//                 className="h-full w-auto object-contain"
//               />
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default TopForm








'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { CheckCircle2 } from 'lucide-react'

const TopForm: React.FC = () => {
  const [service, setService] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const fd = new FormData(form)
    
    // Set fields for internal API
    fd.set('formType', 'Contact Page Form')
    if (service) fd.set('service', service)
    fd.set('pageUrl', window.location.href)
    fd.set('_ts', Date.now().toString())

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

  // Consistent, improved input styling
  const inputStyles = "bg-slate-50 border border-slate-200 text-slate-900 h-12 rounded-lg px-4 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all placeholder:text-slate-400"

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-blue-950 via-blue-900 to-blue-600 py-16 px-4 sm:px-6 md:px-12 lg:py-24 font-sans text-white relative overflow-hidden lg:-mt-34">
      
      {/* Top Heading */}
      <div className="text-center max-w-6xl mx-auto mb-16 relative z-10 lg:pt-20">
        <h2 className="text-3xl md:text-5xl text-white bungee-inline-regular mb-4 tracking-tight">
          Let's Bring Dollars To Your Pocket
        </h2>
        <p className="text-base md:text-lg text-blue-100">
          Request your custom strategy from the experts behind our data-driven success.
        </p>
      </div>

      {/* CHANGED: Reverted back to items-stretch for equal heights */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch relative z-10">
        
        {/* LEFT COLUMN: The Form Card */}
        {/* CHANGED: h-full and flex flex-col applied to stretch fully */}
        <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 text-slate-900 shadow-2xl relative mt-8 lg:mt-0 h-full flex flex-col">
          
          {/* Decorative Overlapping Avatars */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex -space-x-3">
            <img src="https://i.pravatar.cc/150?img=11" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-blue-100" />
            <img src="https://i.pravatar.cc/150?img=44" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-yellow-100 z-10" />
            <img src="https://i.pravatar.cc/150?img=5" alt="Team member" className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-white object-cover bg-purple-100" />
          </div>

          <h3 className="text-2xl md:text-4xl bungee-shade text-blue-700 text-center mt-6 mb-8 tracking-tight">
            Get a FREE Proposal!
          </h3>

          <form className="flex flex-col gap-5 flex-grow" onSubmit={handleSubmit}>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* 2-Column Row: Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="first_name" className="text-sm font-semibold text-slate-700">First Name *</label>
                <Input 
                  id="first_name" name="first_name" type="text" required placeholder="John"
                  className={inputStyles}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="last_name" className="text-sm font-semibold text-slate-700">Last Name</label>
                <Input 
                  id="last_name" name="last_name" type="text" placeholder="Doe"
                  className={inputStyles}
                />
              </div>
            </div>

            {/* 2-Column Row: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Work Email Address *</label>
                <Input 
                  id="email" name="email" type="email" required placeholder="john@company.com"
                  className={inputStyles}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="website" className="text-sm font-semibold text-slate-700">Website</label>
                {/* CHANGED: Removed https:// placeholder */}
                <Input 
                  id="website" name="website" type="text" placeholder="yourcompany.com"
                  className={inputStyles}
                />
              </div>
            </div>

            {/* Full Width Row: Service */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service" className="text-sm font-semibold text-slate-700">Interested Service *</label>
              <Select value={service} onValueChange={setService} name="service">
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select service..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-slate-200">
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

            {/* Full Width Row: Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">Comments or Questions *</label>
              <Textarea 
                id="message" name="message" required rows={3}
                placeholder="Looking to get more leads? Frustrated with your current results? Tell us what's going on."
                className="bg-slate-50 border border-slate-200 text-slate-900 min-h-[100px] rounded-lg px-4 py-3 shadow-sm resize-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:bg-white transition-all placeholder:text-slate-400" 
              />
            </div>

            {/* mt-auto pushes the button to the bottom so it aligns beautifully if the left side stretches */}
            <Button 
              type="submit" 
              disabled={loading} 
              className="bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-lg text-lg font-bold w-full mt-auto shadow-md transition-all cursor-pointer"
            >
              {loading ? 'Sending...' : 'Get My Custom Quote'}
            </Button>
          </form>
        </div>

        {/* RIGHT COLUMN: Information & Badges */}
        {/* CHANGED: Re-added h-full and justify-between, shrunk fonts to match layout better */}
        <div className="flex flex-col justify-between h-full lg:pl-6 py-2 gap-6">
          
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5">Here's what will happen next:</h3>
            <div className="space-y-5">
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" size={20} />
                <div>
                  <h4 className="font-bold text-lg">Get To Know Your Business</h4>
                  <p className="text-blue-100/90 text-md mt-1 leading-relaxed">
                    From our first conversation, we begin researching your business, competitors, and industry. We'll audit your site to craft a fully customized proposal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" size={20} />
                <div>
                  <h4 className="font-bold text-lg">Put Together Your Flight Plan</h4>
                  <p className="text-blue-100/90 text-md mt-1 leading-relaxed">
                    Based on their research, your strategist will compile personalized recommendations for how your business can drive more revenue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" size={20} />
                <div>
                  <h4 className="font-bold text-lg">Prepare For Takeoff</h4>
                  <p className="text-blue-100/90 text-md mt-1 leading-relaxed">
                    Your flight plan will include pricing, timelines, a detailed view of what a partnership with Vaphers will look like, and how we'll help your business grow.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Testimonial Box */}
          <div className="bg-[#053268] rounded-xl p-5 md:p-6 border border-blue-800/50 shadow-inner relative overflow-hidden mt-2">
            <div className="absolute bottom-3 right-3 flex gap-1">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-400/30"></div>
                  <div className="w-1 h-1 rounded-full bg-blue-400/30"></div>
                  <div className="w-1 h-1 rounded-full bg-blue-400/30"></div>
                </div>
              ))}
            </div>
            <p className="text-sm md:text-[15px] font-medium italic relative z-10 text-blue-50 leading-relaxed">
              "Vaphers has always worked hard to make sure that we're getting what we need out of the partnership, not just what may seem like the best result."
            </p>
            <p className="font-bold mt-3 text-sm text-white relative z-10">— Verified Client</p>
          </div>

          {/* Badges / Awards */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 md:gap-6 pt-2">
            <div className="p-2 h-14 md:h-20 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773496852/Facebook-Partner_1_z2dmm2.png" 
                alt="Meta Business Partner" 
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="p-2 h-14 md:h-20 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064257/google-premier-partner-no-year-1_k2zdgi.png" 
                alt="Google Premier Partner" 
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="h-14 md:h-20 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064256/top_clutch.co_local_seo_company_yjydm4.png" 
                alt="Clutch Top Local SEO Company" 
                className="h-full w-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="p-2 h-14 md:h-20 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773064255/microsoftbadge1-1-1-1_kdggsc.png" 
                alt="Microsoft Advertising Partner" 
                className="h-full w-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TopForm