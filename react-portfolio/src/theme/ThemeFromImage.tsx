import React, { useEffect } from 'react';

type ThemeFromImageProps = {
  src: string;
};

type Rgb = { r: number; g: number; b: number };

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function rgbToHsv({ r, g, b }: Rgb): { h: number; s: number; v: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h, s, v };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): Rgb {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function adjustLuminance(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  const rn = clamp(Math.round(r + 255 * amount), 0, 255);
  const gn = clamp(Math.round(g + 255 * amount), 0, 255);
  const bn = clamp(Math.round(b + 255 * amount), 0, 255);
  return rgbToHex({ r: rn, g: gn, b: bn });
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function quantize(value: number, step: number): number {
  return Math.floor(value / step) * step;
}

function getPaletteFromImage(src: string): Promise<{ accent: string; accent2: string; bg1: string; bg2: string; bg3: string; shadow: string } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        resolve(null);
        return;
      }

      // Downscale for faster processing
      const width = 120;
      const height = Math.max(1, Math.round((img.height / img.width) * width));
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);

      const { data } = context.getImageData(0, 0, width, height);
      const counts: Record<string, number> = {};
      const step = 16; // quantization step per channel

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        if (a < 200) continue; // ignore transparent

        const { s, v } = rgbToHsv({ r, g, b });
        // Filter out near-grays and extremes
        if (v < 0.15 || v > 0.98 || s < 0.2) continue;

        const rq = quantize(r, step);
        const gq = quantize(g, step);
        const bq = quantize(b, step);
        const key = `${rq},${gq},${bq}`;
        counts[key] = (counts[key] ?? 0) + 1;
      }

      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      if (sorted.length === 0) {
        resolve(null);
        return;
      }

      const [top1, top2] = [sorted[0][0], sorted[Math.min(1, sorted.length - 1)][0]];
      const [r1, g1, b1] = top1.split(',').map((n) => parseInt(n, 10));
      const [r2, g2, b2] = top2.split(',').map((n) => parseInt(n, 10));
      const accent = rgbToHex({ r: r1, g: g1, b: b1 });
      const accent2 = rgbToHex({ r: r2, g: g2, b: b2 });

      const bg1 = adjustLuminance(accent, -0.85);
      const bg2 = adjustLuminance(accent2, -0.75);
      const bg3 = adjustLuminance(accent, -0.65);
      const shadow = rgba(accent, 0.35);

      resolve({ accent, accent2, bg1, bg2, bg3, shadow });
    };

    img.onerror = () => resolve(null);
  });
}

const ThemeFromImage: React.FC<ThemeFromImageProps> = ({ src }) => {
  useEffect(() => {
    let mounted = true;
    getPaletteFromImage(src).then((palette) => {
      if (!mounted || !palette) return;
      const root = document.documentElement;
      root.style.setProperty('--accent-500', palette.accent);
      root.style.setProperty('--accent-400', palette.accent2);
      root.style.setProperty('--bg-start', palette.bg1);
      root.style.setProperty('--bg-mid', palette.bg2);
      root.style.setProperty('--bg-end', palette.bg3);
      root.style.setProperty('--accent-shadow', palette.shadow);
    });
    return () => {
      mounted = false;
    };
  }, [src]);

  return null;
};

export default ThemeFromImage;


