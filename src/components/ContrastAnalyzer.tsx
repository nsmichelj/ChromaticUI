import chroma from "chroma-js";
import { Check, MoveHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

import ColorPicker from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contrastCheck } from "@/utils/contrastCheck";

export default function ContrastAnalyzer() {
  const [backgroundColor, setBackgroundColor] = useState("#191919");
  const [foregroundColor, setForegroundColor] = useState("#cccccc");
  const [contrastResult, setContrastResult] = useState({
    ratio: 10.95,
    compliance: {
      aaSmall: true,
      aaLarge: true,
      aaaSmall: true,
      aaaLarge: true,
    },
  });

  useEffect(() => {
    if (chroma.valid(backgroundColor) && chroma.valid(foregroundColor)) {
      setContrastResult(contrastCheck(backgroundColor, foregroundColor));
    }
  }, [backgroundColor, foregroundColor]);

  const handleChangeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  const handleChangeForegroundColor = (color: string) => {
    setForegroundColor(color);
  };

  const handleInvertColors = () => {
    const copyBackgroundColor = backgroundColor;
    setBackgroundColor(foregroundColor);
    setForegroundColor(copyBackgroundColor);
  };

  return (
    <div className="mt-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contrast Analyzer</CardTitle>
          <CardDescription>
            Evaluate the accessibility of your color combinations according to WCAG (Web Content Accessibility Guidelines) standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div
              className="w-full rounded-lg border p-4"
              style={{ backgroundColor: backgroundColor }}
              aria-label="Color preview"
            >
              <p className="my-4 text-lg" style={{ color: foregroundColor }}>
                Normal text example (16px)
              </p>

              <p
                className="my-4 text-3xl font-bold"
                style={{ color: foregroundColor }}
              >
                Large text example (24px)
              </p>
            </div>

            <p className="text-lg text-gray-800 dark:text-gray-100">
              Contrast ratio:{" "}
              <span className="font-bold">{contrastResult.ratio}:1</span>
            </p>

            <ComplianceResult compliance={contrastResult.compliance} />

            <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
              <div className="w-full">
                <label
                  htmlFor="backgroundColor"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Background color
                </label>
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <ColorPicker
                      color={backgroundColor}
                      onColorChange={(e) =>
                        handleChangeBackgroundColor(e.target.value)
                      }
                    />
                  </div>

                  <Input
                    id="backgroundColor"
                    value={backgroundColor}
                    onChange={(e) =>
                      handleChangeBackgroundColor(e.target.value)
                    }
                    placeholder="Enter a color (e.g., #ff0000, rgb(255 0 0), red)"
                    className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
                  />
                </div>
              </div>

              <div className="w-[100px] flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex px-4 py-2 rounded-lg font-semibold dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer "
                  onClick={handleInvertColors}
                >
                  <MoveHorizontal className="rotate-90 sm:rotate-none" />
                </Button>
              </div>

              <div className="w-full">
                <label
                  htmlFor="foregroundColor"
                  className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >
                  Text color
                </label>

                <div className="flex justify-between items-center gap-2">
                  <div>
                    <ColorPicker
                      color={foregroundColor}
                      onColorChange={(e) =>
                        handleChangeForegroundColor(e.target.value)
                      }
                    />
                  </div>

                  <Input
                    id="foregroundColor"
                    value={foregroundColor}
                    onChange={(e) =>
                      handleChangeForegroundColor(e.target.value)
                    }
                    placeholder="Enter a color (e.g., #ff0000, rgb(255 0 0), red)"
                    className="text-gray-600 text-base md:text-base rounded-lg p-2.5 bg-gray-50 font-semibold dark:bg-gray-800 dark:text-gray-50 border-gray-400 focus-visible:ring-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ComplianceCheck({
  label,
  compliant,
}: {
  label: string;
  compliant: boolean;
}) {
  return (
    <div className="flex justify-start items-center gap-4">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center 
      ${compliant ? "bg-green-500" : "bg-red-500"}`}
      >
        {compliant ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <X className="w-4 h-4 text-white" />
        )}
      </div>
      <span className="text-gray-800 dark:text-gray-100">{label}</span>
    </div>
  );
}

interface Compliance {
  aaSmall: boolean;
  aaLarge: boolean;
  aaaSmall: boolean;
  aaaLarge: boolean;
}

function ComplianceResult({ compliance }: { compliance: Compliance }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ComplianceCheck
          label="AA Normal Text"
          compliant={compliance.aaSmall}
        />
        <ComplianceCheck label="AA Large Text" compliant={compliance.aaLarge} />
        <ComplianceCheck
          label="AAA Normal Text"
          compliant={compliance.aaaSmall}
        />
        <ComplianceCheck
          label="AAA Large Text"
          compliant={compliance.aaaLarge}
        />
      </div>
    </div>
  );
}
