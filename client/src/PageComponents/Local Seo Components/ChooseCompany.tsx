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
    title: "Clear & Data-Driven Strategy",
    description:
      "Choose a company that bases its local SEO efforts on thorough market research and data analytics to target your ideal customer effectively and maximize ROI.",
  },
  {
    icon: BookCheck,
    title: "Proven Results & Testimonials",
    description:
      "Look for a provider with a verifiable track record of successful local SEO campaigns, supported by case studies and transparent reporting.",
  },
  {
    icon: ChartPie,
    title: "Transparent Performance Tracking",
    description:
      "Affordable doesn’t mean hidden. Opt for companies offering real-time access to campaign performance metrics so you can measure progress clearly.",
  },
  {
    icon: Users,
    title: "Dedicated Expert Support",
    description:
      "A reliable local SEO firm assigns you a knowledgeable team that understands your industry and offers personalized attention to your business goals.",
  },
  {
    icon: FolderSync,
    title: "Easy Integration with Your Business",
    description:
      "Your SEO provider should seamlessly integrate their work within your existing marketing stack and workflows to avoid disruption.",
  },
  {
    icon: Zap,
    title: "Quick Wins with Sustainable Growth",
    description:
      "Affordable local SEO companies focus on delivering tangible improvements fast while building a long-term strategy for consistent lead generation.",
  },
]

const ChooseCompany = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-7xl w-full py-12 px-6">
        <div className="text lg:text-left mb-8 lg:mb-12">
          <h4 className="text-3xl md:text-4xl lg:text-6xl font-base text-center tracking-[-0.03em] px-6 text-gray-700 bungee-inline-regular">
            How to Choose an <span className="bg-blue-600 bg-clip-text text-transparent">Affordable Local SEO Company?</span>
          </h4>
        </div>
        
        <div className="mt-6 md:mt-10 w-full mx-auto grid md:grid-cols-2 gap-12 items-center">

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

        </div>
      </div>
    </div>
  )
}

export default ChooseCompany
