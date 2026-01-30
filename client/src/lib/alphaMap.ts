/**
 * Calculate alpha map from background captured image
 */
export function calculateAlphaMap(bgCaptureImageData: ImageData): Float32Array {
    const { width, height, data } = bgCaptureImageData;
    const alphaMap = new Float32Array(width * height);

    // For each pixel, take the maximum value of RGB channels and normalize to [0, 1]
    for (let i = 0; i < alphaMap.length; i++) {
        const idx = i * 4; // RGBA format
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        // Take max channel as brightness value
        const maxChannel = Math.max(r, g, b);

        // Normalize to [0, 1]
        alphaMap[i] = maxChannel / 255.0;
    }

    return alphaMap;
}
