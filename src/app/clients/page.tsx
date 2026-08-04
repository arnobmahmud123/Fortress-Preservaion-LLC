"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function ClientsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    portfolioSize: "",
    primaryNeed: "",
    guidelines: "",
    serviceAreas: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
            Institutional Client Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            For Institutional Servicers & Banks
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Built to meet the rigorous standards of mortgage servicers, banks, and asset managers nationwide with audit-ready reporting.
          </p>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">A Vendor You Can Verify</h2>
          <p className="text-slate-400 text-sm">
            We know you evaluate vendors the way you evaluate balance sheets. Here is what sets Fortress apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">📊</div>
            <h3 className="text-lg font-bold text-white mb-2">Audit-Ready Operations</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every work order generates a complete digital trail — GPS-tagged photos, timestamps, and electronic signatures ready for Fannie Mae/Freddie Mac audit.
            </p>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Rapid Dispatch</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Field inspectors dispatched within 24 hours of work order receipt. Emergency board-ups available with 4-hour response time in major MSAs.
            </p>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">🔗</div>
            <h3 className="text-lg font-bold text-white mb-2">Integrated API Reporting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              API-ready reporting that integrates directly into your vendor management platform with automated status triggers.
            </p>
          </div>
        </div>
      </section>

      {/* CLIENT ASSESSMENT FORM */}
      <section className="py-16 bg-[#09172E] border-y border-slate-800" id="client-form">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Get Started</span>
            <h2 className="text-3xl font-extrabold text-white mb-2">Request a Portfolio Assessment</h2>
            <p className="text-slate-400 text-sm">
              Tell us about your portfolio. We will provide a customized assessment of how Fortress can improve preservation outcomes and reduce risk.
            </p>
          </div>

          <div className="bg-[#0B1D3A] border border-slate-800 p-8 rounded-2xl shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Assessment Request Received</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <span className="text-amber-400 font-semibold">{formData.fullName}</span>. A senior client services manager will contact you within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="e.g. Robert Vance"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="e.g. VP Asset Management"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="name@institution.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Company / Servicer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    placeholder="e.g. Pinnacle Mortgage Servicing"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Portfolio Size</label>
                    <select
                      value={formData.portfolioSize}
                      onChange={(e) => setFormData({ ...formData, portfolioSize: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    >
                      <option value="">Select size...</option>
                      <option value="under-500">Under 500 properties</option>
                      <option value="500-2000">500 – 2,000 properties</option>
                      <option value="2000-5000">2,000 – 5,000 properties</option>
                      <option value="5000+">5,000+ properties</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Primary Investor Guideline *</label>
                    <select
                      required
                      value={formData.guidelines}
                      onChange={(e) => setFormData({ ...formData, guidelines: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    >
                      <option value="">Select guideline...</option>
                      <option value="fannie">Fannie Mae</option>
                      <option value="freddie">Freddie Mac</option>
                      <option value="fha">FHA / HUD</option>
                      <option value="va">VA</option>
                      <option value="multiple">Multiple / Full Portfolio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Additional Portfolio Details</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    placeholder="Provide details about regional coverage, specific requirements, or current vendor challenges..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 uppercase tracking-wider text-sm transition-all shadow-lg shadow-amber-500/20"
                >
                  Submit Portfolio Assessment Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}