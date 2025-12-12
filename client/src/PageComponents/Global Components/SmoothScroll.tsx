// /components/SmoothScroll.tsx
"use client";

import { useEffect, useMemo, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

// This component isolates the client-side smooth scroll logic.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const lenisConfig = useMemo(() => ({
    lerp: 0.1,
    smooth: true,
    wheelMultiplier: 1.3,
  }), []);

  useEffect(() => {
    const initLenis = () => {
      const lenis = new Lenis(lenisConfig);

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenisRef.current = lenis;
      // Optional: scroll to top on new page load
      lenis.scrollTo(0, { immediate: true });
    };

    // Delay initialization slightly if needed
    const timeoutId = setTimeout(initLenis, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, [lenisConfig]);

  return <>{children}</>;
}
