import Link from "next/link";
import prisma from "@/lib/prisma";

export const revalidate = 60;

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 10,
      include: {
        categories: true,
        author: true
      }
    });
    
    if (dbPosts && dbPosts.length > 0) {
      posts = dbPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || (p.content ? p.content.replace(/<[^>]*>/g, "").slice(0, 150) + "..." : ""),
        category: p.categories?.[0]?.name || "Preservation",
        author: p.author?.name || "Fortress Team",
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
        readTime: "5 min read",
        image: p.featuredImage || "/images/contractor_inspection.jpg"
      }));
    }
  } catch (error) {
    console.error("Failed to query database posts on blog page:", error);
  }

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

      {/* Hero Section */}
      <nav className="hidden" />
      <section className="relative py-20 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <span>✦</span> Field Insights & Industry Compliance
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Institutional Preservation Insights
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stay updated with Fannie Mae & Freddie Mac guidelines, field operational standards, and REO asset management strategies.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-[#0B1D3A]/40 border border-slate-800 rounded-2xl p-8 max-w-xl mx-auto space-y-4 shadow-xl">
            <span className="text-4xl">📝</span>
            <h3 className="text-lg font-bold text-white">No articles published yet</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Insights, guides, and compliance standards will appear here once they are published from the Post Manager.
            </p>
            <Link href="/dashboard/posts" className="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-amber-500/10 transition-all">
              Write an Article
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col">
                <div className="h-52 bg-slate-800 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#0B1D3A]/90 backdrop-blur-sm text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 hover:text-amber-400 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-auto">
                    <span className="text-xs font-medium text-slate-300">By {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
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
