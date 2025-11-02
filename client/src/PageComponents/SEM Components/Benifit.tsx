import { Check } from "lucide-react";

const semBenefits = [
  {
    title: "Drive Immediate Results",
    items: [
      "Instant visibility on search engines",
      "Quick traffic generation within hours",
      "Fast ROI compared to organic methods",
      "Real-time campaign adjustments",
      "Immediate measurable KPIs",
      "Jumpstart new product launches"
    ]
  },
  {
    title: "Target High-Intent Customers",
    items: [
      "Reach users searching for solutions",
      "Precision targeting by location & device",
      "Keyword-driven audience segmentation",
      "Custom ad scheduling for peak times",
      "Retargeting to boost conversions",
      "Demographic-based bidding strategies"
    ]
  },
  {
    title: "Control Your Budget",
    items: [
      "Set daily or monthly limits",
      "Pay only when ads are clicked",
      "Scale spend based on ROI",
      "Automated bid strategies",
      "Pause or resume campaigns anytime",
      "Transparent spending reports"
    ]
  }
];

export default function SEMBenefitsMinimal() {
  return (
    <section className="w-full relative">
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

      {/* Content - with relative positioning and z-index */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Headline */}
        <div className="text-center mb-10">
          <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
            Grow Your Business With <br/>
            <span className="bg-blue-600 bg-clip-text text-transparent">
                Search Engine Marketing
            </span>
          </h4>
          <p className="text-lg text-gray-600">
            Strategic SEM campaigns deliver instant results, precision targeting, and full budget control to maximize your ROI.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {semBenefits.map((benefit, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 items-start">
              {/* Title */}
              <div className="md:col-span-1 flex items-center">
                <h5 className="text-2xl text-blue-600 font-semibold">{benefit.title}</h5>
              </div>
              {/* Items */}
              <div className="md:col-span-3 grid md:grid-cols-3 gap-8">
                {benefit.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
