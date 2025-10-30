'use client'

import {
  Search,
  Monitor,
  Video,
  ShoppingCart,
  MapPin,
  Smartphone,
} from 'lucide-react'
import { ArrowRightIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type Feature = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  cardBorderColor: string
  avatarTextColor: string
  avatarBgColor: string
  link: string
}

const googleAdsCampaigns: Feature[] = [
  {
    icon: Search,
    title: 'Search Ads',
    description: 'Text ads on Google search results, capturing high-intent users searching specific keywords.',
    cardBorderColor: 'border border-blue-500',
    avatarTextColor: 'text-blue-600',
    avatarBgColor: 'bg-blue-100',
    link: '/services/google-ads/search-ads',
  },
  {
    icon: Monitor,
    title: 'Display Ads',
    description: 'Image/banner ads visible on Google Display Network websites, ideal for brand awareness and retargeting.',
    cardBorderColor: 'border border-green-500',
    avatarTextColor: 'text-green-600',
    avatarBgColor: 'bg-green-100',
    link: '/services/google-ads/display-ads',
  },
  {
    icon: Video,
    title: 'Video Ads',
    description: 'Video advertising on YouTube and partner sites to engage customers with compelling content.',
    cardBorderColor: 'border border-purple-500',
    avatarTextColor: 'text-purple-600',
    avatarBgColor: 'bg-purple-100',
    link: '/services/google-ads/video-ads',
  },
  {
    icon: ShoppingCart,
    title: 'Shopping Ads',
    description: 'Showcase your products with images and pricing directly in Google search results.',
    cardBorderColor: 'border border-yellow-500',
    avatarTextColor: 'text-yellow-600',
    avatarBgColor: 'bg-yellow-100',
    link: '/services/google-ads/shopping-ads',
  },
  {
    icon: MapPin,
    title: 'Local Ads',
    description: 'Advertise locally on Google Maps and localized search results to drive foot traffic.',
    cardBorderColor: 'border border-red-500',
    avatarTextColor: 'text-red-600',
    avatarBgColor: 'bg-red-100',
    link: '/services/google-ads/local-ads',
  },
  {
    icon: Smartphone,
    title: 'App Promotion Ads',
    description: 'Drive app installs and engagement across Google’s vast advertising networks.',
    cardBorderColor: 'border border-teal-500',
    avatarTextColor: 'text-teal-600',
    avatarBgColor: 'bg-teal-100',
    link: '/services/google-ads/app-promotion',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1024px)')

    const handleChange = () => {
      setIsMobile(mql.matches)
    }

    setIsMobile(mql.matches)
    mql.addEventListener('change', handleChange)

    return () => mql.removeEventListener('change', handleChange)
  }, [])

  return isMobile
}

const Services = () => {
  const isMobile = useIsMobile()

  return (
    <div className="w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
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
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Content */}
      <section className="relative z-10 min-h-screen py-8 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Head */}
          <div className="mb-3 space-y-4 sm:mb-4 lg:mb-8">
            <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl text-center font-montserrat text-gray-900 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
              Explore Our <br />
              <span className="bg-blue-600 bg-clip-text text-transparent">Google Ads Campaign Types</span>
            </h3>
            <p className="text-muted-foreground text-center text-xl max-w-3xl mx-auto">
              Learn about the main types of Google Ads campaigns designed to maximize your ad spend efficiency and drive targeted traffic to your business.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isMobile ? 'visible' : undefined}
            whileInView={isMobile ? undefined : 'visible'}
            viewport={isMobile ? undefined : { once: true, amount: 0.3, margin: '0px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {googleAdsCampaigns.map((features, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className={cn('shadow-none transition-colors duration-300', features.cardBorderColor)}>
                  <CardContent>
                    <Avatar className={cn('mb-6 size-10 rounded-md', features.avatarTextColor)}>
                      <AvatarFallback className={cn('rounded-md [&>svg]:size-6', features.avatarBgColor)}>
                        <features.icon className="w-6 h-6" aria-hidden="true" />
                      </AvatarFallback>
                    </Avatar>
                    <h6 className="mb-2 text-lg font-semibold">{features.title}</h6>
                    <p className="text-muted-foreground">{features.description}</p>
                    <Button variant="outline" className="mt-4 rounded-lg text-base shadow-none has-[>svg]:px-4" size="sm" asChild>
                      <a href={features.link}>
                        Learn More
                        <ArrowRightIcon />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
