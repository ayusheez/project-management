
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, ListCheck } from "lucide-react";

export type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate?: string;
}

interface TasksListProps {
  tasks: Task[];
}

export function TasksList({ tasks }: TasksListProps) {
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "done":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
            <CheckCircle className="h-3 w-3 mr-1" />
            Done
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none">
            <AlertCircle className="h-3 w-3 mr-1" />
            To-Do
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <ListCheck className="h-5 w-5" />
          Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-md bg-accent/50 hover:bg-accent/70 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{task.title}</span>
                {task.assignedTo && (
                  <span className="text-xs text-muted-foreground">
                    Assigned to: {task.assignedTo}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {task.dueDate && (
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Due: {task.dueDate}
                  </span>
                )}
                {getStatusBadge(task.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
