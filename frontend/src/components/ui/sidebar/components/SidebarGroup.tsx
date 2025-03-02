
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarGroupProps extends React.ComponentPropsWithoutRef<"div"> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-1 flex-col gap-4 p-4", className)}
        {...props}
      />
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5", className)}
        {...props}
      />
    )
  }
)
SidebarGroupContent.displayName = "SidebarGroupContent"
