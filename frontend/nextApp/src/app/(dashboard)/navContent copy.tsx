"use client"

import * as React from "react"
import {
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shacn/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shacn/ui/collapsible"

type NavItem = {
  label?: string
  title: string
  url: string
  isActive?: boolean
  icon?: LucideIcon
  children?: NavItem[]
}

// Global state to track the currently active item
const useActiveItem = () => {
  const [activeItemId, setActiveItemId] = React.useState<string | null>(null)
  
  const setActive = (itemId: string) => {
    // Clear any previous active state and set new active item
    setActiveItemId(itemId)
  }
  
  const isActive = (itemId: string) => {
    return activeItemId === itemId
  }
  
  const clearActive = () => {
    setActiveItemId(null)
  }
  
  return { setActive, isActive, clearActive }
}

function RecursiveNavItem({
  item,
  level = 0,
  activeItem,
}: {
  item: NavItem
  level: number
  activeItem: ReturnType<typeof useActiveItem>
}) {
  const hasChildren = (item.children || []).length > 0
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Generate stable unique ID for this item using useMemo
  const itemId = React.useMemo(() => {
    return `${item.title}-${level}-${item.url}`
  }, [item.title, level, item.url])
  
  const isItemActive = activeItem.isActive(itemId)

  const handleLeafClick = () => {
    if (!hasChildren) {
      console.log('Clicking item:', item.title, 'with ID:', itemId)
      activeItem.setActive(itemId)
    }
  }

  return (
    <SidebarMenuItem className={level > 0 ? `ml-${level * 4}` : ""}>
      {hasChildren ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full">
              {item.icon && <item.icon className="mr-1 size-4" />}
              <span className="flex-1 truncate">{item.title}</span>
              <ChevronRight
                className={cn(
                  "ml-auto size-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-90"
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-2">
            <SidebarMenu>
              {(item.children || []).map((childItem, idx) => (
                <RecursiveNavItem 
                  key={idx} 
                  item={childItem} 
                  level={level + 1} 
                  activeItem={activeItem}
                />
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <SidebarMenuButton asChild>
          <a
            href={item.url}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 relative",
              isItemActive 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg border-l-4 border-yellow-400" 
                : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            )}
            onClick={(e) => {
              e.preventDefault() // optional: prevent default if you don't want page navigation
              handleLeafClick()
            }}
          >
            {item.icon && <item.icon className="mr-1 size-4" />}
            <span className="truncate">{item.title}</span>
            {isItemActive && (
              <div className="absolute right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </a>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  )
}

export function NavContent({ items }: { items: NavItem[] }) {
  const activeItem = useActiveItem()
  
  const groups = items.reduce((acc, item) => {
    const label = item.label || "Other"
    if (!acc[label]) acc[label] = []
    acc[label].push(item)
    return acc
  }, {} as Record<string, NavItem[]>)
  
  return (
    <>
      {Object.entries(groups).map(([label, groupItems]) => (
        <SidebarGroup key={label} className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarMenu>
            {groupItems.map((item, i) => (
              <RecursiveNavItem key={i} item={item} level={0} activeItem={activeItem} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}

