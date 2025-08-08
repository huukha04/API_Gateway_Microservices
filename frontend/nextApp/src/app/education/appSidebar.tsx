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
import { Skeleton } from "@/components/shadcn/ui/skeleton"

import { useSession } from "next-auth/react"

import { NavMain } from "@/components/layout/sidebar/navMain"
import { NavApp } from "@/components/layout/sidebar/navApp"
import { NavUser } from "@/components/layout/sidebar/navUser"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/shadcn/ui/sidebar"
import { Button } from "@/components/shadcn/ui/button"
import {
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/shadcn/ui/sidebar"

import { Input } from "@/components/shadcn/ui/input"


const data = {
  apps: [
    {
      title: "Student",
      logo: Command,
      isActive: true,
      sidebarHeader: [
        { title: "Home", url: "/education", icon: Home },
        { title: "Calendar", url: "/education/calendar", icon: Calendar },
        { title: "Upload", url: "/education/upload", icon: Calendar },
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
              items: Array.from({ length: 12 }, (_, i) => ({
                title: `Lớp ${i + 1}`,
                url: "#",
                items: [
                  { title: "Task A", url: "#" },
                  { title: "Task B", url: "#" },
                ],
              })),
            },
            {
              title: "Ngoại ngữ",
              url: "/education/languages",
              icon: Languages,
              items: [
                {
                  title: "Từ vựng",
                  url: "/education/languages/vocabulary",
                  icon: FileType2,
                  items: [
                    {
                      title: "Kho từ vựng",
                      url: "/education/languages/vocabulary/library",
                    },
                    {
                      title: "Bài tập tự luyện",
                      url: "/education/languages/vocabulary/exercise",
                    },
                  ],
                },
                {
                  title: "Ngữ pháp",
                  url: "/education/languages/grammar",
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
      ],
    },
  ],
}

export type NavItem = {
  label?: string
  title: string
  url: string
  icon?: React.ElementType
  isActive?: boolean
  items?: NavItem[]
}


function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function filterItems(items: NavItem[], term: string): NavItem[] {
  const searchTerm = removeDiacritics(term)
  return items
    .map(item => {
      const itemTitle = removeDiacritics(item.title)
      const match = itemTitle.includes(searchTerm)
      const filteredChildren = item.items ? filterItems(item.items, term) : []
      if (match || filteredChildren.length > 0) {
        return {
          ...item,
          items: filteredChildren.length > 0 ? filteredChildren : item.items,
        }
      }
      return null
    })
    .filter(Boolean) as NavItem[]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeAppIdx, setActiveAppIdx] = React.useState(
    data.apps.findIndex((app) => app.isActive) || 0
  )
  const [searchTerm, setSearchTerm] = React.useState("")

  const { data: session, status } = useSession()
  const activeApp = data.apps[activeAppIdx]

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

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
        <div className="p-2">
          <form autoComplete="off">
          <Input 
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-2 text-sm border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>


        </div>

        {activeApp.sidebarContent.map((group, index) => {
          const filtered = filterItems(group.item || [], searchTerm)
          if (filtered.length === 0) return null

          return (
            <SidebarGroup
              key={group.label + index}
              className="group-data-[collapsible=icon]:hidden"
            >
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <NavMain items={filtered} />
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter>
        <NavMain items={activeApp.sidebarFooter || []} />
        {
          session?.user ? (
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
              onClick={() => (window.location.href = "/auth/login")}
            >
              Đăng nhập
            </Button>
          )
        }
      </SidebarFooter>
    </Sidebar>
  )
}
