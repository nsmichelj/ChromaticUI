import { useStore } from "@nanostores/react";
import chroma from "chroma-js";
import { Copy, FolderUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { $color, $savedColors, saveColor } from "@/stores/color";

type HarmonyType =
  | "auto"
  | "analogous"
  | "complementary"
  | "triadic"
  | "tetradic"
  | "square"
  | "split-complementary";

const harmonyOptions: {
  value: HarmonyType;
  label: string;
  minColors?: number;
}[] = [
  { value: "auto", label: "Auto" },
  { value: "analogous", label: "Análogo", minColors: 3 },
  { value: "complementary", label: "Complementario" },
  { value: "triadic", label: "Triádico", minColors: 3 },
  { value: "tetradic", label: "Tetrádico", minColors: 4 },
  { value: "square", label: "Cuadrado", minColors: 4 },
  {
    value: "split-complementary",
    label: "Complementario Dividido",
    minColors: 3,
  },
];

export default function AlternativeColorPalette() {
  const savedColors = useStore($savedColors);
  const color = useStore($color);

  const [schema, setSchema] = useState<HarmonyType>("auto");
  const [numberColors, setNumberColors] = useState(5);
  const [minColors, setMinColors] = useState(2);
  const [harmonyPalette, setHarmonyPalette] = useState<string[]>([]);
  const [activeCubeId, setActiveCubeId] = useState<number | null>(null);
  const menuRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    generateHarmonyPalette();
  }, [numberColors, schema, color]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeCubeId !== null) {
        const activeMenu = menuRefs.current.get(activeCubeId);
        if (activeMenu && !activeMenu.contains(event.target as Node)) {
          setActiveCubeId(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeCubeId]);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast(
      <div className="flex items-center">
        <div
          className="inline-flex size-6 rounded-full"
          style={{ background: color }}
        />
        <div className="ms-3 text-sm font-normal">
          Color {color} copiado al portapapeles
        </div>
      </div>,
      {
        duration: 2000,
      },
    );
  };

  const handleSelectSchema = (schema: HarmonyType) => {
    setSchema(schema);

    const selectedOption = harmonyOptions.find(
      (option) => option.value === schema,
    );
    const minColors = selectedOption?.minColors || 2;
    setMinColors(minColors);
    if (numberColors < minColors) {
      setNumberColors(minColors);
    }
  };

  const generateHarmonyPalette = () => {
    if (!chroma.valid(color)) return;
    const [h, s, l] = chroma(color).hsl();
    let newPalette: string[] = [];

    switch (schema) {
      case "auto":
        const stepHSL = 360 / numberColors;
        for (let i = 0; i < numberColors; i++) {
          const newH = (h + stepHSL * i) % 360;
          newPalette.push(chroma.hsl(newH, s, l).hex());
        }
        break;
      case "analogous":
        const range = 60;
        const stepAnalogous = range / (numberColors - 1);
        for (let i = 0; i < numberColors; i++) {
          const newH = (h - range / 2 + stepAnalogous * i + 360) % 360;
          newPalette.push(chroma.hsl(newH, s, l).hex());
        }
        break;
      case "complementary":
        const stepComplementary = 180 / (numberColors - 1);
        for (let i = 0; i < numberColors; i++) {
          const newH = (h + stepComplementary * i) % 360;
          newPalette.push(chroma.hsl(newH, s, l).hex());
        }
        break;
      case "triadic":
        const stepTriadic = 120 / (numberColors - 1);
        for (let i = 0; i < numberColors; i++) {
          const newH = (h + stepTriadic * i) % 360;
          newPalette.push(chroma.hsl(newH, s, l).hex());
        }
        break;
      case "tetradic":
        const tetraHues = [
          h % 360,
          (h + 45) % 360,
          (h + 180) % 360,
          (h + 225) % 360,
        ];

        newPalette = tetraHues.map((hue) => chroma.hsl(hue, s, l).hex());
        if (numberColors > 4) {
          const sVariations = [s * 0.8, s * 1.2];
          const lVariations = [l * 0.8, l * 1.2];

          for (let i = 4; i < numberColors; i++) {
            const hueIndex = i % 4;
            const sIndex = Math.floor((i - 4) / 2) % sVariations.length;
            const lIndex = Math.floor((i - 4) / 3) % lVariations.length;
            newPalette.push(
              chroma
                .hsl(
                  tetraHues[hueIndex],
                  sVariations[sIndex],
                  lVariations[lIndex],
                )
                .hex(),
            );
          }
        }
        break;
      case "square":
        const squareHue = [
          h % 360,
          (h + 90) % 360,
          (h + 180) % 360,
          (h + 270) % 360,
        ];
        newPalette = squareHue.map((hue) => chroma.hsl(hue, s, l).hex());

        if (numberColors > 4) {
          const sVariations = [s * 0.7, s * 1.3];
          const lVariations = [l * 0.7, l * 1.3];

          for (let i = 4; i < numberColors; i++) {
            const hueIndex = i % 4;
            const sIndex = Math.floor((i - 4) / 4) % sVariations.length;
            const lIndex = Math.floor((i - 4) / 2) % lVariations.length;
            newPalette.push(
              chroma
                .hsl(
                  squareHue[hueIndex],
                  sVariations[sIndex],
                  lVariations[lIndex],
                )
                .hex(),
            );
          }
        }
        break;
      case "split-complementary":
        const complementHue = (h + 180) % 360;
        newPalette.push(chroma.hsl(h, s, l).hex());
        for (let i = 1; i < numberColors; i++) {
          const offset = i % 2 === 0 ? 30 : -30;
          const newH = (complementHue + offset * Math.ceil(i / 2)) % 360;
          newPalette.push(chroma.hsl(newH, s, l).hex());
        }
        break;
    }

    setHarmonyPalette(newPalette);
  };

  const handleSaveColor = (selectedColor: string) => {
    if (!savedColors.includes(color)) {
      saveColor(color);
    }

    if (!savedColors.includes(selectedColor)) {
      saveColor(selectedColor);
    }
  };

  const handleCubeClick = (id: number) => {
    setActiveCubeId(activeCubeId === id ? null : id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="mb-2 text-lg font-bold">Variaciones armónicas</p>
      </div>

      <div className="flex flex-col justify-start gap-4 sm:flex-row">
        <div className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
          <div className="text-sm font-semibold text-gray-500">Colores:</div>
          <Input
            type="number"
            min={minColors}
            max={10}
            value={numberColors}
            className="w-20 rounded-lg border-gray-400 bg-gray-50 p-2.5 text-gray-600 focus-visible:ring-1 md:text-base dark:bg-gray-800 dark:text-gray-50"
            step={1}
            onChange={(e) => setNumberColors(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
          <div className="text-sm font-semibold text-gray-500">Esquema:</div>
          <Select onValueChange={handleSelectSchema} defaultValue="auto">
            <SelectTrigger className="w-[240px] rounded-lg border-gray-400 bg-gray-50 p-2.5 text-gray-600 focus-visible:ring-1 md:text-base dark:bg-gray-800 dark:text-gray-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {harmonyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {harmonyPalette.length > 0 && (
        <div className="my-6 mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
          {harmonyPalette.map((variation, index) => (
            <div key={index} className="group relative">
              <div
                style={{ backgroundColor: variation }}
                className={`relative flex h-12 w-full cursor-pointer items-center justify-center space-y-1 rounded-lg shadow-xs md:h-20`}
                onClick={() => handleCubeClick(index)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`font-semibold ${
                      chroma(variation).luminance() > 0.5
                        ? "text-gray-800"
                        : "text-gray-100"
                    }`}
                  >
                    {variation}
                  </span>
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) menuRefs.current.set(index, el);
                  else menuRefs.current.delete(index);
                }}
                onClick={handleMenuClick}
                className={`absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black/75 shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  activeCubeId === index
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-50 opacity-0"
                }`}
              >
                <div className="flex items-center gap-1 px-2 py-1">
                  <button
                    className="rounded-full p-1 transition-colors hover:bg-white/15"
                    onClick={() => handleCopyColor(variation)}
                  >
                    <Copy className="h-4 w-4 text-white" />
                  </button>

                  <button
                    className="rounded-full p-1 transition-colors hover:bg-white/15"
                    onClick={() => handleSaveColor(variation)}
                  >
                    <FolderUp className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
