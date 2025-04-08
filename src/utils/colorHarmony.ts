import type { HarmonyParams } from "@/types/harmonyTypes";
import chroma from "chroma-js";

export function generateAutoPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const stepHSL = 360 / numberColors;
  return Array.from({ length: numberColors }, function (_, i) {
    return chroma.hsl((h + stepHSL * i) % 360, s, l).hex();
  });
}

export function generateAnalogousPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const range = 60;
  const stepAnalogous = range / (numberColors - 1);
  return Array.from({ length: numberColors }, function (_, i) {
    const newH = (h - range / 2 + stepAnalogous * i + 360) % 360;
    return chroma.hsl(newH, s, l).hex();
  });
}

export function generateComplementaryPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const stepComplementary = 180 / (numberColors - 1);
  return Array.from({ length: numberColors }, function (_, i) {
    return chroma.hsl((h + stepComplementary * i) % 360, s, l).hex();
  });
}

export function generateTriadicPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const stepTriadic = 120 / (numberColors - 1);
  return Array.from({ length: numberColors }, function (_, i) {
    return chroma.hsl((h + stepTriadic * i) % 360, s, l).hex();
  });
}

export function generateTetradicPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const baseHues = [h, h + 45, h + 180, h + 225].map(function (hue) {
    return hue % 360;
  });
  const palette = baseHues.map(function (hue) {
    return chroma.hsl(hue, s, l).hex();
  });

  if (numberColors > 4) {
    const sVariations = [s * 0.8, s * 1.2];
    const lVariations = [l * 0.8, l * 1.2];
    for (let i = 4; i < numberColors; i++) {
      const hueIndex = i % 4;
      const sIndex = Math.floor((i - 4) / 2) % sVariations.length;
      const lIndex = Math.floor((i - 4) / 3) % lVariations.length;
      palette.push(
        chroma
          .hsl(baseHues[hueIndex], sVariations[sIndex], lVariations[lIndex])
          .hex(),
      );
    }
  }
  return palette;
}

export function generateSquarePalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const baseHues = [0, 90, 180, 270].map(function (offset) {
    return (h + offset) % 360;
  });
  const palette = baseHues.map(function (hue) {
    return chroma.hsl(hue, s, l).hex();
  });

  if (numberColors > 4) {
    const sVariations = [s * 0.7, s * 1.3];
    const lVariations = [l * 0.7, l * 1.3];
    for (let i = 4; i < numberColors; i++) {
      const hueIndex = i % 4;
      const sIndex = Math.floor((i - 4) / 4) % sVariations.length;
      const lIndex = Math.floor((i - 4) / 2) % lVariations.length;
      palette.push(
        chroma
          .hsl(baseHues[hueIndex], sVariations[sIndex], lVariations[lIndex])
          .hex(),
      );
    }
  }
  return palette;
}

export function generateSplitComplementaryPalette({
  h,
  s,
  l,
  numberColors,
}: HarmonyParams): string[] {
  const complementHue = (h + 180) % 360;
  const palette = [chroma.hsl(h, s, l).hex()];

  for (let i = 1; i < numberColors; i++) {
    const offset = i % 2 === 0 ? 30 : -30;
    const newH = (complementHue + offset * Math.ceil(i / 2)) % 360;
    palette.push(chroma.hsl(newH, s, l).hex());
  }
  return palette;
}

export function generateHarmonyPalette(
  color: string,
  numberColors: number,
  schema: string,
) {
  const [h, s, l] = chroma(color).hsl();
  const params = { h, s, l, numberColors };

  const generators: Record<string, (params: HarmonyParams) => string[]> = {
    auto: generateAutoPalette,
    analogous: generateAnalogousPalette,
    complementary: generateComplementaryPalette,
    triadic: generateTriadicPalette,
    tetradic: generateTetradicPalette,
    square: generateSquarePalette,
    "split-complementary": generateSplitComplementaryPalette,
  };

  return generators[schema](params);
}
