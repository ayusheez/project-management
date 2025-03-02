
import { TaskList } from "@/components/dashboard/TaskList";
import { TeamSection } from "@/components/dashboard/TeamSection";

const mockTasks = [
  {
    id: "1",
    title: "Update homepage design",
    status: "completed" as const,
    dueDate: "Today",
  },
  {
    id: "2",
    title: "Review project proposal",
    status: "in-progress" as const,
    dueDate: "Tomorrow",
  },
  {
    id: "3",
    title: "Team meeting preparation",
    status: "in-progress" as const,
    dueDate: "Mar 10",
  },
];

const mockTeamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Project Manager",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Developer",
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Designer",
  },
];

export function TasksTeamSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TaskList tasks={mockTasks} />
      </div>
      <div>
        <TeamSection members={mockTeamMembers} />
      </div>
    </div>
  );
}
