export function parseRGB(input: string): string | null {
  const regex = new RegExp(
    `^rgba?\\(\\s*` +
      `(?<red>\\d+\\.?\\d*)` +
      `(?<redUnit>%?)\\s*` +
      `(?:[\\s,]+\\s*)` +
      `(?<green>\\d+\\.?\\d*)` +
      `(?<greenUnit>%?)\\s*` +
      `(?:[\\s,]+\\s*)` +
      `(?<blue>\\d+\\.?\\d*)` +
      `(?<blueUnit>%?)\\s*` +
      `(?:` +
      `(?:\\/|[\\s,])+\\s*` +
      `(?<alpha>\\d+\\.?\\d*)` +
      `(?<alphaUnit>%?)\\s*` +
      `)?` +
      `\\)$`,
    "i"
  );

  const match = input.match(regex);
  if (!match || !match.groups) return null;

  const { red, redUnit, green, greenUnit, blue, blueUnit, alpha, alphaUnit } =
    match.groups;

  // Validate RGBA function with missing alpha
  if (input.trim().startsWith("rgba(") && alpha === undefined) {
    return null;
  }

  // Process RGB components
  const processComponent = (value: string, unit: string): string => {
    const num = parseFloat(value);
    if (unit === "%") {
      const clamped = Math.min(100, Math.max(0, num));
      return `${clamped}%`;
    } else {
      const clamped = Math.min(255, Math.max(0, num));
      return Math.round(clamped).toString();
    }
  };

  const redStr = processComponent(red, redUnit);
  const greenStr = processComponent(green, greenUnit);
  const blueStr = processComponent(blue, blueUnit);

  // Process alpha component
  let alphaStr = "";
  if (alpha !== undefined) {
    const num = parseFloat(alpha);
    if (alphaUnit === "%") {
      const clamped = Math.min(100, Math.max(0, num));
      alphaStr = ` / ${clamped}%`;
    } else {
      const clamped = Math.min(1, Math.max(0, num));
      alphaStr = ` / ${clamped.toFixed(2).replace(/\.?0+$/, "")}`;
    }
  }

  return `rgb(${redStr} ${greenStr} ${blueStr}${alphaStr})`;
}

export function parseHEX(input: string): string | null {
  const hexRegex =
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  if (!hexRegex.test(input)) return null;

  let hex = input.slice(1).toUpperCase();
  let result = "";

  switch (hex.length) {
    case 3: // #RGB -> #RRGGBB
      result = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
      break;
    case 4: // #RGBA -> #RRGGBBAA
      result = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
      break;
    case 6: // #RRGGBB
    case 8: // #RRGGBBAA
      result = hex;
      break;
    default:
      return null;
  }

  return `#${result}`;
}

export function parseHSL(input: string): string | null {
  const regex = new RegExp(
    `^hsla?\\(\\s*` +
      `(?<hue>\\d+\\.?\\d*)` +
      `(?<hueUnit>deg|grad|rad|turn)?\\s*` +
      `[\\s,]+\\s*` +
      `(?<saturation>\\d+\\.?\\d*)` +
      `(?<saturationUnit>%?)\\s*` +
      `[\\s,]+\\s*` +
      `(?<lightness>\\d+\\.?\\d*)` +
      `(?<lightnessUnit>%?)\\s*` +
      `(?:` +
      `(?:\\/|[\\s,])+\\s*` +
      `(?<alpha>\\d*\\.?\\d+)` +
      `(?<alphaUnit>%?)\\s*` +
      `)?` +
      `\\)$`,
    "i"
  );

  const match = input.match(regex);
  if (!match || !match.groups) return null;

  const { hue, hueUnit, saturation, lightness, alpha, alphaUnit } =
    match.groups;

  // Process hue
  const parsedHue = parseFloat(hue);
  let hueStr = "";
  if (hueUnit && hueUnit !== "deg") {
    hueStr = `${parsedHue}${hueUnit}`;
  } else {
    hueStr = parsedHue.toString();
  }

  // Process saturation and lightness (clamp to 0-100%)
  const parsedSaturation = Math.min(100, Math.max(0, parseFloat(saturation)));
  const parsedLightness = Math.min(100, Math.max(0, parseFloat(lightness)));
  const saturationStr = `${parsedSaturation}%`;
  const lightnessStr = `${parsedLightness}%`;

  // Process alpha
  let alphaStr = "";
  if (alpha !== undefined) {
    const parsedAlpha = parseFloat(alpha);
    if (alphaUnit === "%") {
      const clampedAlpha = Math.min(100, Math.max(0, parsedAlpha));
      alphaStr = ` / ${clampedAlpha}%`;
    } else {
      const clampedAlpha = Math.min(1, Math.max(0, parsedAlpha));
      const roundedAlpha = Math.round(clampedAlpha * 100) / 100;
      alphaStr = ` / ${roundedAlpha}`;
    }
  }

  return `hsl(${hueStr} ${saturationStr} ${lightnessStr}${alphaStr})`;
}

export function parseOKLCH(input: string): string | null {
  const regex = new RegExp(
    `^oklch\\(\\s*` +
      `(?<lightness>\\d+\\.?\\d*|\\.\\d+)` +
      `(?<lightnessUnit>%?)` +
      `[\\s,]+` +
      `(?<chroma>\\d+\\.?\\d*|\\.\\d+)` +
      `[\\s,]+` +
      `(?<hue>\\d+\\.?\\d*|\\.\\d+)` +
      `(?:\\s*\\/\\s*` +
      `(?<alpha>\\d+\\.?\\d*|\\.\\d+)` +
      `(?<alphaUnit>%?))?` +
      `\\s*\\)$`,
    "i"
  );

  const match = input.match(regex);
  if (!match || !match.groups) return null;

  const {
    lightness: lStr,
    lightnessUnit: lUnit,
    chroma: cStr,
    hue: hStr,
    alpha: aStr,
    alphaUnit: aUnit,
  } = match.groups;

  // Process lightness
  let lightness: number;
  let lightnessUnit: string | undefined = lUnit || undefined;
  if (lightnessUnit === "%") {
    lightness = Math.min(100, Math.max(0, parseFloat(lStr)));
  } else {
    lightness = Math.min(1, Math.max(0, parseFloat(lStr)));
  }

  // Process chroma
  const chroma = Math.max(0, parseFloat(cStr));

  // Process hue
  const hue = parseFloat(hStr);

  // Process alpha
  let alphaStr = "";
  if (aStr !== undefined) {
    let alpha: number;
    if (aUnit === "%") {
      alpha = Math.min(100, Math.max(0, parseFloat(aStr)));
      alphaStr = ` / ${formatNumber(alpha)}%`;
    } else {
      alpha = Math.min(1, Math.max(0, parseFloat(aStr)));
      alphaStr = ` / ${formatNumber(alpha)}`;
    }
  }

  // Format components
  const lFormatted = lightnessUnit
    ? `${formatNumber(lightness)}%`
    : formatNumber(lightness);
  const chromaFormatted = formatNumber(chroma);
  const hueFormatted = formatNumber(hue);

  return `oklch(${lFormatted} ${chromaFormatted} ${hueFormatted}${alphaStr})`;
}

function formatNumber(value: number, maxDecimals: number = 4): string {
  const str = value.toFixed(maxDecimals);
  return str
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.$/, "")
    .replace(/\.0$/, "");
}

export function parseColorName(input: string): string | null {
  const normalized = input.trim().toLowerCase();
  if (validColorNames.has(normalized)) {
    return normalized;
  }
  return null;
}

// Set of all valid CSS color names (case-insensitive)
const validColorNames = new Set<string>([
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
]);
