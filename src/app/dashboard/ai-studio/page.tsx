"use client"

import { useState } from "react"
import { Bot, Sparkles, Target, Zap, CheckCircle2, FileText, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type ResearchData = {
  keywords?: string[]
  contentGaps?: string[]
  competitorInsights?: string[]
  recommendedStructure?: string[]
}

export default function AIStudioPage() {
  const [step, setStep] = useState<"SETUP" | "RESEARCHING" | "GENERATING" | "REVIEW">("SETUP")
  
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("")
  const [contentType, setContentType] = useState("guide")
  const [style, setStyle] = useState("expert")
  const [length] = useState("2000")
  
  const [researchData, setResearchData] = useState<ResearchData | null>(null)
  const [generatedArticle, setGeneratedArticle] = useState<string>("")
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerateFlow = async () => {
    if (!topic) {
      alert("Please enter a topic first.")
      return
    }
    
    // Step 1: Research
    setStep("RESEARCHING")
    try {
      const { conductContentResearch } = await import("@/app/actions/research-actions")
      const resResult = await conductContentResearch(topic)
      
      if (resResult.success && resResult.research) {
        setResearchData(resResult.research)
      } else {
        alert("Research failed: " + resResult.error)
        setStep("SETUP")
        return
      }

      // Step 2: Generate
      setStep("GENERATING")
      const { generatePropertyPreservationArticle } = await import("@/app/actions/ai-actions")
      const genResult = await generatePropertyPreservationArticle({
        topic, audience, contentType, style, length
      })
      
      if (genResult.success && genResult.text) {
        setGeneratedArticle(genResult.text)
        setStep("REVIEW")
      } else {
        alert("Generation failed: " + genResult.error)
        setStep("SETUP")
      }
    } catch {
      alert("An error occurred during the AI flow.")
      setStep("SETUP")
    }
  }

  const handlePublish = async (status: "DRAFT" | "PUBLISHED") => {
    setIsSaving(true)
    try {
      const { saveGeneratedPost } = await import("@/app/actions/post-actions")
      // In a real flow, we'd extract the actual title from the generated markdown or ask the user
      const title = topic
      
      const result = await saveGeneratedPost({
        title,
        content: generatedArticle,
        focusKeyword: researchData?.keywords?.[0] || "",
        status
      })

      if (result.success) {
        alert(`Article successfully saved as ${status}!`)
        setStep("SETUP")
        setGeneratedArticle("")
        setResearchData(null)
      } else {
        alert("Failed to save: " + result.error)
      }
    } catch {
      alert("Failed to save post.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Bot className="w-8 h-8 text-primary" /> AI Content Studio
        </h1>
        <p className="text-muted-foreground mt-2">
          Enter a topic prompt, and the AI will automatically research, write, and optimize an expert-level article.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {step === "SETUP" && (
            <Card>
              <CardHeader>
                <CardTitle>Article Specifications</CardTitle>
                <CardDescription>Provide details about the content you want to generate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Prompt</Label>
                  <Textarea 
                    id="topic" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder='e.g., "Write an expert article about FHA property preservation grass cutting requirements"'
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input 
                    id="audience" 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., Property preservation contractors, vendors, mortgage companies" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Select value={contentType} onValueChange={(val) => setContentType(val as string)}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Industry Guide</SelectItem>
                        <SelectItem value="howto">How-To Article</SelectItem>
                        <SelectItem value="checklist">Checklist</SelectItem>
                        <SelectItem value="news">News Article</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Writing Style</Label>
                    <Select value={style} onValueChange={(val) => setStyle(val as string)}>
                      <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-6 rounded-b-xl border-t border-border">
                <Button 
                  onClick={handleGenerateFlow} 
                  className="w-full text-lg h-12 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 mr-2" /> GENERATE ARTICLE
                </Button>
              </CardFooter>
            </Card>
          )}

          {(step === "RESEARCHING" || step === "GENERATING") && (
            <Card className="min-h-[400px] flex flex-col items-center justify-center space-y-6 text-center p-12">
              <Zap className="w-16 h-16 text-primary animate-pulse" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {step === "RESEARCHING" ? "Conducting SEO Research..." : "Drafting the Article..."}
                </h2>
                <p className="text-muted-foreground max-w-md">
                  {step === "RESEARCHING" 
                    ? "Our AI is currently analyzing search intent, competitors, and identifying content gaps in the property preservation niche."
                    : "The AI is combining the research data to write a highly optimized, expert-level article for you."}
                </p>
              </div>
            </Card>
          )}

          {step === "REVIEW" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    Article Generation Complete
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 border border-border rounded-xl p-6 font-mono text-sm overflow-y-auto max-h-[600px] whitespace-pre-wrap">
                    {generatedArticle}
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-6 flex items-center justify-between border-t border-border gap-4">
                  <Button variant="outline" onClick={() => setStep("SETUP")} className="w-full">
                    Discard
                  </Button>
                  <Button variant="secondary" onClick={() => handlePublish("DRAFT")} disabled={isSaving} className="w-full">
                    Save as Draft
                  </Button>
                  <Button onClick={() => handlePublish("PUBLISHED")} disabled={isSaving} className="w-full">
                    <FileText className="w-4 h-4 mr-2" /> Publish Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" /> AI Engine Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Research Module</span>
                  <span className="font-medium text-emerald-500">Connected</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Competitor Analysis</span>
                  <span className="font-medium text-emerald-500">Connected</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Knowledge Base</span>
                  <span className="font-medium">Property Preservation V1.0</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {researchData && (
            <Card className="fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" /> Live Research Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Target Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {researchData.keywords?.map((kw) => (
                      <span key={kw} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Content Gaps Filled</h4>
                  <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                    {researchData.contentGaps?.map((gap, i) => (
                      <li key={i}>{gap}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
