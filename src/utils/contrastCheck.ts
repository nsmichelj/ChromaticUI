import chroma from "chroma-js";

export function contrastCheck(color1: string, color2: string) {
  const lum1 = chroma(color1).luminance()
  const lum2 = chroma(color2).luminance();
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));

  return {
    ratio,
    compliance: {
      aaSmall: ratio >= 4.5,
      aaLarge: ratio >= 3.0,
      aaaSmall: ratio >= 7.0,
      aaaLarge: ratio >= 4.5,
    },
  };
}
