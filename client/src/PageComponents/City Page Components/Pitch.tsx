"use client";

import { motion } from "framer-motion";
import { Target, MapPin, Presentation, Link2 } from "lucide-react";

interface SeoPitchSectionProps {
  cityName: string;
}

export default function SeoPitchSection({ cityName }: SeoPitchSectionProps) {
  const formattedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  const features = [
    {
      icon: Target,
      title: "Local Keyword Targeting",
      description: `Use hyperlocal keyword strategies to help location-based businesses dominate in regional and "near me" queries that convert.`,
    },
    {
      icon: MapPin,
      title: "Google Maps + GMB Optimization",
      description: `Optimize your Google listing, enhance NAP consistency, and gain local trust to increase visibility in Google's local 3-pack.`,
    },
    {
      icon: Presentation,
      title: `Local Landing Page Strategy`,
      description: `Create SEO-optimized pages for ${formattedCity} to increase search coverage and generate region-specific leads.`,
    },
    {
      icon: Link2,
      title: "Local Link Building & PR",
      description: `Earn location-specific backlinks through directories, media, and community sites to improve local rankings and reputation.`,
    },
  ];

  return (
    <div className="w-full relative bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-blue-900 dark:via-slate-900 dark:to-blue-900">
      {/* Dashed Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e7e5e4 1px, transparent 1px),
            linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
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

      {/* CENTERED HEADING */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center py-14">
        <h2 className="text-4xl md:text-4xl lg:text-6xl font-base tracking-[-0.03em] text-gray-700 bungee-inline-regular">
          Drive Organic Traffic in <br />
          <span className="bg-blue-600 bg-clip-text text-transparent">{formattedCity} with Organic SEO</span>
        </h2>
      </div>

      {/* CONTENT & BENTO GRID */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24 flex flex-col md:flex-row gap-16 items-center">
        {/* LEFT HALF: Content */}
        <div className="flex-1 max-w-lg font-serif text-slate-900 dark:text-white text-center lg:text-left">
          <p className="text-lg mb-6 leading-relaxed">
            A great SEO company in {formattedCity} strengthens your search presence, fixes technical SEO issues, targets regional intent, and builds authority through quality links—bringing consistent traffic and growth for your brand.
          </p>
          <p className="text-lg mb-8 leading-relaxed">
            Our team strategically enhances your website's performance by optimizing your content for relevant keywords and latent semantic indexing (LSI) terms. This ensures your business appears in diverse search queries, increasing your exposure and attracting highly targeted organic visitors. Partner with Vaphers to unlock the full potential of search engine visibility, local rankings, and customer acquisition in {formattedCity}.
          </p>

          <div className="bg-blue-100 dark:bg-blue-900/30 border-l-8 border-blue-600 rounded-lg p-6">
            <p className="font-semibold text-blue-800 dark:text-blue-300 leading-relaxed">
              Choose <span className="text-blue-900 dark:text-blue-400">Vaphers</span> as your SEO partner and experience results-driven SEO in {formattedCity}. Book a free consultation with our local experts to discover how we can deliver qualified leads, better rankings, and consistent website growth tailored to your business goals.
            </p>
          </div>
        </div>

        {/* RIGHT HALF: Bento Grid */}
        <div className="flex-1 grid grid-cols-1 min-[480px]:grid-cols-2 gap-8 w-full">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col border border-blue-300 dark:border-blue-700 rounded-3xl p-6 shadow-md hover:shadow-lg hover:scale-[1.03] bg-white dark:bg-slate-900 transition"
              aria-label={title}
              tabIndex={0}
            >
              <div className="mb-5 w-14 h-14 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 dark:text-white group-hover:text-blue-700 mb-2 transition-colors">
                {title}
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
