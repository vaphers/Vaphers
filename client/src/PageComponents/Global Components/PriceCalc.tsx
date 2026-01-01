'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Check, Info } from 'lucide-react'

/* ================= TYPES ================= */

type ServiceType =
  | 'SEO'
  | 'LOCAL SEO'
  | 'AEO'
  | 'GEO'
  | 'SERVICE WEBSITE'
  | 'ECOMMERCE WEBSITE'
  | 'GOOGLE ADS'
  | 'META ADS'

type PlanType = 'Basic' | 'Standard' | 'Enterprise'

type PricingTier = {
  name: PlanType
  price: string
  isOneTime?: boolean
}

type FeatureSet = {
  included: string[]
  timeline: string
  support: string
  extras?: string[]
}

/* ================= PRICING DATA ================= */

const pricingData: Record<ServiceType, PricingTier[]> = {
  SEO: [
    { name: 'Basic', price: '$799', isOneTime: false },
    { name: 'Standard', price: '$1,499', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
  'LOCAL SEO': [
    { name: 'Basic', price: '$699', isOneTime: false },
    { name: 'Standard', price: '$1,099', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
  AEO: [
    { name: 'Basic', price: '$599', isOneTime: false },
    { name: 'Standard', price: '$1,100', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
  GEO: [
    { name: 'Basic', price: '$699', isOneTime: false },
    { name: 'Standard', price: '$999', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
  'SERVICE WEBSITE': [
    { name: 'Basic', price: '$1,699', isOneTime: true },
    { name: 'Standard', price: '$2,199', isOneTime: true },
    { name: 'Enterprise', price: 'Custom', isOneTime: true },
  ],
  'ECOMMERCE WEBSITE': [
    { name: 'Basic', price: '$2,899', isOneTime: true },
    { name: 'Standard', price: '$3,499', isOneTime: true },
    { name: 'Enterprise', price: 'Custom', isOneTime: true },
  ],
  'GOOGLE ADS': [
    { name: 'Basic', price: '$1,200', isOneTime: false },
    { name: 'Standard', price: '$2,500', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
  'META ADS': [
    { name: 'Basic', price: '$1,000', isOneTime: false },
    { name: 'Standard', price: '$2,200', isOneTime: false },
    { name: 'Enterprise', price: 'Custom', isOneTime: false },
  ],
}

/* ================= IMPROVED MULTIPLIERS ================= */

const SIZE_ADJUSTMENT = {
  Small: 0,
  Medium: 0.15,
  Large: 0.30,
}

const COMPETITION_ADJUSTMENT = {
  Low: -0.10,
  Medium: 0,
  High: 0.20,
}

/* ================= FEATURES DATABASE ================= */

const featuresData: Record<ServiceType, Record<PlanType, FeatureSet>> = {
  SEO: {
    Basic: {
      included: [
        'Up to 10 target keywords',
        'On-page optimization (5 pages)',
        'Technical SEO audit',
        'Monthly performance report',
        'Google Search Console setup',
        'Meta tags optimization',
      ],
      timeline: '3-6 months to see results',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Up to 30 target keywords',
        'On-page optimization (15 pages)',
        'Advanced technical SEO',
        'Content strategy & creation (4 blogs/month)',
        'Link building (10 quality backlinks/month)',
        'Competitor analysis',
        'Bi-weekly performance reports',
        'Google Analytics 4 setup',
      ],
      timeline: '2-4 months to see results',
      support: 'Priority email & chat support',
      extras: ['Quarterly strategy calls', 'Schema markup implementation'],
    },
    Enterprise: {
      included: [
        'Unlimited keywords',
        'Full-site optimization',
        'Enterprise technical SEO',
        'Content hub strategy (12+ blogs/month)',
        'Advanced link building (30+ backlinks/month)',
        'International SEO',
        'Weekly performance reports',
        'Dedicated account manager',
        'Custom tracking dashboards',
      ],
      timeline: '1-3 months to see results',
      support: '24/7 priority support + Slack channel',
      extras: ['Monthly strategy sessions', 'A/B testing', 'Voice search optimization'],
    },
  },
  'LOCAL SEO': {
    Basic: {
      included: [
        'Google Business Profile optimization',
        'Local citation building (20 citations)',
        'NAP consistency check',
        'Local keyword research (5 keywords)',
        'Review management setup',
        'Monthly local ranking report',
      ],
      timeline: '2-4 months to see results',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Advanced GBP optimization with posts',
        'Local citation building (50 citations)',
        'Location page creation (3 locations)',
        'Local keyword research (15 keywords)',
        'Review generation & monitoring',
        'Local link building',
        'Google Maps optimization',
        'Bi-weekly local reports',
      ],
      timeline: '1-3 months to see results',
      support: 'Priority email & phone support',
      extras: ['Local competitor analysis', 'Service area targeting'],
    },
    Enterprise: {
      included: [
        'Multi-location GBP management (10+ locations)',
        'Premium citation building (100+ citations)',
        'Location pages (unlimited)',
        'Hyperlocal content strategy',
        'Advanced review management with responses',
        'Local PR & partnerships',
        'Voice search optimization',
        'Weekly local performance reports',
      ],
      timeline: '1-2 months to see results',
      support: '24/7 priority support',
      extras: ['Dedicated local SEO specialist', 'Custom local landing pages', 'Reputation management'],
    },
  },
  AEO: {
    Basic: {
      included: [
        'AI Engine Optimization audit',
        'Content formatting for AI (5 pages)',
        'FAQ schema implementation',
        'Answer box optimization',
        'Conversational keyword research',
        'Monthly AEO report',
      ],
      timeline: '2-3 months to see AI visibility',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Comprehensive AEO strategy',
        'AI-friendly content optimization (15 pages)',
        'Advanced schema markup (FAQ, How-to, Q&A)',
        'Featured snippet optimization',
        'Entity-based content creation',
        'AI chatbot citation tracking',
        'Voice & conversational search optimization',
        'Bi-weekly AEO reports',
      ],
      timeline: '1-2 months to see AI visibility',
      support: 'Priority support with AEO specialist',
      extras: ['ChatGPT & Bard visibility tracking', 'AI-ready content briefs'],
    },
    Enterprise: {
      included: [
        'Full-scale AEO implementation',
        'AI content hub creation',
        'Advanced entity optimization',
        'Knowledge graph optimization',
        'Multi-AI platform optimization (ChatGPT, Bard, Perplexity)',
        'Semantic search optimization',
        'Custom AEO dashboards',
        'Weekly AI visibility reports',
      ],
      timeline: '2-4 weeks to see AI visibility',
      support: '24/7 dedicated AEO team',
      extras: ['AI prompt engineering', 'Zero-click optimization', 'Thought leadership positioning'],
    },
  },
  GEO: {
    Basic: {
      included: [
        'Generative Engine Optimization setup',
        'Content structuring for LLMs (5 pages)',
        'Citation-worthy content audit',
        'Source credibility optimization',
        'Basic entity building',
        'Monthly GEO tracking',
      ],
      timeline: '2-4 months for GE visibility',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Advanced GEO strategy',
        'LLM-optimized content creation (12 pages)',
        'Authority & credibility enhancement',
        'E-E-A-T optimization',
        'Citation link building',
        'Multi-source presence building',
        'AI-generated content monitoring',
        'Bi-weekly GEO reports',
      ],
      timeline: '1-3 months for GE visibility',
      support: 'Priority GEO specialist support',
      extras: ['Generative search tracking', 'Source diversity strategy'],
    },
    Enterprise: {
      included: [
        'Enterprise GEO implementation',
        'Comprehensive LLM content strategy',
        'Authoritative source positioning',
        'Knowledge base development',
        'Multi-platform citation tracking',
        'AI hallucination monitoring',
        'Thought leadership content',
        'Weekly GEO analytics',
      ],
      timeline: '2-6 weeks for GE visibility',
      support: '24/7 dedicated GEO team',
      extras: ['Custom AI training data optimization', 'Brand entity dominance', 'Research-backed content'],
    },
  },
  'SERVICE WEBSITE': {
    Basic: {
      included: [
        'Up to 7 pages (Home, About, Services, Contact, etc.)',
        'Mobile-responsive design',
        'SEO-optimized structure',
        'Contact form integration',
        'Google Maps integration',
        'Basic on-page SEO',
        '1 round of revisions',
      ],
      timeline: '3-4 weeks delivery',
      support: '30 days post-launch support',
    },
    Standard: {
      included: [
        'Up to 15 pages',
        'Custom design with brand identity',
        'Advanced animations & interactions',
        'Blog/news section',
        'Service area pages (up to 5)',
        'Lead capture forms',
        'Email integration',
        'Advanced on-page SEO',
        'Google Analytics & Search Console',
        '2 rounds of revisions',
      ],
      timeline: '4-6 weeks delivery',
      support: '60 days post-launch support',
      extras: ['Speed optimization', 'Live chat integration'],
    },
    Enterprise: {
      included: [
        'Unlimited pages',
        'Premium custom design',
        'Advanced Next.js features',
        'Multi-location functionality',
        'CMS integration (Sanity/Contentful)',
        'Advanced forms & automation',
        'Customer portal/dashboard',
        'Third-party integrations',
        'Enterprise SEO setup',
        'Performance optimization',
        'Unlimited revisions',
      ],
      timeline: '6-10 weeks delivery',
      support: '6 months priority support + maintenance',
      extras: ['Dedicated project manager', 'Training sessions', 'Custom features'],
    },
  },
  'ECOMMERCE WEBSITE': {
    Basic: {
      included: [
        'Up to 50 products',
        'Shopify/WooCommerce setup',
        'Payment gateway integration (Stripe/PayPal)',
        'Product pages optimization',
        'Shopping cart & checkout',
        'Basic product SEO',
        'Mobile-responsive design',
        '1 round of revisions',
      ],
      timeline: '4-6 weeks delivery',
      support: '30 days post-launch support',
    },
    Standard: {
      included: [
        'Up to 200 products',
        'Custom ecommerce design',
        'Multi-payment integration',
        'Product filtering & search',
        'Customer accounts',
        'Email marketing integration',
        'Product recommendations',
        'Advanced product SEO',
        'Abandoned cart recovery',
        'Analytics & conversion tracking',
        '2 rounds of revisions',
      ],
      timeline: '6-8 weeks delivery',
      support: '60 days post-launch support',
      extras: ['Inventory management', 'Discount code system'],
    },
    Enterprise: {
      included: [
        'Unlimited products',
        'Headless commerce (Next.js + Shopify/Stripe)',
        'Custom checkout experience',
        'Multi-currency & multi-language',
        'Advanced customer segmentation',
        'Subscription/recurring payments',
        'Custom product configurator',
        'ERP/CRM integration',
        'Advanced analytics & reporting',
        'Enterprise security features',
        'Unlimited revisions',
      ],
      timeline: '10-14 weeks delivery',
      support: '12 months priority support',
      extras: ['Dedicated dev team', 'Custom integrations', 'Performance SLA'],
    },
  },
  'GOOGLE ADS': {
    Basic: {
      included: [
        'Search ads campaign setup',
        'Up to 3 ad campaigns',
        'Keyword research (50 keywords)',
        'Ad copy creation (5 variations)',
        'Landing page recommendations',
        'Conversion tracking setup',
        'Monthly performance report',
        'Ad spend: $2,000-$5,000/mo recommended',
      ],
      timeline: 'Launch within 1 week',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Multi-campaign strategy (Search, Display, Shopping)',
        'Up to 8 campaigns',
        'Advanced keyword research (150+ keywords)',
        'A/B testing (10+ ad variations)',
        'Audience targeting & remarketing',
        'Conversion rate optimization',
        'Negative keyword management',
        'Bi-weekly optimization',
        'Detailed analytics reports',
        'Ad spend: $5,000-$15,000/mo recommended',
      ],
      timeline: 'Launch within 3-5 days',
      support: 'Priority support with PPC specialist',
      extras: ['Landing page optimization', 'Competitor analysis'],
    },
    Enterprise: {
      included: [
        'Full-funnel Google Ads strategy',
        'Unlimited campaigns',
        'Advanced AI bidding strategies',
        'Video ads (YouTube)',
        'Performance Max campaigns',
        'Advanced remarketing & RLSA',
        'Custom audience segments',
        'Dynamic ad creation',
        'Weekly strategy calls',
        'Real-time dashboard access',
        'Dedicated PPC manager',
        'Ad spend: $15,000+/mo managed',
      ],
      timeline: 'Launch within 2-3 days',
      support: '24/7 priority support + Slack',
      extras: ['CRO testing program', 'Custom attribution modeling', 'Google Shopping feed optimization'],
    },
  },
  'META ADS': {
    Basic: {
      included: [
        'Facebook & Instagram ads setup',
        'Up to 3 campaigns',
        'Audience research & targeting',
        'Ad creative recommendations',
        'Basic ad copywriting (5 variations)',
        'Pixel setup & conversion tracking',
        'Monthly performance report',
        'Ad spend: $2,000-$4,000/mo recommended',
      ],
      timeline: 'Launch within 1 week',
      support: 'Email support (48h response)',
    },
    Standard: {
      included: [
        'Advanced Meta ads strategy (FB, IG, Messenger)',
        'Up to 8 campaigns',
        'Custom & lookalike audiences',
        'A/B testing (15+ ad variations)',
        'Retargeting campaigns',
        'Ad creative design (static & carousel)',
        'Lead generation forms',
        'Bi-weekly optimization',
        'Detailed analytics & insights',
        'Ad spend: $4,000-$12,000/mo recommended',
      ],
      timeline: 'Launch within 3-5 days',
      support: 'Priority support with Meta specialist',
      extras: ['Audience insights reports', 'Funnel optimization'],
    },
    Enterprise: {
      included: [
        'Enterprise Meta advertising strategy',
        'Unlimited campaigns (FB, IG, WhatsApp, Audience Network)',
        'Advanced automation & dynamic ads',
        'Video ad production & optimization',
        'Advantage+ campaigns',
        'Custom audience segmentation',
        'Multi-product catalog ads',
        'Influencer collaboration ads',
        'Weekly strategy sessions',
        'Real-time performance dashboard',
        'Dedicated Meta ads manager',
        'Ad spend: $12,000+/mo managed',
      ],
      timeline: 'Launch within 2-3 days',
      support: '24/7 priority support + Slack',
      extras: ['Creative production team', 'Brand safety monitoring', 'Advanced attribution'],
    },
  },
}

/* ================= COMPONENT ================= */

export default function MarketingPriceCalculator() {
  const [service, setService] = useState<ServiceType>('SEO')
  const [plan, setPlan] = useState<PlanType>('Standard')
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Small')
  const [competition, setCompetition] = useState<'Low' | 'Medium' | 'High'>('Medium')

  const tier = pricingData[service].find(p => p.name === plan)
  const features = featuresData[service][plan]
  const isOneTimeService = tier?.isOneTime || false

  const basePrice =
    tier?.price !== 'Custom'
      ? Number(tier?.price.replace(/[^0-9]/g, ''))
      : null

  const finalPrice =
    basePrice !== null
      ? isOneTimeService
        ? basePrice
        : Math.round(
            basePrice * (1 + SIZE_ADJUSTMENT[size] + COMPETITION_ADJUSTMENT[competition])
          )
      : null

  const getSizeDescription = () => {
    switch (size) {
      case 'Small':
        return '1-10 employees, local market focus'
      case 'Medium':
        return '11-50 employees, regional presence'
      case 'Large':
        return '50+ employees, national/international reach'
    }
  }

  const getCompetitionDescription = () => {
    switch (competition) {
      case 'Low':
        return 'Niche market, limited competitors'
      case 'Medium':
        return 'Moderate competition, established players'
      case 'High':
        return 'Saturated market, aggressive competitors'
    }
  }

  const formatAdjustment = (value: number) => {
    return value >= 0 ? `+${(value * 100).toFixed(0)}%` : `${(value * 100).toFixed(0)}%`
  }

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-50 to-white">
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Responsive text sizing */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-14">
          <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 mb-3 sm:mb-4 bungee-inline-regular leading-tight">
            <span className='text-blue-600'>Marketing Price</span> Calculator
          </h4>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Customize your requirements and see real-time pricing with included features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left - Controls */}
          <div className="flex flex-col space-y-4 sm:space-y-5">
            {/* Service Selection */}
            <div>
              <p className="font-semibold text-gray-800 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span>Choose a Service</span>
                <span className="text-xs sm:text-sm font-normal text-gray-500">Step 1/4</span>
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {(Object.keys(pricingData) as ServiceType[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all ${
                      service === s
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/30'
                        : 'border-gray-300 hover:border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-3 p-2.5 sm:p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-amber-800">Why our pricing is different:</span> You'd find agencies quoting $299/mo for SEO, but all you'd get is low-quality links and rankings on keywords nobody searches for. We don't work like that.
                </p>
              </div>
            </div>

            {/* Plan Selection */}
            <div>
              <p className="font-semibold text-gray-800 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <span>Select Plan</span>
                <span className="text-xs sm:text-sm font-normal text-gray-500">Step 2/4</span>
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {(['Basic', 'Standard', 'Enterprise'] as PlanType[]).map(p => {
                  const tierPrice = pricingData[service].find(t => t.name === p)?.price
                  return (
                    <div
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`cursor-pointer rounded-xl border p-2.5 sm:p-4 text-center transition-all ${
                        plan === p
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-800 text-xs sm:text-base">{p}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{tierPrice}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 p-2.5 sm:p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-blue-800">Quality over shortcuts:</span> Every strategy is data-driven, white-hat, and built for long-term sustainable growth, not quick wins that disappear.
                </p>
              </div>
            </div>

            {/* Business Size - Hidden for one-time services */}
            {!isOneTimeService && (
              <div>
                <p className="font-semibold text-gray-800 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <span>Business Size</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-500">Step 3/4</span>
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {(['Small', 'Medium', 'Large'] as const).map(s => (
                    <div
                      key={s}
                      onClick={() => setSize(s)}
                      className={`cursor-pointer rounded-xl border p-2.5 sm:p-4 text-center transition-all ${
                        size === s
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-800 text-xs sm:text-base">{s}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        {formatAdjustment(SIZE_ADJUSTMENT[s])}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2">{getSizeDescription()}</p>
              </div>
            )}

            {/* Market Competition - Hidden for one-time services */}
            {!isOneTimeService && (
              <div>
                <p className="font-semibold text-gray-800 mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <span>Market Competition</span>
                  <span className="text-xs sm:text-sm font-normal text-gray-500">Step 4/4</span>
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {(['Low', 'Medium', 'High'] as const).map(c => (
                    <div
                      key={c}
                      onClick={() => setCompetition(c)}
                      className={`cursor-pointer rounded-xl border p-2.5 sm:p-4 text-center transition-all ${
                        competition === c
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-800 text-xs sm:text-base">{c}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                        {formatAdjustment(COMPETITION_ADJUSTMENT[c])}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2.5 sm:p-3 bg-green-50 border-l-4 border-green-400 rounded-r">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold text-green-800">Transparent pricing:</span> {getCompetitionDescription()}. We adjust our pricing based on the real work required, no hidden fees, no surprises.
                  </p>
                </div>
              </div>
            )}

            {/* One-time Service Notice */}
            {isOneTimeService && (
              <div className="p-3 sm:p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r">
                <p className="text-xs sm:text-sm text-gray-700">
                  <span className="font-semibold text-purple-800">One-time project:</span> This is a fixed-price website development project. Final pricing may vary based on your specific requirements and customizations.
                </p>
              </div>
            )}
          </div>

          {/* Right - Pricing Card */}
          <motion.div
            key={`${service}-${plan}-${size}-${competition}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#0b254f] to-[#0d3a6f] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between mb-5 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex-1">
                <p className="text-blue-200 mb-2 text-xs sm:text-sm uppercase tracking-wide">
                  {service} • {plan} Plan
                </p>
                <h4 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  {finalPrice ? `$${finalPrice.toLocaleString()}${isOneTimeService ? '' : '/mo'}` : 'Custom Pricing'}
                </h4>
                {!isOneTimeService && basePrice && finalPrice !== basePrice && (
                  <p className="text-xs sm:text-sm text-blue-200">
                    Base: ${basePrice.toLocaleString()} → {formatAdjustment(SIZE_ADJUSTMENT[size])} (size) {formatAdjustment(COMPETITION_ADJUSTMENT[competition])} (competition)
                  </p>
                )}
                {isOneTimeService && (
                  <p className="text-xs sm:text-sm text-blue-200">
                    One-time payment • No monthly fees
                  </p>
                )}
              </div>
              {!isOneTimeService && (
                <div className="bg-blue-600/30 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap self-start">
                  {size} • {competition} Competition
                </div>
              )}
              {isOneTimeService && (
                <div className="bg-purple-600/30 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap self-start">
                  One-Time
                </div>
              )}
            </div>

            {/* Timeline & Support */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="bg-white/10 rounded-lg p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs text-blue-200 mb-1">Timeline</p>
                <p className="text-xs sm:text-sm font-semibold">{features.timeline}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-xs text-blue-200 mb-1">Support</p>
                <p className="text-xs sm:text-sm font-semibold">{features.support}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 mb-5 sm:mb-6"></div>

            {/* Features Section */}
            <div className="flex-1 overflow-y-auto mb-5 sm:mb-6 space-y-2.5 sm:space-y-3 pr-2 hide-scrollbar max-h-[300px] sm:max-h-[400px]">
              <h5 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                What's Included
              </h5>
              
              {features.included.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-start gap-2.5 sm:gap-3"
                >
                  <div className="bg-green-400/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-300" />
                  </div>
                  <p className="text-blue-50 text-xs sm:text-sm flex-1">{feature}</p>
                </motion.div>
              ))}

              {features.extras && features.extras.length > 0 && (
                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20">
                  <p className="text-xs sm:text-sm font-semibold text-white mb-2.5 sm:mb-3 flex items-center gap-2">
                    <span className="bg-blue-400/30 text-blue-100 px-2 py-1 rounded text-[10px] sm:text-xs">
                      BONUS
                    </span>
                    Additional Features
                  </p>
                  {features.extras.map((extra, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (features.included.length + idx) * 0.03 }}
                      className="flex items-start gap-2.5 sm:gap-3 mb-2"
                    >
                      <div className="bg-blue-400/20 rounded-full p-1 mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                      </div>
                      <p className="text-blue-50 text-xs sm:text-sm flex-1">{extra}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="w-full">
              <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg shadow-lg">
                Get Exact Quote →
              </Button>
            </Link>

            {/* Price Breakdown */}
            {!isOneTimeService && finalPrice && basePrice && finalPrice !== basePrice && (
              <div className="mt-3 sm:mt-4 bg-white/10 rounded-lg p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] sm:text-xs text-blue-100">
                    <span className="font-semibold">Calculation:</span> ${basePrice.toLocaleString()} + {formatAdjustment(SIZE_ADJUSTMENT[size])} + {formatAdjustment(COMPETITION_ADJUSTMENT[competition])} = ${finalPrice.toLocaleString()}/mo
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
