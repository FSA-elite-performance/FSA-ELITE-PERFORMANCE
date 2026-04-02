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
  Users
} from "lucide-react"

const trainingModules = [
  "Cold Call Mastery",
  "Objection Handling",
  "Closing Techniques",
  "Follow-Up Systems",
  "CRM Integration",
  "Negotiation Power",
]

export function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem("fsa-member", "true")
      localStorage.setItem("fsa-email", email)
      onEnterApp()
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password && name) {
      localStorage.setItem("fsa-member", "true")
      localStorage.setItem("fsa-email", email)
      localStorage.setItem("fsa-name", name)
      onEnterApp()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/fsa-logo-main.png" 
              alt="FSA Elite Performance" 
              width={36} 
              height={36}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="font-bold text-lg text-foreground">FSA <span className="text-primary">Elite</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-foreground"
              onClick={() => { setShowLogin(true); setShowSignup(false) }}
            >
              Log In
            </Button>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => { setShowSignup(true); setShowLogin(false) }}
            >
              Get Access - $12.99
            </Button>
          </div>
        </div>
      </header>

      {/* LOGIN / SIGNUP MODAL */}
      {(showLogin || showSignup) && (
        <div className="fixed inset-0 z-[60] bg-foreground/50 flex items-center justify-center p-4" onClick={() => { setShowLogin(false); setShowSignup(false) }}>
          <Card className="w-full max-w-md bg-background border-border shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Image 
                  src="/images/fsa-logo-main.png" 
                  alt="FSA Elite" 
                  width={48} 
                  height={48}
                  className="mx-auto mb-4"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <h2 className="text-2xl font-bold text-foreground">
                  {showLogin ? "Welcome Back" : "Get Instant Access"}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {showLogin ? "Log in to your account" : "One-time payment of $12.99 - Lifetime access"}
                </p>
              </div>

              <form onSubmit={showLogin ? handleLogin : handleSignup} className="space-y-4">
                {showSignup && (
                  <div>
                    <Label htmlFor="name" className="text-foreground">Full Name</Label>
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
                  <Label htmlFor="email" className="text-foreground">Email</Label>
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
                  <Label htmlFor="password" className="text-foreground">Password</Label>
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {showLogin ? "Log In" : "Pay $12.99 & Get Access"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                {showLogin ? (
                  <p className="text-sm text-muted-foreground">
                    {"Don't have an account? "}
                    <button className="text-primary font-medium hover:underline" onClick={() => { setShowLogin(false); setShowSignup(true) }}>
                      Sign up for $12.99
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button className="text-primary font-medium hover:underline" onClick={() => { setShowSignup(false); setShowLogin(true) }}>
                      Log in
                    </button>
                  </p>
                )}
              </div>

              {showSignup && (
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <Lock className="h-3 w-3" />
                  <span>Secured by Stripe. Your info is safe.</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* === HERO SECTION === */}
      <section className="relative pt-16">
        <div className="relative h-[85vh] min-h-[600px] overflow-hidden">
          <Image 
            src="/images/hero-backdrop.jpg"
            alt="Elite sales professional"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  Master Sales. <span className="text-primary">Get Paid.</span>
                </h1>
                <p className="text-lg text-white/80 mb-6">
                  Instant full access to elite training, AI coaching, and tools that close deals. Every industry. Every skill level.
                </p>
                
                {/* PRICE BOX */}
                <div className="inline-flex items-baseline gap-1 bg-primary rounded-xl px-6 py-4 mb-6">
                  <span className="text-xl text-primary-foreground font-medium">$</span>
                  <span className="text-5xl font-black text-primary-foreground">12.99</span>
                  <span className="text-primary-foreground/80 ml-2">one-time</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={() => { setShowSignup(true); setShowLogin(false) }}
                  >
                    Get Instant Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 h-14"
                    onClick={() => { setShowLogin(true); setShowSignup(false) }}
                  >
                    Log In
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary" /> Instant Access</span>
                  <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary" /> No Subscriptions</span>
                  <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary" /> All Industries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TRAINING SECTION (Main Focus) === */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Training Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/training-backdrop.jpg"
                alt="FSA Elite Training"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 to-transparent p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-primary font-bold text-sm uppercase tracking-wide">18+ Modules</span>
                </div>
                <p className="text-white font-bold text-lg">The Complete Sales Bible</p>
              </div>
            </div>

            {/* Training Details */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-semibold">Training Hub</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything You Need to <span className="text-primary">Close More Deals</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                From cold calling to closing, our training covers every skill you need. Built by top performers for every industry.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {trainingModules.map((module, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium">{module}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => { setShowSignup(true); setShowLogin(false) }}
                >
                  Start Training - $12.99
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">Lifetime access included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === WHAT YOU GET STRIP === */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, label: "18+ Training Modules" },
              { icon: Bot, label: "AI Sales Coach" },
              { icon: Users, label: "Elite Community" },
              { icon: Trophy, label: "Lifetime Access" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="h-8 w-8 text-primary-foreground" />
                <span className="text-primary-foreground font-semibold text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STORE SECTION (Coming Soon) === */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Store Details */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 mb-4">
                <ShoppingBag className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-700 font-semibold">Coming Soon</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                The <span className="text-primary">Elite Merch Store</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Premium FSA apparel, accessories, and gear. Look the part. Members get exclusive discounts when the store launches.
              </p>

              <div className="space-y-3 mb-6">
                {["Exclusive FSA Polos & Tees", "Premium Caps & Accessories", "20% Member Discount"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic">
                Get access now to lock in your member discount when the store opens.
              </p>
            </div>

            {/* Store Image */}
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
                  <p className="font-bold text-foreground text-lg">Coming Soon</p>
                  <p className="text-muted-foreground text-sm">Members get early access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Real Results from <span className="text-primary">Real Closers</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marcus J.", role: "Automotive - BMW", quote: "Went from 8 to 22 units my first month." },
              { name: "Sarah W.", role: "Insurance Sales", quote: "Best $12.99 I've ever spent. Period." },
              { name: "David C.", role: "Real Estate", quote: "My close rate jumped 40% in 2 weeks." },
            ].map((t, i) => (
              <Card key={i} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">&quot;{t.quote}&quot;</p>
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

      {/* === FINAL CTA === */}
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stop Scrolling. <span className="text-primary">Start Closing.</span>
          </h2>
          <p className="text-background/70 mb-8 text-lg">
            One payment. Full access. Start training in the next 60 seconds.
          </p>
          
          <div className="inline-flex items-baseline gap-1 mb-6">
            <span className="text-2xl text-primary font-bold">$</span>
            <span className="text-6xl font-black text-background">12.99</span>
          </div>

          <div className="mb-6">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 h-16 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => { setShowSignup(true); setShowLogin(false) }}
            >
              <Zap className="mr-2 h-6 w-6" />
              Get Instant Access
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/60">
            <span className="flex items-center gap-1"><Lock className="h-4 w-4" /> Secure Payment</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Instant Access</span>
            <span className="flex items-center gap-1"><Trophy className="h-4 w-4" /> Lifetime Membership</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-background border-t border-border">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/fsa-logo-main.png" 
              alt="FSA" 
              width={24} 
              height={24}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span>Fontenot&apos;s Sales Association LLC</span>
          </div>
          <p>fsaeliteperformance.com</p>
        </div>
      </footer>
    </div>
  )
}
