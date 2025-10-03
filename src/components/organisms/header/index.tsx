'use client';
import {Button} from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import {SidebarTrigger} from "@/components/ui/sidebar";
import {cn} from "@/lib/styles";
import {SITE_METADATA} from "@/constants/site-metadata.constants";
import {Logo} from "@/components/atoms/logo";
import {useState} from "react";
import {useScroll} from "@/hooks/use-scroll";
import {ThemeSwitch} from "@/components/molecules/theme-switch";

export default function Header() {
    const [hasScrolled, setHasScrolled] = useState(false)

    useScroll(({ scroll }) => {
        if (scroll === 0) return setHasScrolled(false);
        return setHasScrolled(scroll > 10);
    })

    return (
        <header
            className={cn(
                'mx-auto w-full px-4 sm:px-6 xl:px-12',
                'transition-all duration-300 ease-in-out',
                'shadow-xs saturate-100 py-2',
                hasScrolled
                    ? 'max-w-6xl rounded-2xl bg-white/80 backdrop-blur-xl dark:bg-white/10 shadow-md'
                    : 'container rounded-3xl bg-transparent backdrop-blur-none shadow-none',
                SITE_METADATA.stickyNav ? 'sticky top-2 z-10 lg:top-3' : 'mt-2 lg:mt-3',
            )}
        >
            <div className="flex items-center justify-between gap-3">
                {/* Logo */}
                <Logo/>

                {/* Navigation Links */}
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#wallet">Wallet</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#features">Features</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#build">Build</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#support">Support</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="#about">About</NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeSwitch/>

                    {/* Language Button */}
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                        Language
                    </Button>

                    {/* Download Button */}
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2">
                        Download
                    </Button>
                </div>

                {/* Sidebar Trigger for Mobile */}
                <SidebarTrigger className={'md:hidden'} />
            </div>
        </header>
    )
}
