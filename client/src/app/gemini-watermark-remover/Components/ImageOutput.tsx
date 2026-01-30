"use client";

import React from "react";
import { Download, RefreshCw } from "lucide-react";

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

interface ImageOutputProps {
  images: ImageItem[];
  onPreview: (item: ImageItem) => void;
  onDownload: (item: ImageItem) => void;
  onDownloadAll: () => void;
  onReset: () => void;
}

export function ImageOutput({
  images,
  onPreview,
  onDownload,
  onDownloadAll,
  onReset,
}: ImageOutputProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const completedCount = images.filter((img) => img.status === "completed").length;
  const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

  return (
    <div className="space-y-0 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4 sm:p-6 rounded-t-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-lg sm:text-2xl font-semibold text-blue-400 mb-2">
              Watermark removal completed!
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              <span className="font-semibold">{completedCount} images processed</span>
              <span className="hidden sm:inline"> | {formatFileSize(totalSize)} TOTAL</span>
            </p>
            <p className="text-sm sm:hidden text-white/90 mt-1">
              {formatFileSize(totalSize)} TOTAL
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {/* Reset button */}
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-gray-100 transition-colors flex-1 sm:flex-none"
            >
              <RefreshCw className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
              <span className="sm:hidden">Reset</span>
            </button>

            {/* Download all button */}
            {completedCount > 0 && (
              <button
                type="button"
                onClick={onDownloadAll}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition-colors cursor-pointer flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Download all images</span>
                <span className="sm:hidden">Download All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Images List */}
      <div className="border border-gray-200 rounded-b-lg border-t-0">
        <div className="p-0">
          <div className="divide-y divide-gray-200">
            {images.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors gap-3 sm:gap-0"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 w-full">
                  {/* Thumbnail */}
                  <div
                    className="w-14 h-14 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer border border-gray-200 hover:border-blue-400 transition-colors"
                    onClick={() =>
                      item.status === "completed" && onPreview(item)
                    }
                  >
                    <img
                      src={item.processedUrl || item.originalUrl || ""}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base text-gray-900 mb-1 truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Badge replacement */}
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-blue-700">
                        {item.file.type.split("/")[1]}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {formatFileSize(item.file.size)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Status & Download */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto pl-[3.75rem] sm:pl-0">
                  {/* Status */}
                  <div className="flex-1 sm:flex-none">
                    {item.status === "completed" && (
                      <div className="text-xs sm:text-sm font-medium text-green-600">
                        Complete
                      </div>
                    )}

                    {item.status === "processing" && (
                      <div className="text-xs sm:text-sm font-medium text-orange-600">
                        Processing...
                      </div>
                    )}

                    {item.status === "pending" && (
                      <div className="text-xs sm:text-sm font-medium text-gray-500">
                        Pending
                      </div>
                    )}

                    {item.status === "error" && (
                      <div className="text-xs sm:text-sm font-medium text-red-600">
                        Failed
                      </div>
                    )}
                  </div>

                  {/* Download Button */}
                  {item.status === "completed" && (
                    <button
                      type="button"
                      onClick={() => onDownload(item)}
                      className="inline-flex items-center justify-center rounded-md border-2 border-blue-500 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Download className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">
                        {item.file.type.split("/")[1].toUpperCase()}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
