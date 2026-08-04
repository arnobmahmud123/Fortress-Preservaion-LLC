import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer bg-[#050C16] text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold text-lg flex items-center justify-center">F</div>
              <div className="font-bold text-white text-lg">Fortress Preservation</div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Institutional-grade property preservation, REO field services, and compliance-driven inspections for mortgage servicers, banks, and asset managers nationwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 text-xs uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/clients" className="hover:text-white transition-colors">For Clients</Link></li>
              <li><Link href="/contractors" className="hover:text-white transition-colors">For Contractors</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 text-xs uppercase tracking-widest mb-4">Core Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Property Inspections</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Preservation & Winterization</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">REO Management</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Compliance & Audit Support</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Emergency Board-Ups</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-amber-400 text-xs uppercase tracking-widest mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><span className="text-amber-400">📞</span> +1 (659) 213-7866</li>
              <li className="flex items-center gap-2"><span className="text-amber-400">✉️</span> info@fortresspreservationllc.com</li>
              <li className="flex items-start gap-2"><span className="text-amber-400">📍</span> 123 Commerce Drive, Suite 400<br/>Charlotte, NC 28202</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2025 Fortress Preservation LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Compliance Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
