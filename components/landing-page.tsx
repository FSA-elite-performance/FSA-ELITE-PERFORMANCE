"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  Play,
  CheckCircle,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  ShoppingBag,
  BarChart3,
  MessageCircle,
  Zap,
  Award,
  DollarSign,
  Car
} from "lucide-react"

const stats = [
  { value: "347%", label: "Average income increase", company: "Top Performers" },
  { value: "14 days", label: "To close your first deal", company: "New Members" },
  { value: "10,000+", label: "Salespeople trained", company: "FSA Community" },
  { value: "$2.4M", label: "In deals closed monthly", company: "Elite Members" },
]

const features = [
  {
    icon: BookOpen,
    title: "The Sales Bible",
    description: "18+ elite training modules covering fundamentals, automotive, closing, and advanced strategies."
  },
  {
    icon: MessageCircle,
    title: "Olive AI Coach",
    description: "24/7 AI-powered sales coaching. Get objection scripts, closing tips, and motivation on demand."
  },
  {
    icon: BarChart3,
    title: "CRM Integration",
    description: "Connect with VinSolutions & eLeads. Track leads, manage pipeline, close more deals."
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Track your metrics, see your progress, compete on leaderboards, and level up your game."
  },
  {
    icon: ShoppingBag,
    title: "Elite Merch Store",
    description: "Exclusive FSA apparel and accessories. Look elite, feel elite, sell elite."
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Join a network of ambitious salespeople. Share wins, get support, grow together."
  },
]

const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Automotive Sales - BMW",
    content: "FSA changed my entire approach. Went from 8 units to 22 units in my first month using their system.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    name: "Sarah Williams",
    role: "Insurance Sales",
    content: "The Olive AI coach is like having a mentor in my pocket 24/7. Best $12.99 I've ever spent.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
  {
    name: "David Chen",
    role: "Real Estate Agent",
    content: "The objection handling scripts alone are worth 10x the price. My close rate jumped 40%.",
    rating: 5,
    image: "/placeholder-user.jpg"
  },
]

const industries = [
  "Automotive", "Insurance", "Real Estate", "Financial Services", 
  "Medical Sales", "Tech Sales", "Retail", "B2B Enterprise"
]

export function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <Image 
                src="/images/fsa-logo-main.png" 
                alt="FSA Elite" 
                width={40} 
                height={40}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-foreground">FSA Elite</span>
              <span className="hidden sm:inline text-muted-foreground text-sm ml-2">Performance</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link href="#training" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Training</Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onEnterApp}>
              Log in
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={onEnterApp}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">The Sales Bible for Elite Performers</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Become the <span className="text-primary">top 1%</span> of salespeople
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Master the art of elite selling with proven strategies, AI coaching, CRM tools, and a 
                community of ambitious closers. One price. Lifetime access. Unlimited potential.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                  onClick={onEnterApp}
                >
                  Start for $12.99
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>All Industries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>AI Coach Included</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary/30 transition-colors" onClick={() => setIsVideoPlaying(true)}>
                      <Play className="h-8 w-8 text-primary ml-1" />
                    </div>
                    <p className="text-muted-foreground">See FSA Elite in action</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">+347%</p>
                    <p className="text-xs text-muted-foreground">Avg. Income Increase</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Rating Card */}
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">4.9/5</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">10,000+ members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-primary text-xs font-medium mt-1">{stat.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-6">TRUSTED BY SALESPEOPLE IN EVERY INDUSTRY</p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <span key={index} className="px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-default">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to dominate sales
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One platform. All the tools. Unlimited access for just $12.99.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-card/50 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Real results from real closers
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands who transformed their sales careers with FSA Elite
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              One price. Lifetime access. No upsells.
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything included. Forever. For less than a lunch.
            </p>
          </div>
          
          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/30 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                    <Trophy className="h-4 w-4" />
                    LIFETIME ACCESS
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">FSA Elite Membership</h3>
                  <ul className="space-y-3">
                    {[
                      "18+ Elite Training Modules",
                      "Olive AI Coach (24/7 Access)",
                      "VinSolutions & eLeads CRM Integration",
                      "Performance Analytics Dashboard",
                      "Exclusive Merch Store Access",
                      "Community & Support",
                      "All Future Updates Included"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-bold text-foreground">$12.99</span>
                    <span className="text-muted-foreground ml-2">one-time</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">No subscriptions. No hidden fees.</p>
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
                    onClick={onEnterApp}
                  >
                    Get Lifetime Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">Secure payment via Stripe</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-primary/5 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to become elite?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join 10,000+ salespeople who chose to level up. Your competition already has.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
            onClick={onEnterApp}
          >
            Start Your Journey - $12.99
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/fsa-logo-main.png" 
                alt="FSA Elite" 
                width={32} 
                height={32}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="font-serif font-bold text-foreground">FSA Elite Performance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Fontenot&apos;s Sales Association LLC
            </p>
            <p className="text-sm text-muted-foreground">
              fsaeliteperformance.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
