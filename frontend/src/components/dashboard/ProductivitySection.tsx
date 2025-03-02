
import { BarChart2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const mockChartData = [
  { name: "Mon", tasks: 4, completed: 3 },
  { name: "Tue", tasks: 6, completed: 4 },
  { name: "Wed", tasks: 5, completed: 5 },
  { name: "Thu", tasks: 7, completed: 6 },
  { name: "Fri", tasks: 3, completed: 2 },
  { name: "Sat", tasks: 2, completed: 2 },
  { name: "Sun", tasks: 1, completed: 1 },
];

export function ProductivitySection() {
  return (
    <div className="glass-card p-6 hover-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Productivity Overview</h3>
        <BarChart2 className="h-5 w-5 text-cyan-500" />
      </div>
      <div className="h-[300px] w-full chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData}>
            <defs>
              <linearGradient id="tasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid #374151",
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => <span style={{ color: "#D1D5DB" }}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="tasks"
              stroke="#0EA5E9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tasks)"
              name="Assigned Tasks"
            />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#22C55E"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#completed)"
              name="Completed Tasks"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
