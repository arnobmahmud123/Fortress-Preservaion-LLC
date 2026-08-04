"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, CheckCircle2, FileText, Sparkles } from "lucide-react"

const scheduledPosts = [
  { date: new Date(new Date().setDate(new Date().getDate() + 1)), title: "Winterization Requirements 2026 Update", status: "SCHEDULED" },
  { date: new Date(new Date().setDate(new Date().getDate() + 3)), title: "How to Win More Grass Cutting Bids", status: "DRAFT" },
  { date: new Date(new Date().setDate(new Date().getDate() - 2)), title: "Fannie Mae Debris Removal Guidelines", status: "PUBLISHED" },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const selectedPosts = scheduledPosts.filter(post => 
    date && post.date.toDateString() === date.toDateString()
  )

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
        <p className="text-muted-foreground mt-2">
          Manage your editorial pipeline and AI scheduled articles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" /> 
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : "Select a date"}
              </CardTitle>
              <CardDescription>Scheduled content for the selected date.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPosts.length > 0 ? (
                <div className="space-y-4">
                  {selectedPosts.map((post, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-muted-foreground p-1.5 bg-muted rounded-md" />
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {post.status === "SCHEDULED" && <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="w-3 h-3 mr-1" /> Scheduled</Badge>}
                            {post.status === "PUBLISHED" && <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Published</Badge>}
                            {post.status === "DRAFT" && <Badge variant="outline">Draft</Badge>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-lg">No content scheduled</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">There are no articles planned for this date. Would you like the AI to suggest a topic?</p>
                  <button className="mt-4 flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                    <Sparkles className="w-4 h-4" /> Suggest Topic
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
