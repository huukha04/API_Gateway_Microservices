// app\(dashboard)\layout.tsx

"use client"

import * as React from "react"
import {
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  Trash2,
} from "lucide-react"
import { useSession } from "next-auth/react"

import { NavHeader } from "@/app/(dashboard)/navHeader"
// import { NavFooter } from "@/app/(dashboard)/navFooter"
import { NavApp } from "@/app/(dashboard)/navApp"
import { NavUser } from "@/app/(dashboard)/navUser"
import { NavContent } from "@/app/(dashboard)/navContent"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/shacn/ui/sidebar"

// This is sample data.
const data = {
  apps: [
    {
      title: "Acme Inc",
      logo: Command,
      isActive: true,
      sidebarHeader: [
        { title: "Home", url: "/", icon: Home },
      ],
      sidebarFooter: [
        { title: "Calendar", url: "#", icon: Calendar },
        { title: "Settings", url: "#", icon: Settings2 },
        { title: "Templates", url: "#", icon: Blocks },
        { title: "Trash", url: "#", icon: Trash2 },
        { title: "Help", url: "#", icon: MessageCircleQuestion },
      ],
      sidebarContent: [
        {
          label: "Dự án",
          title: "Project Alpha",
          url: "#",
          icon: Calendar,
          children: [
            {
              title: "Phase 1",
              url: "#",
              
              children: [
                {
                  title: "Task A",
                  url: "#",
                  isActive: true,
                  children: [
                    { title: "Subtask A.1", url: "./test1" },
                    { title: "Subtask A.2", url: "./test2" },
                  ],
                },
                { title: "Task B", url: "#" },
              ],
            },
          ],
        },
        {
          label: "Dự án",
          title: "Project Beta",
          url: "#",
          icon: Calendar,
          children: [
            {
              title: "Phase 1",
              url: "#",
              children: [
                {
                  title: "Task A",
                  url: "#",
                  children: [
                    { title: "Subtask A.1", url: "#" },
                    { title: "Subtask A.2", url: "#" },
                  ],
                },
                { title: "Task B", url: "#" },
              ],
            },
          ],
        },
        {
          label: "Tài nguyên",
          title: "Documents",
          url: "#",
          icon: Blocks,
        },
        {
          label: "Tài nguyên",
          title: "Media",
          url: "#",
          icon: Inbox,
        },
      ]
    },

  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeAppIdx, setActiveAppIdx] = React.useState(
    data.apps.findIndex((app) => app.isActive) || 0
  )
  const activeApp = data.apps[activeAppIdx]
  const { data: session } = useSession()
  const handleAppChange = (idx: number) => {
    setActiveAppIdx(idx)
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavApp
          apps={data.apps}
          activeIndex={activeAppIdx}
          onAppChange={handleAppChange}
        />
        <NavHeader items={activeApp.sidebarHeader || []} />
      </SidebarHeader>
      <SidebarContent>
        <NavContent items={activeApp.sidebarContent || []} />
        {/* <NavFooter items={activeApp.sidebarFooter || []} className="mt-auto " /> */}
      </SidebarContent>
      <SidebarFooter>
        {session?.user && (
          <NavUser
            user={{
              name: session.user.name ?? "Unknown",
              email: session.user.email ?? "unknown@example.com",
              avatar: session.user.image ?? "/default-avatar.png",
            }}
          />
        )}
      </SidebarFooter>

    </Sidebar>
  )
}
