"use client"

import * as React from "react"
import Link from "next/link"
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
  const [activePath, setActivePath] = React.useState<string[]>([])
  
  const setActive = (itemId: string, path: string[] = []) => {
    // Clear any previous active state and set new active item
    setActiveItemId(itemId)
    setActivePath(path)
  }
  
  const isActive = (itemId: string) => {
    return activeItemId === itemId
  }
  
  const isInActivePath = (itemId: string) => {
    return activePath.includes(itemId)
  }
  
  const clearActive = () => {
    setActiveItemId(null)
    setActivePath([])
  }
  
  return { setActive, isActive, isInActivePath, clearActive }
}

function RecursiveNavItem({
  item,
  level = 0,
  activeItem,
  parentPath = [],
}: {
  item: NavItem
  level: number
  activeItem: ReturnType<typeof useActiveItem>
  parentPath?: string[]
}) {
  const hasChildren = (item.children || []).length > 0
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Generate stable unique ID for this item using useMemo
  const itemId = React.useMemo(() => {
    // Include parent path in the ID to make it unique across different branches
    const parentPathStr = parentPath.join('-')
    return `${item.title}-${level}-${item.url}-${parentPathStr}`
  }, [item.title, level, item.url, parentPath])
  
  const currentPath = [...parentPath, itemId]
  const isItemActive = activeItem.isActive(itemId)
  const isInActivePath = activeItem.isInActivePath(itemId)

  // Debug logging for parent nodes
  if (hasChildren && isInActivePath) {
    console.log('Parent node highlighted:', item.title, 'ID:', itemId)
  }

  const handleLeafClick = () => {
    if (!hasChildren) {
      console.log('Clicking item:', item.title, 'with ID:', itemId)
      console.log('Setting active path:', currentPath)
      console.log('Parent path:', parentPath)
      activeItem.setActive(itemId, currentPath)
    }
  }

  return (
    <SidebarMenuItem className={level > 0 ? `ml-${level * 4}` : ""}>
      {hasChildren ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton 
              className={cn(
                "w-full transition-all duration-200 group",
                isInActivePath && "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 shadow-sm dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-500"
              )}
            >
              {item.icon && <item.icon className="mr-1 size-4" />}
              <span className="flex-1 truncate">{item.title}</span>
              <ChevronRight
                className={cn(
                  "ml-auto size-4 text-muted-foreground transition-transform duration-200",
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
                  parentPath={currentPath}
                />
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <SidebarMenuButton asChild>
          <Link
            href={item.url}
            className={cn(
              "w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 relative group",
              isItemActive 
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-lg border-l-4 border-blue-300 transform scale-[1.02]" 
                : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:shadow-md"
            )}
            onClick={(e) => {
              // Allow navigation but also set active state
              handleLeafClick()
            }}
          >
            {item.icon && <item.icon className="mr-1 size-4" />}
            <span className="truncate">{item.title}</span>
            {isItemActive && (
              <div className="absolute right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-sm"></div>
            )}
            {!isItemActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
            )}
          </Link>
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
              <RecursiveNavItem 
                key={i} 
                item={item} 
                level={0} 
                activeItem={activeItem}
                parentPath={[]}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}

