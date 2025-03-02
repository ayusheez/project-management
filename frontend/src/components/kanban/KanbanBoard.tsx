
import React from "react";
import { Task } from "@/pages/Kanban";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";

interface KanbanBoardProps {
  tasks: Task[];
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onAddComment: (taskId: string, comment: string) => void;
}

export function KanbanBoard({ tasks, onMoveTask, onAddComment }: KanbanBoardProps) {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    const taskId = e.dataTransfer.getData("taskId");
    onMoveTask(taskId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn 
        title="To Do" 
        status="todo"
        count={todoTasks.length}
        onDrop={handleDrop}
      >
        {todoTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={handleDragStart}
            onAddComment={onAddComment}
          />
        ))}
      </KanbanColumn>

      <KanbanColumn 
        title="In Progress" 
        status="in-progress"
        count={inProgressTasks.length}
        onDrop={handleDrop}
      >
        {inProgressTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={handleDragStart}
            onAddComment={onAddComment}
          />
        ))}
      </KanbanColumn>

      <KanbanColumn 
        title="Done" 
        status="done"
        count={doneTasks.length}
        onDrop={handleDrop}
      >
        {doneTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={handleDragStart}
            onAddComment={onAddComment}
          />
        ))}
      </KanbanColumn>
    </div>
  );
}
