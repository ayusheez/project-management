
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Project } from "@/types/project";

interface AddProjectSheetProps {
  onAddProject: (project: Omit<Project, "id" | "progress" | "status" | "team">) => void;
}

export function AddProjectSheet({ onAddProject }: AddProjectSheetProps) {
  const { toast } = useToast();
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description || !newProject.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddProject(newProject);
    setNewProject({ title: "", description: "", dueDate: "" });
    
    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Project</SheetTitle>
          <SheetDescription>
            Fill in the project details below
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
          </div>
          <div>
            <Textarea
              placeholder="Project Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="date"
              value={newProject.dueDate}
              onChange={(e) =>
                setNewProject({ ...newProject, dueDate: e.target.value })
              }
            />
          </div>
          <Button onClick={handleAddProject} className="w-full">
            Create Project
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
