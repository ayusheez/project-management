
import { BarChart as BarChartIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Website Redesign", progress: 75, remaining: 25 },
  { name: "Mobile App", progress: 45, remaining: 55 },
  { name: "Marketing", progress: 100, remaining: 0 },
  { name: "Database", progress: 10, remaining: 90 },
  { name: "API Integration", progress: 60, remaining: 40 },
];

export function ProjectProgressChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="progress"
            name="Completed"
            stackId="a"
            fill="#22c55e"
            radius={[0, 4, 4, 0]}
          />
          <Bar
            dataKey="remaining"
            name="Remaining"
            stackId="a"
            fill="#94a3b8"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
