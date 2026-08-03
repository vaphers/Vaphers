"use client"

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from './LanguageContext';

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}

interface UploadDropboxProps {
    onFilesSelected: (files: File[]) => void;
    onUploadClick: () => void;
}

export function UploadDropbox({ onFilesSelected, onUploadClick }: UploadDropboxProps) {
    const [dragOver, setDragOver] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const { t } = useLanguage();

    // GA4 event helper
    const trackEvent = (eventName: string, data?: Record<string, any>) => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", eventName, {
                event_category: "watermark_tool",
                ...data
            });
        }
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => prev + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragOver(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(prev => {
            const newCount = prev - 1;
            if (newCount === 0) {
                setDragOver(false);
            }
            return newCount;
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        setDragCounter(0);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // GA4 event → user uploaded image via drag/drop
            trackEvent("image_upload", {
                upload_method: "drag_drop",
                file_count: e.dataTransfer.files.length
            });

            onFilesSelected(Array.from(e.dataTransfer.files));
        }
    };

    const handleUploadClick = () => {
        // GA4 event → user clicked upload box
        trackEvent("upload_click", {
            upload_method: "click"
        });

        onUploadClick();
    };

    return (
        /* 'isolate' establishes a controlled stacking context.
           'px-8 md:px-20' provides padding to accommodate the wider background fan stack. */
        <div className="relative w-full max-w-6xl mx-auto px-8 md:px-20 py-16 isolate">
            
            {/* === BACKGROUND CARD STACK === */}

            {/* 1. Far Left Card (Deepest in stack, highly rotated) */}
            <div className="hidden lg:block absolute top-55 -left-12 w-56 h-56 lg:w-72 lg:h-72 -rotate-[22deg] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-lg z-0 pointer-events-none opacity-80">
                <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80" 
                    alt="Pastel abstract fluid" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 2. Mid Left Card (Slightly larger, overlaps Far Left) */}
            <div className="hidden md:block absolute top-90 -left-2 lg:-left-17 w-60 h-60 lg:w-76 lg:h-76 -rotate-[10deg] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl z-10 pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&q=80" 
                    alt="Pink and blue fluid art" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 3. Center-Top Peeking Card (Subtly peeking from the top center/right) */}
            <div className="hidden xl:block absolute top-110 left-1/6 w-56 h-56 rotate-6 rounded-[2rem] overflow-hidden border-8 border-white shadow-lg z-10 pointer-events-none opacity-90">
                <img 
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=500&q=80" 
                    alt="Colorful marbled texture" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 3. Center-Top Peeking Card (Subtly peeking from the top center/right) */}
            <div className="hidden xl:block absolute -top-5 right-1/6 w-66 h-66 rotate-8 rounded-[2rem] overflow-hidden border-8 border-white shadow-lg z-0 pointer-events-none opacity-90">
                <img 
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=500&q=80" 
                    alt="Colorful marbled texture" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 4. Mid Right Card (Slightly larger, overlaps Far Right) */}
            <div className="hidden md:block absolute top-30 -right-2 lg:-right-6 w-60 h-60 lg:w-76 lg:h-76 rotate-[10deg] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl z-10 pointer-events-none">
                <img 
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=500&q=80" 
                    alt="Dark smoke fluid art" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 5. Far Right Card (Deepest in stack on right, highly rotated) */}
            <div className="hidden lg:block absolute -top-6 -right-12 w-56 h-56 lg:w-72 lg:h-72 rotate-[22deg] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-lg z-0 pointer-events-none opacity-80">
                <img 
                    src="https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=500&q=80" 
                    alt="Red/purple gradient fluid" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* === MAIN INTERACTIVE DROPBOX === */}
            <div
                onClick={handleUploadClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    relative z-20 border-2 border-dashed rounded-3xl p-4 text-center cursor-pointer 
                    transition-all duration-500 ease-in-out overflow-hidden backdrop-blur-sm
                    ${dragOver 
                        ? 'border-blue-500 bg-blue-50/50 scale-[1.01] shadow-2xl' 
                        : 'border-slate-200 bg-gradient-to-b from-white/95 to-slate-50/90 hover:border-blue-300 hover:shadow-xl'
                    }
                `}
            >
                <div className="flex flex-col items-center justify-center -space-y-2 pointer-events-none">
                    
                    <div className={`
                        relative transition-all duration-500 ease-out z-10
                        ${dragOver ? 'scale-105' : 'hover:scale-[1.02]'}
                    `}>
                        <img
                            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/f_auto,q_auto/v1769762606/Gemini_Generated_Image_po28s2po28s2po28-removebg-preview_xtkrf0.png"
                            alt="Upload illustration"
                            className="object-contain drop-shadow-2xl"
                            style={{ width: '400px', height: '380px' }}
                            draggable={false}
                        />
                        
                        {dragOver && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-blue-600/90 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                                    <Upload className="w-10 h-10 text-white animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1 pb-6 relative z-20">
                        <p className="text-2xl font-semibold tracking-tight text-slate-800">
                            {dragOver ? (
                                <span className="text-blue-600">{t("upload.dropToStart")}</span>
                            ) : (
                                t("upload.dragAndDrop")
                            )}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                            {dragOver ? t("upload.releaseFiles") : t("upload.clickToBrowse")}
                        </p>
                        {!dragOver && (
                             <div className="pt-2 opacity-60 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                {t("upload.formats")}
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-slate-200 rounded-tl-2xl pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-slate-200 rounded-br-2xl pointer-events-none"></div>
            </div>
        </div>
    );
}