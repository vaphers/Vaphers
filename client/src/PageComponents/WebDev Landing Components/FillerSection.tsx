import { Button } from "@/components/ui/button"

export default function WebDesignSection() {
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-12 px-8 py-16 lg:py-8 lg:py-20 max-w-7xl mx-auto">
      {/* title */}
      <div className="w-full lg:w-2/5">
        <h3 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-700 leading-tight montserrat">
          High‑converting Web Design for Modern Brands
        </h3>
        <div className="w-24 lg:w-104 h-1 bg-blue-900 mt-6"></div>

        {/* button */}
        <Button
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base font-semibold cursor-pointer"
        >
          Get a Free Website Review »
        </Button>
      </div>

      {/* content */}
      <div className="w-full lg:w-3/5 space-y-6">
        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          A great website is more than visuals—it’s a 24/7 sales engine built on clear messaging, intuitive UX, and fast performance that earns trust and drives action.
        </p>

        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Designs that load quickly and feel stable improve Core Web Vitals, which are used by Google to evaluate real‑world experience and can influence visibility and engagement. 
        </p>

        <p className="text-lg text-[#1a3d5c] leading-relaxed">
          Mobile‑first, responsive layouts ensure your content works on any device and align with Google’s mobile‑first indexing approach, protecting rankings and paid traffic quality.
        </p>

      </div>
    </section>
  )
}
