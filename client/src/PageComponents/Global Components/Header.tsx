'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PresentationChartBarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  CameraIcon,
  MegaphoneIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const digitalMarketingServices = [
  { name: 'AI SEO', description: 'Drive targeted traffic with ads', href: '/seo-services/ai-seo-services', icon: ChartPieIcon },
  { name: 'Local SEO', description: 'Boost your search engine rankings', href: '/seo-services/local-seo-services', icon: MagnifyingGlassIcon },
  { name: 'Ecommerce SEO', description: 'Create compelling content strategies', href: '/seo-services/ecommerce-seo-services', icon: PencilSquareIcon },
  { name: 'Technical SEO', description: 'Engage your audience on social platforms', href: '/seo-services/technical-seo-services', icon: CursorArrowRaysIcon },
  { name: 'SEO Audits', description: 'Reach customers directly in their inbox', href: '/seo-services/seo-audit-services', icon: MegaphoneIcon },
]

const webDevelopmentServices = [
  { name: 'Custom Websites', description: 'Tailored web solutions for your business', href: '#', icon: GlobeAltIcon },
  { name: 'E-commerce Development', description: 'Build powerful online stores', href: '#', icon: ShoppingCartIcon },
  { name: 'Mobile App Development', description: 'Native and cross-platform apps', href: '#', icon: DevicePhoneMobileIcon },
  { name: 'Landing Page Development', description: 'Track and measure your success', href: '#', icon: PresentationChartBarIcon },
  { name: 'Website Maintenance', description: 'Protect your digital assets', href: '#', icon: FingerPrintIcon },
]

const creativeServices = [
  { name: 'Google Ads Management', description: 'Create memorable brand identities', href: '/google-ads-management', icon: CameraIcon },
  { name: 'Meta Ads', description: 'Professional video content creation', href: '/meta-ads-management', icon: PlayCircleIcon },
  { name: 'Search Engine Marketing', description: 'Capture your brand in the best light', href: '/search-engine-marketing', icon: CameraIcon },
  { name: 'Lead Generation Service', description: 'Visual designs that communicate', href: '/lead-generation-services', icon: SquaresPlusIcon },
]

const featuredServices = [
  {
    name: 'Free SEO Audit',
    description: "Get a comprehensive analysis of your website's SEO performance",
    href: '#',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Digital Strategy Consultation',
    description: 'One-on-one session to plan your digital transformation',
    href: '#',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
]

const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayCircleIcon },
  { name: 'Get Started', href: '/contact', icon: PhoneIcon },
  { name: 'View Portfolio', href: '#', icon: CameraIcon },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sm:p-6 lg:sticky lg:top-0 z-50">
      <nav aria-label="Global" className="mx-auto sm:bg-white lg:border border-blue-500 sm:rounded-4xl flex max-w-6xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex -m-1.5 p-1.5 space-x-0">
            <p className="text-blue-600 text-4xl font-extrabold transition duration-300 bungee-shade cursor-pointer">
              V<span className="text-gray-700 text-3xl -mb-4 font-extrabold transition duration-300  cursor-pointer">aphers</span>
            </p>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Services Mega Menu */}
          <Popover className="relative">
            {({ open, close }) => (
              <>
                <PopoverButton className="flex items-center gap-x-1 text-base font-semibold text-gray-800 hover:text-[#4f39f6] transition-colors duration-200">
                  Services
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-500" />
                </PopoverButton>

                {open && (
                  <>
                    {/* Outside click catch backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={close}
                      aria-hidden="true"
                    />

                    <PopoverPanel
                      static
                      onClick={(e) => e.stopPropagation()} // Prevent closing on panel clicks
                      className="border border-blue-500 absolute left-6/2 ml-2 z-20 mt-10 w-screen max-w-6xl -translate-x-1/2 transform overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5"
                    >
                      <div className="p-8">
                        {/* Services Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                          {/* SEO Column */}
                          <div>
                            <Link href="/seo-services" onClick={() => close()}>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 hover:text-blue-700">
                                Search Engine Optimization
                              </h4>
                            </Link>
                            <div className="space-y-3">
                              {digitalMarketingServices.map((item) => (
                                <div key={item.name} className="group">
                                  <Link href={item.href} onClick={() => close()} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex-shrink-0">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                        <item.icon className="h-4 w-4 text-white" aria-hidden="true" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Web Development Column */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Web Development</h4>
                            <div className="space-y-3">
                              {webDevelopmentServices.map((item) => (
                                <div key={item.name} className="group">
                                  <a href={item.href} onClick={() => close()} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex-shrink-0">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                        <item.icon className="h-4 w-4 text-white" aria-hidden="true" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* PPC Marketing */}
                          <div>
                            <Link href="/ppc-marketing-services" onClick={() => close()}>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2 hover:text-blue-700">
                                Pay Per Click (PPC) Marketing
                              </h4>
                            </Link>
                            <div className="space-y-3">
                              {creativeServices.map((item) => (
                                <div key={item.name} className="group">
                                  <Link href={item.href} onClick={() => close()} className="flex items-start space-x-3 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex-shrink-0">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 group-hover:bg-blue-600 transition-colors duration-200">
                                        <item.icon className="h-4 w-4 text-white" aria-hidden="true" />
                                      </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-600 mt-1">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Featured Services Column */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">Featured</h4>
                            <div className="space-y-4">
                              {featuredServices.map((item) => (
                                <div key={item.name} className="group">
                                  <a href={item.href} onClick={() => close()} className="block rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="aspect-w-3 aspect-h-2 mb-3">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-20 object-cover rounded-lg"
                                      />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {item.description}
                                    </p>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Call to Actions Footer */}
                        <div className="border-t border-gray-200 pt-6">
                          <div className="flex justify-center space-x-8">
                            {callsToAction.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => close()}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                              >
                                <item.icon className="h-5 w-5" aria-hidden="true" />
                                <span>{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </>
                )}
              </>
            )}
          </Popover>

          <Link href="#" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/blogs" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Blogs
          </Link>
          <Link href="/about-us" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            About Us
          </Link>
          <Link href="/Contact-Us" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Contact Us
          </Link>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/Contact-us" className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            Become a Client <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gradient-to-b from-[#061d40] to-[#1a4d8f] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
            <p className="text-white text-4xl font-extrabold transition duration-300 bungee-shade cursor-pointer">
              V<span className="text-white font-extrabold text-3xl -mb-4  transition duration-300 tracking-wider cursor-pointer">aphers</span>
            </p>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {/* Digital Marketing */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                    Digital Marketing
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {digitalMarketingServices.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                {/* Web Development */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                    Web Development
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {webDevelopmentServices.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                {/* Creative Services */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-white hover:bg-white/5">
                    Creative Services
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {creativeServices.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-white hover:bg-white/5"
                      >
                        {item.name}
                      </DisclosureButton>   
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  href="/blogs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Blogs
                </Link>
                <Link
                  href="/about-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  About Us
                </Link>
              </div>

              <div className="py-6">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                  Become a Client
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
