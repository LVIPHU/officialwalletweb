import {Button} from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"

export default function Header() {
    return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900/90 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-gray-800">
        {/* Logo */}
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">
                T3
            </div>
            <span className="text-green-500 font-bold text-xl">Wallet</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#wallet" className="px-4 py-2 hover:text-green-400 transition-colors text-white">
                            Wallet
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#features" className="px-4 py-2 hover:text-green-400 transition-colors text-white">
                            Features
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#build" className="px-4 py-2 hover:text-green-400 transition-colors text-white">
                            Build
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#support" className="px-4 py-2 hover:text-green-400 transition-colors text-white">
                            Support
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#about" className="px-4 py-2 hover:text-green-400 transition-colors text-white">
                            About
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Share Icon */}
            <div className="w-6 h-6 text-white hover:text-green-400 transition-colors cursor-pointer">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
            </div>

            {/* Language Button */}
            <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Language
            </Button>

            {/* Download Button */}
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Download
            </Button>
        </div>
    </nav>
    )
}