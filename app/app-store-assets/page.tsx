"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download,
  CheckCircle2,
  Smartphone,
  Monitor,
  Palette,
  FileText,
  ArrowLeft
} from "lucide-react"

const appStoreRequirements = {
  ios: {
    name: "Apple App Store",
    icon: "1024x1024px PNG (no alpha)",
    screenshots: [
      "6.7\" Display: 1290 x 2796px",
      "6.5\" Display: 1284 x 2778px",
      "5.5\" Display: 1242 x 2208px",
      "iPad Pro: 2048 x 2732px"
    ],
    requirements: [
      "App Store Connect account ($99/year)",
      "Privacy Policy URL required",
      "App Rating questionnaire",
      "In-App Purchase configuration",
      "App Review Guidelines compliance"
    ]
  },
  android: {
    name: "Google Play Store",
    icon: "512x512px PNG (32-bit)",
    screenshots: [
      "Phone: 1080 x 1920px minimum",
      "7\" Tablet: 1080 x 1920px",
      "10\" Tablet: 1920 x 1200px"
    ],
    requirements: [
      "Google Play Developer account ($25 one-time)",
      "Privacy Policy URL required",
      "Content rating questionnaire",
      "Data safety section",
      "Target API level compliance"
    ]
  }
}

const brandAssets = [
  {
    name: "App Icon (1024px)",
    file: "/images/app-icon-1024.jpg",
    size: "1024 x 1024",
    usage: "App Store, Play Store primary icon"
  },
  {
    name: "App Icon (512px)",
    file: "/images/app-icon-512.jpg",
    size: "512 x 512",
    usage: "Google Play Store, marketing materials"
  },
  {
    name: "Feature Graphic",
    file: "/images/app-store-feature.jpg",
    size: "1024 x 500",
    usage: "Google Play Store feature banner"
  },
  {
    name: "Social Banner",
    file: "/images/social-banner.jpg",
    size: "1200 x 630",
    usage: "Social media covers, OG images"
  },
  {
    name: "FSA Elite Logo",
    file: "/images/fsa-logo-main.png",
    size: "Various",
    usage: "Website, marketing, app splash"
  },
  {
    name: "Olive Coach Logo",
    file: "/images/olive-coach-logo.jpg",
    size: "Various",
    usage: "Olive AI branding, chat interface"
  }
]

const appMetadata = {
  name: "FSA Elite Performance",
  subtitle: "Sales Training & Coaching",
  category: "Business / Education",
  keywords: "sales training, sales coaching, CRM, automotive sales, objection handling, closing techniques, AI coach, sales bible",
  description: `FSA Elite Performance is the ultimate sales training platform designed for ambitious salespeople who want to become elite closers.

Features:
• 18+ comprehensive training modules covering fundamentals to advanced techniques
• Olive AI Coach - Your 24/7 personal sales coaching assistant
• VinSolutions & eLeads CRM integration for automotive professionals
• Real-time analytics and performance tracking
• Exclusive merch store with member discounts
• Community of top-performing sales professionals

Whether you're in automotive, real estate, insurance, or any sales industry, FSA Elite gives you the tools, training, and support to close more deals and earn more money.

Powered by Fontenot's Sales Association LLC.`,
  whatsNew: "• New training module: Internet Lead Domination\n• Improved Olive AI responses\n• Bug fixes and performance improvements",
  price: "Free to download, $12.99 one-time for lifetime access"
}

export default function AppStoreAssetsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to App
          </Link>
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
            App Store Assets & Specifications
          </h1>
          <p className="text-muted-foreground">
            Complete guide and assets for publishing FSA Elite Performance on iOS and Android
          </p>
        </div>

        {/* Brand Colors */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Brand Color Palette
            </CardTitle>
            <CardDescription>Official FSA Elite Performance colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-full h-20 rounded-lg bg-[#0a0a0a] border border-border mb-2" />
                <p className="text-sm font-medium">Primary Black</p>
                <p className="text-xs text-muted-foreground">#0a0a0a</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded-lg bg-[#f5f5f5] border border-border mb-2" />
                <p className="text-sm font-medium">White</p>
                <p className="text-xs text-muted-foreground">#f5f5f5</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded-lg bg-[#a8a8a8] border border-border mb-2" />
                <p className="text-sm font-medium">Silver</p>
                <p className="text-xs text-muted-foreground">#a8a8a8</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded-lg bg-[#6b8e23] border border-border mb-2" />
                <p className="text-sm font-medium">Olive Green</p>
                <p className="text-xs text-muted-foreground">#6b8e23</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 rounded-lg bg-[#556b2f] border border-border mb-2" />
                <p className="text-sm font-medium">Dark Olive</p>
                <p className="text-xs text-muted-foreground">#556b2f</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Metadata */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              App Store Metadata
            </CardTitle>
            <CardDescription>Copy-ready text for app store listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground">App Name</label>
                <p className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1">{appMetadata.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Subtitle</label>
                <p className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1">{appMetadata.subtitle}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <p className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1">{appMetadata.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Price</label>
                <p className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1">{appMetadata.price}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Keywords</label>
              <p className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1 text-sm">{appMetadata.keywords}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <pre className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1 text-sm whitespace-pre-wrap font-sans">{appMetadata.description}</pre>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">What&apos;s New</label>
              <pre className="text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-1 text-sm whitespace-pre-wrap font-sans">{appMetadata.whatsNew}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Brand Assets */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              Brand Assets
            </CardTitle>
            <CardDescription>Download ready-to-use assets for app stores and marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {brandAssets.map((asset, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-square bg-secondary">
                    <Image
                      src={asset.file}
                      alt={asset.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-1">{asset.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{asset.size}</p>
                    <p className="text-xs text-muted-foreground">{asset.usage}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Store Requirements */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* iOS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {appStoreRequirements.ios.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Icon Requirements</h4>
                <Badge variant="outline">{appStoreRequirements.ios.icon}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Screenshot Sizes</h4>
                <ul className="space-y-1">
                  {appStoreRequirements.ios.screenshots.map((size, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Monitor className="h-3 w-3" /> {size}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Requirements Checklist</h4>
                <ul className="space-y-1">
                  {appStoreRequirements.ios.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-primary" /> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Android */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                {appStoreRequirements.android.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Icon Requirements</h4>
                <Badge variant="outline">{appStoreRequirements.android.icon}</Badge>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Screenshot Sizes</h4>
                <ul className="space-y-1">
                  {appStoreRequirements.android.screenshots.map((size, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Monitor className="h-3 w-3" /> {size}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Requirements Checklist</h4>
                <ul className="space-y-1">
                  {appStoreRequirements.android.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-primary" /> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links Setup */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Social Media Integration</CardTitle>
            <CardDescription>Official FSA Elite Performance social accounts to link</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">Instagram</h4>
                <p className="text-sm text-muted-foreground">@fsaeliteperformance</p>
                <p className="text-xs text-primary">https://instagram.com/fsaeliteperformance</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">Facebook</h4>
                <p className="text-sm text-muted-foreground">FSA Elite Performance</p>
                <p className="text-xs text-primary">https://facebook.com/fsaeliteperformance</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">YouTube</h4>
                <p className="text-sm text-muted-foreground">@fsaeliteperformance</p>
                <p className="text-xs text-primary">https://youtube.com/@fsaeliteperformance</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">TikTok</h4>
                <p className="text-sm text-muted-foreground">@fsaeliteperformance</p>
                <p className="text-xs text-primary">https://tiktok.com/@fsaeliteperformance</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">LinkedIn</h4>
                <p className="text-sm text-muted-foreground">FSA Elite Performance</p>
                <p className="text-xs text-primary">https://linkedin.com/company/fsaeliteperformance</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2">Website</h4>
                <p className="text-sm text-muted-foreground">fsaeliteperformance.com</p>
                <p className="text-xs text-primary">https://fsaeliteperformance.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to App
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
