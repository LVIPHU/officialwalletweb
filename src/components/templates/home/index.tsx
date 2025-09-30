import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/atoms/logo"
import { ThemeToggle } from "@/components/atoms/theme-toggle"
import { FeatureCard } from "@/components/molecules/feature-card"
import { FEATURES, TESTIMONIALS, CRYPTOCURRENCIES } from "@/constants/landing.constants"

export default function HomeTemplate() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            True crypto ownership.<br />
                            <span className="text-white">Powerful Web3</span><br />
                            experiences
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Unlock the power of your cryptocurrency assets and explore the world of Web3 with Trust Wallet.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-transparent border-2 border-purple-400 text-blue-900 hover:bg-purple-50 text-lg px-8 py-4 rounded-lg flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span>Download Mobile App</span>
                            </Button>
                            <Button className="bg-transparent border-2 border-purple-400 text-blue-900 hover:bg-purple-50 text-lg px-8 py-4 rounded-lg flex items-center space-x-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Download Extension</span>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Phone with Icons */}
                    <div className="relative flex justify-center items-center">
                        <div className="relative">
                            {/* Phone Outline */}
                            <div className="w-64 h-96 border-4 border-black rounded-3xl relative bg-transparent">
                                {/* Home Button */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"></div>
                            </div>

                            {/* Icons around phone */}
                            {/* Top Left - Chat Icon */}
                            <div className="absolute -top-8 -left-8 w-16 h-16 bg-green-600 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                                </svg>
                            </div>

                            {/* Bottom Left - Person Icon */}
                            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>

                            {/* Top Right - Ledger Icon */}
                            <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                </svg>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>

                            {/* Bottom Right - Coins Icon */}
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>

                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500">
                                <path
                                    d="M 80 80 Q 200 200 320 80"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                />
                                <path
                                    d="M 80 420 Q 200 300 320 420"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray="5,5"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-6 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">About</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            TB Wallet is revolutionizing cryptocurrency management. Our platform combines cutting-edge security with an intuitive user experience.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Card className="w-80 h-96 bg-gray-700 border-gray-600 mx-auto">
                            <CardContent className="p-6">
                                <div className="w-full h-8 bg-green-500 rounded-lg mb-4"></div>
                                <div className="space-y-3">
                                    <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
                                    <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                                    <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
                                </div>
                            </CardContent>
                        </Card>
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-white">Built for the Future</h3>
                            <p className="text-lg text-gray-300 mb-6">
                                Our advanced technology ensures your assets are always secure while providing lightning-fast transactions and seamless user experience across all devices.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">Bank-level security</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">Multi-platform support</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <Badge className="bg-green-500 text-white"></Badge>
                                    <span className="text-white">24/7 customer support</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 px-6 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">Features</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Discover the powerful features that make TB Wallet the perfect choice for managing your digital assets.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {FEATURES.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* One Platform, Millions of Assets */}
            <section className="py-16 px-6 bg-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">One Platform, Millions of Assets</h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Access thousands of cryptocurrencies and digital assets from a single, secure platform.
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {CRYPTOCURRENCIES.map((crypto) => (
                            <Badge key={crypto.symbol} variant="outline" className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-gray-600 text-white hover:border-green-500 transition-colors">
                                {crypto.symbol}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Testimonials */}
            <section className="py-16 px-6 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-6 text-white">Community talk about us</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Join thousands of satisfied users who trust TB Wallet for their cryptocurrency needs.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((testimonial) => (
                            <Card key={testimonial.id} className="bg-gray-700 border-gray-600">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <Badge className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.initials}
                      </span>
                                        </Badge>
                                        <div>
                                            <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                                            <p className="text-gray-300">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">"{testimonial.content}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="py-16 px-6 bg-gray-900">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Download now</h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Get started with TB Wallet today and experience the future of cryptocurrency management.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button variant="outline" size="lg" className="bg-gray-800 text-white border-gray-600 hover:border-green-500 hover:text-green-400 text-lg px-8 py-4">
                            <span className="text-2xl mr-3">📱</span>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Download on the</div>
                                <div className="text-lg font-bold">App Store</div>
                            </div>
                        </Button>
                        <Button variant="outline" size="lg" className="bg-gray-800 text-white border-gray-600 hover:border-green-500 hover:text-green-400 text-lg px-8 py-4">
                            <span className="text-2xl mr-3">🤖</span>
                            <div className="text-left">
                                <div className="text-sm text-gray-400">Get it on</div>
                                <div className="text-lg font-bold">Google Play</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </section>
            <Separator className="bg-gray-700" />
        </div>
    )
}