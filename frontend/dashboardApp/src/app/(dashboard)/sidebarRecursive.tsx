"use client"

import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible"
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/shadcn/ui/sidebar"

export type NavItem = {
  label?: string
  title: string
  url: string
  icon?: React.ElementType
  isActive?: boolean
  items?: NavItem[]
}

export function SidebarRecursive({
  items,
  level = 0,
}: {
  items: NavItem[]
  level?: number
}) {
  const pathname = usePathname()
  const isActiveItem = (url: string) => {
    if (url === "/") return pathname === "/"
    return pathname.startsWith(url)
  }
  const isActiveSubItem = (url: string) => pathname === url

  const getItemColor = (url: string, isSubItem = false) => {
    const active = isSubItem ? isActiveSubItem(url) : isActiveItem(url)
    if (active) {
      return "text-blue-600 bg-blue-50 border-l-4 border-blue-600 font-semibold dark:text-blue-400 dark:bg-blue-950 dark:border-blue-400"
    }
    return "text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900"
  }

  return items.map((item) => {
    const hasChildren = !!item.items?.length
    const isSubItem = level > 1

    const ButtonComponent = isSubItem
      ? SidebarMenuSubButton
      : SidebarMenuButton

    const ItemComponent = isSubItem
      ? SidebarMenuSubItem
      : SidebarMenuItem

    const Icon = item.icon ? <item.icon className="h-4 w-4" /> : null

    return (
      <Collapsible
        key={item.title}
        asChild
        defaultOpen={item.isActive || isActiveItem(item.url)}
      >
        <ItemComponent>
          <ButtonComponent
            asChild
            tooltip={item.title}
            className={cn("transition-colors duration-200", getItemColor(item.url, isSubItem))}
          >
            <a href={item.url} className="flex items-center gap-2">
              {Icon}
              <span>{item.title}</span>
            </a>
          </ButtonComponent>

          {hasChildren && (
            <>
              <CollapsibleTrigger asChild>
                <SidebarMenuAction className="data-[state=open]:rotate-90">
                  <ChevronRight />
                </SidebarMenuAction>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarRecursive items={item.items!} level={level + 1} />
                </SidebarMenuSub>
              </CollapsibleContent>
            </>
          )}
        </ItemComponent>
      </Collapsible>
    )
  })
}

