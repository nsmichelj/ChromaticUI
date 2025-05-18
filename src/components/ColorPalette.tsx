import { useStore } from "@nanostores/react";
import chroma from "chroma-js";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { $color, $palette, $selectedColorFormat } from "@/stores/color";
import { generatePalette } from "@/utils/generatePalette";

export default function ColorPalette() {
  const selectedColorFormat = useStore($selectedColorFormat);
  const color = useStore($color);
  const palette = useStore($palette);

  useEffect(() => {
    const newPalette = generatePalette(color);
    if (newPalette.length) $palette.set(newPalette);
  }, [color]);

  const handleCopyColor = (color: string) => {
    const getFormattedColor = () => {
      switch (selectedColorFormat) {
        case "hsl":
        case "rgb":
        case "oklch":
          return chroma(color).css(selectedColorFormat);
        default:
          return color;
      }
    };
    const formattedColor = getFormattedColor();

    navigator.clipboard.writeText(formattedColor);
    toast(
      <div className="flex items-center">
        <div
          className="size-6 rounded-full inline-flex items-center justify-center shrink-0"
          style={{ background: color }}
        />
        <div className="ms-3 text-sm font-normal">
          Color {formattedColor} copiado al portapapeles
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  return (
    <div className="grid grid-cols-1 gap-2 my-6 md:grid-cols-11 mb-6">
      {palette.map((shade, index) => (
        <div key={index} className="space-y-1 cursor-pointer">
          <div
            className={`h-12 w-full rounded-lg shadow-xs relative group flex justify-center items-center md:h-20`}
            style={{ backgroundColor: shade }}
            onClick={() => handleCopyColor(shade)}
          >
            {shade === chroma(color).hex() && (
              <Check
                className={
                  chroma(shade).luminance() > 0.5
                    ? "text-gray-800"
                    : "text-gray-100"
                }
              />
            )}
          </div>
          <div className="text-sm text-center text-gray-500 font-bold">
            {shade.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
}
