import { useStore } from "@nanostores/react";
import chroma from "chroma-js";
import { Bookmark, BookmarkCheck, Copy, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

import ColorPicker from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { $color, $savedColors, removeColor, saveColor } from "@/stores/color";

export default function ColorSelector() {
  const savedColors = useStore($savedColors);
  const color = useStore($color);
  const [localColor, setLocalColor] = useState(color);

  useEffect(() => {
    const random = chroma.random().hex();
    $color.set(random);
    setLocalColor(random);
  }, []);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handleSetColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalColor(value);
    if (chroma.valid(value)) {
      $color.set(value);
    }
  };

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalColor(value);
    if (chroma.valid(value)) {
      $color.set(value);
    }
  };

  const handleRandomColor = () => {
    const random = chroma.random().hex();
    $color.set(random);
    setLocalColor(random);
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
          <ColorPicker color={localColor} onColorChange={handleColorPicker} />
        </div>

        <Input
          type="text"
          className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
          value={localColor}
          onChange={handleSetColor}
        />

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 [&_svg]:size-5"
          onClick={handleCopyColor}
        >
          <Copy />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 [&_svg]:size-5"
          onClick={handleRandomColor}
        >
          <RotateCcw />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 [&_svg]:size-5"
          onClick={handleSaveColor}
        >
          {savedColors.includes(color) ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </div>
    </div>
  );
}
