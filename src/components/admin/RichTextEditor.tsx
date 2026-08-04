"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Video as VideoIcon,
  Link as LinkIcon,
  AlertCircle,
  Eye,
  Edit3,
  Upload,
  Plus,
  X,
  FileCode,
  Table as TableIcon,
  Minus
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

export default function RichTextEditor({ value, onChange, minHeight = "450px" }: RichTextEditorProps) {
  const [mode, setMode] = useState<"VISUAL" | "MARKDOWN">("VISUAL");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Media Modal States
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // Helper to insert markdown or text at cursor position
  const insertFormatting = (prefix: string, suffix: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Upload Photo File Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        const markdownImg = `\n\n![${file.name}](${base64Url})\n*${file.name}*\n\n`;
        insertFormatting("", "", markdownImg);
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Video File Handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        const videoTag = `\n\n<video controls src="${base64Url}" class="w-full rounded-xl my-4 shadow-lg" alt="${file.name}"></video>\n\n`;
        insertFormatting("", "", videoTag);
        setShowVideoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    const markdownImg = `\n\n![${imageAlt || "Property Preservation Image"}](${imageUrl})\n*${imageCaption || imageAlt || ""}*\n\n`;
    insertFormatting("", "", markdownImg);
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setShowImageModal(false);
  };

  const handleAddVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;
    let embedSnippet = "";
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
      embedSnippet = `\n\n<iframe class="w-full aspect-video rounded-xl my-4 shadow-lg" src="https://www.youtube.com/embed/${videoId}" title="${videoTitle || "Video"}" allowfullscreen></iframe>\n\n`;
    } else {
      embedSnippet = `\n\n<video controls src="${videoUrl}" class="w-full rounded-xl my-4 shadow-lg"></video>\n\n`;
    }
    insertFormatting("", "", embedSnippet);
    setVideoUrl("");
    setVideoTitle("");
    setShowVideoModal(false);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) return;
    insertFormatting(`[${linkText || "Link"}](${linkUrl})`, "", "");
    setLinkUrl("");
    setLinkText("");
    setShowLinkModal(false);
  };

  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const chars = value.length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="w-full bg-[#071120] border border-slate-700/70 rounded-2xl overflow-hidden shadow-2xl font-sans text-slate-100">
      {/* TOP ADVANCED TOOLBAR */}
      <div className="bg-[#0B1D3A] border-b border-slate-800 p-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings Group */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 gap-0.5">
            <button
              type="button"
              title="Heading 1"
              onClick={() => insertFormatting("\n# ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Heading 2"
              onClick={() => insertFormatting("\n## ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Heading 3"
              onClick={() => insertFormatting("\n### ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Heading 4"
              onClick={() => insertFormatting("\n#### ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading4 className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Heading 5"
              onClick={() => insertFormatting("\n##### ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading5 className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Heading 6"
              onClick={() => insertFormatting("\n###### ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors text-xs font-bold"
            >
              <Heading6 className="w-4 h-4" />
            </button>
          </div>

          {/* Text Styles */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 gap-0.5">
            <button
              type="button"
              title="Bold (Ctrl+B)"
              onClick={() => insertFormatting("**", "**")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I)"
              onClick={() => insertFormatting("*", "*")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Underline"
              onClick={() => insertFormatting("<u>", "</u>")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Strikethrough"
              onClick={() => insertFormatting("~~", "~~")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Inline Code"
              onClick={() => insertFormatting("`", "`")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 gap-0.5">
            <button
              type="button"
              title="Bullet List"
              onClick={() => insertFormatting("\n- ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Numbered List"
              onClick={() => insertFormatting("\n1. ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Blockquote"
              onClick={() => insertFormatting("\n> ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Code Block"
              onClick={() => insertFormatting("\n```javascript\n", "\n```\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <FileCode className="w-4 h-4" />
            </button>
          </div>

          {/* Media Inserters */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-amber-500/30 gap-1">
            <button
              type="button"
              title="Insert / Upload Photo"
              onClick={() => setShowImageModal(true)}
              className="flex items-center gap-1 px-2 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded text-xs font-bold transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" /> + Photo
            </button>

            <button
              type="button"
              title="Insert / Upload Video"
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded text-xs font-bold transition-colors"
            >
              <VideoIcon className="w-3.5 h-3.5" /> + Video
            </button>

            <button
              type="button"
              title="Insert Link"
              onClick={() => setShowLinkModal(true)}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Callouts & Dividers */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 gap-0.5">
            <button
              type="button"
              title="Insert Alert Box"
              onClick={() => insertFormatting("\n> 💡 **PRO-TIP**: ", "\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <AlertCircle className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Horizontal Divider"
              onClick={() => insertFormatting("\n---\n")}
              className="p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode("VISUAL")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
              mode === "VISUAL" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Editor
          </button>
          <button
            type="button"
            onClick={() => setMode("MARKDOWN")}
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${
              mode === "MARKDOWN" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>
      </div>

      {/* EDITOR AREA */}
      <div className="relative">
        {mode === "VISUAL" ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            className="w-full p-6 bg-[#071120] text-slate-100 font-mono text-sm leading-relaxed focus:outline-none resize-y border-none"
            placeholder="Type your article content here... Use the toolbar above to add photos, videos, headings, bold text, lists, and callouts."
          />
        ) : (
          <div
            style={{ minHeight }}
            className="p-6 bg-[#071120] text-slate-200 text-sm leading-relaxed overflow-y-auto prose prose-invert max-w-none"
          >
            <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br/>") }} />
          </div>
        )}
      </div>

      {/* FOOTER STATS BAR */}
      <div className="bg-[#0B1D3A] border-t border-slate-800 p-3 px-6 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-6">
          <span>Words: <strong className="text-amber-400">{words}</strong></span>
          <span>Characters: <strong className="text-slate-200">{chars}</strong></span>
          <span>Est. Reading Time: <strong className="text-emerald-400">{readTime} min</strong></span>
        </div>
        <div className="text-[11px] text-slate-500">Next-Gen Rich Media Editor V2.0</div>
      </div>

      {/* UPLOAD / INSERT PHOTO MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1D3A] border border-amber-500/30 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" /> Insert or Upload Photo
              </h3>
              <button onClick={() => setShowImageModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Option A: Upload Local File */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Option 1: Upload Image File</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-amber-500/10 border border-dashed border-amber-500/40 hover:bg-amber-500/20 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Click to Browse & Upload Image
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs my-2">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span>OR</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {/* Option B: Insert URL */}
              <form onSubmit={handleAddImageUrl} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Option 2: Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Alt Text / Caption</label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="e.g. Contractor performing occupancy inspection"
                    className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
                  >
                    Insert Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD / INSERT VIDEO MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1D3A] border border-purple-500/30 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <VideoIcon className="w-4 h-4 text-purple-400" /> Insert or Upload Video
              </h3>
              <button onClick={() => setShowVideoModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Local Video Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Option 1: Upload Video File (MP4, WebM)</label>
                <input
                  type="file"
                  ref={videoFileInputRef}
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => videoFileInputRef.current?.click()}
                  className="w-full py-3 bg-purple-500/10 border border-dashed border-purple-500/40 hover:bg-purple-500/20 text-purple-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Click to Browse & Upload Video
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs my-2">
                <div className="flex-1 h-px bg-slate-800"></div>
                <span>OR</span>
                <div className="flex-1 h-px bg-slate-800"></div>
              </div>

              {/* YouTube / Direct Video URL */}
              <form onSubmit={handleAddVideoUrl} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Option 2: YouTube or Video URL</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-purple-500 text-white font-bold text-xs rounded-lg"
                  >
                    Insert Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* INSERT LINK MODAL */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1D3A] border border-slate-700 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-amber-400" /> Insert Hyperlink
              </h3>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLink} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Link Display Text</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. FHA Guidelines Handbook"
                  className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Target URL</label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
