"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardSection } from "@/components/sections/dashboard-section"
import { TrainingSection } from "@/components/sections/training-section"
import { CRMSection } from "@/components/sections/crm-section"
import { AnalyticsSection } from "@/components/sections/analytics-section"
import { StoreSection } from "@/components/sections/store-section"
import { MembershipSection } from "@/components/sections/membership-section"
import { OliveAIBot } from "@/components/olive-ai-bot"
import { SocialFooter } from "@/components/social-footer"

export default function FSAElitePerformance() {
  const [showApp, setShowApp] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  // Check localStorage for returning users
  useEffect(() => {
    const hasVisited = localStorage.getItem("fsa-member")
    if (hasVisited === "true") {
      setShowApp(true)
    }
  }, [])

  const handleEnterApp = () => {
    localStorage.setItem("fsa-member", "true")
    setShowApp(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("fsa-member")
    setShowApp(false)
  }

  // Show landing page for new visitors
  if (!showApp) {
    return <LandingPage onEnterApp={handleEnterApp} />
  }

  // Show app for members
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "membership" && <MembershipSection />}
          {activeSection === "training" && <TrainingSection />}
          {activeSection === "crm" && <CRMSection />}
          {activeSection === "analytics" && <AnalyticsSection />}
          {activeSection === "store" && <StoreSection />}
        </div>
        
        {/* Social Media Footer */}
        <SocialFooter />
      </main>
      
      {/* Olive AI Assistant */}
      <OliveAIBot />
    </div>
  )
}
