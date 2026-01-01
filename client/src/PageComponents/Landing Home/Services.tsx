'use client'

import type { ComponentType } from 'react'
import { useState, useEffect } from 'react'

import { ArrowRightIcon } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'

type Features = {
  icon: ComponentType
  title: string
  description: string
  cardBorderColor: string
  avatarTextColor: string
  avatarBgColor: string
  link: string
}[]

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
    y: 50 
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

const Services = ({ featuresList }: { featuresList: Features }) => {
  const isMobile = useIsMobile()

  return (
    <section className='min-h-screen py-8 sm:py-16 lg:py-16'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-3 space-y-4 sm:mb-4 lg:mb-8'>
          <h3 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl text-center font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            Discover Affordable <br/>{' '}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Digital Marketing Services
            </span>
          </h3>
          <p className='text-muted-foreground text-xl'>
            Explore key features designed to enhance your shopping experience with intuitive navigation, robust
            security, and seamless functionality.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isMobile ? "visible" : undefined}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : { once: true, amount: 0.3, margin: "0px" }}
          className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
        >
          {featuresList.map((features, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className={cn('shadow-none transition-colors duration-300', features.cardBorderColor)}>
                <CardContent>
                  <Avatar className={cn('mb-6 size-10 rounded-md', features.avatarTextColor)}>
                    <AvatarFallback className={cn('rounded-md [&>svg]:size-6', features.avatarBgColor)}>
                      <features.icon />
                    </AvatarFallback>
                  </Avatar>
                  <h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
                  <p className='text-muted-foreground'>{features.description}</p>
                  <Button variant='outline' className='mt-4 rounded-lg text-base shadow-none has-[>svg]:px-4' size='sm' asChild>
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
  )
}

export default Services
