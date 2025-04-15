import chroma from "chroma-js";
import React, { useEffect, useState } from "react";

import "@/styles/ColorSelector.module.css";

interface ColorPickerProps {
  color: string;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const processColor = (inputColor: string): string => {
  if (!chroma.valid(inputColor)) {
    return "#000000";
  }
  return chroma(inputColor).hex();
};

export default function ColorPicker({
  color: propColor,
  onColorChange,
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState<string>(() =>
    processColor(propColor)
  );

  useEffect(() => {
    const processedColor = processColor(propColor);
    setCurrentColor(processedColor);
  }, [propColor]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    const processedColor = processColor(newColor);
    setCurrentColor(processedColor);
    onColorChange(event);
  };

  return (
    <input
      type="color"
      title="color"
      className="size-8 rounded-full appearance-none cursor-pointer border-4 border-gray-50 ring-1 ring-gray-200 overflow-hidden dark:border-gray-700 dark:ring-gray-800"
      value={currentColor}
      onChange={handleColorChange}
    />
  );
}
