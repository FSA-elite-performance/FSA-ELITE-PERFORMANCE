"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StripeCheckout } from "@/components/stripe-checkout"

import { 
  Check, 
  Crown, 
  BookOpen, 
  Bot, 
  BarChart3, 
  ShoppingBag,
  Users,
  Zap,
  ArrowLeft
} from "lucide-react"

const membershipBenefits = [
  { icon: BookOpen, title: "Full Training Access", description: "All 18+ elite training modules, the complete Sales Bible" },
  { icon: Bot, title: "Olive AI Coach", description: "24/7 AI sales coaching and objection handling" },
  { icon: BarChart3, title: "Performance Analytics", description: "Track your progress and compete on leaderboards" },
  { icon: ShoppingBag, title: "Member Store Access", description: "Exclusive pricing on FSA Elite merchandise" },
  { icon: Users, title: "Elite Community", description: "Connect with top performers nationwide" },
  { icon: Zap, title: "Lifetime Updates", description: "New training content added regularly, free forever" },
]

export default function JoinPage() {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-primary/50">
              <Image 
                src="/images/fsa-logo-main.png" 
                alt="FSA Elite" 
                width={40} 
                height={40}
                className="object-cover"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <span className="font-serif text-xl font-bold">FSA Elite</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {!showCheckout ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Sales Pitch */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Crown className="h-4 w-4" />
                Lifetime Access
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Become an Elite Closer
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                One payment. Lifetime access. Everything you need to dominate sales in any industry.
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-primary">$12.99</span>
                <span className="text-muted-foreground">one-time</span>
              </div>

              <div className="space-y-4 mb-8">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowCheckout(true)}
              >
                <Crown className="h-5 w-5 mr-2" />
                Get Lifetime Access - $12.99
              </Button>

              <p className="text-sm text-muted-foreground mt-4">
                Secure payment powered by Stripe. Instant access after purchase.
              </p>
            </div>

            {/* Right - Testimonial/Image */}
            <div className="relative">
              <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Image 
                        src="/images/fsa-logo-main.png" 
                        alt="FSA" 
                        width={64} 
                        height={64}
                        className="rounded-full"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Fontenot&apos;s Sales Association</p>
                      <p className="text-sm text-muted-foreground">Elite Performance Training</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-foreground mb-6">
                    &quot;The Sales Bible isn&apos;t just training - it&apos;s the complete system I used to go from average to elite. Every technique, every script, every mindset shift that made the difference.&quot;
                  </blockquote>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Check key={i} className="h-5 w-5 text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Join thousands of elite performers
                  </p>
                </CardContent>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => setShowCheckout(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">FSA Elite Lifetime Access</h2>
                    <p className="text-muted-foreground">One-time payment, lifetime access</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">$12.99</span>
                </div>
                
                <StripeCheckout productId="fsa-elite-lifetime" />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
