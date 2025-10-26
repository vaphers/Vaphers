import Image from 'next/image'
import Link from 'next/link'
import { SearchCheck, Bug, Gauge, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: SearchCheck,
    title: 'Identify Hidden Technical Issues',
    description: 'SEO audits uncover critical problems like broken links, crawl errors, duplicate content, and indexation issues that prevent search engines from properly ranking your site.',
  },
  {
    icon: Gauge,
    title: 'Improve Site Speed & Performance',
    description: 'Audits reveal performance bottlenecks, slow-loading pages, and optimization opportunities that directly impact user experience and Core Web Vitals rankings.',
  },
  {
    icon: Bug,
    title: 'Fix On-Page SEO Gaps',
    description: 'Discover missing meta tags, poor keyword optimization, weak internal linking, and content gaps that are costing you valuable organic traffic and conversions.',
  },
  {
    icon: ShieldCheck,
    title: 'Build Trust with Search Engines',
    description: 'Audits ensure proper schema markup, mobile-friendliness, security protocols (HTTPS), and E-E-A-T signals that establish your site as a trustworthy, authoritative source.',
  },
]

export default function SEOAuditBenefits() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-700 leading-tight bungee-inline-regular">
              How SEO Audits{' '} <br/>
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Help Your Business
              </span>
            </h3>
            
            <p className="text-lg text-gray-600">
              A comprehensive SEO audit is your roadmap to fixing critical issues, improving rankings, and unlocking organic growth opportunities that competitors are missing
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/contact-us">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              Get Your Free SEO Audit
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative lg:ml-auto w-full">
          <div className="relative w-full h-[600px] max-w-md mx-auto lg:max-w-lg rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="SEO audit report showing technical analysis and recommendations"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 rounded-3xl -z-10 blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  )
}
