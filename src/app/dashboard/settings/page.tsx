"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Key, ShieldCheck, HardDrive } from "lucide-react"

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState("AIzaSy...................................");
  const [model, setModel] = useState("gemini-2.5-flash");
  
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage Google Gemini AI configurations, usage tracking, and Cloudflare environment bindings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" /> Google Gemini AI Engine
          </CardTitle>
          <CardDescription>
            Configure the Google Gemini API Key used by Cloudflare Workers for AI Research & Content Generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Google Gemini API Key (GOOGLE_GEMINI_API_KEY)</Label>
            <div className="flex gap-2">
              <Input 
                type="password" 
                value={geminiKey}
                onChange={e => setGeminiKey(e.target.value)}
                className="font-mono"
              />
              <Button variant="outline">Configured</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Pass this key as <code className="text-amber-400">GOOGLE_GEMINI_API_KEY</code> in your Cloudflare Pages/Workers environment variables.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Gemini Model Target</Label>
            <Input 
              type="text" 
              value={model}
              onChange={e => setModel(e.target.value)}
              className="font-mono"
            />
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t p-4 flex justify-end">
          <Button>Save Configuration</Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" /> API Usage Tracking
            </CardTitle>
            <CardDescription>Current billing cycle statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tokens Generated</span>
                  <span className="font-medium">1.2M / 2.0M</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '60%' }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Estimated cost this month: $24.50</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Current Role</span>
              <span className="font-bold text-primary">ADMIN</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Two-Factor Auth</span>
              <span className="text-emerald-500 font-medium">Enabled</span>
            </div>
            <Button variant="outline" className="w-full mt-2">Manage Users</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
