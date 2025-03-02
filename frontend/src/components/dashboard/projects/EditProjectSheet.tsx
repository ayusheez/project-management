
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Project } from "@/types/project";

interface EditProjectSheetProps {
  project: Project | null;
  onUpdateProject: (project: Project) => void;
  onClose: () => void;
  open: boolean;
}

export function EditProjectSheet({ 
  project, 
  onUpdateProject, 
  onClose, 
  open 
}: EditProjectSheetProps) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
          <SheetDescription>
            Update the project details below
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                onUpdateProject({ ...project, title: e.target.value })
              }
            />
          </div>
          <div>
            <Textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                onUpdateProject({ ...project, description: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="date"
              value={project.dueDate}
              onChange={(e) =>
                onUpdateProject({ ...project, dueDate: e.target.value })
              }
            />
          </div>
          <div>
            <Select 
              value={project.status}
              onValueChange={(value) => 
                onUpdateProject({ 
                  ...project, 
                  status: value as "active" | "completed" | "on-hold" 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="number"
              placeholder="Progress (%)"
              min="0"
              max="100"
              value={project.progress}
              onChange={(e) =>
                onUpdateProject({ 
                  ...project, 
                  progress: parseInt(e.target.value) || 0 
                })
              }
            />
          </div>
          <Button onClick={() => {
            onUpdateProject(project);
            onClose();
          }} className="w-full">
            Update Project
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
