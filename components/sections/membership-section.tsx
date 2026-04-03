"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Crown,
  Check,
  Star,
  BookOpen,
  Users,
  ShoppingBag,
  Bot,
  Trophy,
  Shield,
  Sparkles,
  ArrowRight
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Full Training Library",
    description: "18+ elite modules covering fundamentals, automotive, closing, advanced tactics & leadership"
  },
  {
    icon: Bot,
    title: "Olive AI Coach",
    description: "24/7 AI-powered sales coaching - get instant answers, objection handlers, and scripts"
  },
  {
    icon: Users,
    title: "Elite Community",
    description: "Network with top performers, share wins, and learn from the best in the game"
  },
  {
    icon: ShoppingBag,
    title: "Member Store Discounts",
    description: "Exclusive pricing on all FSA merch - save 20% on everything in the store"
  },
  {
    icon: Trophy,
    title: "Performance Tracking",
    description: "Track your progress, earn XP, unlock achievements, and climb the leaderboards"
  },
  {
    icon: Shield,
    title: "Lifetime Access",
    description: "One payment, forever access. All future updates and new content included"
  },
]

const testimonials = [
  {
    name: "Marcus J.",
    role: "Top Performer, AutoNation",
    quote: "FSA Elite transformed my approach. Went from 8 units to 22 units a month in 90 days.",
    rating: 5
  },
  {
    name: "Sarah T.",
    role: "Finance Manager",
    quote: "The objection handling module alone paid for the membership 10x over. This is the real deal.",
    rating: 5
  },
  {
    name: "David R.",
    role: "Sales Manager",
    quote: "I've trained my whole team on FSA. Our close rate jumped from 18% to 32%.",
    rating: 5
  },
]

export function MembershipSection() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'fsa-elite-lifetime' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Crown className="h-4 w-4" />
          Become Elite
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          The Sales Bible
        </h1>
        <p className="text-xl text-muted-foreground">
          One payment. Lifetime access. Everything you need to become an elite closer.
        </p>
      </div>

      {/* Main Pricing Card */}
      <Card className="bg-gradient-to-br from-primary/20 via-card to-card border-primary/30 max-w-4xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <CardContent className="p-8 md:p-12 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Lifetime Membership
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                FSA Elite Performance
              </h2>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-primary">$12.99</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <p className="text-muted-foreground mb-8">
                Join the elite. Get instant access to the complete FSA training system, 
                Olive AI coach, exclusive community, and lifetime member benefits.
              </p>
              <Button 
                size="lg"
                onClick={handleCheckout} disabled={loading}
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
              >
                Get Lifetime Access
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Secure payment powered by Stripe. 30-day money-back guarantee.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-semibold text-foreground mb-4">
                EVERYTHING INCLUDED:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">18+ elite training modules</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">Olive AI sales coach (24/7)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">VinSolutions & eLeads CRM guides</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">Objection handler scripts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">Closing technique library</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">20% off all merch forever</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">All future updates included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-muted-foreground">Private elite community access</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-foreground text-center mb-8">
          What Elite Members Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-primary/20 to-transparent border-primary/20 max-w-4xl mx-auto">
        <CardContent className="p-8 md:p-12 text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Ready to Become Elite?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop leaving money on the table. Join thousands of top performers who&apos;ve 
            transformed their sales game with FSA Elite Performance.
          </p>
          <Button 
            size="lg"
            onClick={handleCheckout} disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
          >
            Get Lifetime Access - $12.99
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
