"use client";

import { useState } from "react";
import { PenTool, CheckCircle2, Globe, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SeoManagerPage() {
  const [siteTitle, setSiteTitle] = useState("Fortress Preservation | Property Preservation & REO Services");
  const [metaDesc, setMetaDesc] = useState("Institutional-grade property preservation, compliant field inspections, and REO management across 47 states.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10 text-slate-100 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <PenTool className="w-8 h-8 text-amber-400" /> SEO Manager & Audit Suite
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure site-wide search engine optimization, sitemaps, structured schema, and meta defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#0B1D3A]/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" /> Global Metadata Defaults
              </CardTitle>
              <CardDescription className="text-slate-400">Default Title Tag and Meta Description used across fallbacks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Global Site Title Tag</label>
                  <Input
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="bg-[#071120] border-slate-700 text-white text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Global Meta Description</label>
                  <Textarea
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="bg-[#071120] border-slate-700 text-white text-xs"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  {saved && <span className="text-emerald-400 text-xs font-bold">✓ Saved successfully!</span>}
                  <Button type="submit" className="ml-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase px-5">
                    Save Defaults
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0B1D3A]/80 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> SEO Health Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="text-center p-4 bg-[#071120] rounded-xl border border-slate-800">
                <div className="text-4xl font-extrabold text-amber-400">98/100</div>
                <div className="text-slate-400 text-[10px] uppercase font-bold mt-1">Excellent SEO Optimization</div>
              </div>

              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> XML Sitemap (`/sitemap.xml`)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Robots.txt (`/robots.txt`)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> OpenGraph & Twitter Cards
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
