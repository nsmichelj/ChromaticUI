import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { detectColorFormat } from "@/utils/detectColorFormat";
import chroma from "chroma-js";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConverterColor() {
  const [inputColor, setInputColor] = useState("#000000");
  const [colorPreview, setColorPreview] = useState("#000000");
  const [colorFormat, setColorFormat] = useState("hex");
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const color = chroma.random().hex();
    setColorPreview(color);
    setInputColor(color);
    setColorFormat("hex");
    setError(false);
  }, []);

  const handleInputColor = (color: string) => {
    setInputColor(color);

    if (color === "") return;

    const [format, colorParsed] = detectColorFormat(color);

    if (chroma.valid(colorParsed) && format !== null && colorParsed !== null) {
      setColorPreview(chroma(colorParsed).hex());
      setColorFormat(format);
      setError(false);
    } else {
      setError(true);
    }
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(""), 1000);
  };

  const ColorBox = ({ format, value }: { format: string; value: string }) => (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded" style={{ backgroundColor: value }} />
        <span className="font-mono">{value}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 [&_svg]:size-5"
        onClick={() => copyToClipboard(value, format)}
      >
        {copied === format ? <Check /> : <Copy />}
      </Button>
    </div>
  );

  return (
    <div className="mt-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Color Format Converter</CardTitle>
          <CardDescription>
            Enter a color in any format (HEX, RGB, HSL, OKLCH, name).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div
              className="w-full h-32 rounded-lg border"
              style={{ backgroundColor: colorPreview }}
              aria-label="Color preview"
            />

            <div className="grid gap-2">
              <label
                htmlFor="inputColor"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                <span className="flex items-center justify-start gap-2">
                  Color{" "}
                  <span className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded-lg border border-gray-200 dark:border-gray-700">
                    {colorFormat}
                  </span>
                </span>
              </label>
              <Input
                id="inputColor"
                value={inputColor}
                onChange={(e) => handleInputColor(e.target.value)}
                placeholder="Enter a color (e.g., #ff0000, rgb(255 0 0), red)"
                className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
              />

              {error && (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  Unrecognized color format
                </div>
              )}

              <p className="text-sm text-muted-foreground mt-1">
                Examples of accepted formats: #ff0000, rgb(255 0 0), hsl(0deg
                100% 50%), oklch(62.8% 0.26 29.23deg), color names (red)
              </p>
            </div>

            <div className="space-y-3">
              <ColorBox format="hex" value={chroma(colorPreview).hex()} />
              <ColorBox format="rgb" value={chroma(colorPreview).css("rgb")} />
              <ColorBox format="hsl" value={chroma(colorPreview).css("hsl")} />
              <ColorBox
                format="oklch"
                value={chroma(colorPreview).css("oklch")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
