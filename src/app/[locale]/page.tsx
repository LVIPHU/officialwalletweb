import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/atoms/logo'
import { ThemeToggle } from '@/components/atoms/theme-toggle'
import { FeatureCard } from '@/components/molecules/feature-card'
import { FEATURES, TESTIMONIALS, CRYPTOCURRENCIES } from '@/constants/landing.constants'

export default function Home() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-background/90 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-border">
        <Logo />
        
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#about" className="px-4 py-2 hover:text-primary transition-colors">
                  {t('navigation.about')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#features" className="px-4 py-2 hover:text-primary transition-colors">
                  {t('navigation.features')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#download" className="px-4 py-2 hover:text-primary transition-colors">
                  {t('navigation.download')}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <ThemeToggle />
          
          <Button className="tb-button-primary">
            {t('navigation.getStarted')}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title')}<br />
              <span className="text-primary">{t('hero.subtitle')}</span><br />
              experience
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="tb-button-primary text-lg px-8 py-4">
                {t('hero.primaryAction')}
              </Button>
              <Button variant="outline" size="lg" className="border-border text-foreground hover:border-primary hover:text-primary text-lg px-8 py-4">
                {t('hero.secondaryAction')}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <Card className="w-64 h-96 tb-card">
                <CardContent className="p-6">
                  <div className="w-full h-8 bg-primary rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="w-3/4 h-4 bg-muted rounded"></div>
                    <div className="w-1/2 h-4 bg-muted rounded"></div>
                    <div className="w-2/3 h-4 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="absolute -top-4 -right-4 w-48 h-48 tb-card shadow-2xl">
              <div className="p-4">
                <div className="w-full h-6 bg-primary rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="w-2/3 h-3 bg-muted rounded"></div>
                  <div className="w-1/2 h-3 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="w-80 h-96 tb-card mx-auto">
              <CardContent className="p-6">
                <div className="w-full h-8 bg-primary rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="w-3/4 h-4 bg-muted rounded"></div>
                  <div className="w-1/2 h-4 bg-muted rounded"></div>
                  <div className="w-2/3 h-4 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
            <div>
              <h3 className="text-3xl font-bold mb-6">{t('about.builtForFuture')}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.builtDescription')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Badge className="bg-primary text-primary-foreground"></Badge>
                  <span>{t('about.features.security')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Badge className="bg-primary text-primary-foreground"></Badge>
                  <span>{t('about.features.platform')}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Badge className="bg-primary text-primary-foreground"></Badge>
                  <span>{t('about.features.support')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('features.description')}
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
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t('platform.title')}</h2>
          <p className="text-xl text-muted-foreground mb-12">
            {t('platform.description')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {CRYPTOCURRENCIES.map((crypto) => (
              <Badge key={crypto.symbol} variant="outline" className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-border hover:border-primary transition-colors">
                {crypto.symbol}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('testimonials.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="tb-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {testimonial.initials}
                      </span>
                    </Badge>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t('download.title')}</h2>
          <p className="text-xl text-muted-foreground mb-12">
            {t('download.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="outline" size="lg" className="bg-background text-foreground border-border hover:border-primary hover:text-primary text-lg px-8 py-4">
              <span className="text-2xl mr-3"></span>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">{t('download.appStore.label')}</div>
                <div className="text-lg font-bold">{t('download.appStore.store')}</div>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="bg-background text-foreground border-border hover:border-primary hover:text-primary text-lg px-8 py-4">
              <span className="text-2xl mr-3"></span>
              <div className="text-left">
                <div className="text-sm text-muted-foreground">{t('download.googlePlay.label')}</div>
                <div className="text-lg font-bold">{t('download.googlePlay.store')}</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Footer */}
      <footer className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.product.title')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.product.features')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.product.security')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.product.pricing')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.product.api')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.support.title')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.support.helpCenter')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.support.contactUs')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.support.status')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.support.community')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.legal.title')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.legal.cookies')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.legal.compliance')}</a></li>
              </ul>
            </div>
          </div>
          <Separator className="bg-border my-8" />
          <div className="text-center text-muted-foreground">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
