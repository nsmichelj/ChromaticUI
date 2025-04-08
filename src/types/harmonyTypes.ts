export type HarmonyType =
  | "auto"
  | "analogous"
  | "complementary"
  | "triadic"
  | "tetradic"
  | "square"
  | "split-complementary";

export type HarmonyOption = {
  value: HarmonyType;
  label: string;
  minColors?: number;
};

export type HarmonyParams = {
  h: number;
  s: number;
  l: number;
  numberColors: number;
};
