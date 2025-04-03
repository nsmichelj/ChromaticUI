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

const StylingToolLabels: Record<StylingTool, string> = {
  tailwind4: "Tailwind 4",
  tailwind3: "Tailwind 3",
  css: "CSS",
  scss: "SCSS",
};

const ColorFormatLabels: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  oklch: "OKLCH",
};

export default function ExportModal() {
  const [selectedStylingTool, setSelectedStylingTool] =
    useState<StylingTool>("tailwind4");
  const [selectedColorFormat, setSelectedColorFormat] =
    useState<ColorFormat>("hex");

  const [copied, setCopied] = useState<boolean>(false);
  const palette = useStore($palette);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const exportFormats = useMemo(() => {
    return getExportFormats(palette);
  }, [palette]);

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
        <DialogContent className="sm:max-w-[750px] w-[750px]">
          <DialogHeader>
            <DialogTitle>Exportar paleta de colores</DialogTitle>
            <DialogDescription>
              Exporta tu paleta de colores en formato CSS, Tailwind CSS o SCSS.
              Selecciona el formato deseado y copia el código.
            </DialogDescription>
          </DialogHeader>

          <div className="flex h-full">
            <nav className="w-[30%] flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-bold">Estilo</span>
                {(
                  Object.keys(StylingToolLabels) as Array<
                    keyof typeof StylingToolLabels
                  >
                ).map((format) => (
                  <Button
                    key={format}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedStylingTool === format
                        ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setSelectedStylingTool(format)}
                  >
                    {StylingToolLabels[format]}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold">Formato</span>
                {(
                  Object.keys(ColorFormatLabels) as Array<
                    keyof typeof ColorFormatLabels
                  >
                ).map((format) => (
                  <Button
                    key={format}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedColorFormat === format
                        ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setSelectedColorFormat(format)}
                  >
                    {ColorFormatLabels[format]}
                  </Button>
                ))}
              </div>
            </nav>
            <Separator orientation="vertical" className="mx-4" />
            <main className="w-[70%] overflow-auto">
              <div className="relative">
                <Button
                  className="absolute top-2 right-2 bg-gray-800 text-gray-100 hover:bg-gray-800/95"
                  size="sm"
                  variant="default"
                  onClick={() =>
                    copyToClipboard(
                      exportFormats[selectedStylingTool][selectedColorFormat]
                    )
                  }
                >
                  <Copy /> {copied ? "Copiado" : "Copiar"}
                </Button>
                <pre className="bg-gray-100 p-6 rounded-lg overflow-x-auto text-sm dark:bg-gray-900 dark:text-gray-100">
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
