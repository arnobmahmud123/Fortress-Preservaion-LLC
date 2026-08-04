"use client"

import { useState } from "react"
import { Bot, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your AI CMS Assistant. Need help writing an outline, finding topics, or tweaking SEO settings?" }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I can help with that! In a production environment, I'd connect to the same LLM backend to process: " + userMsg 
      }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform p-0 flex items-center justify-center bg-primary"
        >
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] shadow-2xl z-50 flex flex-col h-[500px] border-primary/20 animate-in slide-in-from-bottom-5">
          <CardHeader className="p-4 border-b bg-muted/40 flex flex-row items-center justify-between space-y-0 rounded-t-xl">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
                <div className={\`max-w-[85%] rounded-2xl px-4 py-2 text-sm \${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-br-none' 
                    : 'bg-muted rounded-bl-none'
                }\`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-2 text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-3 border-t bg-background rounded-b-xl">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex w-full items-center gap-2"
            >
              <Input 
                placeholder="Ask the AI..." 
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
