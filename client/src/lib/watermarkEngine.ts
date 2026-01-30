import { calculateAlphaMap } from './alphaMap';
import { removeWatermark, WatermarkPosition } from './blendModes';

interface WatermarkConfig {
    logoSize: number;
    marginRight: number;
    marginBottom: number;
}

export function detectWatermarkConfig(imageWidth: number, imageHeight: number): WatermarkConfig {
    // Gemini uses 96×96 for images > 1024 in both dimensions, else 48×48
    if (imageWidth > 1024 && imageHeight > 1024) {
        return {
            logoSize: 96,
            marginRight: 64,
            marginBottom: 64
        };
    }
    return {
        logoSize: 48,
        marginRight: 32,
        marginBottom: 32
    };
}

export function calculateWatermarkPosition(
    imageWidth: number,
    imageHeight: number,
    config: WatermarkConfig
): WatermarkPosition {
    const { logoSize, marginRight, marginBottom } = config;

    return {
        x: imageWidth - marginRight - logoSize,
        y: imageHeight - marginBottom - logoSize,
        width: logoSize,
        height: logoSize
    };
}

export class WatermarkEngine {
    private bgCaptures: { bg48: HTMLImageElement; bg96: HTMLImageElement };
    private alphaMaps: { [key: number]: Float32Array } = {};

    constructor(bgCaptures: { bg48: HTMLImageElement; bg96: HTMLImageElement }) {
        this.bgCaptures = bgCaptures;
    }

    static async create(bg48Path: string, bg96Path: string): Promise<WatermarkEngine> {
        const bg48 = await this.loadImage(bg48Path);
        const bg96 = await this.loadImage(bg96Path);

        return new WatermarkEngine({ bg48, bg96 });
    }

    private static loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async getAlphaMap(size: number): Promise<Float32Array> {
        // Return cached if available
        if (this.alphaMaps[size]) {
            return this.alphaMaps[size];
        }

        const bgImage = size === 48 ? this.bgCaptures.bg48 : this.bgCaptures.bg96;

        // Create temporary canvas to extract ImageData
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot get canvas context');

        ctx.drawImage(bgImage, 0, 0);
        const imageData = ctx.getImageData(0, 0, size, size);

        // Calculate and cache alpha map
        const alphaMap = calculateAlphaMap(imageData);
        this.alphaMaps[size] = alphaMap;

        return alphaMap;
    }

    async removeWatermarkFromImage(image: HTMLImageElement): Promise<HTMLCanvasElement> {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Cannot get canvas context');

        // Draw original image
        ctx.drawImage(image, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Detect watermark configuration
        const config = detectWatermarkConfig(canvas.width, canvas.height);
        const position = calculateWatermarkPosition(canvas.width, canvas.height, config);

        // Get alpha map
        const alphaMap = await this.getAlphaMap(config.logoSize);

        // Remove watermark
        removeWatermark(imageData, alphaMap, position);

        // Write back to canvas
        ctx.putImageData(imageData, 0, 0);

        return canvas;
    }

    getWatermarkInfo(imageWidth: number, imageHeight: number) {
        const config = detectWatermarkConfig(imageWidth, imageHeight);
        const position = calculateWatermarkPosition(imageWidth, imageHeight, config);

        return {
            size: config.logoSize,
            position,
            config
        };
    }
}
