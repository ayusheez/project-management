import { useState } from "react";
import { 
  BarChart2, Calendar, CheckCircle, CheckSquare, Clock, 
  FileText, Plus, Target, Users
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { ProductivitySection } from "@/components/dashboard/ProductivitySection";
import { TaskList } from "@/components/dashboard/TaskList";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const recentTasks = [
  {
    id: "t1",
    title: "Update design documentation",
    status: "in-progress" as const,
    dueDate: "Today",
  },
  {
    id: "t2",
    title: "Prepare client presentation",
    status: "completed" as const,
    dueDate: "Yesterday",
  },
  {
    id: "t3",
    title: "Review pull requests",
    status: "in-progress" as const,
    dueDate: "Tomorrow",
  },
  {
    id: "t4",
    title: "Weekly team meeting",
    status: "in-progress" as const,
    dueDate: "Thursday",
  },
];

export default function Dashboard() {
  const [quickAddDialogOpen, setQuickAddDialogOpen] = useState(false);
  const [quickAddTab, setQuickAddTab] = useState("task");
  
  const handleQuickAdd = (type: string) => {
    toast.success(`New ${type} created successfully!`);
    setQuickAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Alex! Here's your project overview.</p>
          </div>
          
          <Dialog open={quickAddDialogOpen} onOpenChange={setQuickAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 hover-scale">
                <Plus className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-black/90 border-cyan-500/20 backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle>Create New</DialogTitle>
                <DialogDescription>
                  Quickly add a new task or project to your workspace.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={quickAddTab} onValueChange={setQuickAddTab} className="mt-4">
                <TabsList className="grid grid-cols-2 bg-black/30 border border-cyan-500/20">
                  <TabsTrigger 
                    value="task"
                    className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Task
                  </TabsTrigger>
                  <TabsTrigger 
                    value="project"
                    className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Project
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="task" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="taskTitle">Task Title</Label>
                      <Input id="taskTitle" placeholder="Enter task title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taskDueDate">Due Date</Label>
                      <Input id="taskDueDate" type="date" />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleQuickAdd("task")}
                    >
                      Create Task
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="project" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Project Title</Label>
                      <Input id="projectTitle" placeholder="Enter project title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Description</Label>
                      <Input id="projectDescription" placeholder="Brief description" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDeadline">Deadline</Label>
                      <Input id="projectDeadline" type="date" />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleQuickAdd("project")}
                    >
                      Create Project
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        
        <StatsSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductivitySection />
          
          <TaskList tasks={recentTasks} />
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Projects</h2>
            <Button variant="outline" asChild>
              <Link to="/projects" className="text-cyan-500 hover:text-cyan-400">
                View All
              </Link>
            </Button>
          </div>
          
          <ProjectsSection />
        </div>
      </div>
    </DashboardLayout>
  );
}
