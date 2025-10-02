'use client';
import {Button} from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Container} from "@/components/atoms/container";
import {cn} from "@/lib/styles";
import {SITE_METADATA} from "@/constants/site-metadata.constants";
import {Logo} from "@/components/atoms/logo";
import {useState} from "react";
import {useScroll} from "@/hooks/use-scroll";

export default function Header() {
    const [hasScrolled, setHasScrolled] = useState<boolean>(false)

    useScroll(({ scroll }) => {
        return setHasScrolled(scroll > 10);
    })

    return (
    <Container
        as={'header'}
        className={cn(
            'shadow-xs saturate-100 md:rounded-2xl',
            'py-2 transition-all duration-300 ease-in-out lg:py-4',
            hasScrolled ? 'bg-white/0 backdrop-blur-xl dark:bg-white/10' : 'bg-transparent backdrop-blur-none',
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
                            <NavigationMenuLink href="#wallet">
                                Wallet
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#features">
                                Features
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#build">
                                Build
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#support">
                                Support
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#about">
                                About
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="hidden md:flex items-center gap-3">
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
            <SidebarTrigger  className={'md:hidden'}/>
        </div>
    </Container>
    )
}