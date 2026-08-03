"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from './LanguageContext';

export default function GeminiComparisonSection() {
    const { t } = useLanguage();
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setContainerWidth(width);
                x.set(width / 2);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [x]);

    const clipPath = useTransform(x, (value) => {
        if (containerWidth === 0) return "inset(0 50% 0 0)";

        const clampedValue = Math.max(0, Math.min(value, containerWidth));
        const percentage = (clampedValue / containerWidth) * 100;

        return `inset(0 ${100 - percentage}% 0 0)`;
    });

    return (
        <section className="w-full py-10 px-4 md:px-8 bg-white font-sans overflow-hidden pb-20">
            <div className="w-full mx-auto flex flex-col items-center">

                {/* --- Header Section --- */}
                <div className="text-center  mb-12">
                    <h3 className="bungee-shade text-3xl md:text-3xl lg:text-5xl  text-gray-900 leading-tight tracking-tight">
                        {t("comparison.heading")}
                    </h3>
                    <p className="mt-6 text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        {t("comparison.subheading")}
                    </p>
                </div>

                {/* --- Image Slider Section (Expanded Width) --- */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-2xl bg-white select-none group"
                >
                    {/* Base Image (Right Side / Revenue Marketing) */}
                    <img
                        src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1769765120/Gemini_Generated_Image_jfxraijfxraijfxr_hq4gw1.png"
                        alt="Revenue Marketing Funnel"
                        className="absolute inset-0 w-full h-full object-contain md:object-cover pointer-events-none"
                        draggable="false"
                    />

                    {/* Overlay Image (Left Side / Generic Marketing) */}
                    <motion.div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ clipPath }}
                    >
                        <img
                            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1769765118/unwatermarked_Gemini_Generated_Image_jfxraijfxraijfxr_l86eai.png"
                            alt="Traditional Marketing Funnel"
                            className="absolute inset-0 w-full h-full object-contain md:object-cover"
                            draggable="false"
                        />
                    </motion.div>

                    {containerWidth > 0 && (
                        <motion.div
                            className="absolute top-0 bottom-0 z-10 flex items-center justify-center cursor-ew-resize"
                            style={{
                                x,
                                width: "3px",
                                backgroundColor: "#0f172a",
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: containerWidth }}
                            dragElastic={0}
                            dragMomentum={false}
                        >
                            <div className="absolute inset-y-0 w-24 bg-transparent -left-12" />

                            <div className="absolute top-[85%] md:top-auto w-10 h-10 md:w-12 md:h-12 bg-[#0f172a] rounded-md md:rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] border-[2px] md:border-[3px] border-white transition-transform group-hover:scale-105">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18-6-6 6-6" />
                                    <path d="m15 18 6-6-6-6" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}