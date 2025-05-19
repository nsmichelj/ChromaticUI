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
            className="rounded-lg px-4 py-2 font-semibold dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Export
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Export Color Palette</DialogTitle>
            <DialogDescription>
              Export your color palette in CSS, Tailwind CSS, or SCSS format.
              Select the desired format and copy the code.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:flex md:flex-row">
            <nav className="flex w-full md:w-[30%] flex-col gap-4 md:flex-row">
              <div className="w-full">
                <span className="font-bold">Style</span>
                <div className="flex w-full flex-row flex-wrap gap-2 md:flex-col">
                  {(
                    Object.keys(StylingToolLabels) as Array<
                      keyof typeof StylingToolLabels
                    >
                  ).map((format) => (
                    <Button
                      key={format}
                      className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                        selectedStylingTool === format
                          ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => setSelectedStylingTool(format)}
                    >
                      {StylingToolLabels[format]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <span className="font-bold">Format</span>
                <div className="flex w-full flex-row flex-wrap gap-2 md:flex-col">
                  {(
                    Object.keys(ColorFormatLabels) as Array<
                      keyof typeof ColorFormatLabels
                    >
                  ).map((format) => (
                    <Button
                      key={format}
                      className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                        selectedColorFormat === format
                          ? "bg-blue-500 text-gray-100 hover:bg-blue-500 dark:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-900"
                      }`}
                      onClick={() => setSelectedColorFormat(format)}
                    >
                      {ColorFormatLabels[format]}
                    </Button>
                  ))}
                </div>
              </div>
            </nav>
            <Separator orientation="vertical" className="hidden md:block" />
            <Separator orientation="horizontal" className="block md:hidden" />
            <main className="w-full overflow-auto md:w-[70%]">
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
                  <Copy /> {copied ? "Copied" : "Copy"}
                </Button>
                <pre className="overflow-x-auto rounded-lg bg-gray-100 p-6 text-sm dark:bg-gray-900 dark:text-gray-100">
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
