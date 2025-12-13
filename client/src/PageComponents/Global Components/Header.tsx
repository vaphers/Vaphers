'use client'

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Disclosure } from "@headlessui/react"
import {
  Bars3Icon,
  ChevronDownIcon,
  UserIcon,
  PhoneIcon,
  BookOpenIcon,
  MapPinIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline"

const digitalMarketing = [
  { name: "AI SEO", desc: "Drive targeted traffic with ads", icon: RocketLaunchIcon, href: "/seo-services/ai-seo-services" },
  { name: "Local SEO", desc: "Boost your search engine rankings", icon: MapPinIcon, href: "/seo-services/local-seo-services" },
  { name: "Ecommerce SEO", desc: "Compelling content strategies", icon: ShoppingBagIcon, href: "/seo-services/ecommerce-seo-services" },
  { name: "Technical SEO", desc: "Engage your audience on social platforms", icon: CogIcon, href: "/seo-services/technical-seo-services" },
  { name: "SEO Audits", desc: "Reach customers directly in their inbox", icon: DocumentMagnifyingGlassIcon, href: "/seo-services/seo-audit-services" },
]
const webDev = [
  { name: "Next JS Website", desc: "Tailored web solutions for your business", icon: RocketLaunchIcon, href: "/website-development-services/nextjs-website-development" },
  { name: "E-commerce Development", desc: "Build powerful online stores", icon: ShoppingCartIcon, href: "/website-development-services/ecommerce-development" },
  { name: "WordPress Website", desc: "Native and cross-platform apps", icon: GlobeAltIcon, href: "/website-development-services/wordpress-website-development" },
  { name: "Shopify Website", desc: "Track and measure your success", icon: BuildingStorefrontIcon, href: "/website-development-services/shopify-website-development" },
]
const creativeServices = [
  { name: "Google Ads Management", desc: "Create memorable brand identities", icon: MagnifyingGlassIcon, href: "/ppc-marketing/google-ads-management-services" },
  { name: "Meta Ads", desc: "Professional video content creation", icon: MegaphoneIcon, href: "/ppc-marketing/meta-ads-management-services" },
  { name: "Search Engine Marketing", desc: "Capture your brand in the best light", icon: ChartBarIcon, href: "/ppc-marketing/search-engine-marketing" },
  { name: "Lead Generation Service", desc: "Visual designs that communicate", icon: ChartBarIcon, href: "/ppc-marketing/lead-generation-services" },
]
const featured = [
  { name: "Free SEO Audit", desc: "Get a comprehensive analysis of your website's SEO performance", img: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765286238/free-website-audit_iroqxt.png", href: "https://www.vaphers.com/seo-services/seo-audit-services" },
  { name: "FAQ", desc: "Essential answers to help you navigate common queries.", img: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1765286478/faq_nthajt.png", href: "#" },
]
const cta = [
  { name: "About Us", href: "/about-us", icon: UserIcon },
  { name: "Get Started", href: "/contact", icon: PhoneIcon },
  { name: "Resources", href: "/blogs", icon: BookOpenIcon },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sm:p-6 lg:sticky lg:top-0 z-50 bg-transparent">
      <nav className="mx-auto sm:bg-white lg:border border-blue-500 sm:rounded-4xl flex max-w-6xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="flex -m-1.5 p-1.5 items-center">
            <Image src="/logo.svg" alt="Vaphers" width={160} height={40} priority quality={90} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            aria-label="Open main menu"
          >
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop nav group */}
        <div className="hidden lg:flex lg:gap-x-12 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-x-1 text-base font-semibold text-gray-800 hover:text-[#4f39f6] transition-colors duration-200">
                Services
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="absolute left-6 transform -translate-x-1/3 border border-blue-500 mt-10 z-[60] p-0 shadow-2xl bg-white w-screen max-w-6xl rounded-3xl">
              <div className="p-8">
                <div className="grid grid-cols-4 gap-8 mb-8">
                  {/* SEO */}
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
                              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Web Dev */}
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
                              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* PPC Marketing */}
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
                              <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Featured */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Featured</h4>
                    <div className="space-y-4">
                      {featured.map(item => (
                        <div key={item.name} className="group">
                          <Link href={item.href} className="block rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                            <div className="mb-3 relative h-20 w-full">
                              <Image src={item.img} alt={item.name} fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover rounded-lg" loading="lazy" quality={75} />
                            </div>
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{item.name}</p>
                            <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* CTA footer */}
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

        {/* Desktop right CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/contact" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Work With Us <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu with Disclosure and Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          {/* You can optionally place the hamburger button here too */}
          <div />
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-sm bg-gradient-to-b from-[#061d40] to-[#1a4d8f] p-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-white font-bold text-2xl -m-1.5 p-1.5">
              Vaphers
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white rounded-md p-2.5"
              aria-label="Close menu"
            >
              <ChevronDownIcon className="rotate-45 w-6 h-6" />
            </button>
          </div>

          {/* Disclosures for mobile menu sections */}

          <Disclosure as="div" className="mb-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                  Digital Marketing
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>
                {open && (
                  <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                    {digitalMarketing.map(item => (
                      <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10">
                        {item.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                )}
              </>
            )}
          </Disclosure>

          <Disclosure as="div" className="mb-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                  Website Development
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>
                {open && (
                  <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                    {webDev.map(item => (
                      <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10">
                        {item.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                )}
              </>
            )}
          </Disclosure>

          <Disclosure as="div" className="mb-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 px-3 text-white font-semibold hover:bg-white/10">
                  PPC Marketing
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </Disclosure.Button>
                {open && (
                  <Disclosure.Panel className="pt-2 pl-4 space-y-2">
                    {creativeServices.map(item => (
                      <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white hover:bg-white/10">
                        {item.name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                )}
              </>
            )}
          </Disclosure>

          <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            Blogs
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            Pricing
          </Link>
          <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 rounded-md text-white font-semibold hover:bg-white/10">
            About Us
          </Link>

          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-3 font-semibold text-blue-600 bg-white text-center hover:bg-gray-100"
            >
              Work With Us
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
