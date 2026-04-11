import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface AISeoHeroProps {
  headingLine1?: string;
  headingLine2?: string;
  bottomText?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  card1?: {
    logoSrc: string;
    logoAlt: string;
    platformName: string;
    metric: string;
    pillText: string;
    subText: string;
    chartData: number[];
  };
  card2?: {
    logoSrc: string;
    logoAlt: string;
    platformName: string;
    metric: string;
    labelText: string;
    pillText: string;
  };
}

export default function Feature2({
  headingLine1 = "leading ai",
  headingLine2 = "seo agency in U.S",
  bottomText = "We help brands dominate generative search, ensuring your business is the definitive answer recommended by today's leading AI engines.",
  heroImageSrc = "https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1773317259/Untitled_design_3_pfr2ks.png",
  heroImageAlt = "get featured in ai search results",
  card1 = {
    logoSrc: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png",
    logoAlt: "ChatGPT",
    platformName: "ChatGPT",
    metric: "120%",
    pillText: "Increase",
    subText: "vs. last quarter",
    chartData: [3, 4, 4, 5, 6],
  },
  card2 = {
    logoSrc: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/perplexity-logo_zqmnzf.png",
    logoAlt: "Perplexity",
    platformName: "Perplexity AI",
    metric: "103%",
    labelText: "Citations",
    pillText: "Growth",
  },
}: AISeoHeroProps) {
  return (
    <section className="min-h-screen bg-[#FDFDFD] py-10 px-4 sm:px-6 md:px-8 lg:p-12 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 h-full min-h-[85vh] items-center">
        
        {/* LEFT COLUMN - Content */}
        <div className="flex flex-col justify-center py-4 relative h-full">
          
          {/* 1. Huge Heading */}
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-7xl text-blue-600 bungee-shade leading-[1.2] md:leading-none break-words text-center lg:text-left">
            {headingLine1} <br className="hidden sm:block" /> {headingLine2}
          </h3>

          {/* 2. Responsive Cards Container */}
          <div className="w-full my-10 lg:my-16 flex flex-col sm:flex-row lg:block gap-6 sm:gap-4 lg:gap-0 lg:relative lg:h-[400px] xl:h-[450px] items-center justify-center lg:justify-start">
            
            {/* White Card */}
            <div className="relative lg:absolute lg:left-0 lg:bottom-0 xl:bottom-8 w-full sm:w-[320px] max-w-[340px] bg-white rounded-[2rem] border border-blue-600 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-6 sm:p-8  z-10 shrink-0">
              <div className="flex items-center gap-3 mb-6">
                <Image 
                  src={card1.logoSrc} 
                  alt={card1.logoAlt} 
                  width={24} 
                  height={24}
                />
                <span className="font-semibold text-base sm:text-lg text-gray-900">
                  {card1.platformName}
                </span>
              </div>
              
              <h4 className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
                {card1.metric}
              </h4>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                <div className="flex items-center text-[10px] sm:text-xs font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {card1.pillText}
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-500 whitespace-nowrap">
                  {card1.subText}
                </span>
              </div>

              {/* Faux Bar Chart */}
              <div className="flex items-end gap-2 sm:gap-3 mt-8 sm:mt-10 h-20 sm:h-24">
                {card1.chartData.map((blocks, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1 w-full justify-end">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const isActive = 6 - i <= blocks;
                      const isHighlight = colIndex === card1.chartData.length - 1 && isActive; // Highlights the last column's active blocks
                      return (
                        <div 
                          key={i} 
                          className={`h-2.5 sm:h-3 w-full rounded-sm ${
                            isHighlight ? 'bg-blue-600' : isActive ? 'bg-gray-200' : 'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Colored Card */}
            <div className="relative lg:absolute lg:left-[16rem] xl:left-[22rem] lg:bottom-0 xl:bottom-8 w-full sm:w-[280px] max-w-[340px] bg-blue-600 rounded-[1.8rem] shadow-2xl p-6 sm:p-7 text-white z-20 shrink-0">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-white p-1.5 rounded-full flex items-center justify-center shrink-0">
                  <Image 
                    src={card2.logoSrc} 
                    alt={card2.logoAlt} 
                    width={18} 
                    height={18}
                    className="object-contain"
                  />
                 </div>
                <span className="font-medium text-white text-base sm:text-lg">
                  {card2.platformName}
                </span>
              </div>
              
              <h4 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                {card2.metric}
              </h4>
              
              <div className="flex items-center justify-between w-full">
                <span className="text-xs sm:text-sm font-medium text-white/80">
                  {card2.labelText}
                </span>
                <div className="flex items-center text-[10px] sm:text-xs font-bold text-white bg-blue-600 border border-white px-2 py-1 rounded-full shrink-0">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {card2.pillText}
                </div>
              </div>
            </div>

          </div>

          {/* 3. Bottom Text */}
          <p className="text-lg sm:text-xl md:text-[1.5rem] font-medium text-gray-900 leading-snug lg:leading-normal max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {bottomText}
          </p>
        </div>

        {/* RIGHT COLUMN - Image */}
        <div className="relative w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[75vh] rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden order-first lg:order-last">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
}




// How to use; 



// {/* <AISeoHero 
//   headingLine1="top rated"
//   headingLine2="digital agency"
//   bottomText="Supercharge your growth with state-of-the-art marketing strategies tailored to your business."
//   heroImageSrc="/your-new-image.png"
  
//   {/* The First Card (White / Bar Chart) */}
//   card1={{
//     logoSrc: "/google-logo.png",
//     logoAlt: "Google",
//     platformName: "Google Search",
//     metric: "250%",
//     pillText: "Traffic",
//     subText: "Year over year",
//     chartData: [2, 3, 5, 5, 6]
//   }}

//   {/* The Second Card (Colored / Citations) */}
//   card2={{
//     logoSrc: "/bing-logo.png",
//     logoAlt: "Bing",
//     platformName: "Bing Copilot",
//     metric: "85%",
//     labelText: "Mentions",
//     pillText: "Surge"
//   }}
// /> */}