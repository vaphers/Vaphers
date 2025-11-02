import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default function WhatAreSearchEngines() {
  const engines = [
    { name: 'Google', percentage: '89.74%' },
    { name: 'Bing', percentage: '4%' },
    { name: 'Yandex', percentage: '2.49%' },
    { name: 'Yahoo!', percentage: '1.33%' },
    { name: 'DuckDuckGo', percentage: '0.79%' },
    { name: 'Baidu', percentage: '0.62%' }
  ];

  return (
    <div className="min-h-screen w-full relative">
      {/* Dashed Grid Background */}
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

      {/* Content with z-index */}
      <div className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-[500px] lg:h-[800px] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-200 via-blue-200 to-cyan-200">
                <Image
                  src="https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Search engine interface showing search results and algorithms"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
                  What Are <br/><span className="bg-blue-600 bg-clip-text text-transparent">Search Engines?</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed montserrat">
                  Search engines are software systems designed to help users find information on the internet by indexing billions of web pages and delivering relevant results based on search queries. Popular search engines like{' '}
                  <a href="#" className="text-blue-600 underline hover:text-blue-700 font-medium">
                    Google, Microsoft Bing, and Yahoo
                  </a>{' '}
                  use automated bots called crawlers to discover, organize, and rank content, providing users with instant access to the most relevant information.
                </p>
              </div>

              {/* 1 */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 montserrat">
                  How Search Engines Work
                </h3>
                <p className="text-gray-600 leading-relaxed montserrat">
                  Search engines operate through three core functions: crawling, indexing, and ranking. Crawlers (also called spiders or bots) continuously scan the internet, following links from page to page to discover new content. This information is then organized into a massive index—a structured database that allows quick retrieval. When you enter a search query, the engine analyzes your intent using natural language processing, matches it against indexed content, and ranks results using complex algorithms that consider factors like relevance, authority, and user engagement.
                </p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-gray-700 bg-blue-50 rounded-r-lg montserrat">
                "Google holds over 90% of the global search engine market share, processing billions of searches daily to connect users with relevant information instantly."
              </blockquote>

              {/* 2 */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 montserrat">
                  Major Search Engines Today
                </h3>
                <p className="text-gray-600 leading-relaxed montserrat">
                  While Google dominates with over 90% market share globally, several other search engines serve specific markets and user preferences. Microsoft Bing holds second place at around 3-4% market share and powers Yahoo's search results. Regional engines like Baidu dominate China, Yandex leads in Russia, and privacy-focused alternatives like DuckDuckGo appeal to users concerned about data tracking. Understanding these platforms is crucial for businesses targeting specific audiences or markets through search engine marketing strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Share Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-base tracking-[-0.03em] text-center text-gray-700 bungee-inline-regular mb-4">
              Global Search Engine <span className="bg-blue-600 bg-clip-text text-transparent">Market Share</span>
            </h2>
            <p className="text-lg text-gray-600 text-center montserrat max-w-3xl mx-auto">
              Understanding where your audience searches helps optimize your SEM strategy for maximum reach and ROI
            </p>
          </div>

          <Card className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 p-6 sm:p-8 rounded-2xl shadow-xl border-none">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {engines.map((engine, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 sm:p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-2 montserrat">
                    {engine.name}
                  </h3>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                    {engine.percentage}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 montserrat">
              Data as of November 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
