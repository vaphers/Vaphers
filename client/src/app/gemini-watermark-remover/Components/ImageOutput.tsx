// "use client";

// import React, { useState, useEffect } from "react";
// import { Download, RefreshCw, FileImage, Edit3 } from "lucide-react";

// declare global {
//   interface Window {
//     gtag: (...args: any[]) => void;
//   }
// }

// interface ImageItem {
//   id: number;
//   file: File;
//   name: string;
//   status: "pending" | "processing" | "completed" | "error";
//   originalUrl: string | null;
//   processedUrl: string | null;
//   originalImg: HTMLImageElement | null;
//   watermarkInfo?: {
//     size: number;
//     position: { x: number; y: number; width: number; height: number };
//   };
// }

// interface ImageOutputProps {
//   images: ImageItem[];
//   onPreview: (item: ImageItem) => void;
//   onDownload: (item: ImageItem) => void;
//   onDownloadAll: () => void;
//   onReset: () => void;
// }

// export function ImageOutput({
//   images,
//   onPreview,
//   onDownload,
//   onDownloadAll,
//   onReset,
// }: ImageOutputProps) {
//   // Local state to keep track of edited filenames
//   const [localNames, setLocalNames] = useState<Record<number, string>>({});

//   // Sync component state when the incoming images array changes
//   useEffect(() => {
//     const namesMap: Record<number, string> = {};
//     images.forEach((img) => {
//       namesMap[img.id] = localNames[img.id] || img.name;
//     });
//     setLocalNames(namesMap);
//   }, [images]);

//   const trackEvent = (eventName: string, data?: Record<string, any>) => {
//     if (typeof window !== "undefined" && window.gtag) {
//       window.gtag("event", eventName, {
//         event_category: "watermark_tool",
//         ...data
//       });
//     }
//   };

//   const handleNameChange = (id: number, newName: string) => {
//     setLocalNames((prev) => ({
//       ...prev,
//       [id]: newName,
//     }));
//   };

//   const handleDownload = (item: ImageItem) => {
//     const customName = localNames[item.id] || item.name;
    
//     trackEvent("image_download", {
//       file_type: item.file.type,
//       file_size: item.file.size
//     });

//     // Pass the item with the updated custom name back to the download handler
//     onDownload({
//       ...item,
//       name: customName,
//     });
//   };

//   const handleDownloadAll = () => {
//     trackEvent("download_all_images", {
//       image_count: images.length
//     });

//     onDownloadAll();
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes < 1024) return bytes + " B";
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
//     return (bytes / (1024 * 1024)).toFixed(1) + " MB";
//   };

//   const completedCount = images.filter((img) => img.status === "completed").length;
//   const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

//   return (
//     <div className="space-y-0 max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm  lg:mt-20">
      
//       {/* Header Section */}
//       <div className="bg-slate-550 border-b border-slate-200 bg-slate-50/75 p-5 sm:p-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
//                 Watermark removal completed
//               </h2>
//             </div>
//             <p className="text-xs sm:text-sm text-slate-500 font-medium">
//               <span>{completedCount} images processed</span>
//               <span className="mx-2 text-slate-300">|</span>
//               <span>{formatFileSize(totalSize)} total payload</span>
//             </p>
//           </div>

//           <div className="flex gap-2.5 w-full sm:w-auto">
//             <button
//               type="button"
//               onClick={onReset}
//               className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors flex-1 sm:flex-none"
//             >
//               <RefreshCw className="w-4 h-4 mr-2 text-slate-500" />
//               Reset
//             </button>

//             {completedCount > 0 && (
//               <button
//                 type="button"
//                 onClick={handleDownloadAll}
//                 className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer flex-1 sm:flex-none"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download all images
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Images List */}
//       <div className="divide-y divide-slate-100">
//         {images.map((item) => (
//           <div
//             key={item.id}
//             className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 transition-colors gap-4"
//           >
//             {/* Thumbnail and Info Section */}
//             <div className="flex items-center gap-4 flex-1 min-w-0">
//               {/* Image Preview Thumbnail */}
//               <div
//                 className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer border border-slate-200 hover:border-blue-500 transition-colors relative group"
//                 onClick={() => item.status === "completed" && onPreview(item)}
//               >
//                 <img
//                   src={item.processedUrl || item.originalUrl || ""}
//                   alt={item.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                 />
//               </div>

//               {/* Editable Name & Meta details */}
//               <div className="flex-1 min-w-0 space-y-1.5">
//                 <div className="flex items-center gap-2 max-w-full">
//                   <div className="relative flex items-center w-full max-w-md">
//                     <input
//                       type="text"
//                       value={localNames[item.id] ?? ""}
//                       onChange={(e) => handleNameChange(item.id, e.target.value)}
//                       className="w-full text-sm font-medium text-slate-800 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-2.5 py-1.5 outline-none transition-all"
//                       placeholder="Filename"
//                     />
//                     <Edit3 className="absolute right-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 flex-wrap text-xs">
//                   <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-600 uppercase tracking-wider text-[0.6rem]">
//                     {item.file.type.split("/")[1]}
//                   </span>
//                   <span className="text-slate-400 font-medium">
//                     {formatFileSize(item.file.size)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Status and Actions Section */}
//             <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-[4.5rem] sm:pl-0 border-t border-slate-100 pt-3 sm:pt-0 sm:border-t-0">
//               <div className="flex items-center gap-2">
//                 {item.status === "completed" ? (
//                   <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
//                     Processed
//                   </span>
//                 ) : (
//                   <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
//                     <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
//                     Processing
//                   </span>
//                 )}
//               </div>

//               {item.status === "completed" && (
//                 <button
//                   type="button"
//                   onClick={() => handleDownload(item)}
//                   className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs sm:text-sm font-semibold text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-colors"
//                 >
//                   <Download className="w-4 h-4 mr-1.5" />
//                   Download
//                 </button>
//               )}
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
























"use client";

import React, { useState, useEffect } from "react";
import { Download, RefreshCw, FileImage, Edit3 } from "lucide-react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

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
  // Updated to pass the updated list with renamed files
  onDownloadAll: (updatedImages: ImageItem[]) => void;
  onReset: () => void;
}

export function ImageOutput({
  images,
  onPreview,
  onDownload,
  onDownloadAll,
  onReset,
}: ImageOutputProps) {
  // Local state to keep track of edited filenames
  const [localNames, setLocalNames] = useState<Record<number, string>>({});

  // Sync component state when the incoming images array changes
  useEffect(() => {
    const namesMap: Record<number, string> = {};
    images.forEach((img) => {
      namesMap[img.id] = localNames[img.id] || img.name;
    });
    setLocalNames(namesMap);
  }, [images]);

  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "watermark_tool",
        ...data
      });
    }
  };

  const handleNameChange = (id: number, newName: string) => {
    setLocalNames((prev) => ({
      ...prev,
      [id]: newName,
    }));
  };

  const handleDownload = (item: ImageItem) => {
    const customName = localNames[item.id] || item.name;
    
    trackEvent("image_download", {
      file_type: item.file.type,
      file_size: item.file.size
    });

    onDownload({
      ...item,
      name: customName,
    });
  };

  const handleDownloadAll = () => {
    trackEvent("download_all_images", {
      image_count: images.length
    });

    // Map the current images to include their edited custom names
    const updatedImages = images.map((img) => ({
      ...img,
      name: localNames[img.id] || img.name,
    }));

    onDownloadAll(updatedImages);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const completedCount = images.filter((img) => img.status === "completed").length;
  const totalSize = images.reduce((acc, img) => acc + img.file.size, 0);

  return (
    <div className="space-y-0 max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm lg:mt-20">
      
      {/* Header Section */}
      <div className="bg-slate-550 border-b border-slate-200 bg-slate-50/75 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                Watermark removal completed
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              <span>{completedCount} images processed</span>
              <span className="mx-2 text-slate-300">|</span>
              <span>{formatFileSize(totalSize)} total payload</span>
            </p>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors flex-1 sm:flex-none"
            >
              <RefreshCw className="w-4 h-4 mr-2 text-slate-500" />
              Reset
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4 mr-2" />
                Download all images
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Images List */}
      <div className="divide-y divide-slate-100">
        {images.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 transition-colors gap-4"
          >
            {/* Thumbnail and Info Section */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div
                className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer border border-slate-200 hover:border-blue-500 transition-colors relative group"
                onClick={() => item.status === "completed" && onPreview(item)}
              >
                <img
                  src={item.processedUrl || item.originalUrl || ""}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Editable Name & Meta details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 max-w-full">
                  <div className="relative flex items-center w-full max-w-md">
                    <input
                      type="text"
                      value={localNames[item.id] ?? ""}
                      onChange={(e) => handleNameChange(item.id, e.target.value)}
                      className="w-full text-sm font-medium text-slate-800 bg-slate-50/50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-2.5 py-1.5 outline-none transition-all"
                      placeholder="Filename"
                    />
                    <Edit3 className="absolute right-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-600 uppercase tracking-wider text-[0.6rem]">
                    {item.file.type.split("/")[1]}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {formatFileSize(item.file.size)}
                  </span>
                </div>
              </div>
            </div>

            {/* Status and Actions Section */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-[4.5rem] sm:pl-0 border-t border-slate-100 pt-3 sm:pt-0 sm:border-t-0">
              <div className="flex items-center gap-2">
                {item.status === "completed" ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                    Processed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Processing
                  </span>
                )}
              </div>

              {item.status === "completed" && (
                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs sm:text-sm font-semibold text-blue-600 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Download
                </button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}