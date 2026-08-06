"use client";

import { useState } from "react";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
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
          FormType: "Contact Form Submission",
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          Subject: formData.subject || "No subject",
          Message: formData.message
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setError("There was a problem sending your message. Please try again.");
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
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contact Fortress Preservation
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Ready to elevate your property preservation operations? Reach out to our national operations team.
          </p>
        </div>
      </section>

      {/* Contact Cards & Form */}
      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mx-auto mb-3">📞</div>
            <h3 className="font-bold text-white mb-1">Phone</h3>
            <p className="text-amber-400 font-semibold text-sm">+1 (659) 213-7866</p>
            <span className="text-xs text-slate-400">Mon–Fri, 8am–6pm EST</span>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mx-auto mb-3">✉️</div>
            <h3 className="font-bold text-white mb-1">Email</h3>
            <p className="text-amber-400 font-semibold text-sm">info@fortresspreservationllc.com</p>
            <span className="text-xs text-slate-400">Responds within 24 hours</span>
          </div>

          <div className="p-6 bg-[#0B1D3A]/60 border border-slate-800 rounded-2xl text-center">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 text-xl flex items-center justify-center mx-auto mb-3">📍</div>
            <h3 className="font-bold text-white mb-1">Headquarters</h3>
            <p className="text-amber-400 font-semibold text-sm">123 Commerce Drive, Suite 400</p>
            <span className="text-xs text-slate-400">Charlotte, NC 28202</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#0B1D3A] border border-slate-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
            <p className="text-slate-400 text-sm">Have a question or work order inquiry? Fill out the form below.</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-semibold">{formData.name}</span>. We will follow up with you at <span className="text-amber-400">{formData.email}</span> within 1 business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors mt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm animate-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm animate-all"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm animate-all"
                  placeholder="Inquiry subject"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm animate-all"
                  placeholder="How can we help you?"
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}