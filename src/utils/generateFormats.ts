import chroma from "chroma-js";

import type {StylingTool, ColorFormat} from "@/types/styleFormats"

const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const baseColorName = "primary";

function changeColorsFormat(colors: string[], format: ColorFormat) {
  const newColorsFormat = colors.map((color) => {
    switch (format) {
      case "hsl":
        return chroma(color).css("hsl");
      case "rgb":
        return chroma(color).css("rgb");
      case "oklch":
        return chroma(color).css("oklch");
      default:
        return color;
    }
  });

  return newColorsFormat;
}

function generateTailwindConfigV3(
  palette: string[],
  format: ColorFormat
): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = `${baseColorName}: {\n`;
  colorValues.map((value, index) => {
    code += `  '${weights[index]}': '${value}',\n`;
  });
  code += "}";

  return code.trim();
}

function generateTailwindConfigV4(
  palette: string[],
  format: ColorFormat
): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = "";
  colorValues.map((value, index) => {
    code += `  --color-${baseColorName}-${weights[index]}: ${value};\n`;
  });

  return code;
}

function generateCssVariables(palette: string[], format: ColorFormat): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = `:root {\n`;
  colorValues.map((value, index) => {
    code += `  --color-${baseColorName}-${weights[index]}: ${value};\n`;
  });
  code += "}";

  return code.trim();
}

function generateScssVariables(palette: string[], format: ColorFormat): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = ``;
  colorValues.map((value, index) => {
    code += `$${baseColorName}-${weights[index]}: ${value};\n`;
  });
  code += "";

  return code.trim();
}

export function getExportFormats(palette: string[]) {
  return {
    tailwind4: {
      hex: generateTailwindConfigV4(palette, "hex"),
      hsl: generateTailwindConfigV4(palette, "hsl"),
      rgb: generateTailwindConfigV4(palette, "rgb"),
      oklch: generateTailwindConfigV4(palette, "oklch"),
    },
    tailwind3: {
      hex: generateTailwindConfigV3(palette, "hex"),
      hsl: generateTailwindConfigV3(palette, "hsl"),
      rgb: generateTailwindConfigV3(palette, "rgb"),
      oklch: generateTailwindConfigV3(palette, "oklch"),
    },
    css: {
      hex: generateCssVariables(palette, "hex"),
      hsl: generateCssVariables(palette, "hsl"),
      rgb: generateCssVariables(palette, "rgb"),
      oklch: generateCssVariables(palette, "oklch"),
    },
    scss: {
      hex: generateScssVariables(palette, "hex"),
      hsl: generateScssVariables(palette, "hsl"),
      rgb: generateScssVariables(palette, "rgb"),
      oklch: generateScssVariables(palette, "oklch"),
    },
  };
}
