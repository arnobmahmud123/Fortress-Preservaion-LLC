"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function ContractorsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    experience: "",
    services: "",
    serviceAreas: "",
    licenses: "",
    insurance: "",
    additionalInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@fortresspreservationllc.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          FormType: "Contractor Vendor Application",
          FullName: formData.fullName,
          CompanyName: formData.companyName,
          Email: formData.email,
          Phone: formData.phone,
          Experience: formData.experience,
          ServicesOffered: formData.services,
          CoverageAreas: formData.serviceAreas,
          InsuranceAndLicenses: formData.insurance || "Not provided",
          AdditionalDetails: formData.additionalInfo || "None"
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setError("There was a problem sending your application. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#0B1D3A] to-[#071120] border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-widest mb-4">
            Vendor Partner Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            For Field Contractors & Inspectors
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Partner with a premier national preservation company. We offer reliable, bi-weekly pay cycles and consistent volume.
          </p>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">Why Partner With Fortress?</h2>
          <p className="text-slate-400 text-sm">
            We value our field partners. When you succeed, our clients succeed. Here is what we bring to the table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">💳</div>
            <h3 className="text-lg font-bold text-white mb-2">Fast Pay Cycles</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Guaranteed bi-weekly payments via direct deposit for all approved work orders. No waiting for 60 or 90 days.
            </p>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">📈</div>
            <h3 className="text-lg font-bold text-white mb-2">Consistent Volume</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Steady stream of occupancy checks, seasonal maintenance, and REO preservation orders in your defined service zip codes.
            </p>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-amber-500/20 rounded-2xl">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mb-4">🛠️</div>
            <h3 className="text-lg font-bold text-white mb-2">Clear Scope Instructions</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Detailed guidelines, photo checklists, and mobile-friendly submission options so work is approved on the first review.
            </p>
          </div>
        </div>
      </section>

      {/* CONTRACTOR REGISTRATION FORM */}
      <section className="py-16 bg-[#09172E] border-y border-slate-800" id="contractor-form">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">Vendor Application</span>
            <h2 className="text-3xl font-extrabold text-white mb-2">Contractor Registration</h2>
            <p className="text-slate-400 text-sm">
              Complete the qualification form below. Our vendor management team reviews all applications within 5 business days.
            </p>
          </div>

          <div className="bg-[#0B1D3A] border border-slate-800 p-8 rounded-2xl shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Vendor Application Received</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <span className="text-amber-400 font-semibold">{formData.fullName}</span> ({formData.companyName}). Our vendor onboarding team will review your application and contact you at <span className="text-amber-400">{formData.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors mt-4"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="e.g. Marcus Miller"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="e.g. Apex Preservation LLC"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                      placeholder="marcus@apexpreservation.com"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Preservation Experience *</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    >
                      <option value="">Select experience...</option>
                      <option value="1-3">1 – 3 years</option>
                      <option value="3-5">3 – 5 years</option>
                      <option value="5-10">5 – 10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Primary Services Offered *</label>
                    <select
                      required
                      value={formData.services}
                      onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    >
                      <option value="">Select service...</option>
                      <option value="inspections">Occupancy & Condition Inspections</option>
                      <option value="preservation">Preservation & Winterization</option>
                      <option value="reo">REO Repair & Trashouts</option>
                      <option value="full">Full Spectrum Vendor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Coverage Counties / Zip Codes *</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceAreas}
                    onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    placeholder="e.g. Mecklenburg NC, York SC, Gaston NC (Radius 50 miles)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Insurance & Licenses</label>
                  <textarea
                    rows={3}
                    value={formData.insurance}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                    placeholder="General Liability policy limits ($1M+ required), Workers' Comp details, EPA Lead-Safe certs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 uppercase tracking-wider text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Vendor Application"
                  )}
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