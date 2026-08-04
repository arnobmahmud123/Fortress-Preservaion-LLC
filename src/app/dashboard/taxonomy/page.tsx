"use client";

import { useState } from "react";
import { FolderTree, Tag, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaxonomyPage() {
  const [categories, setCategories] = useState([
    { id: "1", name: "Compliance & Guidelines", slug: "compliance", count: 12 },
    { id: "2", name: "Field Operations", slug: "field-operations", count: 8 },
    { id: "3", name: "REO Management", slug: "reo-management", count: 5 },
    { id: "4", name: "Industry News", slug: "industry-news", count: 3 },
  ]);

  const [tags, setTags] = useState([
    { id: "1", name: "Fannie Mae", slug: "fannie-mae" },
    { id: "2", name: "Freddie Mac", slug: "freddie-mac" },
    { id: "3", name: "HUD / FHA", slug: "hud-fha" },
    { id: "4", name: "Winterization", slug: "winterization" },
    { id: "5", name: "Grass Cutting", slug: "grass-cutting" },
  ]);

  const [newCatName, setNewCatName] = useState("");
  const [newTagName, setNewTagName] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setCategories([...categories, { id: Date.now().toString(), name: newCatName, slug, count: 0 }]);
    setNewCatName("");
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName) return;
    const slug = newTagName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setTags([...tags, { id: Date.now().toString(), name: newTagName, slug }]);
    setNewTagName("");
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10 text-slate-100 font-sans">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <FolderTree className="w-8 h-8 text-amber-400" /> Categories & Tags Taxonomy
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Organize your property preservation content structure for enhanced SEO indexing and navigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CATEGORIES CARD */}
        <Card className="bg-[#0B1D3A]/80 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-amber-400" /> Categories
            </CardTitle>
            <CardDescription className="text-slate-400">Primary content groupings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <Input
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="New Category Name..."
                className="bg-[#071120] border-slate-700 text-white text-xs"
              />
              <Button type="submit" className="bg-amber-400 text-slate-950 font-bold text-xs uppercase px-3">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </form>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-[#071120] text-xs">
                  <div>
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">/category/{c.slug}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                      {c.count} posts
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* TAGS CARD */}
        <Card className="bg-[#0B1D3A]/80 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" /> Tags
            </CardTitle>
            <CardDescription className="text-slate-400">Granular topic keywords</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddTag} className="flex gap-2">
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New Tag Name..."
                className="bg-[#071120] border-slate-700 text-white text-xs"
              />
              <Button type="submit" className="bg-purple-500 text-white font-bold text-xs uppercase px-3">
                <Plus className="w-4 h-4 mr-1" /> Add Tag
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((t) => (
                <span
                  key={t.id}
                  className="bg-[#071120] border border-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  <span>#{t.name}</span>
                  <button
                    onClick={() => handleDeleteTag(t.id)}
                    className="text-slate-500 hover:text-rose-400 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
