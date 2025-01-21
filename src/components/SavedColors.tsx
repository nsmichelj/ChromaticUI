import { BookmarkX } from "lucide-react";
import { useStore } from "@nanostores/react";

import { $color, $savedColors, removeColor } from "@/stores/color";
import { Button } from "@/components/ui/button";
import ColorSample from "@/components/ColorSample";

export default function SavedColors() {
  const color = useStore($color);
  const savedColors = useStore($savedColors);

  const handleSelectColor = (color: string) => {
    $color.set(color);
  };

  return (
    <div className="py-4 flex justify-center gap-4 flex-wrap">
      {savedColors.length > 0 ? (
        savedColors.map((color) => (
          <div className="relative group" key={color}>
            <ColorSample color={color} onClick={() => handleSelectColor(color)}>
              <Button
                size="icon"
                className="absolute size-6 bg-gray-100 -top-3 -right-3 rounded-full opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100"
                onClick={() => removeColor(color)}
              >
                <BookmarkX className="text-red-500" />
              </Button>
            </ColorSample>
          </div>
        ))
      ) : (
        <ColorSample color={color} onClick={() => handleSelectColor(color)} />
      )}
    </div>
  );
}
