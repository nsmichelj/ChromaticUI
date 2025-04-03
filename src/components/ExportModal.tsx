import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { $palette } from "@/stores/color";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { getExportFormats } from "@/utils/generateFormats";
import { Separator } from "@/components/ui/separator";
import type { StylingTool, ColorFormat } from "@/types/styleFormats";

const StylingToolLabes: Record<StylingTool, string> = {
  tailwind4: "Tailwind 4",
  tailwind3: "Tailwind 3",
  css: "CSS",
  scss: "SCSS",
};

const ColorFormatLabes: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  oklch: "OKLCH",
};
export default function ExportModal() {
  const [selectedStylingTool, setSelectedStylingTool] = useState<StylingTool>("tailwind4");
  const [selectedColorFormat, setSelectedColorFormat] = useState<ColorFormat>("hex");
  const [copied, setCopied] = useState<boolean>(false);
  const palette = useStore($palette);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const exportFormats = useMemo(() => getExportFormats(palette), [palette]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg font-semibold dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Exportar
          </Button>
        </DialogTrigger>

        <DialogContent
          className="w-full h-full md:max-w-[60%] sm:max-w-none sm:h-auto flex flex-col items-center sm:max-h-[80vh]"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            transform: "none",
            backfaceVisibility: "hidden",
            willChange: "auto",
          }}
        >
          {/* Header Section */}
          <DialogHeader
            className="w-full text-left md:text-left flex flex-col md:flex-none items-start md:items-start"
            style={{
              backgroundColor: "rgba(30, 144, 255, 0.2)",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <DialogTitle>Exportar paleta de colores</DialogTitle>
            <DialogDescription>
              Exporta tu paleta de colores en formato CSS, Tailwind CSS o SCSS. Selecciona el formato deseado y copia el código.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row justify-center w-full h-full sm:max-h-[70vh]">

          {/* Styling & Format Section */}
          <div
            className="flex flex-wrap justify-center items-center w-full md:w-1/2 gap-4"
            style={{
              backgroundColor: "rgba(50, 205, 50, 0.2)",
              padding: "15px",
              borderRadius: "8px",
              minHeight: "300px",
            }}
          >
            <div className="flex flex-wrap gap-4 min-[300px]:flex-row flex-col justify-center">
              {/* Style */}
              <div className="flex flex-col gap-2">
                <span className="font-bold">Estilo</span>
                {(Object.keys(StylingToolLabes) as Array<keyof typeof StylingToolLabes>).map((format) => (
                  <Button
                    key={format}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedStylingTool === format
                        ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setSelectedStylingTool(format)}
                  >
                    {StylingToolLabes[format]}
                  </Button>
                ))}
              </div>
              
              {/* Format */}
              <div className="flex flex-col gap-2">
                <span className="font-bold">Formato</span>
                {(Object.keys(ColorFormatLabes) as Array<keyof typeof ColorFormatLabes>).map((format) => (
                  <Button
                    key={format}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedColorFormat === format
                        ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setSelectedColorFormat(format)}
                  >
                    {ColorFormatLabes[format]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
    
          {/* Code Display Section */}
          <main
            className="w-full md:w-1/2 flex justify-center items-center"
            style={{
              backgroundColor: "rgba(255, 165, 0, 0.2)", 
              padding: "15px",
              borderRadius: "8px",
              minHeight: "300px", // Fixed minimum size
              maxHeight: "300px", // Prevent it from growing with the content
              overflow: "hidden", // Hide any external overflow
            }}
          >
            <div className="relative w-full h-full">
              {/* Copy button */}
              <div className="absolute top-2 right-2 z-10">
                <Button
                  className="bg-gray-800 text-gray-100 hover:bg-gray-800/95"
                  size="sm"
                  variant="default"
                  onClick={() => copyToClipboard(exportFormats[selectedStylingTool][selectedColorFormat])}
                >
                  <Copy /> {copied ? "Copied" : "Copy"}
                </Button>
              </div>
          
              {/* Preformatted text block with internal scroll */}
              <pre
                className="bg-gray-100 p-6 rounded-lg text-sm dark:bg-gray-900 dark:text-gray-100 w-full max-w-full text-left"
                style={{
                  whiteSpace: "pre",    // Maintains the code format
                  wordBreak: "normal",  // Avoid word breaks
                  overflowX: "auto",    // Scroll horizontally if necessary
                  overflowY: "auto",    // Internal scroll
                  maxHeight: "270px",   // Slightly smaller than the section to avoid overflows
                }}
              >
                {exportFormats[selectedStylingTool][selectedColorFormat]}
              </pre>
            </div>
          </main>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
