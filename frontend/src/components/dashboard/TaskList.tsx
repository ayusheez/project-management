
import { Check, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress";
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Card className="glass-card p-6 space-y-4">
      <h3 className="font-semibold text-lg">Recent Tasks</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 rounded-md bg-accent/50 hover:bg-accent/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              {task.status === "completed" ? (
                <Check className="text-primary h-5 w-5" />
              ) : (
                <Clock className="text-muted-foreground h-5 w-5" />
              )}
              <span>{task.title}</span>
            </div>
            <span className="text-sm text-muted-foreground">{task.dueDate}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
