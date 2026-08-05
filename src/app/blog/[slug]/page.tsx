import Link from "next/link";
import { getPostBySlug } from "@/app/actions/post-actions";
import { notFound } from "next/navigation";
import { Calendar, Clock, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getPostBySlug(slug);

  if (!res.success || !res.post) {
    notFound();
  }

  const post = res.post;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  const publishedTime = post.publishedAt
    ? new Date(post.publishedAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const wordCount = post.content ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 225));

  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      {/* Header Navigation */}
      <header className="site-header sticky top-0 z-50 bg-[#0B1D3A]/90 backdrop-blur-md border-b border-amber-500/10">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">F</div>
            <div>
              <div className="font-bold text-lg leading-tight tracking-wide text-white">Fortress Preservation</div>
              <div className="text-xs text-amber-400/80 font-medium">Property Preservation & REO Services</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="hover:text-amber-400 transition-colors">Portfolio</Link>
            <Link href="/clients" className="hover:text-amber-400 transition-colors">For Clients</Link>
            <Link href="/contractors" className="hover:text-amber-400 transition-colors">For Contractors</Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
            <Link href="/blog" className="text-amber-400 font-semibold border-b-2 border-amber-400 pb-1">Blog</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </nav>
          <Link href="/contact" className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all">
            Request a Quote
          </Link>
        </div>
      </header>

      {/* Main Post Section */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="text-amber-400 hover:text-amber-300 text-sm font-semibold flex items-center gap-1 mb-8">
          ← Back to Insights
        </Link>

        <article className="space-y-8">
          {/* Header Metadata Card */}
          <div className="bg-[#0B1D3A]/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-45 h-45 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Preservation Insights
              </span>
              {post.categories && post.categories.length > 0 && (
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  {post.categories[0].name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author and Date/Time Info Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-800/80 pt-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 shadow-md">
                  {post.author?.name ? post.author.name.slice(0, 2).toUpperCase() : "FP"}
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-tight">
                    {post.author?.name || "Fortress Team"}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Author • Contributor
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 font-mono bg-slate-900/50 border border-slate-800/60 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{publishedDate}</span>
                </div>
                {publishedTime && (
                  <div className="flex items-center gap-1.5 border-l border-slate-800 pl-4">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{publishedTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 border-l border-slate-800 pl-4">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>{readTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {post.featuredImage && (
            <div className="h-64 md:h-[450px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-800 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover opacity-90" />
            </div>
          )}

          {/* HTML Rendered Content */}
          <div 
            className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed space-y-6 text-base md:text-lg pt-4
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:mb-4
              prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-400
              prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
              prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#050C16] border-t border-slate-800 py-12 text-slate-400 text-sm">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Fortress Preservation LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
