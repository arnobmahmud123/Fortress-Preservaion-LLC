"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Activity, TrendingUp, Users, FileText } from "lucide-react"

const trafficData = [
  { name: 'Jan', visitors: 4000, organic: 2400 },
  { name: 'Feb', visitors: 3000, organic: 1398 },
  { name: 'Mar', visitors: 2000, organic: 9800 },
  { name: 'Apr', visitors: 2780, organic: 3908 },
  { name: 'May', visitors: 1890, organic: 4800 },
  { name: 'Jun', visitors: 2390, organic: 3800 },
  { name: 'Jul', visitors: 3490, organic: 4300 },
]

const seoData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 94 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & SEO Performance</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your traffic, engagement, and automated SEO scores.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Articles", value: "142", sub: "+12 this month", icon: FileText, trend: "up" },
          { label: "Monthly Visitors", value: "45.2K", sub: "+18.4% from last month", icon: Users, trend: "up" },
          { label: "Organic Traffic", value: "32.1K", sub: "71% of total traffic", icon: Activity, trend: "up" },
          { label: "Avg SEO Score", value: "92", sub: "Excellent optimization", icon: TrendingUp, trend: "up" },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <span className="text-emerald-500 font-medium">{stat.sub}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Total visitors vs organic search traffic</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="visitors" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="organic" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average SEO Score Trend</CardTitle>
            <CardDescription>AI optimization impact over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seoData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
