import Link from "next/link";
import { getPostBySlug } from "@/app/actions/post-actions";
import { notFound } from "next/navigation";

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
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-semibold">
                Preservation Insights
              </span>
              <span>•</span>
              <span>{publishedDate}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 pt-2 text-sm text-slate-300">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-400 border border-amber-500/10">FP</div>
              <span>By {post.author?.name || "Fortress Team"}</span>
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
