import type { InterpolationMode } from "@/types/blendMode";
import chroma from "chroma-js";

export function blendColors(
  colors: { value: string; percentage: number }[],
  mode: InterpolationMode = "rgb"
) {
  const colorsMix = colors.map((color) => color.value);
  const percentages = colors.map((color) => color.percentage / 100);

  return chroma.average(colorsMix, mode, percentages);
}
