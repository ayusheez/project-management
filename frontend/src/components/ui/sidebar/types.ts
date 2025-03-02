
import { VariantProps } from "class-variance-authority"
import * as React from "react"

export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SidebarContentProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof import("./variants").sidebarVariants> {}

