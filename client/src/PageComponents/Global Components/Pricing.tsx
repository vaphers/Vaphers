// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Check } from 'lucide-react'

// type ServiceType = 'SEO' | 'AEO' | 'GEO' | 'LOCAL SEO' | 'ECOMMERCE WEBSITE' | 'SERVICE WEBSITE' | 'GOOGLE ADS' | 'META ADS'

// interface PricingTier {
//   name: string
//   price: string
//   description: string
//   features: string[]
//   popular?: boolean
// }

// const pricingData: Record<ServiceType, PricingTier[]> = {
//   'SEO': [
//     {
//       name: 'Basic',
//       price: '$1,500',
//       description: 'Perfect for small businesses starting their SEO journey',
//       features: [
//         'Keyword research (10 keywords)',
//         'On-page optimization',
//         'Monthly performance report',
//         'Basic competitor analysis',
//         'Meta tags optimization'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$3,500',
//       description: 'Ideal for growing businesses needing comprehensive SEO',
//       features: [
//         'Keyword research (25 keywords)',
//         'Advanced on-page optimization',
//         'Content optimization (5 pages)',
//         'Bi-weekly performance reports',
//         'Link building (10 backlinks/month)',
//         'Technical SEO audit'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Complete SEO solution for large businesses',
//       features: [
//         'Unlimited keyword research',
//         'Full website optimization',
//         'Content creation & optimization',
//         'Weekly performance reports',
//         'Aggressive link building',
//         'Dedicated SEO manager',
//         'Priority support'
//       ]
//     }
//   ],
//   'AEO': [
//     {
//       name: 'Basic',
//       price: '$1,200',
//       description: 'Get started with AI-powered search optimization',
//       features: [
//         'AI search optimization (10 queries)',
//         'Featured snippet optimization',
//         'Schema markup basics',
//         'Monthly AI visibility report',
//         'Voice search optimization'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$2,800',
//       description: 'Advanced AEO for better AI visibility',
//       features: [
//         'AI search optimization (30 queries)',
//         'Advanced schema implementation',
//         'Answer engine optimization',
//         'ChatGPT & Bard optimization',
//         'Bi-weekly AI performance tracking',
//         'FAQ optimization'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Complete AI search dominance',
//       features: [
//         'Unlimited AI query optimization',
//         'Full schema implementation',
//         'Multi-platform AI optimization',
//         'Custom AI content strategy',
//         'Weekly performance reports',
//         'Dedicated AEO specialist'
//       ]
//     }
//   ],
//   'GEO': [
//     {
//       name: 'Basic',
//       price: '$1,000',
//       description: 'Essential generative engine optimization',
//       features: [
//         'GEO content optimization',
//         'AI-friendly formatting',
//         'Basic entity optimization',
//         'Monthly GEO report',
//         'Citation optimization'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$2,500',
//       description: 'Comprehensive GEO strategy',
//       features: [
//         'Advanced GEO optimization',
//         'Multi-engine targeting',
//         'Entity relationship mapping',
//         'Knowledge graph optimization',
//         'Bi-weekly performance tracking',
//         'Structured data enhancement'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Full-scale generative engine presence',
//       features: [
//         'Complete GEO implementation',
//         'Custom entity development',
//         'Advanced knowledge base',
//         'Priority indexing support',
//         'Weekly strategy sessions',
//         'Dedicated GEO expert'
//       ]
//     }
//   ],
//   'LOCAL SEO': [
//     {
//       name: 'Basic',
//       price: '$1,800',
//       description: 'Get found in local searches',
//       features: [
//         'Google Business Profile optimization',
//         'Local keyword optimization (15 keywords)',
//         'NAP consistency check',
//         'Monthly ranking report',
//         'Basic review management'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$3,800',
//       description: 'Dominate your local market',
//       features: [
//         'Complete GBP management',
//         'Local keyword research (30 keywords)',
//         'Local citation building (20 citations)',
//         'Review generation & management',
//         'Local content optimization',
//         'Bi-weekly performance reports'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Multi-location local SEO dominance',
//       features: [
//         'Multi-location management',
//         'Aggressive local link building',
//         'Advanced review strategy',
//         'Local PR & outreach',
//         'Weekly optimization',
//         'Dedicated local SEO manager'
//       ]
//     }
//   ],
//   'ECOMMERCE WEBSITE': [
//     {
//       name: 'Basic',
//       price: '$4,500',
//       description: 'Launch your online store quickly',
//       features: [
//         'Up to 50 products',
//         'Responsive design',
//         'Payment gateway integration',
//         'Basic SEO setup',
//         'Shopping cart functionality',
//         '30 days support'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$8,500',
//       description: 'Feature-rich ecommerce solution',
//       features: [
//         'Up to 200 products',
//         'Custom design',
//         'Multiple payment gateways',
//         'Advanced SEO optimization',
//         'Inventory management',
//         'Email marketing integration',
//         '90 days support'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Scalable enterprise ecommerce platform',
//       features: [
//         'Unlimited products',
//         'Fully custom design & features',
//         'Advanced integrations',
//         'Multi-vendor support',
//         'Custom checkout flow',
//         'Priority support',
//         '1 year maintenance'
//       ]
//     }
//   ],
//   'SERVICE WEBSITE': [
//     {
//       name: 'Basic',
//       price: '$2,200',
//       description: 'Professional website for your service business',
//       features: [
//         'Up to 5 pages',
//         'Mobile responsive design',
//         'Contact form',
//         'Basic SEO setup',
//         'Social media integration',
//         '30 days support'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$4,500',
//       description: 'Advanced service website with booking',
//       features: [
//         'Up to 10 pages',
//         'Custom design',
//         'Appointment booking system',
//         'Advanced SEO optimization',
//         'Blog integration',
//         'Email automation',
//         '90 days support'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Complete digital solution for service business',
//       features: [
//         'Unlimited pages',
//         'Fully custom features',
//         'CRM integration',
//         'Multi-location support',
//         'Advanced analytics',
//         'Priority support',
//         '1 year maintenance'
//       ]
//     }
//   ],
//   'GOOGLE ADS': [
//     {
//       name: 'Basic',
//       price: '$1,200',
//       description: 'Start driving targeted traffic with Google Ads',
//       features: [
//         'Campaign setup & optimization',
//         'Up to 2 campaigns',
//         'Keyword research (20 keywords)',
//         'Ad copywriting (5 ads)',
//         'Monthly performance report',
//         'Ad budget: $2,000 - $5,000/month'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$2,500',
//       description: 'Comprehensive Google Ads management',
//       features: [
//         'Multi-campaign management',
//         'Up to 5 campaigns',
//         'Advanced keyword strategy',
//         'A/B testing',
//         'Conversion tracking setup',
//         'Bi-weekly optimization',
//         'Ad budget: $5,000 - $15,000/month'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Enterprise-level Google Ads optimization',
//       features: [
//         'Unlimited campaigns',
//         'Advanced audience targeting',
//         'Shopping & Display ads',
//         'Remarketing campaigns',
//         'Weekly strategy calls',
//         'Dedicated ads manager',
//         'Ad budget: $15,000+/month'
//       ]
//     }
//   ],
//   'META ADS': [
//     {
//       name: 'Basic',
//       price: '$1,000',
//       description: 'Reach your audience on Facebook & Instagram',
//       features: [
//         'Campaign setup & management',
//         'Up to 2 campaigns',
//         'Audience research',
//         'Ad creative (5 designs)',
//         'Monthly performance report',
//         'Ad budget: $1,500 - $4,000/month'
//       ]
//     },
//     {
//       name: 'Standard',
//       price: '$2,200',
//       description: 'Advanced Meta advertising strategy',
//       features: [
//         'Multi-campaign management',
//         'Up to 5 campaigns',
//         'Custom audience creation',
//         'A/B testing',
//         'Pixel setup & optimization',
//         'Bi-weekly reporting',
//         'Ad budget: $4,000 - $12,000/month'
//       ],
//       popular: true
//     },
//     {
//       name: 'Enterprise',
//       price: 'Custom',
//       description: 'Full-scale Meta advertising solution',
//       features: [
//         'Unlimited campaigns',
//         'Advanced retargeting',
//         'Lookalike audience strategy',
//         'Video ad production support',
//         'Weekly optimization',
//         'Dedicated Meta ads specialist',
//         'Ad budget: $12,000+/month'
//       ]
//     }
//   ]
// }

// export default function PricingComponent() {
//   const [selectedService, setSelectedService] = useState<ServiceType>('SEO')

//   const services: ServiceType[] = ['SEO', 'AEO', 'GEO', 'LOCAL SEO', 'ECOMMERCE WEBSITE', 'SERVICE WEBSITE', 'GOOGLE ADS', 'META ADS']

//   return (
//     <section className="w-full py-12 md:py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
//               Simple, <span className="bg-blue-600 bg-clip-text text-transparent">Transparent Pricing</span>
//             </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Choose the perfect plan for your business. All plans include expert support and proven results.
//           </p>
//         </div>

//         {/* Service Buttons */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {services.map((service) => (
//             <Button
//               key={service}
//               onClick={() => setSelectedService(service)}
//               variant={selectedService === service ? "default" : "outline"}
//               className={`
//                 px-4 py-2 rounded-lg font-medium transition-all
//                 ${selectedService === service 
//                   ? 'bg-blue-600 text-white hover:bg-blue-700' 
//                   : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
//                 }
//               `}
//             >
//               {service}
//             </Button>
//           ))}
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {pricingData[selectedService].map((tier, index) => (
//             <Card 
//               key={index} 
//               className={`
//                 relative flex flex-col border-2 transition-all hover:shadow-xl
//                 ${tier.popular 
//                   ? 'border-blue-600 shadow-lg scale-105' 
//                   : 'border-gray-200 hover:border-blue-300'
//                 }
//               `}
//             >
//               {tier.popular && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2">
//                   <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
//                     Most Popular
//                   </span>
//                 </div>
//               )}
              
//               <CardHeader className="text-center pb-6">
//                 <CardTitle className="text-2xl font-bold mb-2">{tier.name}</CardTitle>
//                 <div className="mb-3">
//                   <span className="text-4xl font-bold text-blue-600">{tier.price}</span>
//                   {tier.price !== 'Custom' && <span className="text-gray-600">/month</span>}
//                 </div>
//                 <CardDescription className="text-gray-600">
//                   {tier.description}
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="flex-grow">
//                 <ul className="space-y-3">
//                   {tier.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-start gap-3">
//                       <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
//                       <span className="text-gray-700 text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>

//               <CardFooter>
//                 <Button 
//                   className={`
//                     w-full py-6 font-semibold
//                     ${tier.popular 
//                       ? 'bg-blue-600 hover:bg-blue-700 text-white' 
//                       : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
//                     }
//                   `}
//                 >
//                   {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }




'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

type ServiceType = 'SEO' | 'AEO' | 'GEO' | 'LOCAL SEO' | 'ECOMMERCE WEBSITE' | 'SERVICE WEBSITE' | 'GOOGLE ADS' | 'META ADS'

interface PricingTier {
  name: string
  price: string
  originalPrice?: string
  description: string
  features: string[]
  popular?: boolean
}

const pricingData: Record<ServiceType, PricingTier[]> = {
  'SEO': [
    {
      name: 'Basic',
      price: '$1,500',
      originalPrice: '$2,000',
      description: 'Perfect for small businesses starting their SEO journey',
      features: [
        'Keyword research (10 keywords)',
        'On-page optimization',
        'Monthly performance report',
        'Basic competitor analysis',
        'Meta tags optimization'
      ]
    },
    {
      name: 'Standard',
      price: '$3,500',
      originalPrice: '$4,500',
      description: 'Ideal for growing businesses needing comprehensive SEO',
      features: [
        'Keyword research (25 keywords)',
        'Advanced on-page optimization',
        'Content optimization (5 pages)',
        'Bi-weekly performance reports',
        'Link building (10 backlinks/month)',
        'Technical SEO audit'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete SEO solution for large businesses',
      features: [
        'Unlimited keyword research',
        'Full website optimization',
        'Content creation & optimization',
        'Weekly performance reports',
        'Aggressive link building',
        'Dedicated SEO manager',
        'Priority support'
      ]
    }
  ],
  'AEO': [
    {
      name: 'Basic',
      price: '$1,200',
      originalPrice: '$1,600',
      description: 'Get started with AI-powered search optimization',
      features: [
        'AI search optimization (10 queries)',
        'Featured snippet optimization',
        'Schema markup basics',
        'Monthly AI visibility report',
        'Voice search optimization'
      ]
    },
    {
      name: 'Standard',
      price: '$2,800',
      originalPrice: '$3,600',
      description: 'Advanced AEO for better AI visibility',
      features: [
        'AI search optimization (30 queries)',
        'Advanced schema implementation',
        'Answer engine optimization',
        'ChatGPT & Bard optimization',
        'Bi-weekly AI performance tracking',
        'FAQ optimization'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete AI search dominance',
      features: [
        'Unlimited AI query optimization',
        'Full schema implementation',
        'Multi-platform AI optimization',
        'Custom AI content strategy',
        'Weekly performance reports',
        'Dedicated AEO specialist'
      ]
    }
  ],
  'GEO': [
    {
      name: 'Basic',
      price: '$1,000',
      originalPrice: '$1,400',
      description: 'Essential generative engine optimization',
      features: [
        'GEO content optimization',
        'AI-friendly formatting',
        'Basic entity optimization',
        'Monthly GEO report',
        'Citation optimization'
      ]
    },
    {
      name: 'Standard',
      price: '$2,500',
      originalPrice: '$3,200',
      description: 'Comprehensive GEO strategy',
      features: [
        'Advanced GEO optimization',
        'Multi-engine targeting',
        'Entity relationship mapping',
        'Knowledge graph optimization',
        'Bi-weekly performance tracking',
        'Structured data enhancement'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale generative engine presence',
      features: [
        'Complete GEO implementation',
        'Custom entity development',
        'Advanced knowledge base',
        'Priority indexing support',
        'Weekly strategy sessions',
        'Dedicated GEO expert'
      ]
    }
  ],
  'LOCAL SEO': [
    {
      name: 'Basic',
      price: '$1,800',
      originalPrice: '$2,400',
      description: 'Get found in local searches',
      features: [
        'Google Business Profile optimization',
        'Local keyword optimization (15 keywords)',
        'NAP consistency check',
        'Monthly ranking report',
        'Basic review management'
      ]
    },
    {
      name: 'Standard',
      price: '$3,800',
      originalPrice: '$4,800',
      description: 'Dominate your local market',
      features: [
        'Complete GBP management',
        'Local keyword research (30 keywords)',
        'Local citation building (20 citations)',
        'Review generation & management',
        'Local content optimization',
        'Bi-weekly performance reports'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Multi-location local SEO dominance',
      features: [
        'Multi-location management',
        'Aggressive local link building',
        'Advanced review strategy',
        'Local PR & outreach',
        'Weekly optimization',
        'Dedicated local SEO manager'
      ]
    }
  ],
  'ECOMMERCE WEBSITE': [
    {
      name: 'Basic',
      price: '$4,500',
      originalPrice: '$6,000',
      description: 'Launch your online store quickly',
      features: [
        'Up to 50 products',
        'Responsive design',
        'Payment gateway integration',
        'Basic SEO setup',
        'Shopping cart functionality',
        '30 days support'
      ]
    },
    {
      name: 'Standard',
      price: '$8,500',
      originalPrice: '$11,000',
      description: 'Feature-rich ecommerce solution',
      features: [
        'Up to 200 products',
        'Custom design',
        'Multiple payment gateways',
        'Advanced SEO optimization',
        'Inventory management',
        'Email marketing integration',
        '90 days support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Scalable enterprise ecommerce platform',
      features: [
        'Unlimited products',
        'Fully custom design & features',
        'Advanced integrations',
        'Multi-vendor support',
        'Custom checkout flow',
        'Priority support',
        '1 year maintenance'
      ]
    }
  ],
  'SERVICE WEBSITE': [
    {
      name: 'Basic',
      price: '$2,200',
      originalPrice: '$3,000',
      description: 'Professional website for your service business',
      features: [
        'Up to 5 pages',
        'Mobile responsive design',
        'Contact form',
        'Basic SEO setup',
        'Social media integration',
        '30 days support'
      ]
    },
    {
      name: 'Standard',
      price: '$4,500',
      originalPrice: '$6,000',
      description: 'Advanced service website with booking',
      features: [
        'Up to 10 pages',
        'Custom design',
        'Appointment booking system',
        'Advanced SEO optimization',
        'Blog integration',
        'Email automation',
        '90 days support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Complete digital solution for service business',
      features: [
        'Unlimited pages',
        'Fully custom features',
        'CRM integration',
        'Multi-location support',
        'Advanced analytics',
        'Priority support',
        '1 year maintenance'
      ]
    }
  ],
  'GOOGLE ADS': [
    {
      name: 'Basic',
      price: '$1,200',
      originalPrice: '$1,600',
      description: 'Start driving targeted traffic with Google Ads',
      features: [
        'Campaign setup & optimization',
        'Up to 2 campaigns',
        'Keyword research (20 keywords)',
        'Ad copywriting (5 ads)',
        'Monthly performance report',
        'Ad budget: $2,000 - $5,000/month'
      ]
    },
    {
      name: 'Standard',
      price: '$2,500',
      originalPrice: '$3,200',
      description: 'Comprehensive Google Ads management',
      features: [
        'Multi-campaign management',
        'Up to 5 campaigns',
        'Advanced keyword strategy',
        'A/B testing',
        'Conversion tracking setup',
        'Bi-weekly optimization',
        'Ad budget: $5,000 - $15,000/month'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Enterprise-level Google Ads optimization',
      features: [
        'Unlimited campaigns',
        'Advanced audience targeting',
        'Shopping & Display ads',
        'Remarketing campaigns',
        'Weekly strategy calls',
        'Dedicated ads manager',
        'Ad budget: $15,000+/month'
      ]
    }
  ],
  'META ADS': [
    {
      name: 'Basic',
      price: '$1,000',
      originalPrice: '$1,400',
      description: 'Reach your audience on Facebook & Instagram',
      features: [
        'Campaign setup & management',
        'Up to 2 campaigns',
        'Audience research',
        'Ad creative (5 designs)',
        'Monthly performance report',
        'Ad budget: $1,500 - $4,000/month'
      ]
    },
    {
      name: 'Standard',
      price: '$2,200',
      originalPrice: '$3,000',
      description: 'Advanced Meta advertising strategy',
      features: [
        'Multi-campaign management',
        'Up to 5 campaigns',
        'Custom audience creation',
        'A/B testing',
        'Pixel setup & optimization',
        'Bi-weekly reporting',
        'Ad budget: $4,000 - $12,000/month'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale Meta advertising solution',
      features: [
        'Unlimited campaigns',
        'Advanced retargeting',
        'Lookalike audience strategy',
        'Video ad production support',
        'Weekly optimization',
        'Dedicated Meta ads specialist',
        'Ad budget: $12,000+/month'
      ]
    }
  ]
}

export default function PricingComponent() {
  const [selectedService, setSelectedService] = useState<ServiceType>('SEO')

  const services: ServiceType[] = ['SEO', 'AEO', 'GEO', 'LOCAL SEO', 'ECOMMERCE WEBSITE', 'SERVICE WEBSITE', 'GOOGLE ADS', 'META ADS']

  return (
    <section className="w-full py-12 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
            Simple, <span className="bg-blue-600 bg-clip-text text-transparent">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include expert support and proven results.
          </p>
        </div>

        {/* Service Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service) => (
            <Button
              key={service}
              onClick={() => setSelectedService(service)}
              variant={selectedService === service ? "default" : "outline"}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${selectedService === service 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                }
              `}
            >
              {service}
            </Button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingData[selectedService].map((tier, index) => (
            <Card 
              key={index} 
              className={`
                relative flex flex-col border-2 transition-all hover:shadow-xl
                ${tier.popular 
                  ? 'border-blue-600 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
                }
              `}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold mb-2">{tier.name}</CardTitle>
                <div className="mb-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-blue-600">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-gray-600 text-base">USD</span>}
                  </div>
                  {tier.originalPrice && (
                    <div className="text-sm text-gray-500 line-through mt-1">
                      {tier.originalPrice}**
                    </div>
                  )}
                  {tier.price !== 'Custom' && (
                    <p className="text-sm text-gray-600 mt-1">
                      per user per month, one-year commitment
                    </p>
                  )}
                </div>
                <CardDescription className="text-gray-600">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`
                    w-full py-6 font-semibold
                    ${tier.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  {tier.price === 'Custom' ? 'Contact sales' : 'Get Started'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
