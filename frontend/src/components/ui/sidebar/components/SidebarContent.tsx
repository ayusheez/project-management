
import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarContentProps extends React.ComponentPropsWithoutRef<"div"> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-1 flex-col overflow-hidden", className)}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

