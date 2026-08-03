// English – source of truth for all translations
export const en: Record<string, string> = {
  // --- page.tsx: Hero ---
  "hero.title": "Gemini Watermark Remover",
  "hero.subtitle": "Remove watermarks from Google Gemini AI images instantly. 100% client-side processing.",

  // --- page.tsx: Loading ---
  "loading.title": "Initializing Engine",
  "loading.subtitle": "Loading watermark removal algorithms",

  // --- page.tsx: Steps section ---
  "steps.heading": "How The <blue>Watermark Remover</blue> Works?",
  "steps.subheading": "Removing Gemini watermarks is seamless. Just four simple steps with zero technical knowledge needed.",
  "step.1.title": "Upload",
  "step.1.desc": "Drag & drop or select your Gemini generated images.",
  "step.2.title": "Detect",
  "step.2.desc": "Our AI engine automatically identifies the hidden watermark.",
  "step.3.title": "Process",
  "step.3.desc": "The watermark is cleanly removed directly in your browser.",
  "step.4.title": "Download",
  "step.4.desc": "Save your pristine, unwatermarked image instantly.",

  // --- page.tsx: Features grid ---
  "feature.clientSide.title": "100% Client-Side",
  "feature.clientSide.desc": "Your images never leave your device. Complete privacy and maximum security.",
  "feature.quality.title": "Maintains Quality",
  "feature.quality.desc": "Removes watermarks cleanly without compressing or ruining original image quality.",
  "feature.fast.title": "Lightning Fast",
  "feature.fast.desc": "Powered by WebGL to process complex algorithms in milliseconds.",
  "feature.batch.title": "Batch Processing",
  "feature.batch.desc": "Upload and clean dozens of images simultaneously without slowing down.",
  "feature.noReg.title": "No Registration",
  "feature.noReg.desc": "Start removing watermarks immediately. No account creation or login required.",
  "feature.free.title": "Free & Unlimited",
  "feature.free.desc": "No hidden paywalls, subscriptions, or credit systems. Totally free to use.",

  // --- page.tsx: Preview modal ---
  "preview.showComparison": "Show Side-by-Side Comparison",
  "preview.hideComparison": "Hide Comparison",
  "preview.original": "Original",
  "preview.cleaned": "Cleaned",
  "preview.close": "Close",
  "preview.download": "Download Image",

  // --- UploadDropbox.tsx ---
  "upload.dropToStart": "Drop to start upload",
  "upload.dragAndDrop": "Drag & Drop images",
  "upload.releaseFiles": "Release your files now",
  "upload.clickToBrowse": "or click to browse from your device",
  "upload.formats": "JPG • PNG • WebP • Max 20MB",

  // --- ImageOutput.tsx ---
  "output.completed": "Watermark removal completed",
  "output.imagesProcessed": "images processed",
  "output.totalPayload": "total payload",
  "output.reset": "Reset",
  "output.downloadAll": "Download all images",
  "output.processed": "Processed",
  "output.processing": "Processing",
  "output.download": "Download",
  "output.filename": "Filename",

  // --- Faq.tsx ---
  "faq.heading": "FAQs About <blue>Gemini Watermark Removal</blue>",
  "faq.subheading": "Everything you need to know about removing watermarks from Gemini AI images, including privacy, quality, speed, and supported formats.",
  "faq.q1": "What is Gemini Watermark Remover and how does it work?",
  "faq.a1": "Gemini Watermark Remover is a free online AI watermark removal tool that automatically detects and removes watermarks from Google Gemini AI-generated images. Our advanced AI watermark remover uses intelligent algorithms to scan your image, locate the Gemini watermark (typically 48×48px or 96×96px), and seamlessly erase it while preserving original image quality. The entire watermark removal process happens client-side in your browser, ensuring complete privacy and instant results.",
  "faq.q2": "Is this AI watermark remover really free to use?",
  "faq.a2": "Yes! Our Gemini watermark remover is 100% free with no hidden costs, subscriptions, or usage limits. You can remove watermarks from unlimited Gemini AI images without paying anything. We support batch processing for multiple images, all formats (JPG, PNG, WebP), and provide high-quality downloads at no charge. Unlike other watermark removal tools that require paid plans, we believe in accessible AI watermark removal for everyone.",
  "faq.q3": "Will removing watermarks affect my image quality?",
  "faq.a3": "No! Our AI watermark remover is specifically engineered to preserve 100% of your original image quality. The watermark removal process targets only the Gemini watermark pixels without touching the surrounding image data. You'll receive the exact same resolution, colors, and clarity as your original Gemini-generated image, just without the watermark. No compression, no artifacts, no quality degradation.",
  "faq.q4": "What types of Gemini watermarks can be removed?",
  "faq.a4": "Our watermark remover supports all standard Google Gemini watermarks including the 48×48 pixel watermarks (typically in bottom-right corner), 96×96 pixel watermarks for larger images, and semi-transparent Gemini logos. The AI watermark removal tool automatically detects watermark size and position, adapting the removal algorithm for perfect results regardless of image dimensions or watermark placement.",
  "faq.q5": "Is my data safe when using this watermark removal tool?",
  "faq.a5": "Absolutely! All watermark removal processing happens entirely in your browser using client-side JavaScript. Your Gemini images never leave your device or get uploaded to any server. We don't store, collect, or have access to your images. This makes our AI watermark remover the most privacy-focused solution available. Your images remain 100% private and secure throughout the entire watermark removal process.",
  "faq.q6": "How long does it take to remove Gemini watermarks?",
  "faq.a6": "Watermark removal is nearly instant! Most Gemini images are processed in 2-5 seconds depending on image size and your device performance. The AI watermark remover works directly in your browser without server delays or upload times. Batch processing multiple images takes only a few seconds per image. It's the fastest watermark removal solution available, with no waiting, no queues, and no processing delays.",
  "faq.q7": "Can I remove watermarks from multiple images at once?",
  "faq.a7": "Yes! Our Gemini watermark remover supports batch watermark removal. Simply upload multiple Gemini AI images simultaneously and the tool will process them all automatically. You can then download individual images or use the 'Download All' feature to get a ZIP file containing all your watermark-free images. Perfect for content creators, designers, and marketers processing large volumes of AI-generated images.",
  "faq.q8": "What image formats are supported for watermark removal?",
  "faq.a8": "Our AI watermark remover supports all common image formats including JPG/JPEG, PNG, and WebP files up to 20MB each. After watermark removal, images are provided in high-quality PNG format to ensure maximum quality preservation. The tool automatically handles format conversion during the removal process, so you always get the best possible output regardless of your input format.",

  // --- Filler.tsx (HowItWorksSection) ---
  "filler.heading": "How to remove <blue>AI watermarks</blue> from Ai Generated images?",
  "filler.subheading": "Using our <blue>AI Watermark Remover</blue>, you can remove watermarks from Gemini photos online in 2 easy steps:",
  "filler.step1.title": "1. Upload Gemini AI images with watermarks",
  "filler.step1.desc": "Drag & drop your Gemini-generated image into the upload area or click to select files from your device. Our AI watermark remover supports JPG, PNG, and WebP formats.",
  "filler.step2.title": "2. Automatic AI watermark detection & removal",
  "filler.step2.desc": "Our advanced AI watermark remover instantly detects Gemini watermarks and removes them using intelligent algorithms. The watermark removal process takes just seconds with zero quality loss.",
  "filler.step3.title": "3. Smart processing for perfect results",
  "filler.step3.desc": "The Gemini watermark remover uses machine learning to ensure clean, artifact-free results. Our AI watermark removal technology preserves image quality while completely erasing watermarks.",
  "filler.step4.title": "4. Download your watermark-free image",
  "filler.step4.desc": "Get your cleaned image in high-definition quality, completely free. Download individual images or batch process multiple Gemini AI images for watermark removal.",

  // --- FullPack.tsx (FeaturesSection) ---
  "fullpack.heading": "Complete <blue>Google Gemini watermark removal</blue> toolkit",
  "fullpack.subheading": "Pixel-accurate restoration · bulk automation · 100% local processing · clean outputs with no registration required.",
  "fullpack.f1.title": "Reverse alpha blending, not AI inpainting",
  "fullpack.f1.desc": "A calibrated alpha map reconstructs the pixels under the logo. On supported outputs, the covered area is restored pixel-for-pixel — no soft edges, no model repaint.",
  "fullpack.f2.title": "Covers Gemini logo, star overlay, Nano Banana",
  "fullpack.f2.desc": "Detects the standard Gemini logo, the star overlay variant, and Nano Banana image outputs that share the same overlay pattern. Other watermark sources are out of scope.",
  "fullpack.f3.title": "Bulk parallel processing",
  "fullpack.f3.desc": "Drop multiple Gemini photos at once, process in parallel in-browser, then download individually or as a single ZIP.",
  "fullpack.f4.title": "100% browser-local — zero uploads",
  "fullpack.f4.desc": "All computation stays in your browser. Images never leave your device, no server involved.",
  "fullpack.f5.title": "JPG, PNG, WebP in supported Gemini output sizes",
  "fullpack.f5.desc": "Accepts JPG, PNG, and WebP from supported Gemini outputs. Exports lossless PNG.",
  "fullpack.f6.title": "Drag-and-drop simplicity",
  "fullpack.f6.desc": "No complex configurations or setups. Drag your images directly into the dropzone to start processing instantly.",
  "fullpack.f7.title": "Preserves original quality",
  "fullpack.f7.desc": "Retains original image dimensions, structure, and color profiles. Outputs are processed without adding compression artifacts.",
  "fullpack.f8.title": "Cross-platform",
  "fullpack.f8.desc": "Verified on Chrome, Firefox, Safari, and Edge, including mobile. Fully responsive across desktop, tablet, and mobile browsers.",
  "fullpack.f9.title": "Free and no sign-up needed",
  "fullpack.f9.desc": "Get complete access to all features immediately. No credit cards, subscriptions, or account creation required.",

  // --- ImageComparison.tsx ---
  "comparison.heading": "See It In Action",
  "comparison.subheading": "Most tools simply blur or patch over watermarks. We restore the actual, clean pixels hidden underneath. Gemini Watermark Remover ensures your images look sharp, untouched, and professional.",

  // --- GeminiFeatures.tsx ---
  "geminiFeat.privacy": "Runs in your browser — no upload",
  "geminiFeat.speed": "~1s per 1MP image on a laptop",
  "geminiFeat.quality": "Pixel-exact on supported Gemini outputs",
};
