import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Marquee } from "@/components/ui/marquee";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    designation: "Restaurant Owner",
    company: "Local Business",
    testimonial:
      "Their local SEO work brought us so many new customers! We're now on the first page of Google for our area. Best decision we made for our restaurant.",
  },
  {
    id: 2,
    name: "Mike Chen",
    designation: "E-commerce Store Owner",
    company: "Online Retail",
    testimonial:
      "The ecommerce SEO strategy they implemented doubled our organic traffic in 3 months. Our sales have never been better. Simple and effective approach.",
  },
  {
    id: 3,
    name: "Jennifer Williams",
    designation: "Real Estate Agent",
    company: "Independent Realtor",
    testimonial:
      "Google Ads management was a game changer for my business. I'm getting quality leads daily without wasting money. They really know what they're doing.",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "Gym Owner",
    company: "Fitness Center",
    testimonial:
      "Lead generation campaigns brought us 25+ new memberships in the first month. The team is responsive and explains everything in simple terms.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    designation: "Small Business Owner",
    company: "Boutique Shop",
    testimonial:
      "Our new website design looks amazing and actually brings in customers. Clean, professional, and exactly what we needed. Great experience working with them.",
  },
  {
    id: 6,
    name: "James Parker",
    designation: "Startup Founder",
    company: "Tech Startup",
    testimonial:
      "They built our mobile app from scratch and it works perfectly. The whole process was smooth and they kept us updated every step of the way.",
  },
  {
    id: 7,
    name: "Amanda Foster",
    designation: "Dental Practice Owner",
    company: "Healthcare",
    testimonial:
      "Local SEO has been incredible for our practice. New patients are finding us easily and our appointment bookings have tripled. Highly recommend their services.",
  },
  {
    id: 8,
    name: "Robert Kim",
    designation: "Auto Repair Shop Owner",
    company: "Automotive Services",
    testimonial:
      "The Google Ads campaign pays for itself. We're getting calls from people ready to book appointments. Finally advertising that actually works.",
  },
];

const Testimonial = () => (
  <div className="w-full relative">
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

    {/* Content */}
    <div className="relative z-10 flex justify-center items-center py-12">
      <div className="h-full w-full">
        <h3 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
          What Our <span className="bg-blue-600 bg-clip-text text-transparent">Client's Say?</span>
        </h3>
        <p className="mt-3 text-center text-muted-foreground text-xl">
          Real stories from business owners who trust us with their digital marketing
        </p>
        <div className="mt-14 relative">
          <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
          <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
          <Marquee pauseOnHover className="[--duration:20s]">
            <TestimonialList />
          </Marquee>
          <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
            <TestimonialList />
          </Marquee>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-blue-500 text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonial;
