"use client";

import { useState, useEffect } from "react";
import { saveGeneratedPost, getPosts, deletePost, updatePostStatus, updatePost } from "@/app/actions/post-actions";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface PostItem {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string | null;
  status: string;
  featuredImage?: string | null;
  createdAt: string | Date;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);

  // New Post Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Compliance");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await getPosts("ALL");
    if (res.success && res.posts) {
      setPosts(res.posts as unknown as PostItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSaving(true);

    const featuredImage = category === "Field Operations" 
      ? "/images/contractor_preservation.jpg" 
      : category === "REO Management" 
        ? "/images/contractor_reo.jpg" 
        : "/images/contractor_inspection.jpg";

    let res;
    if (editingPost) {
      res = await updatePost(editingPost.id, {
        title,
        content,
        excerpt,
        status,
        seoTitle: title,
        metaDescription: excerpt || title,
        featuredImage
      });
    } else {
      res = await saveGeneratedPost({
        title,
        content,
        excerpt,
        status,
        seoTitle: title,
        metaDescription: excerpt || title,
        featuredImage
      });
    }

    if (res.success) {
      setTitle("");
      setExcerpt("");
      setContent("");
      setEditingPost(null);
      setShowCreateModal(false);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleStartCreate = () => {
    setEditingPost(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("Compliance");
    setStatus("PUBLISHED");
    setShowCreateModal(true);
  };

  const handleStartEdit = (post: PostItem) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    
    if (post.featuredImage?.includes("preservation")) {
      setCategory("Field Operations");
    } else if (post.featuredImage?.includes("reo")) {
      setCategory("REO Management");
    } else {
      setCategory("Compliance");
    }
    
    setStatus(post.status as "DRAFT" | "PUBLISHED");
    setShowCreateModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deletePost(id);
    fetchPosts();
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    await updatePostStatus(id, nextStatus);
    fetchPosts();
  };

  return (
    <div className="p-6 space-y-6 text-slate-100 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Blog Post & Article Manager</h1>
          <p className="text-slate-400 text-xs mt-1">Create, edit, publish, and delete blog articles using the Next-Gen Rich Media Editor</p>
        </div>
        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/10 flex items-center gap-2 self-start"
        >
          <span>+</span> Create New Blog Post
        </button>
      </div>

      {/* CREATE POST MODAL WITH NEXT-GEN RICH TEXT EDITOR */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1D3A] border border-amber-500/30 w-full max-w-5xl p-6 rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>✍️</span> {editingPost ? "Edit Article" : "Create & Edit Article"} (Next-Gen Rich Editor)
                </h2>
                <p className="text-xs text-slate-400">Use headings H1-H6, bold/italic, upload photos & videos, and insert callout boxes.</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white text-base focus:outline-none focus:border-amber-400 font-semibold"
                  placeholder="e.g. FHA Property Preservation Grass Cutting & Lawn Maintenance Guide 2025"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#071120] border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Compliance">Compliance & Guidelines</option>
                    <option value="Field Operations">Field Operations</option>
                    <option value="REO Management">REO Management</option>
                    <option value="Industry News">Industry News</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Publish Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                    className="w-full px-4 py-2.5 bg-[#071120] border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="PUBLISHED">Published (Public)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Short Excerpt</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-2 bg-[#071120] border border-slate-700 rounded-xl text-white text-xs"
                  placeholder="Brief summary for card previews"
                />
              </div>

              {/* NEXT-GEN RICH TEXT EDITOR */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">Article Body (Visual & Media Editor) *</label>
                <RichTextEditor value={content} onChange={setContent} minHeight="400px" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  {saving ? (editingPost ? "Saving Changes..." : "Publishing...") : (editingPost ? "Save Changes" : "Publish Article")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POSTS LIST TABLE */}
      <div className="bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-slate-400 text-sm">No blog posts found in database.</p>
            <button
              onClick={handleStartCreate}
              className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-lg"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#071120] text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#0F2448]/40 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div>{p.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>/blog/{p.slug}</span>
                        {p.status === "PUBLISHED" && (
                          <a
                            href={`/blog/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider text-[8px] border border-amber-500/30 px-1.5 py-0.5 rounded bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
                          >
                            Visit Post ↗
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          p.status === "PUBLISHED"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="px-2.5 py-1 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-lg text-[10px] font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-[10px] font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
