"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ShoppingBag, 
  Star,
  Package,
  Bell,
  Shirt,
  Gift,
  Trophy,
  Sparkles
} from "lucide-react"
import { useState } from "react"

const previewItems = [
  { name: "FSA Elite Tee", category: "Apparel", icon: Shirt, price: "$29.99" },
  { name: "FSA Elite Hoodie", category: "Apparel", icon: Shirt, price: "$59.99" },
  { name: "Closer Polo", category: "Apparel", icon: Shirt, price: "$44.99" },
  { name: "FSA Elite Cap", category: "Accessories", icon: Gift, price: "$24.99" },
  { name: "Winner Bottle", category: "Accessories", icon: Trophy, price: "$19.99" },
  { name: "Objection Cards", category: "Digital", icon: Sparkles, price: "$14.99" },
]

export function StoreSection() {
  const [notified, setNotified] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          FSA Merch Store
        </h1>
        <p className="text-muted-foreground mt-1">
          Gear up like a champion. Represent the elite.
        </p>
      </div>

      {/* Coming Soon Hero */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="relative flex flex-col items-center justify-center py-20 px-8 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: "repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 12px)",
              }} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>

              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
                  Coming Soon
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-4 text-balance">
                  The FSA Elite Collection
                </h2>
                <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-pretty">
                  Premium merchandise designed for top performers. Look elite, feel elite, be elite. Our store is being stocked with exclusive gear for FSA members.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => setNotified(true)}
                disabled={notified}
                className={
                  notified 
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }
              >
                <Bell className="h-4 w-4 mr-2" />
                {notified ? "You'll be notified at launch!" : "Notify Me When Available"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Sneak Peek
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {previewItems.map((item) => (
            <Card key={item.name} className="bg-card border-border group relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
              <CardContent className="p-4 text-center space-y-3">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto">
                  <item.icon className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                  <p className="text-sm font-semibold text-primary mt-1">{item.price}</p>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Member Perk */}
      <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/20">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-foreground">
              Members Get 20% Off Everything
            </h3>
            <p className="text-muted-foreground mt-1">
              As an FSA Elite member, you&apos;ll get exclusive early access and 20% off all merchandise when the store launches.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
