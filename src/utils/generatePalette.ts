import chroma from "chroma-js";

export function generatePalette(color: string) {
  const isValid = chroma.valid(color);
  if (!isValid) return [];

  const [h, s, l] = chroma(color).hsl();

  let lighterCount = 5;
  let darkerCount = 5;

  lighterCount = 10 - Math.round(l * 10);
  darkerCount = 10 - lighterCount;

  const minLightness = 5;
  const maxLightness = 95;

  const lighterShades = Array.from({ length: lighterCount }, (_, i) => {
    const newLightness =
      l * 100 + (i + 1) * ((maxLightness - l * 100) / (lighterCount + 1));
    return chroma(h, s, newLightness / 100, "hsl").hex();
  }).reverse();

  const darkerShades = Array.from({ length: darkerCount }, (_, i) => {
    const newLightness =
      l * 100 - (i + 1) * ((l * 100 - minLightness) / (darkerCount + 1));
    return chroma(h, s, newLightness / 100, "hsl").hex();
  });

  return [...lighterShades, chroma(color).hex(), ...darkerShades];
}
