"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
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
  Image as ImageIcon,
  Video as VideoIcon,
  Link as LinkIcon,
  Link2Off,
  AlertCircle,
  Eye,
  Edit3,
  Upload,
  X,
  FileCode,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

// ── helper: save & restore selection ────────────────────────────────────────
function saveSelection(): Range | null {
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) return sel.getRangeAt(0).cloneRange();
  return null;
}

function restoreSelection(range: Range | null) {
  if (!range) return;
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

function insertHtmlAtRange(range: Range, html: string) {
  range.deleteContents();
  const el = document.createElement("div");
  el.innerHTML = html;
  const frag = document.createDocumentFragment();
  let node;
  let lastNode;
  while ((node = el.firstChild)) {
    lastNode = frag.appendChild(node);
  }
  range.insertNode(frag);
  if (lastNode) {
    const newRange = range.cloneRange();
    newRange.setStartAfter(lastNode);
    newRange.collapse(true);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  }
}

// ── helper: exec format command ──────────────────────────────────────────────
function execFormat(command: string, value?: string) {
  document.execCommand(command, false, value ?? undefined);
}

export default function RichTextEditor({
  value,
  onChange,
  minHeight = "450px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRange = useRef<Range | null>(null);
  const localValueRef = useRef(value);

  const [mode, setMode] = useState<"VISUAL" | "HTML">("VISUAL");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [htmlSource, setHtmlSource] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  // ── Sync value → editor (only when value changes from outside) ────────────
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (value !== localValueRef.current) {
      el.innerHTML = value || "";
      localValueRef.current = value;
    }
  }, [value]);

  // ── Notify parent on every keystroke / mutation ───────────────────────────
  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;

    // Clean up empty anchor tags so they don't trap the cursor when text is deleted
    const emptyAnchors = el.querySelectorAll("a:empty");
    emptyAnchors.forEach((anchor) => anchor.remove());

    localValueRef.current = el.innerHTML;
    onChange(el.innerHTML);
  }, [onChange]);

  // ── Save cursor before toolbar button steals focus ────────────────────────
  const handleEditorMouseUp = () => {
    savedRange.current = saveSelection();
  };
  const handleEditorKeyUp = () => {
    savedRange.current = saveSelection();
  };

  // ── Core toolbar action: restores focus + selection, then runs command ────
  const doFormat = useCallback(
    (command: string, value?: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      restoreSelection(savedRange.current);
      execFormat(command, value);
      savedRange.current = saveSelection();
      localValueRef.current = el.innerHTML;
      onChange(el.innerHTML);
    },
    [onChange]
  );

  // ── Insert raw HTML at caret ──────────────────────────────────────────────
  const insertHTML = useCallback(
    (html: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      
      let range = savedRange.current;
      if (!range) {
        range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
      }
      
      try {
        restoreSelection(range);
        insertHtmlAtRange(range, html);
      } catch (err) {
        console.error("Range insert failed, fallback to execCommand:", err);
        restoreSelection(range);
        execFormat("insertHTML", html);
      }
      
      savedRange.current = saveSelection();
      localValueRef.current = el.innerHTML;
      onChange(el.innerHTML);
    },
    [onChange]
  );

  // ── Heading buttons: wrap selection in <hN> ────────────────────────────────
  const insertHeading = useCallback(
    (level: number) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      restoreSelection(savedRange.current);
      execFormat("formatBlock", `h${level}`);
      savedRange.current = saveSelection();
      localValueRef.current = el.innerHTML;
      onChange(el.innerHTML);
    },
    [onChange]
  );

  // ── Stats ──────────────────────────────────────────────────────────────────
  const plainText = editorRef.current?.innerText ?? value.replace(/<[^>]+>/g, "");
  const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  const chars = plainText.length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  // ── Photo upload ───────────────────────────────────────────────────────────
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const src = evt.target?.result as string;
      insertHTML(
        `<figure style="margin:1.5rem 0;text-align:center;">
          <img src="${src}" alt="${file.name}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.4);" />
          <figcaption style="color:#94a3b8;font-size:0.8rem;margin-top:0.5rem;">${file.name}</figcaption>
        </figure>`
      );
      setShowImageModal(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const src = evt.target?.result as string;
      insertHTML(
        `<video controls src="${src}" style="width:100%;border-radius:12px;margin:1.5rem 0;box-shadow:0 4px 24px rgba(0,0,0,.4);"></video>`
      );
      setShowVideoModal(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    insertHTML(
      `<figure style="margin:1.5rem 0;text-align:center;">
        <img src="${imageUrl}" alt="${imageAlt || "image"}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.4);" />
        ${imageAlt ? `<figcaption style="color:#94a3b8;font-size:0.8rem;margin-top:0.5rem;">${imageAlt}</figcaption>` : ""}
      </figure>`
    );
    setImageUrl("");
    setImageAlt("");
    setShowImageModal(false);
  };

  const handleAddVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;
    let html = "";
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const vid =
        videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop() || "";
      html = `<div style="position:relative;padding-bottom:56.25%;height:0;margin:1.5rem 0;border-radius:12px;overflow:hidden;">
        <iframe src="https://www.youtube.com/embed/${vid}" title="${videoTitle || "Video"}" frameborder="0" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;"></iframe>
      </div>`;
    } else if (videoUrl.includes("vimeo.com")) {
      const vid = videoUrl.split("/").pop() || "";
      html = `<div style="position:relative;padding-bottom:56.25%;height:0;margin:1.5rem 0;border-radius:12px;overflow:hidden;">
        <iframe src="https://player.vimeo.com/video/${vid}" title="${videoTitle || "Video"}" frameborder="0" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;"></iframe>
      </div>`;
    } else {
      html = `<video controls src="${videoUrl}" style="width:100%;border-radius:12px;margin:1.5rem 0;"></video>`;
    }
    insertHTML(html);
    setVideoUrl("");
    setVideoTitle("");
    setShowVideoModal(false);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) return;
    const hasSelection = savedRange.current && !savedRange.current.collapsed;
    if (hasSelection) {
      doFormat("createLink", linkUrl);
    } else {
      insertHTML(
        `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color:#F59E0B;text-decoration:underline;">${linkText || linkUrl}</a>`
      );
    }
    setLinkUrl("");
    setLinkText("");
    setShowLinkModal(false);
  };

  // ── HTML source mode toggle ────────────────────────────────────────────────
  const switchToHTML = () => {
    const el = editorRef.current;
    setHtmlSource(el?.innerHTML ?? "");
    setMode("HTML");
  };
  const switchToVisual = () => {
    const el = editorRef.current;
    if (el) {
      el.innerHTML = htmlSource;
      localValueRef.current = htmlSource;
      onChange(htmlSource);
    }
    setMode("VISUAL");
  };

  // ── Toolbar button helper ──────────────────────────────────────────────────
  const TB = ({
    title,
    onClick,
    children,
    className = "",
  }: {
    title: string;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        // Save selection BEFORE focus leaves the editor
        savedRange.current = saveSelection();
        e.preventDefault(); // prevent editor blur
      }}
      onClick={onClick}
      className={`p-1.5 hover:bg-amber-400/20 hover:text-amber-400 text-slate-300 rounded transition-colors ${className}`}
    >
      {children}
    </button>
  );

  const TBGroup = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 gap-0.5">
      {children}
    </div>
  );

  return (
    <div className="w-full bg-[#071120] border border-slate-700/70 rounded-2xl overflow-hidden shadow-2xl font-sans text-slate-100">
      {/* ── TOOLBAR ─────────────────────────────────────────────── */}
      <div className="bg-[#0B1D3A] border-b border-slate-800 p-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">

          {/* Headings */}
          <TBGroup>
            <TB title="Heading 1" onClick={() => insertHeading(1)}>
              <Heading1 className="w-4 h-4" />
            </TB>
            <TB title="Heading 2" onClick={() => insertHeading(2)}>
              <Heading2 className="w-4 h-4" />
            </TB>
            <TB title="Heading 3" onClick={() => insertHeading(3)}>
              <Heading3 className="w-4 h-4" />
            </TB>
            <TB title="Heading 4" onClick={() => insertHeading(4)}>
              <Heading4 className="w-4 h-4" />
            </TB>
            <TB title="Heading 5" onClick={() => insertHeading(5)}>
              <Heading5 className="w-4 h-4" />
            </TB>
            <TB title="Heading 6" onClick={() => insertHeading(6)}>
              <Heading6 className="w-4 h-4" />
            </TB>
            <TB title="Paragraph" onClick={() => doFormat("formatBlock", "p")}>
              <span className="text-xs font-bold px-0.5">P</span>
            </TB>
          </TBGroup>

          {/* Text styles */}
          <TBGroup>
            <TB title="Bold (Ctrl+B)" onClick={() => doFormat("bold")}>
              <Bold className="w-4 h-4" />
            </TB>
            <TB title="Italic (Ctrl+I)" onClick={() => doFormat("italic")}>
              <Italic className="w-4 h-4" />
            </TB>
            <TB title="Underline (Ctrl+U)" onClick={() => doFormat("underline")}>
              <Underline className="w-4 h-4" />
            </TB>
            <TB title="Strikethrough" onClick={() => doFormat("strikeThrough")}>
              <Strikethrough className="w-4 h-4" />
            </TB>
            <TB title="Inline Code" onClick={() => insertHTML("<code style=\"background:#1e293b;padding:2px 6px;border-radius:4px;font-family:monospace;color:#f59e0b;\">code</code>")}>
              <Code className="w-4 h-4" />
            </TB>
          </TBGroup>

          {/* Alignment */}
          <TBGroup>
            <TB title="Align Left" onClick={() => doFormat("justifyLeft")}>
              <AlignLeft className="w-4 h-4" />
            </TB>
            <TB title="Align Center" onClick={() => doFormat("justifyCenter")}>
              <AlignCenter className="w-4 h-4" />
            </TB>
            <TB title="Align Right" onClick={() => doFormat("justifyRight")}>
              <AlignRight className="w-4 h-4" />
            </TB>
          </TBGroup>

          {/* Lists & Blocks */}
          <TBGroup>
            <TB title="Bullet List" onClick={() => doFormat("insertUnorderedList")}>
              <List className="w-4 h-4" />
            </TB>
            <TB title="Numbered List" onClick={() => doFormat("insertOrderedList")}>
              <ListOrdered className="w-4 h-4" />
            </TB>
            <TB title="Blockquote" onClick={() => doFormat("formatBlock", "blockquote")}>
              <Quote className="w-4 h-4" />
            </TB>
            <TB
              title="Code Block"
              onClick={() =>
                insertHTML(
                  `<pre style="background:#0f172a;border:1px solid #334155;border-radius:8px;padding:1rem;font-family:monospace;color:#7dd3fc;overflow-x:auto;margin:1rem 0;"><code>// paste your code here</code></pre>`
                )
              }
            >
              <FileCode className="w-4 h-4" />
            </TB>
            <TB
              title="Horizontal Divider"
              onClick={() => insertHTML("<hr style='border:none;border-top:1px solid #334155;margin:1.5rem 0;' />")}
            >
              <Minus className="w-4 h-4" />
            </TB>
          </TBGroup>

          {/* Media */}
          <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-amber-500/30 gap-1">
            <button
              type="button"
              title="Insert / Upload Photo"
              onMouseDown={(e) => { savedRange.current = saveSelection(); e.preventDefault(); }}
              onClick={() => setShowImageModal(true)}
              className="flex items-center gap-1 px-2 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded text-xs font-bold transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" /> + Photo
            </button>
            <button
              type="button"
              title="Insert / Upload Video"
              onMouseDown={(e) => { savedRange.current = saveSelection(); e.preventDefault(); }}
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded text-xs font-bold transition-colors"
            >
              <VideoIcon className="w-3.5 h-3.5" /> + Video
            </button>
            <TB
              title="Insert Link"
              onClick={() => {
                const sel = window.getSelection();
                if (sel && sel.toString()) setLinkText(sel.toString());
                setShowLinkModal(true);
              }}
            >
              <LinkIcon className="w-4 h-4" />
            </TB>
            <TB
              title="Remove Link (Unlink)"
              onClick={() => doFormat("unlink")}
            >
              <Link2Off className="w-4 h-4 text-rose-400" />
            </TB>
          </div>

          {/* Extras */}
          <TBGroup>
            <TB
              title="Pro-Tip Callout"
              onClick={() =>
                insertHTML(
                  `<blockquote style="border-left:4px solid #F59E0B;background:#1e293b;padding:1rem 1.2rem;border-radius:0 8px 8px 0;margin:1.5rem 0;color:#fde68a;">💡 <strong>PRO-TIP:</strong> Add your important note here.</blockquote>`
                )
              }
            >
              <AlertCircle className="w-4 h-4" />
            </TB>
          </TBGroup>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-[#071120] p-1 rounded-lg border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { if (mode === "HTML") switchToVisual(); }}
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${mode === "VISUAL" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Editor
          </button>
          <button
            type="button"
            onClick={() => { if (mode === "VISUAL") switchToHTML(); }}
            className={`flex items-center gap-1 px-3 py-1 rounded transition-colors ${mode === "HTML" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}
          >
            <Eye className="w-3.5 h-3.5" /> HTML
          </button>
        </div>
      </div>

      {/* ── EDITOR AREA ─────────────────────────────────────────── */}
      <div className="relative">
        {/* contentEditable WYSIWYG */}
        <div
          ref={editorRef}
          contentEditable={mode === "VISUAL"}
          suppressContentEditableWarning
          onInput={handleInput}
          onMouseUp={handleEditorMouseUp}
          onKeyUp={handleEditorKeyUp}
          onFocus={handleEditorMouseUp}
          style={{ minHeight, display: mode === "VISUAL" ? "block" : "none" }}
          className="w-full p-6 bg-[#071120] text-slate-100 text-sm leading-relaxed focus:outline-none
            prose prose-invert prose-headings:text-amber-400 prose-a:text-amber-300
            prose-strong:text-white prose-code:text-amber-300 prose-blockquote:border-amber-400
            max-w-none"
          data-placeholder="Type your article here… Use the toolbar to add headings, bold, italic, photos, videos, and more."
        />

        {/* HTML source editor */}
        {mode === "HTML" && (
          <textarea
            value={htmlSource}
            onChange={(e) => setHtmlSource(e.target.value)}
            style={{ minHeight }}
            className="w-full p-6 bg-[#071120] text-emerald-300 font-mono text-sm leading-relaxed focus:outline-none resize-y border-none"
            spellCheck={false}
          />
        )}
      </div>

      {/* ── FOOTER STATS ────────────────────────────────────────── */}
      <div className="bg-[#0B1D3A] border-t border-slate-800 p-3 px-6 flex flex-wrap items-center justify-between text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-6">
          <span>Words: <strong className="text-amber-400">{words}</strong></span>
          <span>Characters: <strong className="text-slate-200">{chars}</strong></span>
          <span>Est. Reading Time: <strong className="text-emerald-400">{readTime} min</strong></span>
        </div>
        <div className="text-[11px] text-slate-500">Next-Gen Rich Media Editor V3.0 · WYSIWYG</div>
      </div>

      {/* ── PLACEHOLDER CSS ─────────────────────────────────────── */}
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #64748b !important;
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] {
          color: #f1f5f9 !important;
        }
        [contenteditable] h1 { font-size:2rem;font-weight:700;margin:.75rem 0;color:#f59e0b !important; }
        [contenteditable] h2 { font-size:1.6rem;font-weight:700;margin:.65rem 0;color:#fbbf24 !important; }
        [contenteditable] h3 { font-size:1.3rem;font-weight:600;margin:.5rem 0;color:#fcd34d !important; }
        [contenteditable] h4 { font-size:1.1rem;font-weight:600;margin:.5rem 0;color:#fde68a !important; }
        [contenteditable] h5 { font-size:1rem;font-weight:600;margin:.5rem 0;color:#fef3c7 !important; }
        [contenteditable] h6 { font-size:.9rem;font-weight:600;margin:.5rem 0;color:#fffbeb !important; }
        [contenteditable] p  { margin:.5rem 0; color:#e2e8f0 !important; }
        [contenteditable] ul { list-style:disc;padding-left:1.5rem;margin:.5rem 0; color:#e2e8f0 !important; }
        [contenteditable] ol { list-style:decimal;padding-left:1.5rem;margin:.5rem 0; color:#e2e8f0 !important; }
        [contenteditable] li { color:#e2e8f0 !important; }
        [contenteditable] blockquote { border-left:4px solid #f59e0b;padding:.5rem 1rem;margin:.75rem 0;background:#1e293b;border-radius:0 8px 8px 0;color:#fde68a !important; }
        [contenteditable] a { color:#f59e0b !important;text-decoration:underline; }
        [contenteditable] strong { color:#fff !important;font-weight:700; }
        [contenteditable] em { font-style:italic; }
        [contenteditable] code { background:#1e293b;padding:2px 6px;border-radius:4px;font-family:monospace;color:#f59e0b !important; }
        [contenteditable] pre { background:#0f172a;border:1px solid #334155;border-radius:8px;padding:1rem;font-family:monospace;color:#7dd3fc !important;overflow-x:auto;margin:1rem 0; }
        [contenteditable] img { max-width:100%;border-radius:12px;margin:.75rem 0; }
        [contenteditable] figure { margin:1.5rem 0;text-align:center; }
        [contenteditable] figcaption { color:#94a3b8;font-size:.8rem;margin-top:.5rem; }
        [contenteditable] hr { border:none;border-top:1px solid #334155;margin:1.5rem 0; }
      `}</style>

      {/* ── IMAGE MODAL ─────────────────────────────────────────── */}
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
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Option 1: Upload Image File</label>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-amber-500/10 border border-dashed border-amber-500/40 hover:bg-amber-500/20 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Click to Browse & Upload Image
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <div className="flex-1 h-px bg-slate-800"></div><span>OR</span><div className="flex-1 h-px bg-slate-800"></div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Option 2: Image URL</label>
                  <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddImageUrl(e); } }} placeholder="https://..." className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Alt Text / Caption</label>
                  <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddImageUrl(e); } }} placeholder="Describe the image…" className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowImageModal(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button type="button" onClick={handleAddImageUrl} className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg">Insert Image</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VIDEO MODAL ─────────────────────────────────────────── */}
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
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Option 1: Upload Video File (MP4, WebM)</label>
                <input type="file" ref={videoFileInputRef} accept="video/*" onChange={handleVideoUpload} className="hidden" />
                <button
                  type="button"
                  onClick={() => videoFileInputRef.current?.click()}
                  className="w-full py-3 bg-purple-500/10 border border-dashed border-purple-500/40 hover:bg-purple-500/20 text-purple-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-4 h-4" /> Click to Browse & Upload Video
                </button>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <div className="flex-1 h-px bg-slate-800"></div><span>OR</span><div className="flex-1 h-px bg-slate-800"></div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Option 2: YouTube / Vimeo / Video URL</label>
                  <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddVideoUrl(e); } }} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Title (optional)</label>
                  <input type="text" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddVideoUrl(e); } }} placeholder="Video title…" className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowVideoModal(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button type="button" onClick={handleAddVideoUrl} className="px-4 py-1.5 bg-purple-500 text-white font-bold text-xs rounded-lg">Insert Video</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LINK MODAL ──────────────────────────────────────────── */}
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
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Link Text (leave blank to use selection)</label>
                <input type="text" value={linkText} onChange={(e) => setLinkText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddLink(e); } }} placeholder="e.g. FHA Guidelines Handbook" className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Target URL *</label>
                <input type="url" required value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddLink(e); } }} placeholder="https://..." className="w-full px-3 py-2 bg-[#071120] border border-slate-700 rounded-lg text-xs text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowLinkModal(false)} className="px-3 py-1.5 text-xs text-slate-400 hover:text-white">Cancel</button>
                <button type="button" onClick={handleAddLink} className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg">Insert Link</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
