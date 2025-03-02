
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { useSidebar } from "../context"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarMenuItemProps extends React.ComponentPropsWithoutRef<"div"> {}

export const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      />
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean
  tooltipContent?: React.ReactNode
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, asChild = false, tooltipContent, children, ...props }, ref) => {
    const { open } = useSidebar()
    const Comp = asChild ? Slot : "button"
    const content = (
      <Comp
        ref={ref}
        className={cn(
          "group/sidebar-button inline-flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
          "hover:bg-cyan-500/10 hover:text-cyan-500",
          "focus:bg-cyan-500/10 focus:text-cyan-500 focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!open && tooltipContent) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="bg-black/90 border-cyan-500/20">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      )
    }

    return content
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"
