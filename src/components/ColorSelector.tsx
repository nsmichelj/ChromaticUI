import React, { useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Copy,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@nanostores/react";
import chroma from "chroma-js";

import { $color, $savedColors, saveColor, removeColor } from "@/stores/color";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "@/styles/ColorSelector.module.css";

export default function ColorSelector() {
  const savedColors = useStore($savedColors);
  const color = useStore($color);

  useEffect(() => {
    $color.set(chroma.random().hex());
  }, []);

  const handleSetColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    $color.set(e.target.value);
  };

  const handleRandomColor = () => {
    $color.set(chroma.random().hex());
  };

  const handleCopyColor = () => {
    navigator.clipboard.writeText(color);
  };

  const handleSaveColor = () => {
    if (savedColors.includes(color)) {
      removeColor(color);
      return;
    }
    saveColor(color);
  };

  return (
    <div>
      <div className="flex justify-between gap-2 items-center my-8">
        <div>
          <input
            type="color"
            title="color"
            className="size-8 rounded-full appearance-none cursor-pointer border-4 border-white ring-2 ring-gray-200 overflow-hidden"
            value={color}
            onChange={handleSetColor}
          />
        </div>

        <Input
          type="text"
          className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold"
          value={color}
          onChange={handleSetColor}
        />

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 [&_svg]:size-5"
          onClick={handleCopyColor}
        >
          <Copy />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 [&_svg]:size-5"
          onClick={handleRandomColor}
        >
          <RotateCcw />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 [&_svg]:size-5"
          onClick={handleSaveColor}
        >
          {savedColors.includes(color) ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </div>
    </div>
  );
}
