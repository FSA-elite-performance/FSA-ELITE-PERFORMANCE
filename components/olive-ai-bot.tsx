"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { 
  MessageCircle, 
  X, 
  Send,
  BookOpen,
  Target,
  TrendingUp,
  Lightbulb
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickActions = [
  { label: "Sales Tips", icon: Lightbulb, prompt: "Give me a quick sales tip for closing deals" },
  { label: "Objection Help", icon: Target, prompt: "How do I handle price objection?" },
  { label: "Training", icon: BookOpen, prompt: "What training module should I do next?" },
  { label: "Lead Advice", icon: TrendingUp, prompt: "How should I prioritize my leads today?" },
]

const oliveResponses: Record<string, string> = {
  "default": "Hey there, Champion! I'm Olive, your FSA Elite Performance AI coach. I'm here to help you crush your sales goals, handle objections like a pro, and keep you motivated. What can I help you with today?",
  "sales tip": "Here's a golden nugget for you: The best closers don't sell products, they sell solutions to problems. Before your next pitch, ask yourself: 'What problem am I solving for this customer?' When you frame everything around their pain points, the close becomes natural. Remember - people buy feelings, not features!",
  "objection": "Price objections are actually buying signals in disguise! Here's the FSA Elite method:\n\n1. **Acknowledge**: 'I completely understand price is important...'\n2. **Isolate**: 'If price wasn't a factor, would this be the right vehicle for you?'\n3. **Build Value**: Focus on total cost of ownership, not monthly payment\n4. **Create Urgency**: 'This deal structure is only available today'\n\nRemember: The customer who says 'it's too expensive' is really saying 'I don't see the value yet.'",
  "training": "Based on your recent activity, I recommend jumping into 'The Art of the Close' module! You've been crushing the rapport-building, but I noticed a few deals slipping in the final stages. This module has 15 proven closing techniques - mastering even 3-4 of them will boost your numbers significantly. Want me to start it for you?",
  "lead": "Let's prioritize your leads like an elite closer:\n\n**Hot (Work first)**:\n- Marcus Thompson - F-150 inquiry, high intent signals\n- Jennifer Williams - Already did test drive, ready for numbers\n\n**Warm (Follow up today)**:\n- David Chen - Needs callback, interested in Camry\n\n**Pro tip**: The best time to call is between 4-6 PM when people are leaving work. Start with your hottest leads and ride that momentum!",
  "motivation": "Listen, Champion - you're already in the top tier just by being here and putting in the work. Every 'no' is just a 'not yet.' Every objection is practice for your next close. The difference between good and ELITE isn't talent - it's showing up every single day ready to compete. Now get out there and make it happen!",
  "greeting": "What's up, Champion! Ready to dominate today? I've got your back with sales strategies, objection handlers, and whatever else you need to close more deals. Let's make it happen!",
}

function getOliveResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  if (message.includes("tip") || message.includes("advice") || message.includes("help me sell")) {
    return oliveResponses["sales tip"]
  }
  if (message.includes("objection") || message.includes("price") || message.includes("too expensive") || message.includes("budget")) {
    return oliveResponses["objection"]
  }
  if (message.includes("training") || message.includes("module") || message.includes("learn") || message.includes("course")) {
    return oliveResponses["training"]
  }
  if (message.includes("lead") || message.includes("prioritize") || message.includes("who should i call") || message.includes("prospect")) {
    return oliveResponses["lead"]
  }
  if (message.includes("motivat") || message.includes("inspire") || message.includes("feeling down") || message.includes("tough day")) {
    return oliveResponses["motivation"]
  }
  if (message.includes("hi") || message.includes("hello") || message.includes("hey") || message.includes("what's up")) {
    return oliveResponses["greeting"]
  }
  
  return `Great question! Here's my take on that:\n\nIn the FSA Elite system, we always focus on three things: **Rapport**, **Value**, and **Urgency**. Whatever challenge you're facing, run it through this framework.\n\nWant me to dive deeper into any specific area? I can help with objection handling, closing techniques, lead prioritization, or just give you some motivation to crush it today!`
}

export function OliveAIBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: oliveResponses["default"],
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    const handleOpenOlive = () => setIsOpen(true)
    window.addEventListener("openOliveAI", handleOpenOlive)
    return () => window.removeEventListener("openOliveAI", handleOpenOlive)
  }, [])
  
  const handleSend = (message?: string) => {
    const userMessage = message || input.trim()
    if (!userMessage) return
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getOliveResponse(userMessage)
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1000 + Math.random() * 500)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Olive AI Coach"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500",
          "flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <div className="relative">
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" aria-hidden="true" />
        </div>
      </button>
      
      <div
        role="dialog"
        aria-label="Olive AI Coach chat"
        aria-modal="false"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Card className="bg-card border-border shadow-2xl overflow-hidden">
          <CardHeader className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                  <Image 
                    src="/images/olive-coach-logo.jpg" 
                    alt="Olive AI Coach" 
                    width={40} 
                    height={40}
                    className="object-cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Olive</h3>
                  <p className="text-xs text-white/80">FSA Elite AI Coach</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close Olive AI Coach"
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5",
                    msg.role === "user" 
                      ? "bg-primary text-primary-foreground rounded-br-md" 
                      : "bg-secondary text-foreground rounded-bl-md"
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="px-4 py-2 border-t border-border">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-xs font-medium text-foreground whitespace-nowrap transition-colors"
                  >
                    <action.icon className="h-3.5 w-3.5 text-primary" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <label htmlFor="olive-chat-input" className="sr-only">Ask Olive anything</label>
                <input
                  id="olive-chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Olive anything..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="rounded-full w-10 h-10 p-0 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
