
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ListCheck,
  MessageSquare,
  User
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "active" | "completed" | "on-hold";
  team: TeamMember[];
}

interface ProjectDetailsProps {
  project: Project;
}

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignedTo?: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  // Mock data for the project details
  const mockTasks: Task[] = [
    { 
      id: "1", 
      title: "Define project scope", 
      status: "done", 
      assignedTo: project.team[0]?.name 
    },
    { 
      id: "2", 
      title: "Create wireframes", 
      status: "done", 
      assignedTo: project.team[1]?.name 
    },
    { 
      id: "3", 
      title: "Develop frontend components", 
      status: "in-progress", 
      assignedTo: project.team[0]?.name 
    },
    { 
      id: "4", 
      title: "Backend integration", 
      status: "todo", 
      assignedTo: project.team[1]?.name 
    },
    { 
      id: "5", 
      title: "Testing and QA", 
      status: "todo"
    },
  ];

  const mockComments: Comment[] = [
    {
      id: "1",
      author: {
        name: project.team[0]?.name || "Team Member",
        avatar: project.team[0]?.avatar,
      },
      content: "I've completed the initial setup and wireframes. Ready to move to the development phase.",
      timestamp: "2 days ago",
    },
    {
      id: "2",
      author: {
        name: project.team[1]?.name || "Team Member",
        avatar: project.team[1]?.avatar,
      },
      content: "Frontend components are coming along nicely. We should be able to start backend integration next week.",
      timestamp: "1 day ago",
    },
  ];

  const getStatusBadge = () => {
    switch (project.status) {
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

  const getTaskStatusBadge = (status: TaskStatus) => {
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
    <div className="space-y-6">
      {/* Project Header */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{project.title}</h1>
                {getStatusBadge()}
              </div>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Due: </span>
                  <span>{project.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Team, Tasks, and Comments */}
      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="team">
            <User className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <ListCheck className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments
          </TabsTrigger>
        </TabsList>
        
        {/* Team Members Tab */}
        <TabsContent value="team" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Team Members
              </h2>
              <div className="space-y-4">
                {project.team.length > 0 ? (
                  project.team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-md bg-accent/50">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No team members assigned yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ListCheck className="h-5 w-5" />
                Tasks
              </h2>
              <div className="space-y-3">
                {mockTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-md bg-accent/50"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{task.title}</span>
                      {task.assignedTo && (
                        <span className="text-xs text-muted-foreground">
                          Assigned to: {task.assignedTo}
                        </span>
                      )}
                    </div>
                    {getTaskStatusBadge(task.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Comments Tab */}
        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments & Updates
              </h2>
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>
                        {comment.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="mt-1 text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <Input placeholder="Add a comment..." className="flex-1" />
                  <Button size="sm">Post</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
