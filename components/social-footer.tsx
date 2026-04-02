"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Social media icons as SVG components
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

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/fsaeliteperformance",
    icon: InstagramIcon,
    color: "hover:text-pink-500",
    followers: "12.5K"
  },
  {
    name: "Facebook",
    href: "https://facebook.com/fsaeliteperformance",
    icon: FacebookIcon,
    color: "hover:text-blue-500",
    followers: "8.2K"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@fsaeliteperformance",
    icon: YouTubeIcon,
    color: "hover:text-red-500",
    followers: "5.1K"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@fsaeliteperformance",
    icon: TikTokIcon,
    color: "hover:text-foreground",
    followers: "22.3K"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/fsaeliteperformance",
    icon: LinkedInIcon,
    color: "hover:text-blue-400",
    followers: "3.8K"
  },
]

const appStoreLinks = {
  ios: "https://apps.apple.com/app/fsa-elite-performance",
  android: "https://play.google.com/store/apps/details?id=com.fsaeliteperformance"
}

export function SocialFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/images/fsa-logo-main.png" 
                alt="FSA Elite Performance"
                width={48}
                height={48}
                className="rounded-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
              <div>
                <h3 className="font-serif font-bold text-foreground">FSA Elite Performance</h3>
                <p className="text-xs text-muted-foreground">Powered by Fontenot&apos;s Sales Association</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              The ultimate sales training Bible. Master the art of elite selling with proven strategies, 
              AI coaching, and a community of top performers. Become elite. Close more. Win big.
            </p>
            <p className="text-xs text-muted-foreground">
              Website: <Link href="https://fsaeliteperformance.com" className="text-primary hover:underline">fsaeliteperformance.com</Link>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#training" className="hover:text-primary transition-colors">Training Hub</Link></li>
              <li><Link href="#membership" className="hover:text-primary transition-colors">Membership</Link></li>
              <li><Link href="#store" className="hover:text-primary transition-colors">Merch Store</Link></li>
              <li><Link href="#olive" className="hover:text-primary transition-colors">Olive AI Coach</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-primary transition-colors">Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <Card className="bg-card/50 border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Follow Us</h4>
                <p className="text-sm text-muted-foreground">Join the FSA Elite community on social media</p>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center gap-1 transition-colors ${social.color}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{social.followers}</span>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Store Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Get the App</h4>
                <p className="text-sm text-muted-foreground">Take FSA Elite Performance anywhere - download our mobile app</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary"
                  asChild
                >
                  <Link href={appStoreLinks.ios} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary"
                  asChild
                >
                  <Link href={appStoreLinks.android} target="_blank" rel="noopener noreferrer">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l13.7 8.5c.6.4.6 1.2 0 1.6l-13.7 8.5c-.66.5-1.6.03-1.6-.8z"/>
                    </svg>
                    Google Play
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border">
          <p>&copy; {new Date().getFullYear()} FSA Elite Performance. All rights reserved.</p>
          <p className="mt-1">Powered by Fontenot&apos;s Sales Association LLC | fsaeliteperformance.com</p>
        </div>
      </div>
    </footer>
  )
}
