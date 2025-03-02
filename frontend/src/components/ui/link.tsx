
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LinkProps extends RouterLinkProps {
  className?: string;
}

export function Link({ className, ...props }: LinkProps) {
  return (
    <RouterLink
      className={cn("text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", className)}
      {...props}
    />
  );
}
