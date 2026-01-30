"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface GeminiWatermarkFaqProps {
  data?: FaqItem[];
}

const geminiWatermarkFaq: FaqItem[] = [
  {
    question: "What is Gemini Watermark Remover and how does it work?",
    answer:
      "Gemini Watermark Remover is a free online AI watermark removal tool that automatically detects and removes watermarks from Google Gemini AI-generated images. Our advanced AI watermark remover uses intelligent algorithms to scan your image, locate the Gemini watermark (typically 48×48px or 96×96px), and seamlessly erase it while preserving original image quality. The entire watermark removal process happens client-side in your browser, ensuring complete privacy and instant results.",
  },
  {
    question: "Is this AI watermark remover really free to use?",
    answer:
      "Yes! Our Gemini watermark remover is 100% free with no hidden costs, subscriptions, or usage limits. You can remove watermarks from unlimited Gemini AI images without paying anything. We support batch processing for multiple images, all formats (JPG, PNG, WebP), and provide high-quality downloads at no charge. Unlike other watermark removal tools that require paid plans, we believe in accessible AI watermark removal for everyone.",
  },
  {
    question: "Will removing watermarks affect my image quality?",
    answer:
      "No! Our AI watermark remover is specifically engineered to preserve 100% of your original image quality. The watermark removal process targets only the Gemini watermark pixels without touching the surrounding image data. You'll receive the exact same resolution, colors, and clarity as your original Gemini-generated image, just without the watermark. No compression, no artifacts, no quality degradation.",
  },
  {
    question: "What types of Gemini watermarks can be removed?",
    answer:
      "Our watermark remover supports all standard Google Gemini watermarks including the 48×48 pixel watermarks (typically in bottom-right corner), 96×96 pixel watermarks for larger images, and semi-transparent Gemini logos. The AI watermark removal tool automatically detects watermark size and position, adapting the removal algorithm for perfect results regardless of image dimensions or watermark placement.",
  },
  {
    question: "Is my data safe when using this watermark removal tool?",
    answer:
      "Absolutely! All watermark removal processing happens entirely in your browser using client-side JavaScript. Your Gemini images never leave your device or get uploaded to any server. We don't store, collect, or have access to your images. This makes our AI watermark remover the most privacy-focused solution available. Your images remain 100% private and secure throughout the entire watermark removal process.",
  },
  {
    question: "How long does it take to remove Gemini watermarks?",
    answer:
      "Watermark removal is nearly instant! Most Gemini images are processed in 2-5 seconds depending on image size and your device performance. The AI watermark remover works directly in your browser without server delays or upload times. Batch processing multiple images takes only a few seconds per image. It's the fastest watermark removal solution available, with no waiting, no queues, and no processing delays.",
  },
  {
    question: "Can I remove watermarks from multiple images at once?",
    answer:
      "Yes! Our Gemini watermark remover supports batch watermark removal. Simply upload multiple Gemini AI images simultaneously and the tool will process them all automatically. You can then download individual images or use the 'Download All' feature to get a ZIP file containing all your watermark-free images. Perfect for content creators, designers, and marketers processing large volumes of AI-generated images.",
  },
  {
    question: "What image formats are supported for watermark removal?",
    answer:
      "Our AI watermark remover supports all common image formats including JPG/JPEG, PNG, and WebP files up to 20MB each. After watermark removal, images are provided in high-quality PNG format to ensure maximum quality preservation. The tool automatically handles format conversion during the removal process, so you always get the best possible output regardless of your input format.",
  },
];

const GeminiWatermarkFaq = ({ data }: GeminiWatermarkFaqProps) => {
  const [value, setValue] = useState<string>();

  const faqContent = data && data.length ? data : geminiWatermarkFaq;

  return (
    <div className="w-full relative bg-white">
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

      <div className="flex items-center justify-center px-6 py-12 lg:py-14 relative z-10">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-12">
            <h4 className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-montserrat text-gray-700 mb-3 sm:mb-4 lg:mb-5 bungee-inline-regular">
              FAQs About{" "}
              <span className="bg-blue-600 bg-clip-text text-transparent">
                Gemini Watermark Removal
              </span>
            </h4>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about removing watermarks from Gemini AI images, including privacy, quality, speed, and supported formats.
            </p>
          </div>

          <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={value}
              onValueChange={setValue}
            >
              {faqContent.slice(0, 4).map(({ question, answer }, index) => (
                <AccordionItem key={question} value={`question-${index}`}>
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                        "text-start text-lg"
                      )}
                    >
                      {question}
                      <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-base text-muted-foreground text-pretty">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Accordion
              type="single"
              collapsible
              className="w-full"
              value={value}
              onValueChange={setValue}
            >
              {faqContent.slice(4).map(({ question, answer }, index) => (
                <AccordionItem key={question} value={`question-${index + 4}`}>
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                        "text-start text-lg"
                      )}
                    >
                      {question}
                      <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="text-base text-muted-foreground text-pretty">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiWatermarkFaq;
