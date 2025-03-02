
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <Card className="glass-card p-6">
      <h3 className="font-semibold text-lg mb-4">Team Members</h3>
      <div className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.avatar} />
              <AvatarFallback>
                {member.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
