import { parseColorName, parseHEX, parseHSL, parseOKLCH, parseRGB } from "./parserColor";

export function detectColorFormat(color: string) {
  const trimmedColor = color.trim().toLowerCase();

  if (parseColorName(trimmedColor)) {
    return ["named", parseColorName(trimmedColor)];
  } else if (parseHEX(trimmedColor)) {
    return ["hex", parseHEX(trimmedColor)];
  } else if (parseRGB(trimmedColor)) {
    return ["rgb", parseRGB(trimmedColor)];
  } else if (parseHSL(trimmedColor)) {
    return ["hsl", parseHSL(trimmedColor)];
  } else if (parseOKLCH(trimmedColor)) {
    return ["oklch", parseOKLCH(trimmedColor)];
  } else {
    return ["unknown", trimmedColor];
  }
}
