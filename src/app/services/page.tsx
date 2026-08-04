import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
            Full-Spectrum Operations
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Property Preservation & REO Services
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Investor-compliant field services designed to protect real estate assets, maintain market value, and minimize holding liability.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 container mx-auto px-4 max-w-6xl space-y-16">
        
        {/* Service 1: Property Inspections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1D3A]/40 border border-slate-800 p-8 rounded-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">01. Field Inspection</span>
            <h2 className="text-2xl font-bold text-white">Occupancy & Condition Inspections</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Comprehensive occupancy verification, contact attempts, and physical property condition assessments delivered within 24 to 48 hours of work order dispatch.
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">✓ GPS-Tagged Photo Proof</li>
              <li className="flex items-center gap-2">✓ Occupancy Verification</li>
              <li className="flex items-center gap-2">✓ Violation Detection</li>
              <li className="flex items-center gap-2">✓ Natural Disaster Audits</li>
            </ul>
          </div>
          <div className="lg:col-span-5 h-56 rounded-xl overflow-hidden border border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contractor_inspection.jpg" alt="Inspection" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Service 2: Securing & Winterization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1D3A]/40 border border-slate-800 p-8 rounded-2xl">
          <div className="lg:col-span-5 h-56 rounded-xl overflow-hidden border border-slate-700 order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contractor_preservation.jpg" alt="Winterization" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">02. Securing & Stabilization</span>
            <h2 className="text-2xl font-bold text-white">Property Securing & Winterization</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Immediate stabilization of vacant properties. Lock changes, window board-ups, roof tarping, debris cleanouts, and pressure-tested plumbing winterizations.
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">✓ HUD/Fannie Lock Changes</li>
              <li className="flex items-center gap-2">✓ 4-Hour Emergency Board-Ups</li>
              <li className="flex items-center gap-2">✓ Air-Compressor Winterization</li>
              <li className="flex items-center gap-2">✓ Debris Removal & Trashout</li>
            </ul>
          </div>
        </div>

        {/* Service 3: REO Property Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B1D3A]/40 border border-slate-800 p-8 rounded-2xl">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">03. Asset Disposition</span>
            <h2 className="text-2xl font-bold text-white">REO Property Maintenance & Repairs</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ongoing lawn maintenance, janitorial cleanings, pool maintenance, and structural repairs to prepare REO assets for market listing and sale.
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">✓ Bi-Weekly Lawn Care</li>
              <li className="flex items-center gap-2">✓ Sales Clean Preparation</li>
              <li className="flex items-center gap-2">✓ Minor Structural Repairs</li>
              <li className="flex items-center gap-2">✓ Eviction Assistance</li>
            </ul>
          </div>
          <div className="lg:col-span-5 h-56 rounded-xl overflow-hidden border border-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/contractor_reo.jpg" alt="REO Repairs" className="w-full h-full object-cover" />
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="py-12 bg-[#09172E] text-center border-t border-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-4">Need Service Solutions for Your Portfolio?</h2>
          <Link href="/clients" className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
            Request Service Quote
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}