
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { CreateTaskDialog } from "@/components/kanban/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  comments: { id: string; author: string; text: string; date: string }[];
}

export default function Kanban() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Design new homepage",
      status: "todo",
      priority: "high",
      assignee: "Sarah Johnson",
      dueDate: "2023-06-15",
      comments: [
        {
          id: "comment-1",
          author: "John Smith",
          text: "Let's discuss this in our next meeting",
          date: "2023-06-01",
        },
      ],
    },
    {
      id: "task-2",
      title: "Fix login bug",
      status: "in-progress",
      priority: "high",
      assignee: "Michael Brown",
      dueDate: "2023-06-10",
      comments: [],
    },
    {
      id: "task-3",
      title: "Create user documentation",
      status: "done",
      priority: "medium",
      assignee: "Emma Wilson",
      dueDate: "2023-06-05",
      comments: [
        {
          id: "comment-2",
          author: "David Lee",
          text: "Looks great! Well done.",
          date: "2023-06-05",
        },
      ],
    },
    {
      id: "task-4",
      title: "Implement payment gateway",
      status: "todo",
      priority: "high",
      assignee: "John Smith",
      dueDate: "2023-06-20",
      comments: [],
    },
    {
      id: "task-5",
      title: "Optimize database queries",
      status: "in-progress",
      priority: "medium",
      assignee: "Emma Wilson",
      dueDate: "2023-06-12",
      comments: [],
    },
  ]);

  const handleCreateTask = (newTask: Omit<Task, "id" | "comments">) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      comments: [],
    };
    setTasks((prev) => [...prev, task]);
    setIsCreateTaskOpen(false);
  };

  const handleMoveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleAddComment = (taskId: string, comment: string) => {
    if (!comment.trim()) return;
    
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            author: "You", // In a real app, this would be the current user
            text: comment,
            date: new Date().toISOString().split("T")[0],
          };
          return {
            ...task,
            comments: [...task.comments, newComment],
          };
        }
        return task;
      })
    );
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <Button onClick={() => setIsCreateTaskOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Task
        </Button>
      </div>
      
      <KanbanBoard 
        tasks={tasks} 
        onMoveTask={handleMoveTask} 
        onAddComment={handleAddComment}
      />
      
      <CreateTaskDialog 
        open={isCreateTaskOpen} 
        onOpenChange={setIsCreateTaskOpen} 
        onCreateTask={handleCreateTask}
      />
    </DashboardLayout>
  );
}
