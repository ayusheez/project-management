
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TeamSection } from "@/components/dashboard/TeamSection";

// Mock data for team members (in a real app, this would come from an API)
const teamMembers = [
  {
    id: "1",
    name: "John Smith",
    role: "Admin",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Manager",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Team Leader",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Emma Wilson",
    role: "Team Leader",
    avatar: "/placeholder.svg"
  }
];

export default function Team() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <TeamSection members={teamMembers} />
      </div>
    </DashboardLayout>
  );
}
