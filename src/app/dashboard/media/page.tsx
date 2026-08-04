"use client";

import { useState } from "react";
import { Image as ImageIcon, Video, Upload, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MediaLibraryPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const mediaItems = [
    {
      id: "1",
      title: "Contractor Inspection Work",
      url: "/images/contractor_inspection.jpg",
      type: "IMAGE",
      size: "245 KB",
    },
    {
      id: "2",
      title: "Contractor Property Preservation",
      url: "/images/contractor_preservation.jpg",
      type: "IMAGE",
      size: "312 KB",
    },
    {
      id: "3",
      title: "Contractor REO Repair",
      url: "/images/contractor_reo.jpg",
      type: "IMAGE",
      size: "289 KB",
    },
  ];

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10 text-slate-100 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-amber-400" /> Media & Assets Library
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage images, videos, and document assets for your articles and property pages.
          </p>
        </div>
        <Button className="bg-amber-400 text-slate-950 font-bold text-xs uppercase px-4 self-start flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload New Media
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mediaItems.map((item) => (
          <Card key={item.id} className="bg-[#0B1D3A]/80 border-slate-800 overflow-hidden group">
            <div className="aspect-video relative bg-[#071120] overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-500/20">
                {item.type}
              </span>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-bold text-white truncate">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs flex items-center justify-between text-slate-400 border-t border-slate-800/60 mt-2">
              <span>{item.size}</span>
              <button
                onClick={() => handleCopyUrl(item.url, item.id)}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold text-[11px]"
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === item.id ? "Copied!" : "Copy Link"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
