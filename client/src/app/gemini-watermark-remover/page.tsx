"use client";

import React, { useState, useEffect, useRef } from "react";
import { WatermarkEngine } from "../../lib/watermarkEngine";
import { 
  X, Upload, Download, Loader2, Shield, Zap, Sparkles, 
  Layers, Unlock, Infinity, UploadCloud, ScanSearch, Wand2 
} from "lucide-react";
import { UploadDropbox } from "./Components/UploadDropbox";
import { ImageOutput } from "./Components/ImageOutput";
import { BeforeAfterComparison } from "./Components/Slider";
import { HowItWorksSection } from "./Components/Filler";
import GeminiSeoFaq from "./Components/Faq";
import FeaturesSection from "./Components/FullPack";
import GeminiComparisonSection from "./Components/ImageComparison";
import { useLanguage } from "./Components/LanguageContext";

interface ImageItem {
  id: number;
  file: File;
  name: string;
  status: "pending" | "processing" | "completed" | "error";
  originalUrl: string | null;
  processedUrl: string | null;
  originalImg: HTMLImageElement | null;
  watermarkInfo?: {
    size: number;
    position: { x: number; y: number; width: number; height: number };
  };
}

// --- ENHANCED DATA & COMPONENTS ---

const RevealSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards ${className}`}>
    {children}
  </div>
);

const StepCard = ({ title, description, icon, number, delay }: { title: string, description: string, icon: React.ReactNode, number: string, delay?: number }) => (
  <div className="relative flex flex-col items-center text-center z-10 group" style={{ animationDelay: `${delay}s` }}>
    <div className="relative mb-6">
      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center border-2 border-white shadow-md z-20 transition-transform group-hover:scale-110">
        {number}
      </div>
      
      <div className="w-20 h-20 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-xl shadow-blue-900/5 group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">{icon}</div>
      </div>
    </div>
    
    <h3 className="font-bold text-slate-800 mb-2 text-xl">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed max-w-[220px]">{description}</p>
  </div>
);

const FeatureCard = ({ title, description, icon, delay }: { title: string, description: string, icon: React.ReactNode, delay?: number }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 group" style={{ animationDelay: `${delay}s` }}>
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-100 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-slate-800 mb-2 text-lg">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </div>
);

// Helper to render strings with <blue>...</blue> markers
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

// --- MAIN COMPONENT ---
export default function GeminiWatermarkRemover() {
  const { t } = useLanguage();
  const [engine, setEngine] = useState<WatermarkEngine | null>(null);
  const [imageQueue, setImageQueue] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const [previewItem, setPreviewItem] = useState<ImageItem | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  const steps = [
    { title: t("step.1.title"), description: t("step.1.desc"), number: "1", icon: <UploadCloud className="w-8 h-8" /> },
    { title: t("step.2.title"), description: t("step.2.desc"), number: "2", icon: <ScanSearch className="w-8 h-8" /> },
    { title: t("step.3.title"), description: t("step.3.desc"), number: "3", icon: <Wand2 className="w-8 h-8" /> },
    { title: t("step.4.title"), description: t("step.4.desc"), number: "4", icon: <Download className="w-8 h-8" /> },
  ];

  const features = [
    { title: t("feature.clientSide.title"), description: t("feature.clientSide.desc"), icon: <Shield className="w-6 h-6 text-blue-600" /> },
    { title: t("feature.quality.title"), description: t("feature.quality.desc"), icon: <Sparkles className="w-6 h-6 text-blue-600" /> },
    { title: t("feature.fast.title"), description: t("feature.fast.desc"), icon: <Zap className="w-6 h-6 text-blue-600" /> },
    { title: t("feature.batch.title"), description: t("feature.batch.desc"), icon: <Layers className="w-6 h-6 text-blue-600" /> },
    { title: t("feature.noReg.title"), description: t("feature.noReg.desc"), icon: <Unlock className="w-6 h-6 text-blue-600" /> },
    { title: t("feature.free.title"), description: t("feature.free.desc"), icon: <Infinity className="w-6 h-6 text-blue-600" /> },
  ];

  // Initialize engine
  useEffect(() => {
    const initEngine = async () => {
      try {
        const engineInstance = await WatermarkEngine.create(
          "/bg_48.png",
          "/bg_96.png"
        );
        setEngine(engineInstance);
        setLoading(false);
      } catch (error) {
        console.error("Failed to initialize engine:", error);
        setLoading(false);
      }
    };

    initEngine();
  }, []);

  const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (!file.type.match("image/(jpeg|png|webp)")) return false;
      if (file.size > 20 * 1024 * 1024) return false;
      return true;
    });

    if (validFiles.length === 0) return;

    const newImages: ImageItem[] = validFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      status: "pending",
      originalUrl: null,
      processedUrl: null,
      originalImg: null,
    }));

    const updatedQueue = [...imageQueue, ...newImages];
    setImageQueue(updatedQueue);
    hasScrolledRef.current = false;

    processQueue(newImages);
  };

  const processQueue = async (queue: ImageItem[]) => {
    if (!engine) return;

    const loadedQueue = await Promise.all(
      queue.map(async (item) => {
        const img = await loadImageFromFile(item.file);
        return {
          ...item,
          originalImg: img,
          originalUrl: img.src,
          watermarkInfo: engine.getWatermarkInfo(img.width, img.height),
        };
      })
    );

    setImageQueue((prev) =>
      prev.map((item) => {
        const loaded = loadedQueue.find((l) => l.id === item.id);
        return loaded || item;
      })
    );

    const concurrency = 3;

    for (let i = 0; i < loadedQueue.length; i += concurrency) {
      const batch = loadedQueue.slice(i, i + concurrency);

      await Promise.all(
        batch.map(async (item) => {
          try {
            setImageQueue((prev) =>
              prev.map((img) =>
                img.id === item.id ? { ...img, status: "processing" as const } : img
              )
            );

            const result = await engine.removeWatermarkFromImage(item.originalImg!);
            const blob = await new Promise<Blob>((resolve) =>
              result.toBlob((b) => resolve(b!), "image/png")
            );

            const processedUrl = URL.createObjectURL(blob);

            setImageQueue((prev) =>
              prev.map((img) =>
                img.id === item.id
                  ? { ...img, status: "completed" as const, processedUrl }
                  : img
              )
            );

            setProcessedCount((prev) => prev + 1);

            // Scroll to the results panel the first time a result is ready
            if (!hasScrolledRef.current) {
              hasScrolledRef.current = true;
              setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 200);
            }
          } catch (error) {
            console.error("Processing failed:", error);
            setImageQueue((prev) =>
              prev.map((img) =>
                img.id === item.id ? { ...img, status: "error" as const } : img
              )
            );
          }
        })
      );
    }
  };

  // REMOVED "unwatermarked_" prefixing logic here
  const downloadImage = (item: ImageItem) => {
    if (!item.processedUrl) return;
    const a = document.createElement("a");
    a.href = item.processedUrl;
    
    // Uses the edited name directly and appends .png cleanly
    const cleanName = item.name.replace(/\.[^.]+$/, "");
    a.download = `${cleanName}.png`;
    a.click();
  };

  // UPDATED to accept edited names list from the child component
  const downloadAll = async (updatedImages?: ImageItem[]) => {
    const listToDownload = updatedImages || imageQueue;
    const completed = listToDownload.filter((item) => item.status === "completed");
    if (completed.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const item of completed) {
      if (item.processedUrl) {
        const response = await fetch(item.processedUrl);
        const blob = await response.blob();
        
        // Uses the custom edited name from the list
        const cleanName = item.name.replace(/\.[^.]+$/, "");
        const filename = `${cleanName}.png`;
        zip.file(filename, blob);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = `cleaned_images_${Date.now()}.zip`;
    a.click();
  };

  const resetQueue = () => {
    imageQueue.forEach((item) => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.processedUrl) URL.revokeObjectURL(item.processedUrl);
    });
    setImageQueue([]);
    setProcessedCount(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
          <div>
            <p className="text-lg font-medium text-gray-900">{t("loading.title")}</p>
            <p className="text-sm text-gray-500">{t("loading.subtitle")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        className="hidden"
      />

      <div className="min-h-screen bg-white py-8">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-18">
            <h1 className="text-4xl lg:text-6xl text-blue-600 mb-2 bungee-shade">
              {t("hero.title")}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="mb-6">
            <UploadDropbox
              onFilesSelected={handleFiles}
              onUploadClick={handleUploadClick}
            />
          </div>

          {imageQueue.length > 0 && (
            <div ref={resultsRef} id="watermark-results" className="scroll-mt-20">
              <ImageOutput
                images={imageQueue}
                onPreview={setPreviewItem}
                onDownload={downloadImage}
                onDownloadAll={downloadAll}
                onReset={resetQueue}
              />
            </div>
          )}

          {/* How It Works Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100 mt-12 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <RevealSection className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl text-slate-800 mb-4 bungee-shade">
                  <RichText text={t("steps.heading")} />
                </h2>
                <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                  {t("steps.subheading")}
                </p>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
                <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 rounded-sm border-t-2 border-dashed border-blue-200 z-0" />
                
                {steps.map((s, i) => (
                  <StepCard key={s.title} {...s} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </section>
          
          <FeaturesSection/>
          <GeminiComparisonSection/>

        </div>

        <HowItWorksSection />
        <GeminiSeoFaq />
      </div>

      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-h-[90vh] w-full max-w-5xl overflow-auto flex flex-col border border-slate-200">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {previewItem.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {previewItem.originalImg?.width}×{previewItem.originalImg?.height} •{" "}
                    {formatFileSize(previewItem.file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="text-gray-400 hover:text-red-500 bg-gray-50 p-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-4 bg-slate-50/50">
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="inline-flex items-center px-5 py-2.5 border border-blue-200 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm"
                >
                  {showBeforeAfter ? t("preview.hideComparison") : t("preview.showComparison")}
                </button>
              </div>

              {showBeforeAfter ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-t-xl text-center mb-2">
                      {t("preview.original")}
                    </div>
                    <img
                      src={previewItem.originalUrl || ""}
                      alt="Before"
                      className="w-full rounded-b-xl rounded-t-sm"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                    <div className="bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-t-xl text-center mb-2">
                      {t("preview.cleaned")}
                    </div>
                    <img
                      src={previewItem.processedUrl || ""}
                      alt="After"
                      className="w-full rounded-b-xl rounded-t-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <img
                    src={previewItem.processedUrl || ""}
                    alt="Processed"
                    className="max-w-full max-h-[50vh] rounded-xl object-contain"
                  />
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3 z-10">
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {t("preview.close")}
              </button>
              <button
                type="button"
                onClick={() => previewItem && downloadImage(previewItem)}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-4 h-4 mr-2" />
                {t("preview.download")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}