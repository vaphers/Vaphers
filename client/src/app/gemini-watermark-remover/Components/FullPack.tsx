"use client";

// import { ReactNode } from "react";

// interface Feature {
//   icon: ReactNode;
//   title: string;
//   description: string;
// }

// const features: Feature[] = [
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="3" y="3" width="18" height="18" rx="2" />
//         <path d="M3 9h18M9 21V9" />
//       </svg>
//     ),
//     title: "Reverse alpha blending, not AI inpainting",
//     description:
//       "A calibrated alpha map reconstructs the pixels under the logo. On supported outputs, the covered area is restored pixel-for-pixel — no soft edges, no model repaint.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="4" />
//         <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
//       </svg>
//     ),
//     title: "Covers Gemini logo, star overlay, Nano Banana",
//     description:
//       "Detects the standard Gemini logo, the star overlay variant, and Nano Banana image outputs that share the same overlay pattern. Other watermark sources are out of scope.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="6" width="20" height="12" rx="2" />
//         <path d="M12 12h.01" />
//         <path d="M7 12h.01M17 12h.01" />
//       </svg>
//     ),
//     title: "Bulk parallel processing",
//     description:
//       "Drop multiple Gemini photos at once, process in parallel in-browser, then download individually or as a single ZIP.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//       </svg>
//     ),
//     title: "100% browser-local — zero uploads",
//     description:
//       "All computation stays in your browser. Images never leave your device, no server involved.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//         <polyline points="14 2 14 8 20 8" />
//         <line x1="16" y1="13" x2="8" y2="13" />
//         <line x1="16" y1="17" x2="8" y2="17" />
//         <polyline points="10 9 9 9 8 9" />
//       </svg>
//     ),
//     title: "JPG, PNG, WebP in supported Gemini output sizes",
//     description:
//       "Accepts JPG, PNG, and WebP from supported Gemini outputs. Exports lossless PNG.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <circle cx="12" cy="12" r="3" />
//         <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
//         <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
//       </svg>
//     ),
//     title: "Chrome extension / userscript",
//     description:
//       "Install once and Gemini pages are patched automatically — previews swap in real time, native Copy and Download output clean results.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="4 17 10 11 4 5" />
//         <line x1="12" y1="19" x2="20" y2="19" />
//       </svg>
//     ),
//     title: "CLI & SDK for developers",
//     description:
//       "Run via pnpm dlx (zero install) or the global gwr command. Use --out-dir for bulk export and --json for CI/CD pipelines.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="2" y="3" width="20" height="14" rx="2" />
//         <line x1="8" y1="21" x2="16" y2="21" />
//         <line x1="12" y1="17" x2="12" y2="21" />
//       </svg>
//     ),
//     title: "Cross-platform",
//     description:
//       "Verified on Chrome, Firefox, Safari, and Edge, including mobile. CLI covers Windows, macOS, and Linux.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="16 18 22 12 16 6" />
//         <polyline points="8 6 2 12 8 18" />
//       </svg>
//     ),
//     title: "Free, open source, no sign-up",
//     description:
//       "MIT licensed, no usage limits, no account required. 4.1k+ GitHub Stars and growing.",
//   },
// ];

// function FeatureCard({ icon, title, description }: Feature) {
//   return (
//     <div className="feature-card">
//       <div className="feature-icon" aria-hidden="true">
//         {icon}
//       </div>
//       <div className="feature-content">
//         <h3 className="feature-title">{title}</h3>
//         <p className="feature-description">{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function FeaturesSection() {
//   return (
//     <>
//       <style>{`
//         .features-section {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding-bottom: 20px;
//           padding-top: 60px;
//           font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
//         }

//         .features-hero {
//           text-align: center;
//           margin-bottom: 72px;
//         }

//         .features-eyebrow {
//           display: inline-block;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: #6b7280;
//           background: #f3f4f6;
//           border: 1px solid #e5e7eb;
//           border-radius: 100px;
//           padding: 4px 14px;
//           margin-bottom: 20px;
//         }

//         .features-heading {
//           font-size: clamp(32px, 5vw, 56px);
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           line-height: 1.1;
//           color: #0a0a0a;
//           margin: 0 0 20px;
//         }

//         .features-subheading {
//           font-size: 17px;
//           color: #6b7280;
//           line-height: 1.65;
//           max-width: 560px;
//           margin: 0 auto;
//           font-weight: 400;
//         }

//         .features-divider {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           max-width: 300px;
//           margin: 40px auto 0;
//         }

//         .features-divider-line {
//           flex: 1;
//           height: 1px;
//           background: #e5e7eb;
//         }

//         .features-divider-dot {
//           width: 5px;
//           height: 5px;
//           border-radius: 50%;
//           background: #d1d5db;
//         }

//         .features-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1px;
//           background: #e5e7eb;
//           border: 1px solid #e5e7eb;
//           border-radius: 20px;
//           overflow: hidden;
//         }

//         @media (max-width: 768px) {
//           .features-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 520px) {
//           .features-grid {
//             grid-template-columns: 1fr;
//           }
//         }

//         .feature-card {
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           padding: 28px 28px 32px;
//           background: #ffffff;
//           transition: background 0.15s ease;
//           cursor: default;
//         }

//         .feature-card:hover {
//           background: #fafafa;
//         }

//         .feature-icon {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           background: #f3f4f6;
//           border: 1px solid #e5e7eb;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #374151;
//           flex-shrink: 0;
//         }

//         .feature-content {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .feature-title {
//           font-size: 14.5px;
//           font-weight: 620;
//           letter-spacing: -0.01em;
//           line-height: 1.35;
//           color: #111827;
//           margin: 0;
//         }

//         .feature-description {
//           font-size: 13.5px;
//           color: #6b7280;
//           line-height: 1.6;
//           margin: 0;
//           font-weight: 400;
//         }
//       `}</style>

//       <section className="features-section">
//         <div className="features-hero">
//           <h2 className="features-heading bungee-shade">
//             Complete <span className="text-blue-600">Google Gemini<br />watermark removal</span> toolkit
//           </h2>
//           <p className="features-subheading">
//             Pixel-accurate restoration · bulk automation · 100% local processing
//             · browser, terminal, and agent workflows in one open-source project.
//           </p>
//           <div className="features-divider">
//             <div className="features-divider-line" />
//             <div className="features-divider-dot" />
//             <div className="features-divider-dot" />
//             <div className="features-divider-dot" />
//             <div className="features-divider-line" />
//           </div>
//         </div>

//         <div className="features-grid">
//           {features.map((feature, i) => (
//             <FeatureCard key={i} {...feature} />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

import React, { ReactNode } from "react";
import { useLanguage } from './LanguageContext';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(<blue>.*?<\/blue>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^<blue>(.*)<\/blue>$/);
        if (match) {
          return <span key={i} className="text-blue-600">{match[1]}</span>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="feature-card">
      <div className="feature-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="feature-content">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
      title: t("fullpack.f1.title"),
      description: t("fullpack.f1.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ),
      title: t("fullpack.f2.title"),
      description: t("fullpack.f2.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M7 12h.01M17 12h.01" />
        </svg>
      ),
      title: t("fullpack.f3.title"),
      description: t("fullpack.f3.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: t("fullpack.f4.title"),
      description: t("fullpack.f4.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: t("fullpack.f5.title"),
      description: t("fullpack.f5.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      title: t("fullpack.f6.title"),
      description: t("fullpack.f6.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      title: t("fullpack.f7.title"),
      description: t("fullpack.f7.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: t("fullpack.f8.title"),
      description: t("fullpack.f8.desc"),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      ),
      title: t("fullpack.f9.title"),
      description: t("fullpack.f9.desc"),
    },
  ];

  return (
    <>
      <style>{`
        .features-section {
          max-width: 1100px;
          margin: 0 auto;
          padding-bottom: 20px;
          padding-top: 60px;
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
        }

        .features-hero {
          text-align: center;
          margin-bottom: 72px;
        }

        .features-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 100px;
          padding: 4px 14px;
          margin-bottom: 20px;
        }

        .features-heading {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #0a0a0a;
          margin: 0 0 20px;
        }

        .features-subheading {
          font-size: 17px;
          color: #6b7280;
          line-height: 1.65;
          max-width: 560px;
          margin: 0 auto;
          font-weight: 400;
        }

        .features-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 300px;
          margin: 40px auto 0;
        }

        .features-divider-line {
          flex: 1;
          height: 1px;
          background: #bfdbfe;
        }

        .features-divider-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3b82f6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #bfdbfe; /* Blue borders between cards */
          border: 1px solid #bfdbfe; /* Blue outer border */
          border-radius: 20px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 28px 28px 32px;
          background: #ffffff;
          transition: background 0.15s ease;
          cursor: default;
        }

        .feature-card:hover {
          background: #f8fafc;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #eff6ff; /* Light blue background for icons */
          border: 1px solid #bfdbfe; /* Blue border for icons */
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb; /* Blue SVGs */
          flex-shrink: 0;
        }

        .feature-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .feature-title {
          font-size: 14.5px;
          font-weight: 620;
          letter-spacing: -0.01em;
          line-height: 1.35;
          color: #111827;
          margin: 0;
        }

        .feature-description {
          font-size: 13.5px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

      <section className="features-section">
        <div className="features-hero">
          <h2 className="features-heading bungee-shade">
            <RichText text={t("fullpack.heading")} />
          </h2>
          <p className="features-subheading">
            {t("fullpack.subheading")}
          </p>
          <div className="features-divider">
            <div className="features-divider-line" />
            <div className="features-divider-dot" />
            <div className="features-divider-dot" />
            <div className="features-divider-dot" />
            <div className="features-divider-line" />
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </section>
    </>
  );
}