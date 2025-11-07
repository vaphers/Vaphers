// 'use client';

// import { useEffect, useMemo, useRef, useState } from 'react';
// import { motion, useMotionValue } from 'framer-motion';
// import Image from 'next/image';

// interface MarqueeImage {
//   id: string;
//   src: string;
//   alt: string;
//   title?: string;
// }

// interface PortfolioMarqueeProps {
//   images: MarqueeImage[];
//   pxPerSec?: number;   
//   gap?: number;       
//   baseWidth?: number;
// }

// export function PortfolioMarquee({
//   images,
//   pxPerSec = 60,
//   gap = 16,
//   baseWidth = 1000,
// }: PortfolioMarqueeProps) {
//   const lane = useMemo(() => [...images, ...images, ...images], [images]);

//   const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});
//   const setSize = (id: string, w: number, h: number) =>
//     setSizes((s) => ({ ...s, [id]: { w, h } }));

//   const computedCards = useMemo(() => {
//     return lane.map((img) => {
//       const s = sizes[img.id];
//       if (!s) return { id: img.id, width: baseWidth, height: Math.round((baseWidth * 9) / 16) };
//       const ratio = s.h / s.w;
//       const width = Math.min(baseWidth, s.w);
//       const height = Math.round(width * ratio);
//       return { id: img.id, width, height };
//     });
//   }, [lane, sizes, baseWidth]);

//   const x = useMotionValue(0);
//   const rafRef = useRef<number | null>(null);
//   const lastTsRef = useRef<number | null>(null);

//   const sequenceWidth = useMemo(() => {
//     const slice = computedCards.slice(0, images.length);
//     const totalW = slice.reduce((acc, c) => acc + c.width, 0) + gap * Math.max(0, slice.length - 1);
//     return totalW;
//   }, [computedCards, images.length, gap]);

//   useEffect(() => {
//     const step = (ts: number) => {
//       if (lastTsRef.current != null) {
//         const dt = (ts - lastTsRef.current) / 1000;
//         const delta = -pxPerSec * dt;
//         let next = x.get() + delta;
//         if (sequenceWidth > 0) {
//           if (next <= -sequenceWidth) next += sequenceWidth;
//           else if (next > 0) next -= sequenceWidth;
//         }
//         x.set(next);
//       }
//       lastTsRef.current = ts;
//       rafRef.current = requestAnimationFrame(step);
//     };
//     rafRef.current = requestAnimationFrame(step);
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
//   }, [pxPerSec, sequenceWidth, x]);

//   return (
//     <section className="w-full py-10 bg-white">
//       <div className="container mx-auto px-4">
//         <h3 className="text-3xl md:text-3xl lg:text-6xl text-center font-sans text-gray-700 mb-6 bungee-inline-regular">
//           Have a Look at <span className="bg-blue-600 bg-clip-text text-transparent">our Website Designs</span>
//         </h3>
//       </div>

//       {/* pointer-events-none prevents hover/pause on this lane */}
//       <div className="w-full overflow-hidden">
//         <motion.div className="flex pointer-events-none" style={{ x, gap: `${gap}px` }}>
//           {lane.map((img, idx) => {
//             const card = computedCards[idx];
//             return (
//               <div
//                 key={`${img.id}-${idx}`}
//                 className="relative flex-shrink-0"
//                 style={{ width: card.width, height: card.height }}
//               >
//                 <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
//                   <Image
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     className="object-cover"
//                     sizes={`${card.width}px`}
//                     priority={idx < 3}
//                     onLoadingComplete={({ naturalWidth, naturalHeight }) => {
//                       if (!sizes[img.id] && naturalWidth && naturalHeight) {
//                         setSize(img.id, naturalWidth, naturalHeight);
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }


'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';

interface MarqueeImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface PortfolioMarqueeProps {
  images: MarqueeImage[];
  pxPerSec?: number;
  gap?: number;
  baseWidth?: number;
}

export function PortfolioMarquee({
  images,
  pxPerSec = 60,
  gap = 16,
  baseWidth = 1000,
}: PortfolioMarqueeProps) {
  // Dynamically set baseWidth for mobile devices smaller than 640px
  const [dynamicBaseWidth, setDynamicBaseWidth] = useState(baseWidth);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');

    const handleChange = () => {
      if (mediaQuery.matches) {
        setDynamicBaseWidth(baseWidth * 0.6); // Shrink width by 40% on mobile
      } else {
        setDynamicBaseWidth(baseWidth);
      }
    };

    handleChange(); // run on mount

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [baseWidth]);

  const lane = useMemo(() => [...images, ...images, ...images], [images]);

  const [sizes, setSizes] = useState<Record<string, { w: number; h: number }>>({});
  const setSize = (id: string, w: number, h: number) =>
    setSizes((s) => ({ ...s, [id]: { w, h } }));

  const computedCards = useMemo(() => {
    return lane.map((img) => {
      const s = sizes[img.id];
      if (!s) return { id: img.id, width: dynamicBaseWidth, height: Math.round((dynamicBaseWidth * 9) / 16) };
      const ratio = s.h / s.w;
      const width = Math.min(dynamicBaseWidth, s.w);
      const height = Math.round(width * ratio);
      return { id: img.id, width, height };
    });
  }, [lane, sizes, dynamicBaseWidth]);

  const x = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  const sequenceWidth = useMemo(() => {
    const slice = computedCards.slice(0, images.length);
    const totalW = slice.reduce((acc, c) => acc + c.width, 0) + gap * Math.max(0, slice.length - 1);
    return totalW;
  }, [computedCards, images.length, gap]);

  useEffect(() => {
    const step = (ts: number) => {
      if (lastTsRef.current != null) {
        const dt = (ts - lastTsRef.current) / 1000;
        const delta = -pxPerSec * dt;
        let next = x.get() + delta;
        if (sequenceWidth > 0) {
          if (next <= -sequenceWidth) next += sequenceWidth;
          else if (next > 0) next -= sequenceWidth;
        }
        x.set(next);
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pxPerSec, sequenceWidth, x]);

  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl md:text-3xl lg:text-6xl text-center font-sans text-gray-700 mb-6 bungee-inline-regular">
          Have a Look at <span className="bg-blue-600 bg-clip-text text-transparent">our Website Designs</span>
        </h3>
      </div>

      {/* pointer-events-none prevents hover/pause on this lane */}
      <div className="w-full overflow-hidden">
        <motion.div className="flex pointer-events-none" style={{ x, gap: `${gap}px` }}>
          {lane.map((img, idx) => {
            const card = computedCards[idx];
            return (
              <div
                key={`${img.id}-${idx}`}
                className="relative flex-shrink-0"
                style={{ width: card.width, height: card.height }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes={`${card.width}px`}
                    priority={idx < 3}
                    onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                      if (!sizes[img.id] && naturalWidth && naturalHeight) {
                        setSize(img.id, naturalWidth, naturalHeight);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
