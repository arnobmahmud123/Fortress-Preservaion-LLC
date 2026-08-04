import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AIChatWidget } from "@/components/ai-chat-widget"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full flex flex-col h-screen overflow-hidden bg-muted/20 relative">
        <header className="h-16 border-b border-border flex items-center px-6 bg-background/50 backdrop-blur-sm justify-between sticky top-0 z-10">
          <SidebarTrigger />
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-medium">CMS Admin Panel</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
        <AIChatWidget />
      </main>
    </SidebarProvider>
  )
}
