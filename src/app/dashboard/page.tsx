export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your property preservation content metrics and AI generation performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Articles", value: "24", sub: "+4 this week" },
          { label: "Monthly Visitors", value: "12,450", sub: "+12% from last month" },
          { label: "Avg SEO Score", value: "94/100", sub: "Excellent" },
          { label: "AI Generated", value: "85%", sub: "Of total content" },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</h3>
            <div className="text-3xl font-bold text-card-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 border border-border bg-card rounded-xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground">Traffic Growth Chart (Coming Soon)</p>
        </div>
        <div className="border border-border bg-card rounded-xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground">Recent Publishing History</p>
        </div>
      </div>
    </div>
  )
}
