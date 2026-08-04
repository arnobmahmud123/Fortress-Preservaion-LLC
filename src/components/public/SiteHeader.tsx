"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "For Clients", href: "/clients" },
    { name: "For Contractors", href: "/contractors" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="site-header sticky top-0 z-50 bg-[#0B1D3A]/95 backdrop-blur-md border-b border-amber-500/20 py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="logo flex items-center gap-3">
          <div className="logo-icon w-11 h-11 rounded-full bg-amber-400 text-slate-950 font-bold text-xl flex items-center justify-center shadow-lg shadow-amber-500/20">F</div>
          <div className="logo-text">
            <div className="font-bold text-lg text-white leading-none">Fortress Preservation</div>
            <span className="text-[10px] text-amber-400 uppercase tracking-widest font-medium">Property Preservation & REO Services</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive ? "text-amber-400 font-semibold border-b-2 border-amber-400" : "text-slate-200 hover:text-amber-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary btn-sm text-xs font-semibold uppercase tracking-wider">
            Request a Quote
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#071120] border-b border-slate-800 px-4 py-6 space-y-4 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-200 hover:text-amber-400 font-medium text-lg py-2"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="inline-block btn btn-primary btn-lg w-full mt-4"
          >
            Request a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
