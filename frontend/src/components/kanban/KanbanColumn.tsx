
import React from "react";
import { Task } from "@/pages/Kanban";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KanbanColumnProps {
  title: string;
  status: Task["status"];
  count: number;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent, status: Task["status"]) => void;
}

export function KanbanColumn({ 
  title, 
  status, 
  count, 
  children, 
  onDrop 
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(e, status);
  };

  return (
    <Card 
      className="h-full flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {title}
          </CardTitle>
          <div className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
            {count}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {children}
      </CardContent>
    </Card>
  );
}
