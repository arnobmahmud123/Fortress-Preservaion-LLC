import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* BIG PHOTO SCREEN / HERO BANNER WITH CONTRACTOR WORKING PHOTOS RIGHT BELOW TOP NAV */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1D3A] via-[#09172E] to-[#071120] border-b border-amber-500/10 py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-6 z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                <span>✦</span> Trusted by Mortgage Servicers Nationwide
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Institutional-Grade <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  Property Preservation
                </span> <br />
                & REO Field Services
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Fortress Preservation delivers audit-ready property preservation, compliant inspections, and full-spectrum REO management for mortgage servicers, banks, and asset managers across all 47 covered states.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/clients" className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all text-sm uppercase tracking-wider">
                  Request Portfolio Assessment
                </Link>
                <Link href="/portfolio" className="px-6 py-3.5 rounded-xl font-semibold text-white border border-slate-700 hover:border-amber-400 hover:bg-amber-400/10 transition-all text-sm">
                  View Our Field Work
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-center">
                <div>
                  <span className="block text-2xl font-black text-amber-400">5,000+</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Preserved</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-amber-400">47</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">States</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-amber-400">99.7%</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Compliance</span>
                </div>
                <div>
                  <span className="block text-2xl font-black text-amber-400">12+ Yrs</span>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Experience</span>
                </div>
              </div>
            </div>

            {/* Right Big Photo Screen Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10 bg-[#0B1D3A]">
                {/* Featured Big Photo */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/contractor_inspection.jpg"
                    alt="Contractor Property Preservation Inspection"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D3A] via-transparent to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0B1D3A]/90 backdrop-blur-md border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">Field Operations Live Showcase</span>
                      <p className="text-white text-sm font-semibold m-0">Certified Field Contractor — Inspection & Photo Documentation</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Sub Photo Strip */}
                <div className="grid grid-cols-2 gap-2 p-2 bg-[#09172E]">
                  <div className="relative h-28 rounded-lg overflow-hidden border border-slate-800 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/contractor_preservation.jpg" alt="Board-Up & Winterization Crew" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2 text-[11px] font-bold text-amber-300">
                      Winterization & Board-Up Crew
                    </div>
                  </div>
                  <div className="relative h-28 rounded-lg overflow-hidden border border-slate-800 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/contractor_reo.jpg" alt="REO Property Repair" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-end p-2 text-[11px] font-bold text-amber-300">
                      REO Repair & Maintenance
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE COMPETENCIES / SERVICES */}
      <section className="py-20 bg-[#071120]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Core Competencies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Comprehensive Preservation Services</h2>
            <p className="text-slate-400 text-base">
              From initial occupancy inspection to full REO disposition, we deliver end-to-end property preservation solutions matching strict investor guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 text-2xl flex items-center justify-center mb-4">🔍</div>
              <h3 className="text-lg font-bold text-white mb-2">Property Inspections</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Detailed condition reports with GPS & timestamped photos delivered within 24–48 hours of dispatch.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 text-2xl flex items-center justify-center mb-4">🏠</div>
              <h3 className="text-lg font-bold text-white mb-2">Preservation & Winterization</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Secure vacant properties with board-ups, lock changes, pressure-tested winterization, and debris cleanouts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 text-2xl flex items-center justify-center mb-4">📋</div>
              <h3 className="text-lg font-bold text-white mb-2">REO Property Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Full lifecycle REO maintenance — from broker price opinion prep to lawn maintenance and final asset disposition.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 text-2xl flex items-center justify-center mb-4">⚖️</div>
              <h3 className="text-lg font-bold text-white mb-2">Compliance & Audit</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Audit-ready digital documentation for every work order complying with Fannie Mae, Freddie Mac, FHA, and VA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-[#0B1D3A] via-[#09172E] to-[#0B1D3A] border-t border-slate-800 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Elevate Your Preservation Standards?</h2>
          <p className="text-slate-300 mb-8 text-base">
            Schedule a portfolio assessment with our team or register as a qualified vendor contractor in our network.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/clients" className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all text-sm uppercase tracking-wider">
              For Institutional Clients
            </Link>
            <Link href="/contractors" className="px-6 py-3.5 rounded-xl font-bold text-white border border-amber-400/40 hover:bg-amber-400/10 transition-all text-sm uppercase tracking-wider">
              Join Contractor Network
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}