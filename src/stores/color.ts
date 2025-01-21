import { atom } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const $color = atom<string>("#000000");
export const $palette = atom<string[]>([]);
export const $savedColors = persistentAtom<string[]>("chomaticui-saved-colors", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});
export const $importedColors = atom<string[]>([]);

export function saveColor(color:string) {
  if (!$savedColors.get().includes(color)) {
    $savedColors.set([...$savedColors.get(), color]);
  }
}

export function removeColor(color:string) {
  $savedColors.set($savedColors.get().filter(c => c !== color));
}
