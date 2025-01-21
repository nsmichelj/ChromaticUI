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

type SelectedFormats =
  | "tailwindHex"
  | "tailwindHsl"
  | "tailwindRgb"
  | "cssHex"
  | "cssHsl"
  | "cssRgb"
  | "scss";

const formatLabels = {
  tailwindHex: "Tailwind (HEX)",
  tailwindHsl: "Tailwind (HSL)",
  tailwindRgb: "Tailwind (RGB)",
  cssHex: "CSS (HEX)",
  cssHsl: "CSS (HSL)",
  cssRgb: "CSS (RGB)",
  scss: "SCSS Variables (HEX)",
};

export default function ExportModal() {
  const [selectedFormat, setSelectedFormat] =
    useState<SelectedFormats>("tailwindHex");
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
            className="px-4 py-2 rounded-lg font-semibold text-gray-800"
          >
            Exportar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] w-[700px]">
          <DialogHeader>
            <DialogTitle>Exportar paleta de colores</DialogTitle>
            <DialogDescription>
              Exporta tu paleta de colores en formato CSS, Tailwind CSS o SCSS.
              Selecciona el formato deseado y copia el código.
            </DialogDescription>
          </DialogHeader>

          <div className="flex h-full">
            <nav className="w-[30%] pr-4">
              <div className="flex flex-col gap-2">
                {(
                  Object.keys(formatLabels) as Array<keyof typeof formatLabels>
                ).map((format) => (
                  <Button
                    key={format}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedFormat === format
                        ? "bg-blue-500 text-gray-100 hover:bg-blue-500"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {formatLabels[format]}
                  </Button>
                ))}
              </div>
            </nav>
            <main className="w-[70%] pl-4 overflow-auto">
              <div className="relative">
                <Button
                  className="absolute top-2 right-2 bg-gray-800 text-gray-100 hover:bg-gray-800/95"
                  size="sm"
                  variant="default"
                  onClick={() => copyToClipboard(exportFormats[selectedFormat])}
                >
                  <Copy /> {copied ? "Copiado" : "Copiar"}
                </Button>
                <pre className="bg-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                  {exportFormats[selectedFormat]}
                </pre>
              </div>
            </main>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
