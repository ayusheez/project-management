
export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  dueDate: string;
  status: "active" | "completed" | "on-hold";
  team: TeamMember[];
}
