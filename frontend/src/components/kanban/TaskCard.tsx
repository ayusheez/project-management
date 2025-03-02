
import React, { useState } from "react";
import { Task } from "@/pages/Kanban";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Badge,
  Avatar, 
  AvatarFallback 
} from "@/components/ui/badge";
import { 
  Calendar, 
  MessageSquare,
  Send
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onAddComment: (taskId: string, comment: string) => void;
}

export function TaskCard({ task, onDragStart, onAddComment }: TaskCardProps) {
  const [comment, setComment] = useState("");
  
  const handleSubmitComment = () => {
    onAddComment(task.id, comment);
    setComment("");
  };

  const getPriorityBadgeColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-none";
      case "low":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <Badge className={getPriorityBadgeColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </Badge>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {task.dueDate}
          </div>
        </div>
        
        <div className="flex items-center text-sm">
          <Avatar className="h-5 w-5 mr-1">
            <AvatarFallback className="text-xs">
              {task.assignee.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs">{task.assignee}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              {task.comments.length} comments
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{task.title}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Task Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assignee:</span>
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <Badge className={getPriorityBadgeColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Comments</h3>
                {task.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No comments yet</p>
                ) : (
                  <div className="space-y-3">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="bg-accent/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none"
                  />
                  <Button 
                    className="w-full flex items-center justify-center" 
                    onClick={handleSubmitComment}
                    disabled={!comment.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Comment
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
