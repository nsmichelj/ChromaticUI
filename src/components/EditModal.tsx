import { useEffect, useState } from "react";
import { $color, $palette } from "@/stores/color";
import { toast } from "sonner";

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
import ColorSample from "@/components/ColorSample";
import Slider from "@/components/Slider";
import chroma from "chroma-js";

export default function EditModal() {
  const color = useStore($color);
  const palette = useStore($palette);
  const [selectedColor, setSelectedColor] = useState({
    color,
    index: palette.indexOf(color),
  });
  const [colorConfig, setColorConfig] = useState(() => {
    if (!chroma.valid(color)) return { hue: 0, saturation: 0, lightness: 0 };
    return {
      hue: chroma(color).hsl()[0],
      saturation: chroma(color).hsl()[1] * 100,
      lightness: chroma(color).hsl()[2] * 100,
    };
  });

  useEffect(() => {
    if (!chroma.valid(color)) return;
    updateSelectedColor(color, palette.indexOf(color));
  }, [color]);

  const updateSelectedColor = (color: string, index: number) => {
    setSelectedColor({ color, index });
    const [hue, saturation, lightness] = chroma(color).hsl();
    setColorConfig({
      hue,
      saturation: saturation * 100,
      lightness: lightness * 100,
    });
  };

  const handleEditColor = (
    value: number[],
    parameter: "hue" | "saturation" | "lightness"
  ) => {
    const updatedColorConfig = { ...colorConfig, [parameter]: value[0] };
    setColorConfig(updatedColorConfig);

    const newColor = chroma(
      updatedColorConfig.hue,
      updatedColorConfig.saturation / 100,
      updatedColorConfig.lightness / 100,
      "hsl"
    ).hex();

    setSelectedColor((prev) => ({ ...prev, color: newColor }));
  };

  const handleSelectColor = (color: string, index: number) => {
    updateSelectedColor(color, index);
  };

  const handleSaveColor = () => {
    const newPalette = [...palette];
    newPalette[selectedColor.index] = selectedColor.color;
    $palette.set(newPalette);
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast(
      <div className="flex items-center">
        <div
          className="size-6 rounded-full inline-flex"
          style={{ background: color }}
        />
        <div className="ms-3 text-sm font-normal">
          Color {color} copied to clipboard
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  const getSliderBackground = (type: "lightness" | "saturation" | "hue") => {
    switch (type) {
      case "lightness":
        return `linear-gradient(to right, #000000, hsl(${colorConfig.hue}, ${colorConfig.saturation}%, 50%), #ffffff)`;
      case "saturation":
        return `linear-gradient(to right, hsl(${colorConfig.hue}, 0%, ${colorConfig.lightness}%), hsl(${colorConfig.hue}, 100%, ${colorConfig.lightness}%))`;
      case "hue":
        return `linear-gradient(to right, 
          hsl(0, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(60, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(120, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(180, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(240, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(300, ${colorConfig.saturation}%, ${colorConfig.lightness}%),
          hsl(360, ${colorConfig.saturation}%, ${colorConfig.lightness}%)
        )`;
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg font-semibold dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] w-[700px]">
          <DialogHeader>
            <DialogTitle>Adjust your color palette</DialogTitle>
            <DialogDescription>
              Customize and refine your design's colors using HSL (Hue,
              Saturation, Lightness) values.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full">
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {palette.map((color, index) => (
                <div key={index}>
                  <ColorSample
                    color={color}
                    onClick={() => handleSelectColor(color, index)}
                    selected={index === selectedColor.index}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6 w-[80%] mx-auto my-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div
                className={`size-28 rounded-lg shadow-xs transition-transform hover:scale-105`}
                style={{ backgroundColor: selectedColor.color }}
                onClick={() => handleCopyColor(selectedColor.color)}
              />
              <div className="text-sm text-center text-gray-500 font-bold">
                {selectedColor.color.toUpperCase()}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex justify-center gap-4">
                <div>H: {Math.round(colorConfig.hue)}°</div>
                <div>S: {Math.round(colorConfig.saturation)}%</div>
                <div>L: {Math.round(colorConfig.lightness)}%</div>
              </div>

              <div className="w-full">
                <Slider
                  value={colorConfig.hue}
                  max={360}
                  min={0}
                  step={0.1}
                  onValueChange={(value) => handleEditColor([value], "hue")}
                  style={{ background: getSliderBackground("hue") }}
                  thumbProps={{ style: { background: selectedColor.color } }}
                />
                <Slider
                  value={colorConfig.saturation}
                  max={100}
                  min={0}
                  step={0.1}
                  onValueChange={(value) =>
                    handleEditColor([value], "saturation")
                  }
                  style={{ background: getSliderBackground("saturation") }}
                  thumbProps={{ style: { background: selectedColor.color } }}
                />
                <Slider
                  value={colorConfig.lightness}
                  max={100}
                  min={0}
                  step={0.1}
                  onValueChange={(value) =>
                    handleEditColor([value], "lightness")
                  }
                  style={{ background: getSliderBackground("lightness") }}
                  thumbProps={{ style: { background: selectedColor.color } }}
                />
              </div>
            </div>
          </div>
          <Button
            className="mx-auto -top-0 -right-10 [&_svg]:size-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleSaveColor}
            size="default"
            variant="outline"
          >
            Apply
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
