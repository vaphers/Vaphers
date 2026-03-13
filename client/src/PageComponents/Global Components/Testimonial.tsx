import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    text: "They handled our SEO and built our new website from scratch. The site looks incredibly professional now, and they really nailed the branding. Communication was clear throughout the whole process, and the work was actually delivered on time. We've already noticed a steady bump in local patient inquiries since the launch.",
    name: "Asad Ahmad",
    role: "Owner of Prima Dental",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    initials: null,
    signature: "Asad A.",
    rotation: "-rotate-2",
  },
  {
    id: 2,
    text: "Vaphers has been a big help for my small business. I used to spend hours managing reviews and following up with customers myself. Now it’s all handled seamlessly, taking a huge weight off my plate.",
    name: "Dennis Johnson",
    role: "Pioneer Roofing",
    avatar: null,
    initials: "DJ",
    signature: "Dennis J.",
    rotation: "rotate-2",
  },
  {
    id: 3,
    text: "They handle pretty much all the online stuff related to our business, whether it's web design, marketing strategy, or managing our paid ads. I've always received the exact results I was expecting.",
    name: "Amelia Bronze",
    role: "Founder of Aneesa",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    initials: null,
    signature: "Amelia B.",
    rotation: "-rotate-1",
  },
  {
    id: 4,
    text: "We are using their services and are very happy and satisfied so far. The team is prompt and highly responsible.",
    name: "Gustavo Kent",
    role: "Director of Green Future",
    avatar: null,
    initials: "GK",
    signature: "G. Kent",
    rotation: "rotate-1",
  },
  {
    id: 5,
    text: "I was most impressed by their response time and how genuinely personable their team was. We had some bad experiences with agencies in the past, so I was a bit skeptical, but the quality of leads we're getting now speaks for itself.",
    name: "Kristy Jones",
    role: "B2B Painting Contractor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    initials: null,
    signature: "Kristy",
    rotation: "-rotate-2",
  },
  {
    id: 6,
    text: "They’re on top of the work, always on time, and make us feel like we’re their only customers.",
    name: "Austin OeDell",
    role: "Office Manager, Plumbing Company",
    avatar: null,
    initials: "AO",
    signature: "Austin",
    rotation: "rotate-2",
  },
  {
    id: 7,
    text: "Vaphers delivered an excellent new website for our venue. People have told us it looks much better than the previous version, and it's definitely made our booking inquiry process smoother.",
    name: "Steve M.",
    role: "General Manager, Event Venue",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    initials: null,
    signature: "Steve M.",
    rotation: "-rotate-1",
  }
];

export default function SocialProofSection() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#dbeafe] py-14 overflow-hidden flex flex-col justify-center">
      
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-16">
        <h3 className="text-4xl md:text-6xl bungee-shade text-slate-800 mb-4">
          <span className="text-blue-600">Social proof?</span> Here.
        </h3>
        <p className="text-slate-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          From SaaS startups to non-profits. 210+ happy clients. Still counting.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
          <Link 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors w-full sm:w-auto shadow-sm text-center cursor-pointer"
          >
            Book a call
          </Link>
          <Link 
            href="mailto:vaphersonline@gmail.com"
            className="bg-white/60 hover:bg-white/90 backdrop-blur-sm text-blue-900 border border-blue-100 px-6 py-3 rounded-full font-medium transition-colors w-full sm:w-auto shadow-sm text-center cursor-pointer"
          >
            Prefer writing instead? Email us.
          </Link>
        </div>
      </div>

      {/* Infinite Slider Section */}
      <div className="relative w-full flex items-center">
        <motion.div
          className="flex gap-6 md:gap-8 w-max px-4 py-8 items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 55, 
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-6 md:p-8 w-[300px] sm:w-[350px] md:w-[400px] h-[350px] md:h-[400px] shrink-0 shadow-xl flex flex-col justify-between ${testimonial.rotation} transition-transform hover:rotate-0 hover:z-10`}
              style={{
                borderBottomRightRadius: index % 2 === 0 ? "2rem" : "0",
                borderTopRightRadius: index % 2 !== 0 ? "2rem" : "0",
              }}
            >
              <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-base overflow-y-auto custom-scrollbar">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-50 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border-2 border-blue-50 shrink-0 text-sm md:text-base">
                      {testimonial.initials}
                    </div>
                  )}
                  
                  <div className="overflow-hidden">
                    <h4 className="text-slate-800 font-bold text-sm truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-500 text-xs max-w-[120px] sm:max-w-[140px] leading-tight truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="text-xl md:text-2xl text-slate-700 opacity-80 shrink-0 ml-2 whitespace-nowrap" 
                  style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                >
                  {testimonial.signature}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}