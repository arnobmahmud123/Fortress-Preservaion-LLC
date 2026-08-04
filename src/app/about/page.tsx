import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
            Institutional Legacy
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            About Fortress Preservation
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            A company built on precision, compliance, and an uncompromising commitment to property preservation excellence across 47 states.
          </p>
        </div>
      </section>

      {/* Story & Leadership */}
      <section className="py-16 container mx-auto px-4 max-w-6xl space-y-16">
        
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl font-extrabold text-white">Built by Industry Veterans for Institutional Standards</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Fortress Preservation LLC was founded by property preservation and mortgage servicing professionals who recognized a critical gap in the market: the need for truly institutional-grade preservation services backed by rigorous digital compliance.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              For over a decade, we have served as a trusted vendor to some of the nation’s largest mortgage servicers, banks, and asset managers. Today, Fortress operates across 47 states with a vetted network of over 500 qualified field contractors.
            </p>
          </div>
          <div className="lg:col-span-5 h-72 rounded-2xl overflow-hidden border border-amber-500/20 relative shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contractor_inspection.jpg" alt="HQ" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/30"></div>
          </div>
        </div>

        {/* Leadership Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Leadership Team</span>
            <h2 className="text-3xl font-extrabold text-white">Experienced Executive Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xl flex items-center justify-center mx-auto mb-4">JM</div>
              <h3 className="text-lg font-bold text-white mb-1">James Mitchell</h3>
              <span className="text-xs text-amber-400 font-semibold block mb-3">Founder & CEO</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                25+ years in mortgage servicing and property preservation. Former VP of Vendor Management at a top-10 national servicer.
              </p>
            </div>

            <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xl flex items-center justify-center mx-auto mb-4">SR</div>
              <h3 className="text-lg font-bold text-white mb-1">Sarah Richardson</h3>
              <span className="text-xs text-amber-400 font-semibold block mb-3">Chief Operating Officer</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                20 years of field operations management. Built and scaled vendor networks covering 47+ states with 99%+ audit compliance.
              </p>
            </div>

            <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xl flex items-center justify-center mx-auto mb-4">DK</div>
              <h3 className="text-lg font-bold text-white mb-1">David Kim</h3>
              <span className="text-xs text-amber-400 font-semibold block mb-3">Chief Compliance Officer</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Former Fannie Mae field review specialist. Ensures all work orders strictly adhere to investor guidelines.
              </p>
            </div>
          </div>
        </div>

      </section>

      <SiteFooter />
    </div>
  );
}