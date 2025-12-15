'use client'

import React from "react"
import Link from "next/link"
import { 
  Sheet, 
  SheetContent,
  SheetTitle,        // Added this import
  SheetDescription   // Added this import
} from "@/components/ui/sheet"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { digitalMarketing, webDev, creativeServices } from "@/lib/menu-data" 

type MobileMenuProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full max-w-sm bg-gradient-to-b from-[#061d40] to-[#1a4d8f] p-6 overflow-y-auto">
        
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Browse our services, pricing, blog, and company information.
        </SheetDescription>

        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-white text-2xl -m-1.5 p-1.5 bungee-inline-regular" onClick={() => setOpen(false)}>
            Vaphers
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-white rounded-md p-2.5 hover:bg-white/10"
            aria-label="Close menu"
          >
            <ChevronDownIcon className="rotate-45 w-6 h-6" />
          </button>
        </div>

        {/* Digital Marketing Disclosure */}
        <Disclosure as="div" className="mb-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                Search Engine Optimization
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                {digitalMarketing.map(item => (
                  <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
                    {item.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Web Dev Disclosure */}
        <Disclosure as="div" className="mb-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                Website Development
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                {webDev.map(item => (
                  <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
                    {item.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* PPC Disclosure */}
        <Disclosure as="div" className="mb-4">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                PPC Marketing
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                {creativeServices.map(item => (
                  <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10 text-sm">
                    {item.name}
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Direct Links */}
        <div className="space-y-5">
            <Link href="/blogs" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            Blogs
            </Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            Pricing
            </Link>
            <Link href="/about-us" onClick={() => setOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            About Us
            </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-3 font-semibold text-blue-600 bg-white text-center hover:bg-gray-100 transition-colors"
          >
            Work With Us
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
