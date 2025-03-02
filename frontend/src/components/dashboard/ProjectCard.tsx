
import { Card } from "@/components/ui/card";
import { SearchContext } from "@/components/layout/DashboardLayout";
import { useContext } from "react";
import { TeamMember } from "@/types/project";
import { StatusBadge } from "./project-card/StatusBadge";
import { ProgressSection } from "./project-card/ProgressSection";
import { TeamMembers } from "./project-card/TeamMembers";

interface ProjectCardProps {
  id?: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status?: "active" | "completed" | "on-hold";
  team?: TeamMember[];
}

export function ProjectCard({ 
  id = "1", 
  title, 
  description, 
  progress, 
  dueDate, 
  status = "active",
  team = []
}: ProjectCardProps) {
  const { searchTerm } = useContext(SearchContext);
  
  const isMatched = searchTerm && 
    (title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     description.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card className={`glass-card p-6 hover-card space-y-4 transition-all duration-300 cursor-pointer hover:shadow-md ${
      isMatched ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20' : ''
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <ProgressSection progress={progress} status={status} />
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Due {dueDate}
        </div>
        
        {team.length > 0 && (
          <TeamMembers team={team} />
        )}
      </div>
    </Card>
  );
}
