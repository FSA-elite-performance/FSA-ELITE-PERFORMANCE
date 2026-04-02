"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  ShoppingBag,
  Trophy,
  Target,
  Crown,
  Menu,
  X,
  ExternalLink,
  Bot,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { name: "Membership", href: "#membership", icon: Crown, isHighlight: true },
  { name: "Training Hub", href: "#training", icon: BookOpen },
  { name: "CRM & Leads", href: "#crm", icon: Users },
  { name: "Analytics", href: "#analytics", icon: BarChart3 },
  { name: "Merch Store", href: "#store", icon: ShoppingBag, isComingSoon: true },
  { name: "Olive AI Coach", href: "#olive", icon: Bot, isSpecial: true },
]

const quickStats = [
  { label: "Elite Rank", value: "Gold", icon: Crown },
  { label: "Deals Closed", value: "47", icon: Target },
  { label: "Win Rate", value: "78%", icon: Trophy },
]

export function AppSidebar({ 
  activeSection, 
  onSectionChange,
  onLogout
}: { 
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout?: () => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="https://fsaeliteperformance.com" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors">
                <Image 
                  src="/images/fsa-logo-main.png" 
                  alt="FSA Elite Performance Logo" 
                  width={48} 
                  height={48}
                  className="object-cover"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-sidebar-foreground group-hover:text-primary transition-colors">FSA Elite</h1>
                <p className="text-xs text-sidebar-foreground/60">Performance Training</p>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="grid grid-cols-3 gap-2">
              {quickStats.map((stat) => (
                <div key={stat.label} className="text-center p-2 rounded-lg bg-sidebar-accent">
                  <stat.icon className="h-4 w-4 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-semibold text-sidebar-foreground">{stat.value}</p>
                  <p className="text-[10px] text-sidebar-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Sidebar navigation">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              const isSpecial = 'isSpecial' in item && item.isSpecial
              const isHighlight = 'isHighlight' in item && item.isHighlight
              const isComingSoon = 'isComingSoon' in item && item.isComingSoon
              return (
                <button
                  key={item.name}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    if (isSpecial) {
                      const event = new CustomEvent('openOliveAI')
                      window.dispatchEvent(event)
                    } else {
                      onSectionChange(item.href.replace("#", ""))
                    }
                    setMobileOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isSpecial 
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-400 hover:from-green-500/30 hover:to-emerald-500/20 border border-green-500/20"
                      : isHighlight && !isActive
                        ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary hover:from-primary/30 border border-primary/20"
                        : isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isSpecial && "text-green-400", isHighlight && !isActive && "text-primary")} />
                  {item.name}
                  {isSpecial && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">AI</span>
                  )}
                  {isHighlight && !isActive && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">$12.99</span>
                  )}
                  {isComingSoon && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Soon</span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <p className="text-xs font-semibold text-primary mb-1">Fontenot&apos;s Sales Association LLC</p>
              <p className="text-[10px] text-sidebar-foreground/60 mb-2">Become Elite. Close More. Win Big.</p>
              <Link 
                href="https://fsaeliteperformance.com" 
                target="_blank"
                className="text-[10px] text-primary/80 hover:text-primary flex items-center gap-1"
              >
                fsaeliteperformance.com
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            {onLogout && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-sidebar-foreground/60 hover:text-sidebar-foreground"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
