import chroma from "chroma-js";

const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const baseColorName = "primary";

function changeColorsFormat(colors: string[], format: string) {
  const newColorsFormat = colors.map((color) => {
    switch (format) {
      case "hsl":
        return chroma(color).css("hsl");
      case "rgb":
        return chroma(color).css("rgb");
      default:
        return color;
    }
  });

  return newColorsFormat;
}

function generateTailwindConfig(
  palette: string[],
  format: "hex" | "hsl" | "rgb"
): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = `${baseColorName}: {\n`;
  colorValues
    .map((value, index) => {
      code += `  '${weights[index]}': '${value}',\n`;
    })
  code += '}'

  return code.trim();
}

function generateCssVariables(
  palette: string[],
  format: "hex" | "hsl" | "rgb"
): string {
  const colorValues = changeColorsFormat(palette, format);

  let code = `:root {\n`;
  colorValues
    .map((value, index) => {
      code += `  --color-${baseColorName}-${weights[index]}: ${value};\n`;
    })
  code += "}";

  return code.trim();
}

function generateScssVariables(palette: string[]): string {
  let code = ``;
  palette.map((color, index) => {
    code += `$${baseColorName}-${weights[index]}: ${color};\n`;
  });
  code += "";

  return code.trim();
}

export function getExportFormats(palette: string[]) {
  return {
    tailwindHex: generateTailwindConfig(palette, "hex"),
    tailwindHsl: generateTailwindConfig(palette, "hsl"),
    tailwindRgb: generateTailwindConfig(palette, "rgb"),
    cssHex: generateCssVariables(palette, "hex"),
    cssHsl: generateCssVariables(palette, "hsl"),
    cssRgb: generateCssVariables(palette, "rgb"),
    scss: generateScssVariables(palette),
  };
}
