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
            Herramientas
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/converter">
              <span className="flex items-center justify-start gap-2">
                <Palette /> Convertidor
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="/mixer">
              <span className="flex items-center justify-start gap-2">
                <Blend /> Mezclador
              </span>
            </NavigationMenuLink>
            <NavigationMenuLink href="/contrast-check">
              <span className="flex items-center justify-start gap-2">
                <Contrast /> Analizador de contraste
              </span>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}