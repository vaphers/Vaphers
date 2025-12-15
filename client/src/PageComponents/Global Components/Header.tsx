'use client'

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { digitalMarketing, webDev, creativeServices, featured, cta } from "@/lib/menu-data"

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false })

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sm:p-6 lg:sticky lg:top-0 z-50 bg-transparent">
      <nav className="mx-auto sm:bg-white lg:border border-blue-500 sm:rounded-4xl flex max-w-6xl items-center justify-between p-4 lg:px-8">
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
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-x-1 text-base font-semibold text-gray-800 hover:text-[#4f39f6] transition-colors duration-200 outline-none">
                Services
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="absolute left-6 transform -translate-x-1/3 border border-blue-500 mt-10 z-[60] p-0 shadow-2xl bg-white w-screen max-w-6xl rounded-3xl">
              <div className="p-8">
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {/* SEO Column */}
                  <div>
                    <Link href="/seo-services">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 hover:text-blue-700">Search Engine Optimization</h4>
                    </Link>
                    <div className="space-y-3">
                      {digitalMarketing.map(item => (
                        <div key={item.name} className="group">
                          <Link href={item.href} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{item.name}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Web Dev Column */}
                  <div>
                    <Link href="/website-development-services">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 hover:text-blue-700">Website Development</h4>
                    </Link>
                    <div className="space-y-3">
                      {webDev.map(item => (
                        <div key={item.name} className="group">
                          <Link href={item.href} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{item.name}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* PPC Column */}
                  <div>
                    <Link href="/ppc-marketing">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 hover:text-blue-700">Pay Per Click (PPC) Marketing</h4>
                    </Link>
                    <div className="space-y-3">
                      {creativeServices.map(item => (
                        <div key={item.name} className="group">
                          <Link href={item.href} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                            <div className="flex-shrink-0">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{item.name}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Featured Column */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Featured</h4>
                    <div className="space-y-4">
                      {featured.map(item => (
                        <div key={item.name} className="group">
                          <Link href={item.href} className="block rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                            <div className="mb-3 relative h-20 w-full">
                              <Image 
                                src={item.img} 
                                alt={item.name} 
                                fill 
                                sizes="200px" 
                                className="object-cover rounded-lg" 
                                loading="lazy" 
                                quality={75} 
                              />
                            </div>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{item.name}</p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.desc}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Footer Links */}
                <div className="border-t border-gray-200 pt-6 flex justify-center space-x-8">
                  {cta.map(item => (
                    <Link key={item.name} href={item.href} className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Link href="/pricing" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">Pricing</Link>
          <Link href="/blogs" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">Blogs</Link>
          <Link href="/about-us" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">About Us</Link>
          <Link href="/contact" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">Contact Us</Link>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/contact" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Work With Us <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* the mobile menu would only be rendered when requested */}
      {mobileMenuOpen && (
        <MobileMenu open={mobileMenuOpen} setOpen={setMobileMenuOpen} />
      )}
    </header>
  )
}
