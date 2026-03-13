import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function AISeoHero() {
  return (
    <section className="min-h-screen bg-[#FDFDFD] p-4 md:p-8 lg:p-12 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 h-full min-h-[85vh]">
        
        {/* LEFT COLUMN - Content */}
        <div className="flex flex-col justify-between py-4 lg:py-12 relative">
          
          {/* 1. Huge Heading */}
          {/* Adjusted mobile font sizes to prevent overflowing, keeping lg size identical */}
          <h3 className="text-5xl sm:text-6xl md:text-[6.5rem] lg:text-7xl text-blue-600 bungee-shade leading-tight md:leading-none">
            leading ai  <br />seo agency in U.S
          </h3>

          {/* 2. Responsive Cards Container */}
          {/* Mobile/Tablet: Stacked vertically with flex. Desktop: Block with relative height */}
          <div className="w-full max-w-[500px] my-10 lg:my-0 flex flex-col lg:block gap-6 lg:gap-0 lg:relative lg:h-[450px] mx-auto lg:mx-0 items-center">
            
            {/* White Card (ChatGPT) */}
            {/* Mobile/Tablet: Relative & centered. Desktop: Absolute positioning */}
            <div className="relative lg:absolute lg:left-0 lg:top-20 w-full max-w-[340px] bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 border border-gray-50 z-10">
              <div className="flex items-center gap-3 mb-6">
                <Image 
                  src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047474/chat-gpt-logo_qf83fb.png" 
                  alt="ChatGPT" 
                  width={24} 
                  height={24}
                />
                <span className="font-semibold text-lg text-gray-900">ChatGPT</span>
              </div>
              
              <h4 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                120%
              </h4>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-xs font-bold text-white bg-black px-2.5 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Increase
                </div>
                <span className="text-xs font-medium text-gray-500">vs. last quarter</span>
              </div>

              {/* Faux Bar Chart */}
              <div className="flex items-end gap-3 mt-10 h-24">
                {[3, 4, 4, 5, 6].map((blocks, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1 w-full justify-end">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const isActive = 6 - i <= blocks;
                      const isHighlight = colIndex === 4 && isActive;
                      return (
                        <div 
                          key={i} 
                          className={`h-3 w-full rounded-sm ${
                            isHighlight ? 'bg-blue-600' : isActive ? 'bg-gray-200' : 'bg-transparent'
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Orange Card (Perplexity) */}
            {/* Mobile/Tablet: Relative & centered. Desktop: Absolute positioning */}
            <div className="relative lg:absolute lg:left-90 lg:bottom-8 w-full max-w-[340px] lg:w-[280px] bg-blue-600 rounded-[1.8rem] shadow-2xl p-7 text-white z-20">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-white p-1.5 rounded-full flex items-center justify-center">
                  <Image 
                    src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761047484/perplexity-logo_zqmnzf.png" 
                    alt="Perplexity" 
                    width={18} 
                    height={18}
                    className="object-contain"
                  />
                 </div>
                <span className="font-medium text-white text-lg">Perplexity AI</span>
              </div>
              
              <h4 className="text-4xl font-bold tracking-tight text-white mb-3">
                103%
              </h4>
              
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-medium text-white/80">Citations</span>
                <div className="flex items-center text-xs font-bold text-white bg-black px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  Growth
                </div>
              </div>
            </div>

          </div>

          {/* 3. Bottom Text */}
          <p className="text-xl sm:text-2xl md:text-[1.75rem] font-medium text-gray-900 leading-snug max-w-lg tracking-tight mt-8 lg:mt-0 text-center lg:text-left mx-auto lg:mx-0">
            We help brands dominate generative search, ensuring your business is the definitive answer recommended by today's leading AI engines.
          </p>
        </div>

        {/* RIGHT COLUMN - Image */}
        {/* Adjusted height for mobile so it doesn't take up excessive scrolling space */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-auto lg:min-h-[80vh] rounded-xl lg:rounded-[2.5rem] overflow-hidden mt-2 lg:mt-0">
          <Image
            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1773317259/Untitled_design_3_pfr2ks.png"
            alt="get featured in ai search results"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
}