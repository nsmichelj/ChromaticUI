import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Blend, Palette } from "lucide-react";


export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-bold">
            Herramientas
          </NavigationMenuTrigger>
          <NavigationMenuContent>
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}