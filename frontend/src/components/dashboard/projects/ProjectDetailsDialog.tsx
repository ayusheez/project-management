
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectDetails } from "@/components/dashboard/ProjectDetails";
import { Project } from "@/types/project";

interface ProjectDetailsDialogProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({
  project,
  isOpen,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {project && <ProjectDetails project={project} />}
      </DialogContent>
    </Dialog>
  );
}
