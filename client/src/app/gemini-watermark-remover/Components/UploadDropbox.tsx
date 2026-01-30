
"use client"

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UploadDropboxProps {
    onFilesSelected: (files: File[]) => void;
    onUploadClick: () => void;
}

export function UploadDropbox({ onFilesSelected, onUploadClick }: UploadDropboxProps) {
    const [dragOver, setDragOver] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

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
            onFilesSelected(Array.from(e.dataTransfer.files));
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div
                onClick={onUploadClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-3xl p-4 text-center cursor-pointer 
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${dragOver 
                        ? 'border-blue-500 bg-blue-50/50 scale-[1.01] shadow-2xl' 
                        : 'border-slate-200 bg-gradient-to-b from-white to-slate-50/50 hover:border-blue-300 hover:shadow-xl'
                    }
                `}
            >
                <div className="flex flex-col items-center justify-center -space-y-2 pointer-events-none">
                    {/* Custom Image - Increased size, pulling it closer to text with negative space */}
                    <div className={`
                        relative transition-all duration-500 ease-out z-10
                        ${dragOver ? 'scale-105' : 'hover:scale-[1.02]'}
                    `}>
                        <img
                            src="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769762606/Gemini_Generated_Image_po28s2po28s2po28-removebg-preview_xtkrf0.png"
                            alt="Upload illustration"
                            className="object-contain drop-shadow-2xl"
                            style={{ width: '400px', height: '380px' }}
                            draggable={false}
                        />
                        
                        {/* Upload Icon Overlay on Drag */}
                        {dragOver && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-blue-600/90 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                                    <Upload className="w-10 h-10 text-white animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Text Content - Positioned slightly higher to overlap image margin */}
                    <div className="space-y-1 pb-6 relative z-20">
                        <p className="text-2xl font-semibold tracking-tight text-slate-800">
                            {dragOver ? (
                                <span className="text-blue-600">Drop to start upload</span>
                            ) : (
                                'Drag & Drop images'
                            )}
                        </p>
                        <p className="text-sm text-slate-500 font-medium">
                            {dragOver ? 'Release your files now' : 'or click to browse from your device'}
                        </p>
                        {!dragOver && (
                             <div className="pt-2 opacity-60 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                JPG • PNG • WebP • Max 20MB
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative Elements - Subtle Glass Effect */}
                <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-slate-200 rounded-tl-2xl pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-slate-200 rounded-br-2xl pointer-events-none"></div>
            </div>
        </div>
    );
}
