'use client'

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { digitalMarketing, webDev, creativeServices, featured, cta } from "@/lib/menu-data"
import { BookOpen, HelpCircle, Info } from "lucide-react"

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false })

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isWriteForUs = pathname?.startsWith('/write-for-us')

  return (
    <header className="sm:p-6 lg:sticky lg:top-0 z-50 bg-transparent">
      <nav className="mx-auto sm:bg-white lg:border border-blue-500 sm:rounded-4xl flex w-[95%] sm:w-[90%] lg:w-[86%] max-w-[1550px] items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="flex -m-1.5 p-1.5 items-center">
            <Image 
                src="/logo.svg" 
                alt="Vaphers" 
                width={160} 
                height={40} 
                priority 
                quality={90} 
                className="w-auto h-10" 
            />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-gray-600"
            aria-label="Open main menu"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8 items-center">
          {/* SEO - Direct Link (No Dropdown) */}
          <Link
            href="/seo-services"
            className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            SEO
          </Link>

          {/* AI SEO - Direct Link (No Dropdown) */}
          <Link
            href="/seo-services/ai-seo-services"
            className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            AI SEO
          </Link>

          {/* Paid Ads - Direct Link (No Dropdown) */}
          <Link
            href="/ppc-marketing"
            className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Paid Ads
          </Link>

          {/* Video Marketing - Direct Link (No Dropdown) */}
          <Link
            href="/ppc-marketing/meta-ads-management-services"
            className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Video Marketing
          </Link>

          {/* Resources - With Dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-x-1 text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 outline-none cursor-pointer">
                <span>Resources</span>
                <ChevronDownIcon aria-hidden="true" className="size-4 flex-none text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="border border-blue-500 mt-4 z-[60] p-3 shadow-xl bg-white w-72 rounded-2xl">
              <div className="space-y-1">
                <Link href="/blogs" className="block p-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">Blogs & Insights</p>
                  <p className="text-xs text-gray-500">Actionable growth teardowns & guides</p>
                </Link>
                <Link href="/common-questions" className="block p-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">Common Questions</p>
                  <p className="text-xs text-gray-500">Transparent answers & FAQs</p>
                </Link>
                <Link href="/about-us" className="block p-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">About Us</p>
                  <p className="text-xs text-gray-500">Our agency mission & team</p>
                </Link>
                <Link href="/pricing" className="block p-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-900 hover:text-blue-600">Pricing & Packages</p>
                  <p className="text-xs text-gray-500">Transparent studio plans</p>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
          {isWriteForUs ? (
            <>
              <Link
                href="/write-for-us/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/write-for-us/signup"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up &rarr;
              </Link>
            </>
          ) : (
            <Link href="/contact" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
              Get A Proposal <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      {/* the mobile menu would only be rendered when requested */}
      {mobileMenuOpen && (
        <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      )}
    </header>
  )
}














