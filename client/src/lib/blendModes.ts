/**
 * Reverse alpha blending to remove watermark
 */

const ALPHA_THRESHOLD = 0.002;  // Ignore noise
const MAX_ALPHA = 0.99;          // Avoid division by near-zero
const LOGO_VALUE = 255;          // White watermark

export interface WatermarkPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function removeWatermark(
    imageData: ImageData,
    alphaMap: Float32Array,
    position: WatermarkPosition
): void {
    const { x, y, width, height } = position;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            // Image index (RGBA, 4 bytes per pixel)
            const imgIdx = ((y + row) * imageData.width + (x + col)) * 4;

            // Alpha map index
            const alphaIdx = row * width + col;

            let alpha = alphaMap[alphaIdx];

            // Skip noise
            if (alpha < ALPHA_THRESHOLD) continue;

            // Limit alpha to avoid division issues
            alpha = Math.min(alpha, MAX_ALPHA);
            const oneMinusAlpha = 1.0 - alpha;

            // Apply reverse alpha blending to RGB channels
            for (let c = 0; c < 3; c++) {
                const watermarked = imageData.data[imgIdx + c];

                // Reverse: original = (watermarked - α × logo) / (1 - α)
                const original = (watermarked - alpha * LOGO_VALUE) / oneMinusAlpha;

                // Clip to [0, 255]
                imageData.data[imgIdx + c] = Math.max(0, Math.min(255, Math.round(original)));
            }
        }
    }
}
