// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'

// interface SeoProcessStep {
//   id: string
//   label: string
//   title: string
//   content: string
//   image: string
// }

// interface SeoProcessSectionProps {
//   cityName: string
// }

// const steps: SeoProcessStep[] = [
//   {
//     id: 'auditing',
//     label: 'Auditing',
//     title: 'Comprehensive SEO Auditing',
//     content:
//       'We perform a detailed SEO audit of your website and digital presence to identify technical issues, content gaps, keyword ranking potential, and competitor strategies. This ensures a data-driven foundation tailored to your business and the [City] market.\n\nOur audit covers site speed, mobile friendliness, indexability, site structure, analytics health, and user experience. We provide clear recommendations to improve your SEO presence in [City].',
//     image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 'keywordResearch',
//     label: 'Keyword Research',
//     title: 'Targeted Keyword Research',
//     content:
//       'Our keyword research focuses on identifying high-impact local and organic keywords specifically in [City]. We analyze search intent, assess keyword difficulty, and track trends to maximize your chances to rank and convert.\n\nBy mapping keyword clusters and prioritizing local search queries, we help you attract qualified customers actively searching in [City].',
//     image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 'onPageOptimization',
//     label: 'On-Page Optimization',
//     title: 'On-Page SEO Optimization',
//     content:
//       'We optimize meta tags, headings, images, URLs, and internal linking to improve relevance, user engagement, and crawlability essential for local SEO success in [City].\n\nYour content becomes more accessible and compelling, encouraging conversions and providing a seamless user experience.',
//     image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 'linkBuilding',
//     label: 'Link Building',
//     title: 'Quality Link Building',
//     content:
//       'Our link building strategy focuses on acquiring authoritative, locally relevant backlinks through guest posting, reputable directories, and PR campaigns in [City].\n\nThese trustworthy links boost your domain authority and improve rankings while driving direct referral traffic.',
//     image: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: 'reporting',
//     label: 'Reporting',
//     title: 'Transparent Reporting & Insights',
//     content:
//       'We provide clear, actionable reports on keyword rankings, traffic, conversions, and SEO progress focused on maximizing ROI in [City].\n\nOur dashboards highlight opportunities and track the impact of ongoing optimizations so you’re always informed.',
//     image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
// ]

// export default function SeoProcessSection({ cityName }: SeoProcessSectionProps) {
//   const [activeStep, setActiveStep] = useState<string>(steps[0].id)

//   const currentStep = steps.find((step) => step.id === activeStep)!

//   // Replace [City] placeholders dynamically
//   const title = currentStep.title.replace(/\[City\]/g, cityName)
//   const content = currentStep.content.replace(/\[City\]/g, cityName)
//   const image = currentStep.image

//   return (
//     <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
//       <h2 className="text-4xl md:text-4xl lg:text-6xl text-center font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular mb-12">
//         Key Components of our SEO Services in{' '}
//         <span className="bg-blue-600 bg-clip-text text-transparent">{cityName}</span>
//       </h2>

//       <div className="flex flex-wrap justify-center gap-4 mb-8">
//         {steps.map((step) => (
//           <button
//             key={step.id}
//             onClick={() => setActiveStep(step.id)}
//             className={`px-6 py-3 min-w-[140px] rounded-full font-semibold text-lg transition-colors duration-300 ${
//               activeStep === step.id
//                 ? 'bg-blue-600 text-white shadow-lg'
//                 : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-600'
//             }`}
//             type="button"
//             aria-pressed={activeStep === step.id}
//           >
//             {step.label}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">
//         {/* Left - text content */}
//         <article className="flex-1 prose max-w-none text-gray-700 dark:text-gray-300">
//           <h3 className="text-2xl font-semibold mb-4">{title}</h3>
//           <p className="whitespace-pre-line leading-relaxed">{content}</p>
//         </article>

//         {/* Right - image */}
//         <div className="flex-1 max-w-xl w-full rounded-xl overflow-hidden shadow-lg">
//           <Image
//             src={image}
//             alt={title}
//             width={600}
//             height={400}
//             sizes="(max-width: 768px) 100vw, 600px"
//             className="object-cover w-full h-full"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }



'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface SeoProcessStep {
  id: string
  label: string
  title: string
  content: string
  image: string
}

interface SeoProcessSectionProps {
  cityName: string
}

const steps: SeoProcessStep[] = [
  {
    id: 'auditing',
    label: 'Auditing',
    title: 'Comprehensive SEO Auditing',
    content:
      'We perform a detailed SEO audit of your website and digital presence to identify technical issues, content gaps, keyword ranking potential, and competitor strategies. This ensures a data-driven foundation tailored to your business and the [City] market.\n\nOur audit covers site speed, mobile friendliness, indexability, site structure, analytics health, and user experience. We provide clear recommendations to improve your SEO presence in [City].',
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'keywordResearch',
    label: 'Keyword Research',
    title: 'Targeted Keyword Research',
    content:
      'Our keyword research focuses on identifying high-impact local and organic keywords specifically in [City]. We analyze search intent, assess keyword difficulty, and track trends to maximize your chances to rank and convert.\n\nBy mapping keyword clusters and prioritizing local search queries, we help you attract qualified customers actively searching in [City].',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'onPageOptimization',
    label: 'On-Page Optimization',
    title: 'On-Page SEO Optimization',
    content:
      'We optimize meta tags, headings, images, URLs, and internal linking to improve relevance, user engagement, and crawlability essential for local SEO success in [City].\n\nYour content becomes more accessible and compelling, encouraging conversions and providing a seamless user experience.',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'linkBuilding',
    label: 'Link Building',
    title: 'Quality Link Building',
    content:
      'Our link building strategy focuses on acquiring authoritative, locally relevant backlinks through guest posting, reputable directories, and PR campaigns in [City].\n\nThese trustworthy links boost your domain authority and improve rankings while driving direct referral traffic.',
    image: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'reporting',
    label: 'Reporting',
    title: 'Transparent Reporting & Insights',
    content:
      'We provide clear, actionable reports on keyword rankings, traffic, conversions, and SEO progress focused on maximizing ROI in [City].\n\nOur dashboards highlight opportunities and track the impact of ongoing optimizations so you’re always informed.',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]

export default function SeoProcessSection({ cityName }: SeoProcessSectionProps) {
  const [activeStep, setActiveStep] = useState<string>(steps[0].id)

  const currentStep = steps.find((step) => step.id === activeStep)!

  // Replace [City] placeholders dynamically
  const title = currentStep.title.replace(/\[City\]/g, cityName)
  const content = currentStep.content.replace(/\[City\]/g, cityName)
  const image = currentStep.image

  return (
    <div className="w-full relative">
      {/* Dashed Grid Background */}
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
      ></div>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <h3 className="text-4xl md:text-4xl lg:text-6xl text-center font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular mb-12">
          Key Components of our SEO Services in{' '}
          <span className="bg-blue-600 bg-clip-text text-transparent">{cityName}</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`px-6 py-3 min-w-[140px] rounded-full font-semibold text-lg transition-colors duration-300 ${
                activeStep === step.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-600'
              }`}
              type="button"
              aria-pressed={activeStep === step.id}
            >
              {step.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">
          {/* Left - text content */}
          <article className="flex-1 prose max-w-none text-gray-700 dark:text-gray-300">
            <h4 className="text-2xl font-semibold mb-4">{title}</h4>
            <p className="whitespace-pre-line leading-relaxed">{content}</p>
          </article>

          {/* Right - image */}
          <div className="flex-1 max-w-xl w-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
