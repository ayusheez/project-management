
import { LayoutDashboard, Users, Clock, CheckCircle, Target } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Projects"
        value="12"
        icon={<LayoutDashboard className="h-6 w-6" />}
      />
      <StatsCard
        title="Active Tasks"
        value="24"
        icon={<Target className="h-6 w-6" />}
      />
      <StatsCard
        title="Team Members"
        value="8"
        icon={<Users className="h-6 w-6" />}
      />
      <StatsCard
        title="Upcoming Deadlines"
        value="5"
        icon={<Clock className="h-6 w-6" />}
      />
    </div>
  );
}
