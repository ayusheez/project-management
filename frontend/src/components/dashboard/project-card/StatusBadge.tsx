
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: "active" | "completed" | "on-hold";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case "on-hold":
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none">
          <AlertCircle className="h-3 w-3 mr-1" />
          On Hold
        </Badge>
      );
    default:
      return (
        <Badge className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
          <Clock className="h-3 w-3 mr-1" />
          Active
        </Badge>
      );
  }
}
