"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFillDemo = () => {
    setEmail("admin@fortresspreservation.com");
    setPassword("admin123");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate instant secure admin login and redirect to admin panel
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#071120] text-slate-100 font-sans flex flex-col justify-between">
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 flex items-center justify-center my-auto">
        <div className="w-full max-w-md bg-[#0B1D3A]/80 backdrop-blur-xl border border-amber-500/20 p-8 rounded-3xl shadow-2xl shadow-amber-500/10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
              F
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Login Portal</h1>
            <p className="text-slate-400 text-xs mt-1">Fortress Preservation CMS & Operations Panel</p>
          </div>

          {/* Demo Banner */}
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold uppercase tracking-wider">Demo Admin Account</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 text-[10px] uppercase transition-colors"
              >
                Auto-Fill
              </button>
            </div>
            <div className="space-y-0.5 text-slate-300 font-mono text-[11px]">
              <div>Email: admin@fortresspreservation.com</div>
              <div>Password: admin123</div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                placeholder="admin@fortresspreservation.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#071120] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 uppercase tracking-wider text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Admin Panel →"}
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-slate-500">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-600 border-t border-slate-900">
        © 2025 Fortress Preservation LLC. Admin Control System.
      </footer>
    </div>
  );
}
