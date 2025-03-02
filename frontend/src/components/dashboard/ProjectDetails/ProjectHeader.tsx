
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";

type ProjectStatus = "active" | "completed" | "on-hold";

interface ProjectHeaderProps {
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  startDate: string;
  status: ProjectStatus;
}

export function ProjectHeader({
  title,
  description,
  progress,
  dueDate,
  startDate,
  status,
}: ProjectHeaderProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "on-hold":
        return (
          <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none">
            <AlertCircle className="h-3 w-3 mr-1" />
            On Hold
          </Badge>
        );
      default:
        return (
          <Badge className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
    }
  };

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{title}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Started: </span>
                <span>{startDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Due: </span>
                <span>{dueDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
