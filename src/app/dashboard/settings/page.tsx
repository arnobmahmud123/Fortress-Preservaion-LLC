"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Key, ShieldCheck, HardDrive } from "lucide-react"

export default function SettingsPage() {
  const [openAiKey, setOpenAiKey] = useState("sk-.......................................")
  const [anthropicKey, setAnthropicKey] = useState("")
  
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage API configurations, usage tracking, and system access.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" /> AI Model Configurations
          </CardTitle>
          <CardDescription>
            Securely manage the API keys that power your AI Content Studio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>OpenAI API Key (Default)</Label>
            <div className="flex gap-2">
              <Input 
                type="password" 
                value={openAiKey}
                onChange={e => setOpenAiKey(e.target.value)}
                className="font-mono"
              />
              <Button variant="outline">Verify</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Anthropic API Key (Claude)</Label>
            <div className="flex gap-2">
              <Input 
                type="password" 
                value={anthropicKey}
                onChange={e => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-..."
                className="font-mono"
              />
              <Button variant="outline">Verify</Button>
            </div>
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
