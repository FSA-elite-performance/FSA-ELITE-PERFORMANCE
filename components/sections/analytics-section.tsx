"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Trophy,
  Calendar,
  Download
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 425000, target: 400000, units: 8 },
  { month: "Feb", revenue: 520000, target: 450000, units: 10 },
  { month: "Mar", revenue: 480000, target: 500000, units: 9 },
  { month: "Apr", revenue: 610000, target: 550000, units: 12 },
  { month: "May", revenue: 550000, target: 550000, units: 11 },
  { month: "Jun", revenue: 670000, target: 600000, units: 13 },
  { month: "Jul", revenue: 720000, target: 650000, units: 14 },
  { month: "Aug", revenue: 680000, target: 700000, units: 13 },
  { month: "Sep", revenue: 780000, target: 750000, units: 15 },
  { month: "Oct", revenue: 850000, target: 800000, units: 16 },
  { month: "Nov", revenue: 892000, target: 850000, units: 15 },
  { month: "Dec", revenue: 920000, target: 900000, units: 17 },
]

const dealsByStage = [
  { stage: "New Leads", count: 47 },
  { stage: "Contacted", count: 38 },
  { stage: "Test Drive", count: 24 },
  { stage: "Negotiation", count: 12 },
  { stage: "Sold", count: 15 },
]

const leadSources = [
  { name: "VinSolutions", value: 32, color: "#3B82F6" },
  { name: "eLeads", value: 28, color: "#8B5CF6" },
  { name: "Walk-In", value: 18, color: "#10B981" },
  { name: "Internet", value: 14, color: "#06B6D4" },
  { name: "Referral", value: 8, color: "#F59E0B" },
]

const performanceMetrics = [
  { 
    metric: "Close Rate", 
    value: "32%", 
    change: "+4.2%", 
    trend: "up",
    target: "35%"
  },
  { 
    metric: "Avg Gross/Unit", 
    value: "$3,850", 
    change: "+$420", 
    trend: "up",
    target: "$4,000"
  },
  { 
    metric: "Avg Days to Close", 
    value: "4.2 days", 
    change: "-1.3 days", 
    trend: "up",
    target: "3 days"
  },
  { 
    metric: "Units MTD", 
    value: "15", 
    change: "+3 units", 
    trend: "up",
    target: "18"
  },
]

const topPerformers = [
  { name: "You", deals: 15, revenue: "$892,450", rank: 1 },
  { name: "Mike Johnson", deals: 12, revenue: "$745,000", rank: 2 },
  { name: "Sarah Davis", deals: 11, revenue: "$698,500", rank: 3 },
  { name: "Team Average", deals: 9, revenue: "$542,000", rank: 4 },
]

export function AnalyticsSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Performance Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and dominate your targets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border text-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            This Year
          </Button>
          <Button variant="outline" className="border-border text-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{metric.metric}</span>
                <span className={`flex items-center text-sm font-medium ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {metric.change}
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">{metric.value}</p>
              <div className="flex items-center gap-2">
                <Target className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Revenue vs Target
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A853" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4A853" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#666" 
                  strokeDasharray="5 5"
                  fillOpacity={0}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#D4A853" 
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deals by Stage */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Deals by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealsByStage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="stage" type="category" stroke="#666" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#D4A853" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {leadSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {leadSources.map((source) => (
                <div key={source.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-sm text-muted-foreground">{source.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Trophy className="h-5 w-5 text-primary" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, idx) => (
              <div 
                key={performer.name} 
                className={`flex items-center justify-between p-4 rounded-lg ${
                  idx === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
                  }`}>
                    {performer.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.deals} deals closed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">{performer.revenue}</p>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
