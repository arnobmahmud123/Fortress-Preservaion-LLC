"use client";

import { useState, useEffect, startTransition } from "react";
import { MessageSquare, Send, User, Mail, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { addComment, getComments } from "@/app/actions/post-actions";

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  createdAt: Date;
}

export function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load name/email from localStorage on mount, and load comments
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthorName(localStorage.getItem("comment_author_name") || "");
      setAuthorEmail(localStorage.getItem("comment_author_email") || "");
    }

    async function loadComments() {
      try {
        const res = await getComments(postId);
        if (res.success && res.comments) {
          setComments(res.comments as Comment[]);
        }
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setFetching(false);
      }
    }
    loadComments();
  }, [postId]);

  // Consistently map names to background colors for avatars
  const avatarColors = [
    "from-amber-400 to-amber-600 text-slate-950",
    "from-emerald-400 to-emerald-600 text-slate-950",
    "from-blue-400 to-blue-600 text-white",
    "from-indigo-400 to-indigo-600 text-white",
    "from-purple-400 to-purple-600 text-white",
    "from-rose-400 to-rose-600 text-white",
    "from-cyan-400 to-cyan-600 text-slate-950",
    "from-teal-400 to-teal-600 text-white"
  ];
  
  const getAvatarStyle = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorEmail.trim() || !content.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await addComment({
        postId,
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
        content: content.trim(),
      });

      if (res.success && res.comment) {
        // Save guest details to browser for convenience
        if (typeof window !== "undefined") {
          localStorage.setItem("comment_author_name", authorName.trim());
          localStorage.setItem("comment_author_email", authorEmail.trim());
        }

        // Add to state list
        setComments((prev) => [...prev, res.comment as Comment]);
        setContent("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error || "Failed to submit comment.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 border-t border-slate-800/80 pt-12 mt-12">
      {/* HEADER COUNT */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Discussion</h3>
          <p className="text-xs text-slate-400 font-mono">
            {fetching ? "Loading comments..." : `${comments.length} comment${comments.length !== 1 ? "s" : ""} published`}
          </p>
        </div>
      </div>

      {/* COMMENTS LIST */}
      <div className="space-y-6">
        {fetching ? (
          <div className="space-y-4 py-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse flex items-start gap-4 p-5 bg-[#0B1D3A]/20 border border-slate-900 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 bg-[#0B1D3A]/25 border border-slate-800/60 rounded-3xl p-6 space-y-2 max-w-lg mx-auto">
            <span className="text-2xl">💬</span>
            <h4 className="text-sm font-bold text-white">No comments yet</h4>
            <p className="text-xs text-slate-400">Be the first to share your thoughts on this preservation guide!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const avatarStyle = getAvatarStyle(comment.authorName);
              const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });
              const formattedTime = new Date(comment.createdAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
              });

              return (
                <div 
                  key={comment.id} 
                  className="flex items-start gap-4 p-5 bg-[#0B1D3A]/30 border border-slate-850/80 hover:border-slate-800/80 rounded-2xl transition-colors relative overflow-hidden group shadow-md"
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarStyle} flex items-center justify-center font-bold text-sm shadow-sm uppercase shrink-0`}>
                    {comment.authorName.slice(0, 2)}
                  </div>
                  
                  {/* Comment Body */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-sm font-bold text-white truncate">{comment.authorName}</span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {formattedDate} at {formattedTime}
                      </span>
                    </div>
                    <p className="text-slate-350 text-sm leading-relaxed break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMMENT FORM */}
      <div className="bg-[#0B1D3A]/45 border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          Leave a Reply
        </h4>
        <p className="text-xs text-slate-400 mb-6">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 p-3 px-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-3 px-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Your comment was published successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="text-xs font-bold text-slate-300 font-mono">
                Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="name-input"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071120] border border-slate-800 focus:border-amber-500/50 text-white placeholder-slate-550 text-xs rounded-xl focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email-input" className="text-xs font-bold text-slate-300 font-mono">
                Email *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email-input"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#071120] border border-slate-800 focus:border-amber-500/50 text-white placeholder-slate-550 text-xs rounded-xl focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-1.5">
            <label htmlFor="comment-input" className="text-xs font-bold text-slate-300 font-mono">
              Comment *
            </label>
            <textarea
              id="comment-input"
              rows={4}
              placeholder="Write your comment here… Share your feedback or ask a question about guidelines."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 bg-[#071120] border border-slate-800 focus:border-amber-500/50 text-white placeholder-slate-550 text-xs rounded-xl focus:outline-none resize-none transition-colors"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
