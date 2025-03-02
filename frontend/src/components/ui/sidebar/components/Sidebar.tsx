
import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "../context"

interface SidebarProps extends React.ComponentPropsWithoutRef<"aside"> {}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, ...props }, ref) => {
    const { open, openMobile, isMobile } = useSidebar()

    return (
      <aside
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "group/sidebar relative flex h-full flex-col overflow-hidden border-r border-cyan-500/10 bg-black/90 backdrop-blur-xl transition-all duration-300 shadow-lg",
          isMobile ? "fixed inset-y-0 left-0 z-50" : "w-[var(--sidebar-width)]",
          !open && !isMobile && "w-[var(--sidebar-width-icon)]",
          openMobile && isMobile && "w-[var(--sidebar-width)]",
          !openMobile && isMobile && "left-[-100%]",
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"
