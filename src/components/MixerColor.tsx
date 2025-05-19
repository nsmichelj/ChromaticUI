import chroma from "chroma-js";
import { Check, CirclePlus, Copy, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import ColorPicker from "@/components/ColorPicker";
import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InterpolationMode } from "@/types/blendMode";
import { blendColors } from "@/utils/colorMixer";

export default function MixerColor() {
  const [colorPreview, setColorPreview] = useState("#000000");
  const [blendMode, setBlendMode] = useState<InterpolationMode>("rgb");
  const [copied, setCopied] = useState("");
  const [colorsMix, setColorsMix] = useState([
    {
      value: "#000000",
      percentage: 100,
    },
    {
      value: "#000000",
      percentage: 100,
    },
  ]);

  useEffect(() => {
    const color1 = chroma.random().hex();
    const color2 = chroma.random().hex();

    const initialColors = [
      { value: color1, percentage: 100 },
      { value: color2, percentage: 100 },
    ];

    setColorsMix(initialColors);
    setColorPreview(blendColors(initialColors, blendMode).hex());
  }, []);

  useEffect(() => {
    const blend = blendColors(colorsMix, blendMode);
    setColorPreview(blend.hex());
  }, [colorsMix, blendMode]);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(""), 1000);
  };

  const handleColorChange = (
    newColor: string,
    percentage: number,
    index: number
  ) => {
    const newColorsMix = colorsMix;
    newColorsMix[index] = {
      value: newColor,
      percentage: percentage,
    };
    setColorsMix([...newColorsMix]);
  };

  const handleBlendModeChange = (option: InterpolationMode) => {
    setBlendMode(option);
  };

  const handleAddColor = () => {
    const color = chroma.random().hex();
    const newColors = [
      ...colorsMix,
      {
        value: color,
        percentage: 100,
      },
    ];
    setColorsMix(newColors);
  };

  const handleDelete = (index: number) => {
    if (colorsMix.length <= 1) return;
    const newColorsMix = [...colorsMix];
    newColorsMix.splice(index, 1);
    setColorsMix(newColorsMix);
  };

  return (
    <div className="mt-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Color Mixer</CardTitle>
          <CardDescription>
            Mix colors using different interpolation modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div
              className="w-full rounded-lg border p-4 flex flex-col items-end gap-1"
              style={{ backgroundColor: colorPreview }}
              aria-label="Color preview"
            >
              <ColorCopyArea
                key="hex"
                format="hex"
                value={chroma(colorPreview).hex()}
                copied={copied === "hex"}
                onCopy={copyToClipboard}
              />

              {["rgb", "hsl", "oklch"].map((format) => (
                <ColorCopyArea
                  key={format}
                  format={format}
                  value={chroma(colorPreview).css(format as any)}
                  copied={copied === format}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>

            <div className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
              <div className="text-sm font-semibold text-gray-500">
                Blend Mode:
              </div>
              <Select onValueChange={handleBlendModeChange} defaultValue="rgb">
                <SelectTrigger className="w-[240px] rounded-lg border-gray-400 bg-gray-50 p-2.5 text-gray-600 focus-visible:ring-1 md:text-base dark:bg-gray-800 dark:text-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["rgb", "hsl", "hsv", "lab", "lch", "hcl"].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colorsMix.map((color, index) => (
                <ColorBox
                  key={index}
                  color={color.value}
                  mixingPercentage={color.percentage}
                  onChange={(color: string, percentage: number) => {
                    handleColorChange(color, percentage, index);
                  }}
                  onDelete={() => handleDelete(index)}
                />
              ))}

              <div
                className="flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm cursor-pointer"
                onClick={handleAddColor}
              >
                <CirclePlus className="size-8 text-gray-700" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ColorCopyArea({
  format,
  value,
  onCopy,
  copied,
}: {
  format: string;
  value: string;
  onCopy: (text: string, format: string) => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center justify-between bg-white/90 dark:bg-gray-900/90 rounded-full px-4 py-1 shadow-sm w-full max-w-[300px] text-sm">
      <div className="flex items-center gap-2">
        <span className="font-mono">{value}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 dark:hover:bg-gray-800 [&_svg]:size-4"
        onClick={() => onCopy(value, format)}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}

function ColorBox({
  color,
  mixingPercentage,
  onChange,
  onDelete,
}: {
  color: string;
  mixingPercentage: number;
  onChange: Function;
  onDelete: Function;
}) {
  const [inputColor, setInputColor] = useState(color);

  useEffect(() => {
    setInputColor(color);
  }, [color]);

  const handleColor = (newColor: string) => {
    setInputColor(newColor);
    if (chroma.valid(newColor)) {
      onChange(newColor, mixingPercentage);
    }
  };

  const handleMix = (number: number) => {
    if (number > 100) return;
    onChange(color, number);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="flex gap-4 flex-col items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
      <div className="relative w-full h-20">
        <div
          className="relative h-full w-full rounded"
          style={{ backgroundColor: color }}
        />
        <Button
          className="absolute top-2 right-2 bg-gray-800 text-gray-100 hover:bg-gray-800/95"
          size="sm"
          variant="default"
          onClick={handleDelete}
        >
          <Trash className="text-red-400" />
        </Button>
      </div>
      <div className="flex flex-col justify-between gap-2 items-center">
        <div className="flex justify-between items-center gap-2">
          <div>
            <ColorPicker
              color={inputColor}
              onColorChange={(e) => handleColor(e.target.value)}
            />
          </div>

          <Input
            type="text"
            className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
            value={inputColor}
            onChange={(e) => handleColor(e.target.value)}
          />
        </div>

        <div className="w-full">
          <Slider
            value={mixingPercentage}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleMix(value)}
          />
          <Input
            min={0}
            max={100}
            type="number"
            className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
            value={mixingPercentage}
            onChange={(e) => handleMix(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
