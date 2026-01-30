"use client";

import React, { useState, useEffect, useRef } from "react";
import { WatermarkEngine } from "../../lib/watermarkEngine";
import { X, Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";
import { UploadDropbox } from "./Components/UploadDropbox";
import { ImageOutput } from "./Components/ImageOutput";
import { BeforeAfterComparison } from "./Components/Slider";
import { HowItWorksSection } from "./Components/Filler";
import GeminiSeoFaq from "./Components/Faq";

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

export default function GeminiWatermarkRemover() {
  const [engine, setEngine] = useState<WatermarkEngine | null>(null);
  const [imageQueue, setImageQueue] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const [previewItem, setPreviewItem] = useState<ImageItem | null>(null);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Add new files to existing queue instead of replacing
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
    let completed = 0;

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

            completed++;
            setProcessedCount((prev) => prev + 1);
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

  const downloadImage = (item: ImageItem) => {
    if (!item.processedUrl) return;
    const a = document.createElement("a");
    a.href = item.processedUrl;
    a.download = `unwatermarked_${item.name.replace(/\.[^.]+$/, "")}.png`;
    a.click();
  };

  const downloadAll = async () => {
    const completed = imageQueue.filter((item) => item.status === "completed");
    if (completed.length === 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    for (const item of completed) {
      if (item.processedUrl) {
        const response = await fetch(item.processedUrl);
        const blob = await response.blob();
        const filename = `unwatermarked_${item.name.replace(/\.[^.]+$/, "")}.png`;
        zip.file(filename, blob);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = `unwatermarked_${Date.now()}.zip`;
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
            <p className="text-lg font-medium text-gray-900">Initializing Engine</p>
            <p className="text-sm text-gray-500">Loading watermark removal algorithms</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden file input */}
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-blue-600 mb-2 bungee-inline-regular">
              Gemini Watermark Remover
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Remove watermarks from Google Gemini AI images instantly. 100% client-side processing.
            </p>
          </div>

          {/* Upload Dropbox - Always visible */}
          <div className="mb-6">
            <UploadDropbox
              onFilesSelected={handleFiles}
              onUploadClick={handleUploadClick}
            />
          </div>

          {/* Image Output - Show when images uploaded */}
          {imageQueue.length > 0 && (
            <ImageOutput
              images={imageQueue}
              onPreview={setPreviewItem}
              onDownload={downloadImage}
              onDownloadAll={downloadAll}
              onReset={resetQueue}
            />
          )}

          {/* Vertical Image Comparison - Demo Section */}
          <div className="mt-16 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-700 mb-2 bungee-inline-regular">
                See It In Action
              </h2>
              <p className="text-gray-600">
                We remove gemini watermarks while preserving image quality
              </p>
            </div>

            <div className="w-full mx-auto">
              <BeforeAfterComparison
                beforeImage="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769765120/Gemini_Generated_Image_jfxraijfxraijfxr_hq4gw1.png"
                afterImage="https://res.cloudinary.com/dbwrnwa3l/image/upload/v1769765118/unwatermarked_Gemini_Generated_Image_jfxraijfxraijfxr_l86eai.png"
              />
            </div>
          </div>
        </div>

        <HowItWorksSection />
        <GeminiSeoFaq />
      </div>

      {/* Preview Dialog - replaced with portal-like overlay */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl max-h-[90vh] w-full max-w-7xl overflow-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
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
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  {showBeforeAfter ? "Hide Comparison" : "Show Before/After"}
                </button>
              </div>

              {showBeforeAfter ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3 text-center">
                      Before
                    </p>
                    <img
                      src={previewItem.originalUrl || ""}
                      alt="Before"
                      className="w-full rounded-xl border border-gray-200 shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3 text-center">
                      After
                    </p>
                    <img
                      src={previewItem.processedUrl || ""}
                      alt="After"
                      className="w-full rounded-xl border border-gray-200 shadow-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <img
                    src={previewItem.processedUrl || ""}
                    alt="Processed"
                    className="max-w-full max-h-[60vh] rounded-xl border border-gray-200 shadow-sm object-contain"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => previewItem && downloadImage(previewItem)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
