"use client";

import { useState } from "react";
import { Bot, Sparkles, Target, Zap, CheckCircle2, FileText, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ResearchData = {
  keywords?: string[];
  contentGaps?: string[];
  competitorInsights?: string[];
  recommendedStructure?: string[];
};

export function parseSeoMetadata(articleText: string) {
  let cleanContent = articleText;
  let seoData = {
    seoTitle: "",
    metaDescription: "",
    focusKeyword: "",
    secondaryKeywords: "",
  };

  const jsonMatch =
    articleText.match(/##\s*SEO\s*Metadata[\s\S]*?```json\s*([\s\S]*?)\s*```/i) ||
    articleText.match(/```json\s*(\{[\s\S]*?"seoTitle"[\s\S]*?\})\s*```/i);

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1].trim());
      seoData.seoTitle = parsed.seoTitle || "";
      seoData.metaDescription = parsed.metaDescription || "";
      seoData.focusKeyword = parsed.focusKeyword || "";
      seoData.secondaryKeywords = Array.isArray(parsed.secondaryKeywords)
        ? parsed.secondaryKeywords.join(", ")
        : parsed.secondaryKeywords || "";

      cleanContent = articleText.replace(jsonMatch[0], "").trim();
    } catch (e) {
      console.warn("Failed to parse JSON metadata:", e);
    }
  }

  return { cleanContent, seoData };
}

export default function AIStudioPage() {
  const [step, setStep] = useState<"SETUP" | "RESEARCHING" | "GENERATING" | "REVIEW">("SETUP");

  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [contentType, setContentType] = useState("guide");
  const [style, setStyle] = useState("expert");
  const [length] = useState("2000");

  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // SEO Editable Fields
  const [articleTitle, setArticleTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");

  const handleGenerateFlow = async () => {
    if (!topic) {
      alert("Please enter a topic first.");
      return;
    }

    setStep("RESEARCHING");
    try {
      const { conductContentResearch } = await import("@/app/actions/research-actions");
      const resResult = await conductContentResearch(topic);

      if (resResult.success && resResult.research) {
        setResearchData(resResult.research);
      } else {
        alert("Research failed: " + resResult.error);
        setStep("SETUP");
        return;
      }

      setStep("GENERATING");
      const { generatePropertyPreservationArticle } = await import("@/app/actions/ai-actions");
      const genResult = await generatePropertyPreservationArticle({
        topic,
        audience,
        contentType,
        style,
        length,
      });

      if (genResult.success && genResult.text) {
        const { cleanContent, seoData } = parseSeoMetadata(genResult.text);

        setGeneratedArticle(cleanContent);
        setArticleTitle(seoData.seoTitle || topic);
        setSeoTitle(seoData.seoTitle || topic);
        setMetaDescription(seoData.metaDescription || "");
        setFocusKeyword(seoData.focusKeyword || researchData?.keywords?.[0] || "");
        setSecondaryKeywords(seoData.secondaryKeywords || "");

        setStep("REVIEW");
      } else {
        alert("Generation failed: " + genResult.error);
        setStep("SETUP");
      }
    } catch {
      alert("An error occurred during the AI flow.");
      setStep("SETUP");
    }
  };

  const handlePublish = async (status: "DRAFT" | "PUBLISHED") => {
    setIsSaving(true);
    try {
      const { saveGeneratedPost } = await import("@/app/actions/post-actions");

      const result = await saveGeneratedPost({
        title: articleTitle || topic,
        content: generatedArticle,
        excerpt: metaDescription || generatedArticle.slice(0, 150) + "...",
        seoTitle,
        metaDescription,
        focusKeyword,
        secondaryKeywords,
        status,
      });

      if (result.success) {
        alert(`Article successfully saved & published as ${status}!`);
        setStep("SETUP");
        setGeneratedArticle("");
        setResearchData(null);
      } else {
        alert("Failed to save: " + result.error);
      }
    } catch {
      alert("Failed to save post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-20 font-sans text-slate-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-white">
          <Bot className="w-8 h-8 text-amber-400" /> AI Content Studio
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Enter a topic prompt, and the AI will automatically research, write, and extract SEO metadata for instant publishing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {step === "SETUP" && (
            <Card className="bg-[#0B1D3A]/80 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Article Specifications</CardTitle>
                <CardDescription className="text-slate-400">Provide details about the content you want to generate.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-slate-300">Topic / Prompt *</Label>
                  <Textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder='e.g. "Write an expert article about FHA property preservation grass cutting requirements"'
                    className="min-h-[100px] resize-none bg-[#071120] border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-slate-300">Target Audience</Label>
                  <Input
                    id="audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Property preservation contractors, vendors, mortgage servicers"
                    className="bg-[#071120] border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Content Type</Label>
                    <Select value={contentType} onValueChange={(val) => setContentType(val)}>
                      <SelectTrigger className="bg-[#071120] border-slate-700 text-white"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Industry Guide</SelectItem>
                        <SelectItem value="howto">How-To Article</SelectItem>
                        <SelectItem value="checklist">Checklist</SelectItem>
                        <SelectItem value="news">News Article</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Writing Style</Label>
                    <Select value={style} onValueChange={(val) => setStyle(val)}>
                      <SelectTrigger className="bg-[#071120] border-slate-700 text-white"><SelectValue placeholder="Select style" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-[#071120]/50 p-6 rounded-b-xl border-t border-slate-800">
                <Button
                  onClick={handleGenerateFlow}
                  className="w-full text-base h-12 font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  <Sparkles className="w-5 h-5 mr-2" /> GENERATE ARTICLE & SEO METADATA
                </Button>
              </CardFooter>
            </Card>
          )}

          {(step === "RESEARCHING" || step === "GENERATING") && (
            <Card className="min-h-[400px] bg-[#0B1D3A]/80 border-slate-800 flex flex-col items-center justify-center space-y-6 text-center p-12">
              <Zap className="w-16 h-16 text-amber-400 animate-pulse" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {step === "RESEARCHING" ? "Conducting Gemini SEO Research..." : "Drafting Article & Extracting SEO Metadata..."}
                </h2>
                <p className="text-slate-400 max-w-md text-sm">
                  {step === "RESEARCHING"
                    ? "Our AI is currently analyzing search intent, competitors, and identifying content gaps in property preservation."
                    : "Writing the article and automatically formatting SEO Metadata for 1-click publishing."}
                </p>
              </div>
            </Card>
          )}

          {step === "REVIEW" && (
            <div className="space-y-6">
              <Card className="bg-[#0B1D3A]/80 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    Article Generation Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Extracted SEO Metadata Editor */}
                  <div className="p-5 bg-[#071120] border border-amber-500/30 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Auto-Extracted SEO Metadata</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">PARSED FROM AI</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Article Title</label>
                        <Input
                          value={articleTitle}
                          onChange={(e) => setArticleTitle(e.target.value)}
                          className="bg-[#0B1D3A] border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">SEO Title Tag (seoTitle)</label>
                        <Input
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          className="bg-[#0B1D3A] border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Meta Description</label>
                        <Textarea
                          rows={2}
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          className="bg-[#0B1D3A] border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1">Focus Keyword</label>
                          <Input
                            value={focusKeyword}
                            onChange={(e) => setFocusKeyword(e.target.value)}
                            className="bg-[#0B1D3A] border-slate-700 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 font-bold mb-1">Secondary Keywords</label>
                          <Input
                            value={secondaryKeywords}
                            onChange={(e) => setSecondaryKeywords(e.target.value)}
                            className="bg-[#0B1D3A] border-slate-700 text-white text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean Article Content */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Clean Article Content (Markdown)</label>
                    <div className="bg-[#071120] border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-200 overflow-y-auto max-h-[500px] whitespace-pre-wrap">
                      {generatedArticle}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-[#071120]/50 p-6 flex items-center justify-between border-t border-slate-800 gap-4">
                  <Button variant="outline" onClick={() => setStep("SETUP")} className="w-full text-xs font-bold border-slate-700 text-slate-300">
                    Discard
                  </Button>
                  <Button variant="secondary" onClick={() => handlePublish("DRAFT")} disabled={isSaving} className="w-full text-xs font-bold bg-slate-800 text-slate-200">
                    Save as Draft
                  </Button>
                  <Button onClick={() => handlePublish("PUBLISHED")} disabled={isSaving} className="w-full text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 uppercase tracking-wider">
                    <FileText className="w-4 h-4 mr-2" /> Publish Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0B1D3A]/80 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-amber-400" /> AI Engine Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-xs">
                <li className="flex flex-col gap-1">
                  <span className="text-slate-400">AI Model Provider</span>
                  <span className="font-bold text-amber-400">Google Gemini AI</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-slate-400">SEO Parser</span>
                  <span className="font-bold text-emerald-400">Auto-Extract Active</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {researchData && (
            <Card className="bg-[#0B1D3A]/80 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Search className="w-5 h-5 text-amber-400" /> Live Research Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-slate-300 mb-2">Target Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {researchData.keywords?.map((kw) => (
                      <span key={kw} className="bg-amber-400/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded text-[11px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
