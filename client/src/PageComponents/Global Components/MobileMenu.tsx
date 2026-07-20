// 'use client'

// import React from "react"
// import Link from "next/link"
// import { 
//   Sheet, 
//   SheetContent,
//   SheetTitle,        // Added this import
//   SheetDescription   // Added this import
// } from "@/components/ui/sheet"
// import { Disclosure } from "@headlessui/react"
// import { ChevronDownIcon } from "@heroicons/react/24/outline"
// import { digitalMarketing, webDev, creativeServices } from "@/lib/menu-data" 

// type MobileMenuProps = {
//   open: boolean
//   setOpen: (open: boolean) => void
// }

// export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetContent side="right" className="w-full max-w-sm bg-gradient-to-b from-[#061d40] to-[#1a4d8f] p-6 overflow-y-auto">
        
//         <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
//         <SheetDescription className="sr-only">
//           Browse our services, pricing, blog, and company information.
//         </SheetDescription>

//         <div className="flex items-center justify-between mb-6">
//           <Link href="/" className="text-white text-2xl -m-1.5 p-1.5 bungee-inline-regular" onClick={() => setOpen(false)}>
//             Vaphers
//           </Link>
//           <button
//             type="button"
//             onClick={() => setOpen(false)}
//             className="text-white rounded-md p-2.5 hover:bg-white/10"
//             aria-label="Close menu"
//           >
//             <ChevronDownIcon className="rotate-45 w-6 h-6" />
//           </button>
//         </div>

//         {/* Digital Marketing Disclosure */}
//         <Disclosure as="div" className="mb-4">
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
//                 Search Engine Optimization
//                 <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//               </Disclosure.Button>
//               <Disclosure.Panel className="pt-2 pl-4 space-y-2">
//                 {digitalMarketing.map(item => (
//                   <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
//                     {item.name}
//                   </Link>
//                 ))}
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>

//         {/* Web Dev Disclosure */}
//         <Disclosure as="div" className="mb-4">
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
//                 Website Development
//                 <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//               </Disclosure.Button>
//               <Disclosure.Panel className="pt-2 pl-4 space-y-2">
//                 {webDev.map(item => (
//                   <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
//                     {item.name}
//                   </Link>
//                 ))}
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>

//         {/* PPC Disclosure */}
//         <Disclosure as="div" className="mb-4">
//           {({ open }) => (
//             <>
//               <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
//                 PPC Marketing
//                 <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//               </Disclosure.Button>
//               <Disclosure.Panel className="pt-2 pl-4 space-y-2">
//                 {creativeServices.map(item => (
//                   <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
//                     {item.name}
//                   </Link>
//                 ))}
//               </Disclosure.Panel>
//             </>
//           )}
//         </Disclosure>

//         {/* Direct Links */}
//         <div className="space-y-5">
//             <Link href="/blogs" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
//             Blogs
//             </Link>
//             <Link href="/pricing" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
//             Pricing
//             </Link>
//             <Link href="/about-us" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
//             About Us
//             </Link>
//         </div>

//         <div className="mt-8">
//           <Link
//             href="/contact"
//             onClick={() => setOpen(false)}
//             className="block rounded-lg px-3 py-3 font-semibold text-blue-600 bg-white text-center hover:bg-gray-100 transition-colors"
//           >
//             Work With Us
//           </Link>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }







'use client'

import React, { useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { digitalMarketing, webDev, creativeServices } from "@/lib/menu-data"

// ─── Types ────────────────────────────────────────────────────────────────────

type MobileMenuProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

type NavItem = {
  name: string
  href: string
}

type AccordionItemProps = {
  label: string
  items: NavItem[]
  onClose: () => void
}

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ label, items, onClose }: AccordionItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={() => setExpanded(prev => !prev)}
        className="flex w-full items-center justify-between py-3 px-1 text-white font-semibold text-sm tracking-wide hover:text-blue-200 transition-colors"
        aria-expanded={expanded}
      >
        <span>{label}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronIcon />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-3 pl-3 space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-1.5 px-3 rounded-md text-blue-100 hover:bg-white/10 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Inline SVG icons (zero dependency) ──────────────────────────────────────

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const close = useCallback(() => setOpen(false), [setOpen])

  // Stagger delay for direct links
  const directLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact Us" },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.nav
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto"
            style={{
              background: "linear-gradient(160deg, #061d40 0%, #0d3572 50%, #1a4d8f 100%)",
            }}
          >
            {/* Decorative top-right glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #4a90e2 0%, transparent 70%)",
              }}
            />

            <div className="relative flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  href="/"
                  onClick={close}
                  className="text-white text-2xl bungee-inline-regular select-none"
                >
                  Vaphers
                </Link>
                <button
                  type="button"
                  onClick={close}
                  className="text-white rounded-md p-2 hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Accordion sections */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                }}
                className="mb-4"
              >
                {[
                  { label: "Search Engine Optimization", items: digitalMarketing },
                  { label: "Website Development", items: webDev },
                  { label: "PPC Marketing", items: creativeServices },
                  { 
                    label: "Learn", 
                    items: [
                      { name: "Blogs", href: "/blogs" },
                      { name: "Common Questions", href: "/common-questions" },
                      { name: "About Us", href: "/about-us" },
                    ] 
                  },
                ].map(({ label, items }) => (
                  <motion.div
                    key={label}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                    }}
                  >
                    <AccordionItem label={label} items={items} onClose={close} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Direct links */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.32 } },
                }}
                className="flex flex-col gap-1 mt-2"
              >
                {directLinks.map(({ href, label }) => (
                  <motion.div
                    key={href}
                    variants={{
                      hidden: { opacity: 0, x: 14 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.22 } },
                    }}
                  >
                    <Link
                      href={href}
                      onClick={close}
                      className="block py-2.5 px-1 text-white font-semibold text-sm tracking-wide hover:text-blue-200 border-b border-white/10 transition-colors"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.3 }}
                className="mt-auto pt-8"
              >
                <Link
                  href="/contact"
                  onClick={close}
                  className="block w-full rounded-xl px-4 py-3.5 font-bold text-[#061d40] bg-white text-center text-sm tracking-wide hover:bg-blue-50 active:scale-95 transition-all"
                >
                  Work With Us
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}