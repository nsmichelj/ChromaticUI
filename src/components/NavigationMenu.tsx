import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Blend, Contrast, Palette } from "lucide-react";


export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-bold">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/converter">
              <span className="flex items-center justify-start gap-2">
                <Palette /> Converter
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="/mixer">
              <span className="flex items-center justify-start gap-2">
                <Blend /> Mixer
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="/contrast-check">
              <span className="flex items-center justify-start gap-2">
                <Contrast /> Contrast Analyzer
              </span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}