import React from 'react';
import { Shield, Zap, CheckCircle2 } from 'lucide-react';

// --- Configuration Data ---
// Easy to update text or swap icons without touching the layout code
const featuresData = [
  {
    id: 'privacy',
    icon: Shield,
    lines: ['Runs in your', 'browser — no', 'upload'],
  },
  {
    id: 'speed',
    icon: Zap,
    lines: ['~1s per 1MP', 'image on a laptop'],
  },
  {
    id: 'quality',
    icon: CheckCircle2,
    lines: ['Pixel-exact on', 'supported', 'Gemini outputs'],
  },
];

// --- Decorative Laurel SVG ---
const LaurelBranch = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="28"
    height="64"
    viewBox="0 0 28 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true" // Accessibility: Hides decorative SVG from screen readers
    className={`text-slate-800 transition-transform duration-300 ${
      flip ? 'transform -scale-x-100' : ''
    }`}
  >
    <path d="M21.5 59.5C14.5 49.5 8 38 6.5 25C6 19 7.5 12 11 6C11 6 5.5 12 4.5 19C3 29 8 42 14.5 52C16 54.5 18 57 21.5 59.5Z" fill="currentColor" />
    <path d="M12.5 10C10 13.5 11 17.5 11 17.5C11 17.5 14 14.5 15.5 11C16.5 8.5 15.5 6 15.5 6C15.5 6 14.5 7 12.5 10Z" fill="currentColor" />
    <path d="M9.5 18C7 21.5 7.5 25.5 7.5 25.5C7.5 25.5 11 22.5 12.5 19C13.5 16.5 12.5 14 12.5 14C12.5 14 11.5 15 9.5 18Z" fill="currentColor" />
    <path d="M7 26.5C4.5 30 5 34 5 34C5 34 8.5 31 10 27.5C11 25 10 22.5 10 22.5C10 22.5 9 23.5 7 26.5Z" fill="currentColor" />
    <path d="M5 35.5C2.5 39 3 43 3 43C3 43 6.5 40 8 36.5C9 34 8 31.5 8 31.5C8 31.5 7 32.5 5 35.5Z" fill="currentColor" />
    <path d="M4.5 44C2 47.5 2.5 51.5 2.5 51.5C2.5 51.5 6 48.5 7.5 45C8.5 42.5 7.5 40 7.5 40C7.5 40 6.5 41 4.5 44Z" fill="currentColor" />
    <path d="M6 52.5C4.5 55.5 5 59 5 59C5 59 8.5 56.5 9.5 53C10.5 50 9.5 48 9.5 48C9.5 48 8 49.5 6 52.5Z" fill="currentColor" />
  </svg>
);

// --- Main Component ---
export default function GeminiFeatures() {
  return (
    <section className="w-full bg-[#f8f9fb] py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 lg:gap-32">
        
        {featuresData.map((feature) => (
          // 'group' class allows us to trigger hover states on children when the parent is hovered
          <div 
            key={feature.id} 
            className="group flex items-center justify-center gap-4 sm:gap-6 cursor-default"
          >
            <LaurelBranch />

            {/* Feature Content */}
            <div className="flex flex-col items-center justify-center min-w-[140px] sm:min-w-[160px] transition-transform duration-300 group-hover:-translate-y-1">
              
              <div className="text-slate-800 mb-4 transition-transform duration-300 group-hover:scale-110">
                <feature.icon size={42} strokeWidth={1.5} aria-hidden="true" />
              </div>
              
              <p className="text-slate-800 text-[15px] sm:text-[17px] font-medium leading-snug text-center tracking-tight">
                {feature.lines.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </p>
              
            </div>

            <LaurelBranch flip />
          </div>
        ))}

      </div>
    </section>
  );
}