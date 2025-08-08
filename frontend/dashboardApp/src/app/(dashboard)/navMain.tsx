"use client"

import { SidebarGroup, SidebarMenu } from "@/components/shadcn/ui/sidebar"
import { SidebarRecursive, NavItem } from "./sidebarRecursive"

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        <SidebarRecursive items={items} />
      </SidebarMenu>
    </SidebarGroup>
  )
}