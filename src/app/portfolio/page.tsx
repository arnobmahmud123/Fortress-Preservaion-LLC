import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function PortfolioPage() {
  const caseStudies = [
    {
      id: "oakwood",
      title: "Project Oakwood: Full Rehabilitation & Winterization",
      client: "Fannie Mae Servicer",
      location: "Atlanta, GA",
      date: "Q1 2025",
      description: "A 3,200 sq. ft. single-family property in distressed condition requiring extensive preservation. Scope included full debris removal, roof tarping, interior water damage remediation, complete winterization, and ongoing lawn maintenance. Delivered to the REO broker in market-ready condition within 14 days.",
      steps: ["Initial Inspection", "Scope & Estimate", "Preservation Work", "Final Audit"],
      image: "/images/contractor_preservation.jpg"
    },
    {
      id: "pinehurst",
      title: "Project Pinehurst: Emergency Board-Up & Securing",
      client: "Freddie Mac Servicer",
      location: "Charlotte, NC",
      date: "Q4 2024",
      description: "Emergency response following vandalism and unauthorized entry. Dispatched within 4 hours. Board-up of 6 compromised entry points, interior debris removal, securing of utilities, and full winterization. Completed within 48 hours with comprehensive photographic chain of custody.",
      steps: ["Emergency Dispatch", "Securing & Board-Up", "Preservation", "Compliance Report"],
      image: "/images/contractor_inspection.jpg"
    },
    {
      id: "meadowbrook",
      title: "Project Meadowbrook: REO Property Management",
      client: "FHA / HUD Asset Manager",
      location: "Dallas, TX",
      date: "Q3 2024",
      description: "Full REO lifecycle management for a 1,800 sq. ft. property. Services included eviction monitoring, utility management, HOA compliance resolution, extensive cleanup, and ongoing maintenance. Property sold within 45 days of listing — 12% above appraised value.",
      steps: ["Eviction Coordination", "Property Cleanout", "Ongoing Maintenance", "Disposition Support"],
      image: "/images/contractor_reo.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
            Field Operations Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Featured Preservation Case Studies
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Real properties, real contractor transformations. Explore how Fortress handles initial inspections, emergency board-ups, and REO management.
          </p>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="py-16 container mx-auto px-4 max-w-6xl space-y-12">
        {caseStudies.map((project) => (
          <div key={project.id} className="bg-[#0B1D3A]/60 border border-slate-800 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 h-64 lg:h-auto relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#0B1D3A]/90 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                {project.client}
              </span>
            </div>
            <div className="lg:col-span-7 p-8 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex gap-3 text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                {project.steps.map((step, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20 px-3 py-1 rounded-full">
                    <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#09172E] text-center border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-3">Require Preservation Solutions in Your Market?</h2>
          <p className="text-slate-400 text-sm mb-6">Request a customized scope estimate or field inspection dispatch.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
            Get in Touch
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}