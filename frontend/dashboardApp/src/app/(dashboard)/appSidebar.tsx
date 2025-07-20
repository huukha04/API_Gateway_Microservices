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
  Languages,
  GraduationCap,
  Cpu,
  FileType2,
  FileSliders,
} from "lucide-react"
import { useSession } from "next-auth/react"

import { NavMain } from "@/app/(dashboard)/navMain"

import { NavApp } from "@/app/(dashboard)/navApp"
import { NavUser } from "@/app/(dashboard)/navUser"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/shadcn/ui/sidebar"
import {
  Button
} from "@/components/shadcn/ui/button"

import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/shadcn/ui/sidebar"
const data = {
  apps: [
    {
      title: "Student",
      logo: Command,
      isActive: true,
      sidebarHeader: [
        { title: "Home", url: "/(dashboard)", icon: Home },
        { title: "Calendar", url: "/(dashboard)/calendar", icon: Calendar },
        { title: "Upload", url: "/(dashboard)/upload", icon: Calendar },
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
          label: "Kiến thức",
          item: [
            {
              title: "Giáo dục phổ thông",
              url: "#",
              icon: GraduationCap,
              items: [
                {
                  title: "Lớp 1",
                  url: "#",
                  items: [
                    { title: "Task A", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 2",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 3",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 4",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 5",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 6",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 7",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 8",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 9",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 10",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 11",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 12",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
              ],
            },
            {
              title: "Anh văn",
              url: "/(dashboard)/english",
              icon: Languages,
              items: [
                {
                  title: "Từ vựng",
                  url: "/(dashboard)/english/vocabulary",
                  icon: FileType2,
                  items: [
                  {
                    title: "Kho từ vựng",
                    url: "/(dashboard)/english/vocabulary/list",
                  },
                  {
                    title: "Bài tập tự luyện",
                    url: "/(dashboard)/english/vocabulary/exercise",
                  },
              ],
                },
                {
                  title: "Ngữ pháp",
                  url: "/(dashboard)/english/grammar",
                  icon: FileSliders,
                },
              ],
            },
            {
              title: "Lập trình",
              url: "#",
              icon: Cpu,
              items: [
                {
                  title: "Tiếng anh",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Lớp 12",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
              ],
            },
            {
              title: "Ôn thi chuyển cấp",
              url: "#",
              icon: Cpu,
              items: [
                {
                  title: "Tuyển sinh lớp 10",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Tốt nghiệp THPT",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
                {
                  title: "Đánh giá năng lực (V-ACT)",
                  url: "#",
                  items: [
                    { title: "Task B", url: "#" },  
                    { title: "Task B", url: "#" },
                  ],
                },
              ],
            },
          ],
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
        <NavMain items={activeApp.sidebarHeader || []} />
      </SidebarHeader>
      <SidebarContent>
        {activeApp.sidebarContent.map((group, index) => (
          <SidebarGroup key={group.label + index} className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <NavMain items={group.item || []} />
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavMain items={activeApp.sidebarHeader || []} />
        {session?.user ? (
          <NavUser
            user={{
              name: session.user.name ?? "Unknown",
              email: session.user.email ?? "unknown@example.com",
              avatar: session.user.image ?? "/default-avatar.png",
            }}
          />
        ) : (
          <Button
            variant="outline"
            className="gap-2 px-4 py-2 rounded-lg shadow-sm hover:bg-muted transition"
            onClick={() => window.location.href = "/auth/login"}
          >
            Đăng nhập
          </Button>
        )}
      </SidebarFooter>


    </Sidebar>
  )
}
