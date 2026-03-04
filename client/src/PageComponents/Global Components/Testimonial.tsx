// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Marquee } from "@/components/ui/marquee";
// import React, { ComponentProps } from "react";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Mitchell",
//     designation: "Restaurant Owner",
//     company: "Local Business",
//     testimonial:
//       "Their local SEO work brought us so many new customers! We're now on the first page of Google for our area. Best decision we made for our restaurant.",
//   },
//   {
//     id: 2,
//     name: "Mike Chen",
//     designation: "E-commerce Store Owner",
//     company: "Online Retail",
//     testimonial:
//       "The ecommerce SEO strategy they implemented doubled our organic traffic in 3 months. Our sales have never been better. Simple and effective approach.",
//   },
//   {
//     id: 3,
//     name: "Jennifer Williams",
//     designation: "Real Estate Agent",
//     company: "Independent Realtor",
//     testimonial:
//       "Google Ads management was a game changer for my business. I'm getting quality leads daily without wasting money. They really know what they're doing.",
//   },
//   {
//     id: 4,
//     name: "David Rodriguez",
//     designation: "Gym Owner",
//     company: "Fitness Center",
//     testimonial:
//       "Lead generation campaigns brought us 25+ new memberships in the first month. The team is responsive and explains everything in simple terms.",
//   },
//   {
//     id: 5,
//     name: "Lisa Thompson",
//     designation: "Small Business Owner",
//     company: "Boutique Shop",
//     testimonial:
//       "Our new website design looks amazing and actually brings in customers. Clean, professional, and exactly what we needed. Great experience working with them.",
//   },
//   {
//     id: 6,
//     name: "James Parker",
//     designation: "Startup Founder",
//     company: "Tech Startup",
//     testimonial:
//       "They built our mobile app from scratch and it works perfectly. The whole process was smooth and they kept us updated every step of the way.",
//   },
//   {
//     id: 7,
//     name: "Amanda Foster",
//     designation: "Dental Practice Owner",
//     company: "Healthcare",
//     testimonial:
//       "Local SEO has been incredible for our practice. New patients are finding us easily and our appointment bookings have tripled. Highly recommend their services.",
//   },
//   {
//     id: 8,
//     name: "Robert Kim",
//     designation: "Auto Repair Shop Owner",
//     company: "Automotive Services",
//     testimonial:
//       "The Google Ads campaign pays for itself. We're getting calls from people ready to book appointments. Finally advertising that actually works.",
//   },
// ];

// const Testimonial = () => (
//   <div className="w-full relative">
//     {/* Dashed Grid Background */}
//     <div
//       className="absolute inset-0 z-0"
//       style={{
//         backgroundImage: `
//           linear-gradient(to right, #e7e5e4 1px, transparent 1px),
//           linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
//         `,
//         backgroundSize: "20px 20px",
//         backgroundPosition: "0 0, 0 0",
//         maskImage: `
//           repeating-linear-gradient(
//             to right,
//             black 0px,
//             black 3px,
//             transparent 3px,
//             transparent 8px
//           ),
//           repeating-linear-gradient(
//             to bottom,
//             black 0px,
//             black 3px,
//             transparent 3px,
//             transparent 8px
//           )
//         `,
//         WebkitMaskImage: `
//           repeating-linear-gradient(
//             to right,
//             black 0px,
//             black 3px,
//             transparent 3px,
//             transparent 8px
//           ),
//           repeating-linear-gradient(
//             to bottom,
//             black 0px,
//             black 3px,
//             transparent 3px,
//             transparent 8px
//           )
//         `,
//         maskComposite: "intersect",
//         WebkitMaskComposite: "source-in",
//       }}
//     />

//     {/* Content */}
//     <div className="relative z-10 flex justify-center items-center py-12">
//       <div className="h-full w-full">
//         <h3 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
//           What Our <span className="bg-blue-600 bg-clip-text text-transparent">Client's Say?</span>
//         </h3>
//         <p className="mt-3 text-center text-muted-foreground text-xl">
//           Real stories from business owners who trust us with their digital marketing
//         </p>
//         <div className="mt-14 relative">
//           <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
//           <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
//           <Marquee pauseOnHover className="[--duration:20s]">
//             <TestimonialList />
//           </Marquee>
//           <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
//             <TestimonialList />
//           </Marquee>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const TestimonialList = () =>
//   testimonials.map((testimonial) => (
//     <div
//       key={testimonial.id}
//       className="min-w-[260px] max-w-xs bg-accent rounded-xl p-4 sm:p-6 m-2"
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Avatar>
//             <AvatarFallback className="text-xl font-medium bg-blue-500 text-primary-foreground">
//               {testimonial.name.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <p className="text-lg font-semibold">{testimonial.name}</p>
//             <p className="text-sm text-gray-500">{testimonial.designation}</p>
//           </div>
//         </div>
//       </div>
//       <p className="mt-5 text-sm sm:text-base leading-relaxed">{testimonial.testimonial}</p>
//     </div>
//   ));

// const TwitterLogo = (props: ComponentProps<"svg">) => (
//   <svg
//     role="img"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}
//   >
//     <title>X</title>
//     <path
//       fill="currentColor"
//       d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
//     />
//   </svg>
// );

// export default Testimonial;








import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  metric?: string;
  subMetric?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  variant: 'large' | 'medium' | 'small' | 'accent';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    metric: "12X",
    subMetric: "Growth in organic reach",
    quote: "The strategic shift in our digital presence was immediate. Their team didn't just redesign our site; they re-engineered our entire conversion funnel. The 1200% growth in reach speaks for itself.",
    author: "James Chen",
    role: "Head of Growth",
    company: "Skyline",
    image: "https://i.pravatar.cc/150?u=james",
    variant: 'large'
  },
  {
    id: 2,
    metric: "45%",
    subMetric: "Lower acquisition cost",
    quote: "Efficiency is the name of the game. By tightening our UI and focusing on user intent, we saw costs drop while quality of leads soared. A masterclass in performance design.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "FlowState",
    image: "https://i.pravatar.cc/150?u=elena",
    variant: 'medium'
  },
  {
    id: 3,
    quote: "The attention to detail in the micro-interactions is what sets them apart. Our users are staying on page 3x longer than before.",
    author: "Marcus Thorne",
    role: "Product Lead",
    company: "Nexus",
    image: "https://i.pravatar.cc/150?u=marcus",
    variant: 'small'
  },
  {
    id: 4,
    quote: "Building an MVP is easy, but building a scalable foundation is hard. They delivered both in record time with a finish that feels premium.",
    author: "Sarah Mitchell",
    role: "Director of Engineering",
    company: "GlobalBlue",
    image: "https://i.pravatar.cc/150?u=sarah",
    variant: 'accent'
  }
];

const TestimonialCard = ({ data }: { data: Testimonial }) => {
  const isAccent = data.variant === 'accent';
  
  const cardStyles = {
    // White/Blue cards
    large: "md:col-span-1 md:row-span-2 bg-white border-blue-50",
    medium: "md:col-span-2 bg-white border-blue-50",
    small: "bg-white border-blue-50",
    // The "Deep Blue" accent card
    accent: "bg-[#0A2540] text-blue-50 border-transparent shadow-blue-900/20"
  };

  return (
    <div className={`p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden shadow-xl shadow-blue-900/5 border ${cardStyles[data.variant]} transition-transform hover:scale-[1.01] duration-300`}>
      <div>
        {data.metric && (
          <div className="mb-6">
            <h3 className="text-5xl font-extrabold mb-2 text-blue-600 italic tracking-tighter">{data.metric}</h3>
            <p className="text-lg font-semibold text-slate-500 uppercase tracking-wider text-sm">{data.subMetric}</p>
          </div>
        )}
        
        {/* Quote Icon in Cyan/Blue */}
        <Quote className={`w-10 h-10 mb-4 fill-current ${isAccent ? 'text-blue-400' : 'text-blue-500'} opacity-50`} />
        
        <p className={`text-lg leading-relaxed mb-8 ${isAccent ? 'text-blue-100/90' : 'text-slate-700 font-medium'}`}>
          "{data.quote}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div className={`p-1 rounded-full border-2 ${isAccent ? 'border-blue-400' : 'border-blue-100'}`}>
            <img src={data.image} alt={data.author} className="w-10 h-10 rounded-full object-cover" />
          </div>
          <div>
            <p className={`font-bold text-sm ${isAccent ? 'text-white' : 'text-slate-900'}`}>{data.author}</p>
            <p className={`text-xs ${isAccent ? 'text-blue-300' : 'text-blue-500 font-semibold'}`}>{data.role} • {data.company}</p>
          </div>
        </div>
        
        {/* Subtle Watermark Logo */}
        <div className={`opacity-10 font-black text-3xl select-none ${isAccent ? 'text-white' : 'text-blue-900'}`}>
           {data.company.substring(0, 2)}
        </div>
      </div>
    </div>
  );
};

export default function BlueTestimonialSection() {
  return (
    <section className="bg-[#F4F7FF] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-5xl mb-16 text-center mx-auto">
          <h3 className="text-5xl md:text-6xl font-black text-slate-800 mt-2 mb-4 tracking-tight bungee-inline-regular">
            Results That Speaks Volume <span className="text-blue-600">Read Our Client's Reviews</span>
          </h3>
          <p className="text-xl text-slate-500 leading-relaxed">
            We help ambitious companies grow their revenue through data-driven design and engineering.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
}