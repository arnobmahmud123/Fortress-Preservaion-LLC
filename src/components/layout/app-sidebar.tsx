"use client"

import { Calendar, LayoutDashboard, FileText, Settings, Users, PenTool, Database, Image as ImageIcon, BarChart, Bot } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Content Studio", url: "/dashboard/ai-studio", icon: Bot },
  { title: "Posts", url: "/dashboard/posts", icon: FileText },
  { title: "Categories & Tags", url: "/dashboard/taxonomy", icon: Database },
  { title: "SEO Manager", url: "/dashboard/seo", icon: PenTool },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart },
  { title: "Content Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "Media Library", url: "/dashboard/media", icon: ImageIcon },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-primary">Fortress CMS</h1>
        <p className="text-xs text-muted-foreground mt-1">Property Preservation</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@fortress.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
