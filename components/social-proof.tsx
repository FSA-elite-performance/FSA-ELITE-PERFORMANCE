"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Users, 
  Star,
  ExternalLink,
  Play
} from "lucide-react"

// Social media icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

// Mock Instagram posts data
const instagramPosts = [
  {
    id: 1,
    image: "/images/fsa-logo-main.png",
    likes: 1247,
    comments: 89,
    caption: "Elite mindset starts before you even walk in the door. What's your morning routine? #FSAElite #SalesTraining"
  },
  {
    id: 2,
    image: "/images/olive-coach-logo.jpg",
    likes: 2156,
    comments: 143,
    caption: "Meet Olive - your 24/7 AI sales coach. Ask anything, get instant answers. #OliveAI #SalesCoach"
  },
  {
    id: 3,
    image: "/images/app-icon-512.jpg",
    likes: 987,
    comments: 67,
    caption: "New module dropped: 'The Art of the Close' - 15 techniques that work every time. #ClosingDeals"
  },
  {
    id: 4,
    image: "/images/social-banner.jpg",
    likes: 3421,
    comments: 234,
    caption: "From 0 to $100K months - hear from our elite members. Link in bio. #SuccessStory"
  },
]

// Mock testimonials
const testimonials = [
  {
    name: "Marcus Johnson",
    role: "Top Sales Rep, Toyota",
    avatar: "/images/fsa-logo-main.png",
    content: "FSA Elite transformed my approach. Went from 8 units to 22 units per month in just 3 months.",
    rating: 5,
    platform: "facebook"
  },
  {
    name: "Sarah Williams",
    role: "Sales Manager, Ford",
    avatar: "/images/olive-coach-logo.jpg",
    content: "The training modules are incredible. Olive AI is like having a coach in my pocket 24/7.",
    rating: 5,
    platform: "instagram"
  },
  {
    name: "David Chen",
    role: "Finance Manager, BMW",
    avatar: "/images/app-icon-512.jpg",
    content: "Best $12.99 I've ever spent. The objection handling scripts alone are worth 10x that.",
    rating: 5,
    platform: "facebook"
  },
]

// Social stats
const socialStats = {
  instagram: { followers: "12.5K", engagement: "8.2%" },
  facebook: { followers: "8.2K", engagement: "6.4%" },
  youtube: { subscribers: "5.1K", views: "234K" },
  tiktok: { followers: "22.3K", views: "1.2M" },
  linkedin: { followers: "3.8K", connections: "892" }
}

export function SocialProof() {
  const [activeTab, setActiveTab] = useState<"instagram" | "testimonials">("instagram")

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">
          Join the Elite Community
        </h2>
        <p className="text-muted-foreground">
          See what our members are achieving and connect with us on social media
        </p>
      </div>

      {/* Social Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <CardContent className="p-4 text-center">
            <InstagramIcon className="h-6 w-6 mx-auto mb-2 text-pink-500" />
            <p className="text-2xl font-bold text-foreground">{socialStats.instagram.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <FacebookIcon className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-foreground">{socialStats.facebook.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
          <CardContent className="p-4 text-center">
            <Play className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-foreground">{socialStats.youtube.subscribers}</p>
            <p className="text-xs text-muted-foreground">Subscribers</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-foreground/5 to-foreground/10 border-foreground/20">
          <CardContent className="p-4 text-center">
            <svg className="h-6 w-6 mx-auto mb-2 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            <p className="text-2xl font-bold text-foreground">{socialStats.tiktok.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-400/10 to-blue-500/10 border-blue-400/20">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <p className="text-2xl font-bold text-foreground">{socialStats.linkedin.followers}</p>
            <p className="text-xs text-muted-foreground">LinkedIn</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeTab === "instagram" ? "default" : "outline"}
          onClick={() => setActiveTab("instagram")}
          className="gap-2"
        >
          <InstagramIcon className="h-4 w-4" />
          Instagram Feed
        </Button>
        <Button
          variant={activeTab === "testimonials" ? "default" : "outline"}
          onClick={() => setActiveTab("testimonials")}
          className="gap-2"
        >
          <Star className="h-4 w-4" />
          Testimonials
        </Button>
      </div>

      {/* Instagram Feed */}
      {activeTab === "instagram" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {instagramPosts.map((post) => (
              <Card key={post.id} className="group overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="relative aspect-square w-full min-h-[150px]">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="https://instagram.com/fsaeliteperformance" target="_blank" rel="noopener noreferrer" className="gap-2">
                <InstagramIcon className="h-4 w-4" />
                Follow @fsaeliteperformance
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Testimonials */}
      {activeTab === "testimonials" && (
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {testimonial.platform === "facebook" ? (
                      <FacebookIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <InstagramIcon className="h-3 w-3 mr-1" />
                    )}
                    {testimonial.platform}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/30">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
            Ready to Join the Elite?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get lifetime access to all training modules, Olive AI Coach, exclusive community, and member discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started - $12.99
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://instagram.com/fsaeliteperformance" target="_blank">
                <InstagramIcon className="h-4 w-4 mr-2" />
                Follow Us First
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
