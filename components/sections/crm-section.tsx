"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  Plus, 
  Search,
  Phone,
  Mail,
  Calendar,
  MoreVertical,
  Filter,
  ArrowUpDown,
  Car,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
  Link as LinkIcon,
  ExternalLink,
  Zap,
  Clock,
  TrendingUp,
  DollarSign
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type LeadStatus = "hot" | "warm" | "cold" | "sold" | "lost"
type LeadSource = "vinsolutions" | "elead" | "walk-in" | "phone" | "internet" | "referral"

interface Lead {
  id: number
  name: string
  phone: string
  email: string
  vehicle: string
  tradeIn?: string
  value: string
  status: LeadStatus
  source: LeadSource
  lastContact: string
  nextAction: string
  assignedTo: string
}

const leads: Lead[] = [
  {
    id: 1,
    name: "Marcus Thompson",
    phone: "(555) 123-4567",
    email: "mthompson@email.com",
    vehicle: "2025 Ford F-150 Platinum",
    tradeIn: "2019 Chevy Silverado",
    value: "$68,500",
    status: "hot",
    source: "vinsolutions",
    lastContact: "30 min ago",
    nextAction: "Test drive scheduled 3PM",
    assignedTo: "You"
  },
  {
    id: 2,
    name: "Jennifer Williams",
    phone: "(555) 234-5678",
    email: "jwilliams@email.com",
    vehicle: "2026 Chevrolet Tahoe RST",
    tradeIn: "2021 Honda Pilot",
    value: "$72,000",
    status: "hot",
    source: "elead",
    lastContact: "1 hour ago",
    nextAction: "Send finance options",
    assignedTo: "You"
  },
  {
    id: 3,
    name: "David Chen",
    phone: "(555) 345-6789",
    email: "dchen@email.com",
    vehicle: "2025 Toyota Camry XSE",
    value: "$35,500",
    status: "warm",
    source: "internet",
    lastContact: "Yesterday",
    nextAction: "Follow up call",
    assignedTo: "You"
  },
  {
    id: 4,
    name: "Sarah Martinez",
    phone: "(555) 456-7890",
    email: "smartinez@email.com",
    vehicle: "2025 Jeep Grand Cherokee",
    tradeIn: "2018 Jeep Wrangler",
    value: "$58,000",
    status: "warm",
    source: "vinsolutions",
    lastContact: "2 days ago",
    nextAction: "Price negotiation",
    assignedTo: "You"
  },
  {
    id: 5,
    name: "Robert Johnson",
    phone: "(555) 567-8901",
    email: "rjohnson@email.com",
    vehicle: "2024 RAM 1500 Laramie",
    value: "$62,000",
    status: "cold",
    source: "elead",
    lastContact: "5 days ago",
    nextAction: "Re-engagement email",
    assignedTo: "You"
  },
  {
    id: 6,
    name: "Emily Davis",
    phone: "(555) 678-9012",
    email: "edavis@email.com",
    vehicle: "2025 Honda CR-V Hybrid",
    tradeIn: "2020 Toyota RAV4",
    value: "$42,500",
    status: "sold",
    source: "walk-in",
    lastContact: "Today",
    nextAction: "Delivery prep",
    assignedTo: "You"
  },
]

const statusConfig: Record<LeadStatus, { color: string; bgColor: string; label: string }> = {
  hot: { color: "text-red-500", bgColor: "bg-red-500/10", label: "Hot Lead" },
  warm: { color: "text-amber-500", bgColor: "bg-amber-500/10", label: "Warm" },
  cold: { color: "text-blue-500", bgColor: "bg-blue-500/10", label: "Cold" },
  sold: { color: "text-green-500", bgColor: "bg-green-500/10", label: "Sold" },
  lost: { color: "text-gray-500", bgColor: "bg-gray-500/10", label: "Lost" }
}

const sourceIcons: Record<LeadSource, { icon: string; label: string }> = {
  vinsolutions: { icon: "VS", label: "VinSolutions" },
  elead: { icon: "eL", label: "eLeads" },
  "walk-in": { icon: "WI", label: "Walk-In" },
  phone: { icon: "PH", label: "Phone" },
  internet: { icon: "IN", label: "Internet" },
  referral: { icon: "RF", label: "Referral" }
}

const pipelineStages = [
  { name: "New Leads", count: 8, value: "$420,000", color: "bg-blue-500" },
  { name: "Contacted", count: 12, value: "$580,000", color: "bg-amber-500" },
  { name: "Appointment", count: 6, value: "$340,000", color: "bg-purple-500" },
  { name: "Negotiation", count: 4, value: "$245,000", color: "bg-orange-500" },
  { name: "Closed Won", count: 15, value: "$890,000", color: "bg-green-500" },
]

interface IntegrationStatus {
  name: string
  connected: boolean
  lastSync: string
  leadsToday: number
  logo: string
}

const integrations: IntegrationStatus[] = [
  {
    name: "VinSolutions",
    connected: true,
    lastSync: "2 min ago",
    leadsToday: 12,
    logo: "/images/vinsolutions-logo.jpg"
  },
  {
    name: "eLeads CRM",
    connected: true,
    lastSync: "5 min ago",
    leadsToday: 8,
    logo: "/images/elead-logo.jpg"
  }
]

export function CRMSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all")
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all")
  const [isSyncing, setIsSyncing] = useState(false)

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter
    return matchesSearch && matchesStatus && matchesSource
  })

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Automotive CRM
          </h1>
          <p className="text-muted-foreground mt-1">
            Unified lead management with VinSolutions & eLeads integration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border-border text-foreground"
            onClick={handleSync}
            disabled={isSyncing}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isSyncing && "animate-spin")} />
            {isSyncing ? "Syncing..." : "Sync All"}
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Integration Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    <span className="text-lg font-bold text-primary">
                      {integration.name === "VinSolutions" ? "VS" : "eL"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{integration.name}</h3>
                      {integration.connected ? (
                        <span className="flex items-center gap-1 text-xs text-green-500">
                          <CheckCircle className="h-3 w-3" />
                          Connected
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          Disconnected
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Synced {integration.lastSync}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {integration.leadsToday} leads today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">$890K</p>
                <p className="text-xs text-muted-foreground">Closed MTD</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">32%</p>
                <p className="text-xs text-muted-foreground">Close Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Car className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15</p>
                <p className="text-xs text-muted-foreground">Units Sold</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Overview */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Sales Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pipelineStages.map((stage) => (
              <div key={stage.name} className="text-center p-4 rounded-lg bg-secondary/50">
                <div className={cn("w-3 h-3 rounded-full mx-auto mb-2", stage.color)} />
                <p className="text-sm font-medium text-muted-foreground mb-1">{stage.name}</p>
                <p className="text-2xl font-bold text-foreground">{stage.count}</p>
                <p className="text-sm text-primary">{stage.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, vehicle, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-foreground"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-border text-foreground">
              <Filter className="h-4 w-4 mr-2" />
              Status: {statusFilter === "all" ? "All" : statusConfig[statusFilter].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-border">
            <DropdownMenuItem onClick={() => setStatusFilter("all")} className="text-foreground">All</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusFilter("hot")} className="text-foreground">Hot Lead</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("warm")} className="text-foreground">Warm</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("cold")} className="text-foreground">Cold</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("sold")} className="text-foreground">Sold</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("lost")} className="text-foreground">Lost</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-border text-foreground">
              <LinkIcon className="h-4 w-4 mr-2" />
              Source: {sourceFilter === "all" ? "All" : sourceIcons[sourceFilter].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-border">
            <DropdownMenuItem onClick={() => setSourceFilter("all")} className="text-foreground">All Sources</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSourceFilter("vinsolutions")} className="text-foreground">VinSolutions</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSourceFilter("elead")} className="text-foreground">eLeads</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSourceFilter("walk-in")} className="text-foreground">Walk-In</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSourceFilter("phone")} className="text-foreground">Phone</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSourceFilter("internet")} className="text-foreground">Internet</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSourceFilter("referral")} className="text-foreground">Referral</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="border-border text-foreground">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Leads Table */}
      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-primary" />
            Active Leads ({filteredLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vehicle Interest</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Value</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Next Action</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        <Car className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-foreground font-medium">{lead.vehicle}</p>
                          {lead.tradeIn && (
                            <p className="text-xs text-muted-foreground">Trade: {lead.tradeIn}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-primary">{lead.value}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold",
                        lead.source === "vinsolutions" && "bg-blue-500/10 text-blue-500",
                        lead.source === "elead" && "bg-purple-500/10 text-purple-500",
                        lead.source === "walk-in" && "bg-green-500/10 text-green-500",
                        lead.source === "phone" && "bg-amber-500/10 text-amber-500",
                        lead.source === "internet" && "bg-cyan-500/10 text-cyan-500",
                        lead.source === "referral" && "bg-pink-500/10 text-pink-500"
                      )}>
                        {sourceIcons[lead.source].icon}
                        <span className="hidden sm:inline">{sourceIcons[lead.source].label}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                        statusConfig[lead.status].bgColor,
                        statusConfig[lead.status].color
                      )}>
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          lead.status === "hot" && "bg-red-500",
                          lead.status === "warm" && "bg-amber-500",
                          lead.status === "cold" && "bg-blue-500",
                          lead.status === "sold" && "bg-green-500",
                          lead.status === "lost" && "bg-gray-500"
                        )} />
                        {statusConfig[lead.status].label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-foreground">{lead.nextAction}</p>
                        <p className="text-xs text-muted-foreground">{lead.lastContact}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-green-500/10">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-blue-500/10">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-purple-500/10">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuItem className="text-foreground">View Full Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground">Edit Lead</DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground">Add Note</DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground">Schedule Follow-up</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-foreground">Open in VinSolutions</DropdownMenuItem>
                            <DropdownMenuItem className="text-foreground">Open in eLeads</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Mark as Lost</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integration Setup CTA */}
      <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <LinkIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">CRM Integration Settings</h3>
                <p className="text-sm text-muted-foreground">Configure VinSolutions and eLeads API connections</p>
              </div>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Configure Integrations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
