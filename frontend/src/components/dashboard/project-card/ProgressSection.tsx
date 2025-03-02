
import { Progress } from "@/components/ui/progress";

interface ProgressSectionProps {
  progress: number;
  status?: "active" | "completed" | "on-hold";
}

export function ProgressSection({ progress, status = "active" }: ProgressSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 ${
          status === "completed" ? "bg-green-500/20" : 
          status === "on-hold" ? "bg-amber-500/20" : ""
        }`} 
      />
    </div>
  );
}
