"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock,
  Star,
  Clock,
  Trophy,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const trainingModules = [
  // FUNDAMENTALS
  {
    id: 1,
    category: "Fundamentals",
    title: "The Elite Sales Mindset",
    description: "Master the psychology of top performers. Learn to think like a champion.",
    duration: "45 min",
    lessons: 8,
    progress: 100,
    status: "completed",
    xp: 100
  },
  {
    id: 2,
    category: "Fundamentals",
    title: "Building Rapport Instantly",
    description: "Connect with anyone in seconds. The art of first impressions.",
    duration: "60 min",
    lessons: 12,
    progress: 75,
    status: "in-progress",
    xp: 150
  },
  {
    id: 3,
    category: "Fundamentals",
    title: "The FSA Sales Process",
    description: "Our proven 7-step framework that elite closers follow every time.",
    duration: "55 min",
    lessons: 10,
    progress: 0,
    status: "available",
    xp: 125
  },
  {
    id: 4,
    category: "Fundamentals",
    title: "Product Knowledge Mastery",
    description: "Know your inventory inside-out. Features, benefits, and competitive advantages.",
    duration: "90 min",
    lessons: 18,
    progress: 0,
    status: "available",
    xp: 200
  },
  // AUTOMOTIVE
  {
    id: 5,
    category: "Automotive",
    title: "The Walk-Around That Sells",
    description: "Transform vehicle presentations into emotional buying experiences.",
    duration: "45 min",
    lessons: 8,
    progress: 0,
    status: "available",
    xp: 125
  },
  {
    id: 6,
    category: "Automotive",
    title: "Test Drive to Sold",
    description: "Turn every test drive into a closing opportunity. The psychology of the ride.",
    duration: "40 min",
    lessons: 7,
    progress: 0,
    status: "available",
    xp: 100
  },
  {
    id: 7,
    category: "Automotive",
    title: "Trade-In Mastery",
    description: "Handle trade evaluations with confidence. Turn trades into profit.",
    duration: "50 min",
    lessons: 9,
    progress: 0,
    status: "available",
    xp: 150
  },
  {
    id: 8,
    category: "Automotive",
    title: "F&I Product Presentations",
    description: "Present finance and insurance products that protect and add value.",
    duration: "60 min",
    lessons: 12,
    progress: 0,
    status: "available",
    xp: 175
  },
  // CLOSING
  {
    id: 9,
    category: "Closing",
    title: "The Art of the Close",
    description: "Master 15 proven closing techniques used by top 1% sellers.",
    duration: "90 min",
    lessons: 15,
    progress: 0,
    status: "available",
    xp: 200
  },
  {
    id: 10,
    category: "Closing",
    title: "Handling Objections Like a Pro",
    description: "Turn every 'no' into a 'yes'. Advanced objection handling frameworks.",
    duration: "75 min",
    lessons: 10,
    progress: 0,
    status: "available",
    xp: 175
  },
  {
    id: 11,
    category: "Closing",
    title: "Price Negotiation Tactics",
    description: "Hold gross, protect the deal. Advanced price defense strategies.",
    duration: "65 min",
    lessons: 11,
    progress: 0,
    status: "available",
    xp: 175
  },
  {
    id: 12,
    category: "Closing",
    title: "The Assumptive Close",
    description: "Lead customers naturally to 'yes' without high pressure.",
    duration: "45 min",
    lessons: 8,
    progress: 0,
    status: "available",
    xp: 125
  },
  // ADVANCED
  {
    id: 13,
    category: "Advanced",
    title: "Enterprise Deal Mastery",
    description: "Navigate complex sales cycles and close 6-figure deals.",
    duration: "120 min",
    lessons: 20,
    progress: 0,
    status: "locked",
    xp: 300
  },
  {
    id: 14,
    category: "Advanced",
    title: "Negotiation Warfare",
    description: "Advanced negotiation tactics for maximum deal value.",
    duration: "90 min",
    lessons: 14,
    progress: 0,
    status: "locked",
    xp: 250
  },
  {
    id: 15,
    category: "Advanced",
    title: "VinSolutions CRM Mastery",
    description: "Leverage your CRM for maximum follow-up efficiency and conversions.",
    duration: "60 min",
    lessons: 12,
    progress: 0,
    status: "available",
    xp: 150
  },
  {
    id: 16,
    category: "Advanced",
    title: "Internet Lead Domination",
    description: "Convert online leads at 2x the industry average with proven tactics.",
    duration: "75 min",
    lessons: 14,
    progress: 0,
    status: "available",
    xp: 200
  },
  // LEADERSHIP
  {
    id: 17,
    category: "Leadership",
    title: "Building Your Sales Team",
    description: "Recruit, train, and retain top-performing sales professionals.",
    duration: "90 min",
    lessons: 16,
    progress: 0,
    status: "locked",
    xp: 250
  },
  {
    id: 18,
    category: "Leadership",
    title: "Coaching for Performance",
    description: "Transform underperformers into closers with proven coaching frameworks.",
    duration: "75 min",
    lessons: 12,
    progress: 0,
    status: "locked",
    xp: 200
  },
]

const categories = ["All", "Fundamentals", "Automotive", "Closing", "Advanced", "Leadership"]

export function TrainingSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const filteredModules = activeCategory === "All" 
    ? trainingModules 
    : trainingModules.filter(m => m.category === activeCategory)

  const totalXP = trainingModules.reduce((sum, m) => m.status === "completed" ? sum + m.xp : sum, 0)
  const completedCount = trainingModules.filter(m => m.status === "completed").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Training Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            The Sales Bible - Your Path to Elite Performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">{totalXP} XP</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold text-foreground">{completedCount}/{trainingModules.length}</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className={cn(
              activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Your Learning Journey</h3>
                <p className="text-sm text-muted-foreground">Continue where you left off</p>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="text-primary font-semibold">25%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "25%" }} />
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue Learning
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Card 
            key={module.id} 
            className={cn(
              "bg-card border-border transition-all hover:border-primary/50",
              module.status === "locked" && "opacity-60"
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {module.category}
                </span>
                {module.status === "completed" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {module.status === "locked" && (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <CardTitle className="text-lg text-foreground">{module.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {module.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary" />
                  {module.xp} XP
                </span>
              </div>
              
              {module.progress > 0 && module.status !== "completed" && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{module.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${module.progress}%` }} />
                  </div>
                </div>
              )}

              <Button 
                className={cn(
                  "w-full",
                  module.status === "completed" 
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20" 
                    : module.status === "locked"
                    ? "bg-secondary text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                disabled={module.status === "locked"}
              >
                {module.status === "completed" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Review
                  </>
                ) : module.status === "locked" ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Locked
                  </>
                ) : module.status === "in-progress" ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
