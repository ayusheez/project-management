
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, CheckSquare, Users, BarChart2, Calendar, GitPullRequest } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityLog {
  id: string;
  action: string;
  project: string;
  timestamp: string;
  icon: "task" | "comment" | "project" | "team";
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  interactions: number;
}

interface ProjectContribution {
  projectName: string;
  tasksCompleted: number;
  commentsAdded: number;
  lastActive: string;
  completion: number;
}

export function ActivitySummary() {
  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      action: "Completed task",
      project: "Website Redesign",
      timestamp: "Today, 10:30 AM",
      icon: "task"
    },
    {
      id: "2",
      action: "Added comment",
      project: "Mobile App Development",
      timestamp: "Yesterday, 2:15 PM",
      icon: "comment"
    },
    {
      id: "3",
      action: "Updated project status",
      project: "Database Migration",
      timestamp: "Yesterday, 11:45 AM",
      icon: "project"
    },
    {
      id: "4",
      action: "Assigned task to Jane",
      project: "Website Redesign",
      timestamp: "Mar 28, 9:00 AM",
      icon: "team"
    },
    {
      id: "5",
      action: "Completed task",
      project: "Mobile App Development",
      timestamp: "Mar 27, 4:30 PM",
      icon: "task"
    }
  ]);

  const [teamCollaboration] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Jane Cooper",
      avatar: "/placeholder.svg",
      interactions: 28
    },
    {
      id: "2",
      name: "Robert Fox",
      avatar: "/placeholder.svg",
      interactions: 23
    },
    {
      id: "3",
      name: "Emily Wilson",
      avatar: "/placeholder.svg",
      interactions: 17
    },
    {
      id: "4",
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      interactions: 14
    }
  ]);

  const [projectContributions] = useState<ProjectContribution[]>([
    {
      projectName: "Website Redesign",
      tasksCompleted: 18,
      commentsAdded: 24,
      lastActive: "Today",
      completion: 75
    },
    {
      projectName: "Mobile App Development",
      tasksCompleted: 12,
      commentsAdded: 16,
      lastActive: "Yesterday",
      completion: 60
    },
    {
      projectName: "Database Migration",
      tasksCompleted: 8,
      commentsAdded: 10,
      lastActive: "Mar 28",
      completion: 40
    }
  ]);

  const getActivityIcon = (type: ActivityLog["icon"]) => {
    switch (type) {
      case "task":
        return <CheckSquare className="h-4 w-4 text-cyan-500" />;
      case "comment":
        return <GitPullRequest className="h-4 w-4 text-purple-500" />;
      case "project":
        return <BarChart2 className="h-4 w-4 text-amber-500" />;
      case "team":
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  // Task completion stats
  const completedTasks = 38;
  const totalAssignedTasks = 45;
  const completionRate = Math.round((completedTasks / totalAssignedTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-500" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-cyan-500/80">
            Your latest actions across all projects
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-cyan-500/10">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 border border-white/10">
                  {getActivityIcon(log.icon)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{log.action}</p>
                  <p className="text-xs text-cyan-500/80">
                    {log.project} • {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Completion Stats */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
          <CardTitle className="text-white flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-cyan-500" />
            Task Completion
          </CardTitle>
          <CardDescription className="text-cyan-500/80">
            Your task performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Completion Rate</p>
                <p className="text-sm font-bold text-cyan-500">{completionRate}%</p>
              </div>
              <Progress 
                value={completionRate} 
                className="h-2 bg-black/50" 
                indicatorClassName="bg-gradient-to-r from-cyan-600 to-blue-600" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                {completedTasks} completed out of {totalAssignedTasks} assigned tasks
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/20 border border-cyan-500/10">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-cyan-500/20 mb-2">
                  <CheckSquare className="h-4 w-4 text-cyan-500" />
                </div>
                <p className="text-2xl font-bold text-white">{completedTasks}</p>
                <p className="text-xs text-muted-foreground">Tasks Completed</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/20 border border-cyan-500/10">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-500/20 mb-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-xs text-muted-foreground">Hours Saved</p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/20 border border-cyan-500/10">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-amber-500/20 mb-2">
                  <Calendar className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-xs text-muted-foreground">Days On Time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Collaboration */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-500" />
            Team Collaboration
          </CardTitle>
          <CardDescription className="text-cyan-500/80">
            Your most frequent collaborators
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {teamCollaboration.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-cyan-500/10">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-white/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-cyan-950 text-cyan-200">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-white">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.interactions} interactions
                    </p>
                  </div>
                </div>
                <div className="h-2 w-24 bg-black/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600" 
                    style={{ width: `${(member.interactions / 30) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Contributions */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-cyan-500" />
            Project Contributions
          </CardTitle>
          <CardDescription className="text-cyan-500/80">
            Your activity across different projects
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {projectContributions.map((project, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{project.projectName}</p>
                  <p className="text-xs text-muted-foreground">Last active: {project.lastActive}</p>
                </div>
                <Progress 
                  value={project.completion} 
                  className="h-2 bg-black/50" 
                  indicatorClassName="bg-gradient-to-r from-cyan-600 to-blue-600" 
                />
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CheckSquare className="h-3 w-3 text-cyan-500" />
                    <span>{project.tasksCompleted} tasks</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <GitPullRequest className="h-3 w-3 text-purple-500" />
                    <span>{project.commentsAdded} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
