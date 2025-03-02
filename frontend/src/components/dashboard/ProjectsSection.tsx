import { useState } from "react";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/types/project";
import { AddProjectSheet } from "./projects/AddProjectSheet";
import { EditProjectSheet } from "./projects/EditProjectSheet";
import { DeleteProjectDialog } from "./projects/DeleteProjectDialog";
import { ProjectDetailsDialog } from "./projects/ProjectDetailsDialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortField = "dueDate" | "progress" | "status";
type SortDirection = "asc" | "desc";

export function ProjectsSection() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Website Redesign",
      description: "Modernize the company website with new features",
      progress: 75,
      dueDate: "Mar 15",
      status: "active",
      team: [
        { id: "1", name: "John Smith", avatar: "/placeholder.svg" },
        { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "2",
      title: "Mobile App Development",
      description: "Create a new mobile app for customers",
      progress: 45,
      dueDate: "Apr 20",
      status: "active",
      team: [
        { id: "3", name: "Michael Brown", avatar: "/placeholder.svg" },
        { id: "4", name: "Emma Wilson", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "3",
      title: "Marketing Campaign",
      description: "Launch Q2 marketing campaign",
      progress: 100,
      dueDate: "Feb 28",
      status: "completed",
      team: [
        { id: "2", name: "Sarah Johnson", avatar: "/placeholder.svg" },
        { id: "5", name: "David Lee", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "4",
      title: "Database Migration",
      description: "Migrate to new cloud database",
      progress: 10,
      dueDate: "Jun 15",
      status: "on-hold",
      team: [
        { id: "1", name: "John Smith", avatar: "/placeholder.svg" },
        { id: "3", name: "Michael Brown", avatar: "/placeholder.svg" },
      ],
    },
  ]);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  
  const [sortField, setSortField] = useState<SortField>("dueDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleAddProject = (newProjectData: Omit<Project, "id" | "progress" | "status" | "team">) => {
    const project: Project = {
      id: (projects.length + 1).toString(),
      title: newProjectData.title,
      description: newProjectData.description,
      progress: 0,
      dueDate: newProjectData.dueDate,
      status: "active",
      team: [],
    };

    setProjects([...projects, project]);
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    
    setProjects(updatedProjects);
    setEditingProject(null);
    
    toast({
      title: "Success",
      description: "Project updated successfully",
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjectToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!projectToDelete) return;
    
    const updatedProjects = projects.filter(project => project.id !== projectToDelete);
    setProjects(updatedProjects);
    
    if (selectedProjectId === projectToDelete) {
      setSelectedProjectId(null);
    }
    
    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
    
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortField === "dueDate") {
      const getMonthNumber = (monthAbbr: string) => {
        const months = {
          "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
          "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
        };
        return months[monthAbbr as keyof typeof months] || 0;
      };

      const dateA = a.dueDate.split(" ");
      const dateB = b.dueDate.split(" ");
      
      if (dateA.length === 2 && dateB.length === 2) {
        const monthA = getMonthNumber(dateA[0]);
        const monthB = getMonthNumber(dateB[0]);
        const dayA = parseInt(dateA[1]);
        const dayB = parseInt(dateB[1]);
        
        const comparison = monthA !== monthB 
          ? monthA - monthB 
          : dayA - dayB;
          
        return sortDirection === "asc" ? comparison : -comparison;
      }
      return 0;
    }
    
    if (sortField === "progress") {
      const comparison = a.progress - b.progress;
      return sortDirection === "asc" ? comparison : -comparison;
    }
    
    if (sortField === "status") {
      const statusOrder = {
        "completed": 3,
        "active": 2,
        "on-hold": 1
      };
      
      const statusValueA = statusOrder[a.status];
      const statusValueB = statusOrder[b.status];
      
      const comparison = statusValueA - statusValueB;
      return sortDirection === "asc" ? comparison : -comparison;
    }
    
    return 0;
  });

  const selectedProject = selectedProjectId 
    ? projects.find(project => project.id === selectedProjectId) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSortDirection}
              className="ml-1"
            >
              {sortDirection === "asc" ? 
                <SortAsc className="h-4 w-4" /> : 
                <SortDesc className="h-4 w-4" />
              }
            </Button>
          </div>
          <AddProjectSheet onAddProject={handleAddProject} />
        </div>
      </div>

      {sortedProjects.map((project) => (
        <div key={project.id} className="relative group">
          <div 
            onClick={() => handleProjectClick(project.id)}
            className="cursor-pointer"
          >
            <ProjectCard 
              id={project.id} 
              title={project.title}
              description={project.description}
              progress={project.progress}
              dueDate={project.dueDate}
              status={project.status}
              team={project.team}
            />
          </div>
          
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button 
              className="h-8 w-8 p-0 rounded-md border border-input bg-background/80 backdrop-blur-sm inline-flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setEditingProject(project);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                <path d="m15 5 4 4"/>
              </svg>
              <span className="sr-only">Edit</span>
            </button>
            
            <button 
              className="h-8 w-8 p-0 rounded-md border border-input bg-background/80 backdrop-blur-sm inline-flex items-center justify-center text-destructive hover:text-destructive-foreground hover:bg-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProject(project.id);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <line x1="10" x2="10" y1="11" y2="17"/>
                <line x1="14" x2="14" y1="11" y2="17"/>
              </svg>
              <span className="sr-only">Delete</span>
            </button>
          </div>
        </div>
      ))}

      <EditProjectSheet 
        project={editingProject} 
        onUpdateProject={setEditingProject}
        onClose={() => handleUpdateProject()}
        open={!!editingProject}
      />

      <DeleteProjectDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />

      <ProjectDetailsDialog
        project={selectedProject}
        isOpen={selectedProjectId !== null}
        onOpenChange={(open) => !open && setSelectedProjectId(null)}
      />
    </div>
  );
}
