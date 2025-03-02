
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamMember } from "@/types/project";

interface TeamMembersProps {
  team: TeamMember[];
}

export function TeamMembers({ team }: TeamMembersProps) {
  if (team.length === 0) return null;
  
  return (
    <div className="flex -space-x-2">
      {team.slice(0, 3).map((member) => (
        <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-xs">
            {member.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
      ))}
      {team.length > 3 && (
        <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-xs font-medium">
          +{team.length - 3}
        </div>
      )}
    </div>
  );
}
