import chroma from "chroma-js";
import ColorThief from "colorthief";
import { Palette, Undo2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import { toast } from "sonner";

import ColorSample from "@/components/ColorSample";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveColor } from "@/stores/color";

export default function ExportModal() {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [palette, setPalette] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const colorThief = new ColorThief();
        try {
          let palette = colorThief.getPalette(img);
          setPalette(palette.map((color) => chroma(color).hex()));
        } catch (error) {
          toast.error("Failed to extract colors from the image.");
        }
      };
    } catch (error) {
      toast.error("Failed to extract colors from the image.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast(
      <div className="flex items-center">
        <div
          className="size-6 rounded-full inline-flex"
          style={{ background: color }}
        />
        <div className="ms-3 text-sm font-normal">
          Color {color} copied to clipboard.
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  const handleImport = () => {
    palette.forEach((color) => {
      saveColor(color);
    });
    toast(
      <div className="flex items-center">
        <Palette className="size-6" />
        <div className="ms-3 text-sm font-normal">
          Color palette imported successfully.
        </div>
      </div>,
      {
        duration: 2000,
      }
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="px-4 py-2 rounded-lg font-semibold dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Import
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] w-[700px]">
          <DialogHeader>
            <DialogTitle>Import Color Palette</DialogTitle>
            <DialogDescription>
              Select an image from your device to extract its color palette.
            </DialogDescription>
          </DialogHeader>

          {imagePreview ? (
            <div className="flex justify-center flex-col gap-4">
              <div>
                <img
                  src={imagePreview}
                  title="Preview image"
                  alt="Preview image"
                  className="max-h-96 mx-auto rounded-md drop-shadow-md"
                />
              </div>

              <TooltipProvider>
                <div className="flex flex-wrap justify-center gap-4">
                  {palette.map((color, index) => (
                    <Tooltip delayDuration={150} key={index}>
                      <TooltipTrigger>
                        <ColorSample
                          color={color}
                          onClick={() => handleCopyColor(color)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="font-semibold">{color}</span>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>

              <Button
                className="mx-auto -top-0 -right-10 [&_svg]:size-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={handleImport}
                variant="outline"
              >
                Import Palette
              </Button>

              <Button
                className="mx-auto -top-0 -right-10 [&_svg]:size-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => {
                  setImagePreview("");
                  setPalette([]);
                }}
                size="icon"
                variant="outline"
              >
                <Undo2 />
              </Button>
            </div>
          ) : (
            <Card
              {...getRootProps()}
              className={`p-8 border-2 border-dashed cursor-pointer transition-colors ${
                isDragActive ? "border-primary" : "border-muted"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  {isDragActive ? (
                    <p className="text-lg font-medium">
                      Drop your image here...
                    </p>
                  ) : (
                    <p className="text-lg font-medium">
                      Drag and drop your image here...
                    </p>
                  )}
                </div>

                <Button variant="secondary" className="text-lg font-medium">
                  Or click to select one
                </Button>
              </div>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
