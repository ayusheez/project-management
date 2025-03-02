
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="glass-card p-6 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="text-cyan-500 transition-transform hover:scale-110 duration-300">
          {icon}
        </div>
      </div>
    </Card>
  );
}
