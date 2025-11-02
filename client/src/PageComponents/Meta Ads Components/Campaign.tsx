import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    category: "Awareness",
    title: "Build reach and brand recall",
    details:
      "Use Awareness when the primary goal is to get your brand in front of as many relevant people as possible across Facebook, Instagram, and Messenger placements like Feed, Stories, and Reels. This objective optimizes for ad recall and cost‑efficient reach rather than immediate actions, making it ideal for launches, new markets, or building top‑funnel momentum before your retargeting audiences are large enough to convert efficiently.",
    tutorialLink: "#awareness",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_awareness_placements.png",
      alt: "Meta Awareness campaign across Feed, Stories, and Reels placements",
    },
  },
  {
    category: "Traffic",
    title: "Drive quality website and WhatsApp visits",
    details:
      "Traffic campaigns send people to destinations like landing pages or WhatsApp while optimizing for link clicks or landing page views to build retargeting pools and validate messaging at the top of the funnel. Use this to test headlines, hooks, and offers cheaply, then promote best performers into conversion‑focused campaigns. [web:113]",
    tutorialLink: "#traffic",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_traffic_clicks.png",
      alt: "Meta Traffic campaign showing clicks and landing page views",
    },
  },
  {
    category: "Engagement",
    title: "Boost interactions, video views, and social proof",
    details:
      "Engagement focuses delivery on users likely to interact—comments, shares, reactions, follows, and video views—amplifying organic content and building social proof that later improves conversion rates. It’s useful for scaling reels or posts before retargeting viewers or engagers with lead or sales objectives. [web:113][web:4]",
    tutorialLink: "#engagement",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_engagement_socialproof.png",
      alt: "Meta Engagement campaign with reactions, comments, and video views",
    },
  },
  {
    category: "Leads",
    title: "Capture qualified leads on‑platform or your site",
    details:
      "Leads campaigns drive form submissions via native Lead Ads, Messenger/IG DMs, calls, or website forms and optimize for completion and quality, reducing CPL while keeping friction low. Pair this with targeted follow‑ups and connect Pixel plus Conversions API so optimization uses accurate event signals at every step. [web:113][web:87]",
    tutorialLink: "#leads",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_lead_ads_forms.png",
      alt: "Meta Lead Ads form with questions and CTA",
    },
  },
  {
    category: "App Promotion",
    title: "Acquire installs and in‑app actions",
    details:
      "App Promotion optimizes for installs and downstream in‑app events when you pass those events back, helping scale efficiently while maintaining quality. Creative tailored to Reels, Stories, and Feed with clear CTAs improves conversion rates and reduces CPI as the system learns who installs and engages. [web:113]",
    tutorialLink: "#app",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_app_installs.png",
      alt: "Meta App Promotion campaign dashboard showing installs and events",
    },
  },
  {
    category: "Sales",
    title: "Increase conversions and revenue with signal quality",
    details:
      "Sales campaigns optimize for purchases or highest‑value events and support catalog/dynamic product ads for personalized retargeting and prospecting. For best performance, implement Meta Pixel and Conversions API to improve attribution and optimization signals, unlocking stable scaling and stronger ROAS. [web:113][web:66]",
    tutorialLink: "#sales",
    image: {
      src: "https://res.cloudinary.com/dbwrnwa3l/image/upload/v1761833001/meta_sales_dpa.png",
      alt: "Meta Sales campaign using catalog and dynamic product ads",
    },
  },
];

const CampaignTypes = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Dashed Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
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
          // Standard mask compositing (Chromium/Firefox)
          maskComposite: "intersect",
          // WebKit mapping: intersect ≈ source-in
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="max-w-(--breakpoint-xl) w-full py-10 px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-base text-center tracking-[-0.03em] text-gray-700 bungee-inline-regular">
             learn About <span className="bg-blue-600 bg-clip-text text-transparent">Meta Ads Campaigns</span>
            </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Pick the single objective that matches your primary outcome—Meta optimizes delivery to people most likely to take that action across Facebook, Instagram, and Messenger. [web:19]
        </p>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              {/* Image block */}
              <div className="w-full aspect-[4/3] rounded-xl border border-border/50 basis-1/2 overflow-hidden bg-muted">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Text block */}
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-base text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-2xl font-semibold tracking-tight text-blue-600">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">{feature.details}</p>
                <Button asChild size="lg" className="mt-6 rounded-full gap-3 bg-blue-600">
                  <Link href={feature.tutorialLink}>
                    Learn More <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Helper note (optional) */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Tip: Implement Pixel and Conversions API wherever possible to improve attribution and optimize for the right downstream actions across objectives. [web:19]
        </p>
      </div>
    </div>
  );
};

export default CampaignTypes;
