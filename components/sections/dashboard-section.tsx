"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SocialProof } from "@/components/social-proof"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  ArrowUpRight,
  Calendar,
  Clock,
  Zap,
  Car,
  Phone,
  CheckCircle,
  Star
} from "lucide-react"

const stats = [
  { 
    title: "Month Revenue", 
    value: "$892,450", 
    change: "+18.5%", 
    icon: DollarSign,
    trend: "up" 
  },
  { 
    title: "Active Leads", 
    value: "47", 
    change: "+12 today", 
    icon: Users,
    trend: "up" 
  },
  { 
    title: "Close Rate", 
    value: "32%", 
    change: "+4.2%", 
    icon: Target,
    trend: "up" 
  },
  { 
    title: "Units Sold", 
    value: "15", 
    change: "+3 this week", 
    icon: Car,
    trend: "up" 
  },
]

const recentActivity = [
  { action: "Sold 2025 Ford F-150 Platinum", time: "1 hour ago", value: "$68,500", icon: Car },
  { action: "New hot lead: Marcus Thompson", time: "2 hours ago", value: "VinSolutions", icon: Users },
  { action: "Scheduled test drive with Jennifer W.", time: "3 hours ago", value: "3:00 PM", icon: Calendar },
  { action: "Completed objection handling module", time: "Yesterday", value: "+75 XP", icon: Star },
]

const upcomingTasks = [
  { task: "Test drive with Marcus Thompson - F-150 Platinum", time: "Today, 3:00 PM", priority: "high", type: "appointment" },
  { task: "Send finance options to Jennifer Williams", time: "Today, 5:00 PM", priority: "high", type: "follow-up" },
  { task: "Call back David Chen - Camry XSE", time: "Tomorrow, 10:00 AM", priority: "medium", type: "call" },
  { task: "Price negotiation with Sarah Martinez", time: "Tomorrow, 2:00 PM", priority: "medium", type: "negotiation" },
]

const leaderboard = [
  { name: "You", units: 15, revenue: "$892,450", rank: 1 },
  { name: "Mike Johnson", units: 12, revenue: "$745,000", rank: 2 },
  { name: "Sarah Davis", units: 11, revenue: "$698,500", rank: 3 },
  { name: "Chris Wilson", units: 9, revenue: "$542,000", rank: 4 },
]

export function DashboardSection() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary">
            <Image 
              src="/images/fsa-logo-main.png" 
              alt="FSA Elite Performance" 
              width={64} 
              height={64}
              className="object-cover"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Welcome Back, Champion
            </h1>
            <p className="text-muted-foreground mt-1">
              {"You're crushing it! Let's close some deals today."}
            </p>
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Zap className="h-4 w-4 mr-2" />
          Quick Add Lead
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-500">
                  {stat.change}
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                    <span className="text-xs font-semibold text-primary">{activity.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{task.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase">
                      {task.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Team Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((person, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  person.rank === 1 
                    ? 'bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20' 
                    : 'bg-secondary/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  person.rank === 1 ? 'bg-primary text-primary-foreground' :
                  person.rank === 2 ? 'bg-gray-400 text-gray-900' :
                  person.rank === 3 ? 'bg-amber-600 text-amber-100' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {person.rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {person.name}
                    {person.rank === 1 && <span className="ml-2 text-primary">(You)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{person.units} units</p>
                </div>
                <span className="text-sm font-semibold text-primary">{person.revenue}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Motivational Banner */}
      <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/20 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="hidden md:block w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/50">
                <Image 
              src="/images/fsa-logo-main.png" 
              alt="FSA Elite" 
              width={80} 
              height={80}
              className="object-cover"
              style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  &quot;The difference between ordinary and extraordinary is that little extra.&quot;
                </h3>
                <p className="text-muted-foreground">- Jimmy Johnson | FSA Elite Performance Training</p>
              </div>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap">
              Continue Training
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-border hover:border-primary hover:bg-primary/5">
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-foreground">Call Hot Lead</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-border hover:border-primary hover:bg-primary/5">
          <Calendar className="h-5 w-5 text-primary" />
          <span className="text-foreground">Schedule Demo</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-border hover:border-primary hover:bg-primary/5">
          <CheckCircle className="h-5 w-5 text-primary" />
          <span className="text-foreground">Log Activity</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-border hover:border-primary hover:bg-primary/5">
          <Star className="h-5 w-5 text-primary" />
          <span className="text-foreground">Training Hub</span>
        </Button>
      </div>

      {/* Social Proof Section */}
      <SocialProof />
    </div>
  )
}
