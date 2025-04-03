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
        <DialogContent className="w-full h-full md:max-w-[60%] sm:max-w-none sm:h-auto flex flex-col items-center sm:max-h-[80vh] overflow-auto">
          {/* Center header when layout is centered */}
          <DialogHeader className="w-full md:w-auto text-left md:text-left flex flex-col md:flex-none items-center md:items-start">
            <DialogTitle className="text-center md:text-left w-full md:w-auto">
              Exportar paleta de colores
            </DialogTitle>
            <DialogDescription className="text-center md:text-left w-full md:w-auto">
              Exporta tu paleta de colores en formato CSS, Tailwind CSS o SCSS. Selecciona el formato deseado y copia el código.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row w-full h-full sm:max-h-[70vh]">
            {/* Left Section: Styling Tool & Format */}
            <div className="flex flex-wrap md:flex-row w-full md:w-[40%] justify-center md:justify-start gap-8 relative">
              <div className="flex flex-col gap-2 min-[300px]:flex-row">
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
              {/* Vertical separator for large screens */}
              <Separator orientation="vertical" className="hidden min-[1200px]:block mx-5 top-0 h-full ml-4" />
            </div>

            {/* Horizontal separator for small screens */}
            <Separator orientation="horizontal" className="mx-4 md:hidden w-full my-4" />

            {/* Right Section: Centered Code Display */}
            <main className="w-full md:w-[60%] flex justify-center">
              <div className="relative w-full flex justify-center">
                <pre className="bg-gray-100 p-6 rounded-lg overflow-x-auto text-sm dark:bg-gray-900 dark:text-gray-100 w-[80%] max-w-full max-h-[50vh] relative text-center">
                  <Button
                    className="absolute top-2 right-2 bg-gray-800 text-gray-100 hover:bg-gray-800/95"
                    size="sm"
                    variant="default"
                    onClick={() => copyToClipboard(exportFormats[selectedStylingTool][selectedColorFormat])}
                  >
                    <Copy /> {copied ? "Copiado" : "Copiar"}
                  </Button>
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
