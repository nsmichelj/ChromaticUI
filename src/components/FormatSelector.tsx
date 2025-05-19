import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { $selectedColorFormat } from "@/stores/color";
import type { ColorFormat } from "@/types/styleFormats";
import { useStore } from "@nanostores/react";

const formats: ColorFormat[] = ["hex", "rgb", "hsl", "oklch"];

export default function FormatSelector() {
  const selectedColorFormat = useStore($selectedColorFormat);

  const handleSelectedColor = (format: ColorFormat) => {
    $selectedColorFormat.set(format);
  };

  return (
    <div className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
      <div className="text-sm font-semibold text-gray-500">Copy as:</div>
      <Select
        onValueChange={handleSelectedColor}
        defaultValue="hex"
        value={selectedColorFormat}
      >
        <SelectTrigger className="w-[100px] rounded-lg border-gray-400 bg-gray-50 p-2.5 text-gray-600 focus-visible:ring-1 md:text-base dark:bg-gray-800 dark:text-gray-50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formats.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
