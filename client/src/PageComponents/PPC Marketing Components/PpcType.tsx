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

const ppcAdTypes: Feature[] = [
  {
    icon: Search,
    title: 'Search Ads',
    description: 'Text ads that appear on Google search results pages, targeting users actively searching for keywords related to your business.',
    cardBorderColor: 'border border-blue-500',
    avatarTextColor: 'text-blue-600',
    avatarBgColor: 'bg-blue-100',
    link: '/services/ppc/search-ads',
  },
  {
    icon: Monitor,
    title: 'Display Ads',
    description: 'Visual banner or image ads shown across millions of websites on the Google Display Network to raise brand awareness and retarget visitors.',
    cardBorderColor: 'border border-green-500',
    avatarTextColor: 'text-green-600',
    avatarBgColor: 'bg-green-100',
    link: '/services/ppc/display-ads',
  },
  {
    icon: Video,
    title: 'Social Ads',
    description: 'Promoted video or image ads on social media platforms for engaging audiences through storytelling and targeted promotions.',
    cardBorderColor: 'border border-purple-500',
    avatarTextColor: 'text-purple-600',
    avatarBgColor: 'bg-purple-100',
    link: '/services/ppc/social-ads',
  },
  {
    icon: ShoppingCart,
    title: 'Google Shopping Ads',
    description: 'Product ads displaying images, prices, and your store name directly in Google search results to attract ready-to-buy shoppers.',
    cardBorderColor: 'border border-yellow-500',
    avatarTextColor: 'text-yellow-600',
    avatarBgColor: 'bg-yellow-100',
    link: '/services/ppc/google-shopping-ads',
  },
  {
    icon: Smartphone,
    title: 'Remarketing Ads',
    description: 'Ads targeted at users who have previously visited your site, designed to bring them back and increase conversions.',
    cardBorderColor: 'border border-teal-500',
    avatarTextColor: 'text-teal-600',
    avatarBgColor: 'bg-teal-100',
    link: '/services/ppc/remarketing-ads',
  },
  {
    icon: MapPin,
    title: 'Local Services Ads',
    description: 'Ads that promote your local service business directly in Google search results and maps to attract nearby customers.',
    cardBorderColor: 'border border-red-500',
    avatarTextColor: 'text-red-600',
    avatarBgColor: 'bg-red-100',
    link: '/services/ppc/local-services-ads',
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

const PPCAdTypesSection = () => {
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
      <section className="relative z-10 min-h-screen py-8 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Head */}
          <div className="mb-3 space-y-4 sm:mb-4 lg:mb-8">
            <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl text-center font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
              what are the different <br/>
              <span className="bg-blue-600 bg-clip-text text-transparent">Types of PPC Ads?</span>
            </h4>
            <p className="text-muted-foreground text-center text-xl max-w-3xl mx-auto">
              Discover different PPC ad formats designed to grow your business and deliver targeted leads where it counts.
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
            {ppcAdTypes.map((feature, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className={cn('shadow-none transition-colors duration-300', feature.cardBorderColor)}>
                  <CardContent>
                    <Avatar className={cn('mb-6 size-10 rounded-md', feature.avatarTextColor)}>
                      <AvatarFallback className={cn('rounded-md [&>svg]:size-6', feature.avatarBgColor)}>
                        <feature.icon className="w-6 h-6" aria-hidden="true" />
                      </AvatarFallback>
                    </Avatar>
                    <h6 className="mb-2 text-lg font-semibold">{feature.title}</h6>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <Button variant="outline" className="mt-4 rounded-lg text-base shadow-none has-[>svg]:px-4" size="sm" asChild>
                      <a href={feature.link}>
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

export default PPCAdTypesSection
