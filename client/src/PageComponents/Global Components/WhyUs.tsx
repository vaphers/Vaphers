import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  BookCheck,
  ChartPie,
  FolderSync,
  Goal,
  Users,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Goal,
    title: "Data-Driven Strategy",
    description:
      "We use comprehensive analytics and market research to identify high-impact opportunities that deliver measurable ROI for your business growth objectives.",
  },
  {
    icon: BookCheck,
    title: "Proven Track Record",
    description:
      "Our portfolio of successful campaigns across diverse industries demonstrates consistent results with transparent reporting and case studies you can verify.",
  },
  {
    icon: ChartPie,
    title: "Real-Time Performance Tracking",
    description:
      "Access live dashboards showing campaign performance, traffic growth, and conversion metrics so you always know exactly how your investment performs.",
  },
  {
    icon: Users,
    title: "Dedicated Expert Team",
    description:
      "You work directly with experienced specialists who understand your industry, providing personalized strategies rather than one-size-fits-all templates.",
  },
  {
    icon: FolderSync,
    title: "Seamless Integration",
    description:
      "Our solutions integrate effortlessly with your existing tools and workflows, minimizing disruption while maximizing efficiency and productivity.",
  },
  {
    icon: Zap,
    title: "Fast Implementation",
    description:
      "See initial improvements within weeks, not months, as we prioritize quick wins while building sustainable long-term growth strategies simultaneously.",
  },
]

const WhyUs = () => {
  return (
    <div className=" w-full relative">
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
      <div className="relative z-10 flex items-center justify-center">
        <div className="max-w-7xl w-full py-8 lg:py-12 px-6">
          <div className="lg:text-left mb-8 lg:mb-12 align-center">
            <h4 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
              Why Choose Us <span className="bg-blue-600 bg-clip-text text-transparent">For Your Business?</span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center lg:mx-0">
              Partner with a team that combines expertise, transparency, and results-driven strategies to accelerate your success
            </p>
          </div>
          
          <div className="mt-6 md:mt-10 w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Accordion defaultValue="item-0" type="single" className="w-full">
                {features.map(({ title, description, icon: Icon }, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="group/accordion-item data-[state=open]:border-b-2 data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="text-lg [&>svg]:hidden group-first/accordion-item:pt-0">
                      <div className="flex items-center gap-4">
                        <Icon className="text-blue-600" />
                        {title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
                      {description}
                      <div className="mt-6 mb-2 md:hidden aspect-video w-full relative rounded-xl overflow-hidden">
                        <Image
                          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                          alt="Business team collaboration and strategy"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Media - Desktop */}
            <div className="hidden md:block w-full h-full min-h-[500px] relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional business team strategizing growth"
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 grayscale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyUs
