import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import chroma from "chroma-js";

import { Input } from "@/components/ui/input";
import { $color } from "@/stores/color";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const color = useStore($color);

  const [schema, setSchema] = useState<HarmonyType>("auto");
  const [numberColors, setNumberColors] = useState(5);
  const [minColors, setMinColors] = useState(2);
  const [harmonyPalette, setHarmonyPalette] = useState<string[]>([]);

  useEffect(() => {
    generateHarmonyPalette();
  }, [numberColors, schema, color]);

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
          {harmonyPalette.map((color, index) => (
            <div key={index} className="cursor-pointer space-y-1">
              <div
                className={`group relative flex h-12 w-full items-center justify-center rounded-lg shadow-xs md:h-20`}
                style={{ backgroundColor: color }}
                onClick={() => handleCopyColor(color)}
              ></div>
              <div className="text-center text-sm font-bold text-gray-500">
                {color.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
