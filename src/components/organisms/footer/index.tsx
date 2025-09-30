import {Separator} from "@/components/ui/separator";

export default function Footer() {
    return (
    <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">
                            T3
                        </div>
                        <span className="text-green-500 font-bold text-xl">Wallet</span>
                    </div>
                    <p className="text-gray-300">
                        The most secure and user-friendly cryptocurrency wallet platform.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Product</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Security</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">API</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Support</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Status</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Community</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-white">Legal</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Compliance</a></li>
                    </ul>
                </div>
            </div>
            <Separator className="bg-gray-700 my-8" />
            <div className="text-center text-gray-300">
                <p>© 2024 TB Wallet. All rights reserved.</p>
            </div>
        </div>
    </footer>
    )
}