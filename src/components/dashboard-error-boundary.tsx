"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DashboardErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
        !
      </div>
      <h1 className="text-2xl font-black text-white tracking-tight">Something went wrong</h1>
      <p className="text-slate-400 text-sm max-w-md">
        {error?.message || "An unexpected error occurred while loading this page."}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
