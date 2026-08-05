"use client";

import DashboardErrorBoundary from "@/components/dashboard-error-boundary";

export default function DashboardError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <DashboardErrorBoundary {...props} />;
}
