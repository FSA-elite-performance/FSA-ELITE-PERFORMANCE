"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  CheckCircle,
  Star,
  BookOpen,
  ShoppingBag,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Trophy,
  Bot,
  Users,
} from "lucide-react"

const TRAINING_MODULES = [
  "Cold Call Mastery",
  "Objection Handling",
  "Closing Techniques",
  "Follow-Up Systems",
  "CRM Integration",
  "Negotiation Power",
]

const TESTIMONIALS = [
  {
    name: "Marcus J.",
    role: "Automotive - BMW",
    quote: "Went from 8 to 22 units my first month.",
  },
  {
    name: "Sarah W.",
    role: "Insurance Sales",
    quote: "Best investment I have ever made. Period.",
  },
  {
    name: "David C.",
    role: "Real Estate",
    quote: "My close rate jumped 40% in 2 weeks.",
  },
]

const FEATURES = [
  { icon: BookOpen, label: "18+ Training Modules" },
  { icon: Bot, label: "AI Sales Coach" },
  { icon: Users, label: "Elite Community" },
  { icon: Trophy, label: "Lifetime Access" },
]

const STORE_ITEMS = [
  "Exclusive FSA Polos & Tees",
  "Premium Caps & Accessories",
  "20% Member Discount",
]

interface LandingPageProps {
  onEnterApp: (section?: string) => void
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("fsa-member", "true")
      localStorage.setItem("fsa-email", email)
      onEnterApp()
    }
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (email && password && name) {
      localStorage.setItem("fsa-email", email)
      localStorage.setItem("fsa-name", name)
      onEnterApp("membership")
    }
  }

  function openLogin() {
    setShowLogin(true)
    setShowSignup(false)
  }

  function openSignup() {
    setShowSignup(true)
    setShowLogin(false)
  }

  function closeModals() {
    setShowLogin(false)
    setShowSignup(false)
  }

  const isModalOpen = showLogin || showSignup

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg"
      >
        {"Skip to content"}
      </a>

      {renderHeader()}
      {isModalOpen && renderModal()}

      <main id="main-content">
        {renderHero()}
        {renderTrainingSection()}
        {renderFeaturesStrip()}
        {renderStoreSection()}
        {renderTestimonials()}
        {renderFinalCTA()}
      </main>

      {renderFooter()}
    </div>
  )

  function renderHeader() {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary/30 shadow-sm">
              <Image
                src="/images/fsa-logo-main.png"
                alt="FSA Elite Performance"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-tight">
                {"FSA "}<span className="text-primary">{"Elite"}</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                {"Performance"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-foreground" onClick={openLogin}>
              {"Log In"}
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={openSignup}>
              {"Get Access - $12.99"}
            </Button>
          </div>
        </div>
      </header>
    )
  }

  function renderModal() {
    return (
      <div
        className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label={showLogin ? "Log in" : "Sign up"}
        onClick={closeModals}
      >
        <Card
          className="w-full max-w-md bg-background border-border shadow-2xl"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg mx-auto mb-4">
                <Image
                  src="/images/fsa-logo-main.png"
                  alt="FSA Elite"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {showLogin ? "Welcome Back" : "Get Instant Access"}
              </h2>
              <p className="text-primary font-semibold text-sm mt-1">
                {"FSA Elite Performance"}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {showLogin ? "Log in to your account" : "One-time payment of $12.99 - Lifetime access"}
              </p>
            </div>

            <form onSubmit={showLogin ? handleLogin : handleSignup} className="space-y-4">
              {showSignup && (
                <div>
                  <Label htmlFor="name" className="text-foreground">{"Full Name"}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 bg-muted border-border text-foreground"
                    autoComplete="name"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email" className="text-foreground">{"Email"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 bg-muted border-border text-foreground"
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-foreground">{"Password"}</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-muted border-border text-foreground pr-10"
                    autoComplete={showLogin ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base">
                <Lock className="mr-2 h-4 w-4" />
                {showLogin ? "Log In" : "Pay $12.99 & Get Access"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              {showLogin ? (
                <p className="text-sm text-muted-foreground">
                  {"Don't have an account? "}
                  <button className="text-primary font-medium hover:underline" onClick={openSignup}>
                    {"Sign up for $12.99"}
                  </button>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {"Already have an account? "}
                  <button className="text-primary font-medium hover:underline" onClick={openLogin}>
                    {"Log in"}
                  </button>
                </p>
              )}
            </div>

            {showSignup && (
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Lock className="h-3 w-3" />
                <span>{"Secured by Stripe. Your info is safe."}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  function renderHero() {
    return (
      <section className="relative pt-16">
        <div className="relative h-[80vh] sm:h-[85vh] min-h-[500px] sm:min-h-[600px] overflow-hidden">
          <Image
            src="/images/hero-backdrop.jpg"
            alt="Elite sales professional"
            fill
            className="object-cover"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />

          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-15 hidden lg:block">
            <Image
              src="/images/fsa-logo-main.png"
              alt=""
              width={400}
              height={400}
              className="object-contain w-auto h-auto"
            />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-primary shadow-lg">
                    <Image
                      src="/images/fsa-logo-main.png"
                      alt="FSA Elite Performance"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="text-white font-bold text-lg">{"FSA Elite Performance"}</span>
                    <p className="text-primary text-sm font-semibold">{"The Sales Bible"}</p>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {"Master Sales. "}<span className="text-primary">{"Get Paid."}</span>
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  {"Instant full access to elite training, AI coaching, and tools that close deals. Every industry. Every skill level."}
                </p>

                <div className="inline-flex items-baseline gap-1 bg-primary rounded-xl px-6 py-4 mb-6">
                  <span className="text-xl text-primary-foreground font-medium">{"$"}</span>
                  <span className="text-5xl font-black text-primary-foreground">{"12.99"}</span>
                  <span className="text-primary-foreground/80 ml-2">{"one-time"}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={openSignup}
                  >
                    {"Get Instant Access"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 h-14"
                    onClick={openLogin}
                  >
                    {"Log In"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {"Instant Access"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {"No Subscriptions"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {"All Industries"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderTrainingSection() {
    return (
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/training-backdrop.jpg"
                alt="FSA Elite Training"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                  <Image
                    src="/images/fsa-logo-main.png"
                    alt="FSA"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-primary font-bold text-sm uppercase tracking-wide">{"18+ Modules"}</span>
                </div>
                <p className="text-white font-bold text-lg">{"The Complete Sales Bible"}</p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-semibold">{"Training Hub"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {"Everything You Need to "}<span className="text-primary">{"Close More Deals"}</span>
              </h2>

              <p className="text-muted-foreground mb-6">
                {"From cold calling to closing, our training covers every skill you need. Built by top performers for every industry."}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {TRAINING_MODULES.map((mod) => (
                  <div key={mod} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">{mod}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={openSignup}>
                  {"Start Training - $12.99"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">{"Lifetime access included"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderFeaturesStrip() {
    return (
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-primary-foreground/30">
              <Image
                src="/images/fsa-logo-main.png"
                alt="FSA"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-primary-foreground font-bold text-lg">{"What You Get"}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {FEATURES.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon className="h-8 w-8 text-primary-foreground" />
                <span className="text-primary-foreground font-semibold text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function renderStoreSection() {
    return (
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 mb-4">
                <ShoppingBag className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-700 font-semibold">{"Coming Soon"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {"The "}<span className="text-primary">{"Elite Merch Store"}</span>
              </h2>

              <p className="text-muted-foreground mb-6">
                {"Premium FSA apparel, accessories, and gear. Look the part. Members get exclusive discounts when the store launches."}
              </p>

              <div className="space-y-3 mb-6">
                {STORE_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic">
                {"Get access now to lock in your member discount when the store opens."}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/store-backdrop.jpg"
                alt="FSA Elite Store"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                <div className="bg-background/95 backdrop-blur-sm rounded-xl px-8 py-4 shadow-lg text-center">
                  <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-foreground text-lg">{"Coming Soon"}</p>
                  <p className="text-muted-foreground text-sm">{"Members get early access"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function renderTestimonials() {
    return (
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {"Real Results from "}<span className="text-primary">{"Real Closers"}</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">{`"${t.quote}"`}</p>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  function renderFinalCTA() {
    return (
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary shadow-xl mx-auto mb-6">
            <Image
              src="/images/fsa-logo-main.png"
              alt="FSA Elite Performance"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {"Stop Scrolling. "}<span className="text-primary">{"Start Closing."}</span>
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            {"One payment. Full access. Start training in the next 60 seconds."}
          </p>

          <div className="inline-flex items-baseline gap-1 mb-6">
            <span className="text-2xl text-primary font-bold">{"$"}</span>
            <span className="text-6xl font-black text-background">{"12.99"}</span>
          </div>

          <div className="mb-6">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 h-16 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={openSignup}
            >
              <Zap className="mr-2 h-6 w-6" />
              {"Get Instant Access"}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <span className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              {"Secure Payment"}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              {"Instant Access"}
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              {"Lifetime Membership"}
            </span>
          </div>
        </div>
      </section>
    )
  }

  function renderFooter() {
    return (
      <footer className="py-12 px-6 bg-background border-t border-border">
        <div className="container mx-auto flex flex-col items-center gap-4 text-sm text-muted-foreground">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/20 shadow-md">
            <Image
              src="/images/fsa-logo-main.png"
              alt="FSA Elite Performance"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center">
            <p className="font-bold text-foreground text-base">
              {"FSA "}<span className="text-primary">{"Elite"}</span>{" Performance"}
            </p>
            <p className="text-xs mt-1">{"Fontenot's Sales Association LLC"}</p>
          </div>
          <p className="text-xs">{"fsaeliteperformance.com"}</p>
        </div>
      </footer>
    )
  }
}
