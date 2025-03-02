
import React from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectHeader } from "@/components/dashboard/ProjectDetails/ProjectHeader";
import { TeamMembersList } from "@/components/dashboard/ProjectDetails/TeamMembersList";
import { TasksList, TaskStatus } from "@/components/dashboard/ProjectDetails/TasksList";
import { CommentSection } from "@/components/dashboard/ProjectDetails/CommentSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit, ArrowLeft } from "lucide-react";

// Mock data - in a real app, this would be fetched from an API
const projectsData = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Modernize the company website with new features including responsive design, improved navigation, and updated content management system. We aim to improve user engagement and conversion rates through this redesign.",
    progress: 75,
    startDate: "Feb 10, 2023",
    dueDate: "Mar 15, 2023",
    status: "active" as const,
    team: [
      { id: "1", name: "John Smith", role: "Project Manager", avatar: "/placeholder.svg" },
      { id: "2", name: "Sarah Johnson", role: "Lead Designer", avatar: "/placeholder.svg" },
      { id: "3", name: "Michael Brown", role: "Frontend Developer", avatar: "/placeholder.svg" },
      { id: "4", name: "Emma Wilson", role: "Backend Developer", avatar: "/placeholder.svg" },
    ],
    tasks: [
      { id: "1", title: "Design homepage mockup", status: "done" as TaskStatus, assignedTo: "Sarah Johnson", dueDate: "Feb 15" },
      { id: "2", title: "Implement responsive navigation", status: "in-progress" as TaskStatus, assignedTo: "Michael Brown", dueDate: "Feb 28" },
      { id: "3", title: "Create content management system", status: "in-progress" as TaskStatus, assignedTo: "Emma Wilson", dueDate: "Mar 5" },
      { id: "4", title: "QA testing and bug fixes", status: "todo" as TaskStatus, assignedTo: "John Smith", dueDate: "Mar 10" },
      { id: "5", title: "Final review and launch", status: "todo" as TaskStatus, assignedTo: "Team", dueDate: "Mar 15" },
    ],
    comments: [
      {
        id: "1",
        author: { name: "Sarah Johnson", avatar: "/placeholder.svg" },
        content: "I've completed the homepage mockup. Please review when you have a chance.",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        author: { name: "John Smith", avatar: "/placeholder.svg" },
        content: "Looks great! Let's discuss the color scheme in tomorrow's meeting.",
        timestamp: "1 day ago",
      },
      {
        id: "3",
        author: { name: "Michael Brown", avatar: "/placeholder.svg" },
        content: "I've started working on the responsive navigation. Should be done by the end of the week.",
        timestamp: "12 hours ago",
      },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Create a new mobile app for customers with features like user profiles, product browsing, and secure checkout. The app should be available on both iOS and Android platforms.",
    progress: 45,
    startDate: "Jan 15, 2023",
    dueDate: "Apr 20, 2023",
    status: "active" as const,
    team: [
      { id: "3", name: "Michael Brown", role: "Project Lead", avatar: "/placeholder.svg" },
      { id: "4", name: "Emma Wilson", role: "Mobile Developer", avatar: "/placeholder.svg" },
      { id: "5", name: "David Lee", role: "UX Designer", avatar: "/placeholder.svg" },
    ],
    tasks: [
      { id: "1", title: "Create app wireframes", status: "done" as TaskStatus, assignedTo: "David Lee", dueDate: "Jan 30" },
      { id: "2", title: "Develop user authentication", status: "done" as TaskStatus, assignedTo: "Emma Wilson", dueDate: "Feb 15" },
      { id: "3", title: "Build product catalog view", status: "in-progress" as TaskStatus, assignedTo: "Emma Wilson", dueDate: "Mar 10" },
      { id: "4", title: "Implement checkout process", status: "todo" as TaskStatus, assignedTo: "Michael Brown", dueDate: "Apr 5" },
      { id: "5", title: "Testing and app store submission", status: "todo" as TaskStatus, assignedTo: "Team", dueDate: "Apr 15" },
    ],
    comments: [
      {
        id: "1",
        author: { name: "David Lee", avatar: "/placeholder.svg" },
        content: "Wireframes are complete and ready for review.",
        timestamp: "3 weeks ago",
      },
      {
        id: "2",
        author: { name: "Emma Wilson", avatar: "/placeholder.svg" },
        content: "Authentication is working now. Moving on to the product catalog.",
        timestamp: "1 week ago",
      },
    ],
  },
];

// Mock current user
const currentUser = {
  name: "John Smith",
  avatar: "/placeholder.svg",
};

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  
  // Find the project with the matching ID
  const project = projectsData.find((p) => p.id === projectId);
  
  // If no project is found, show a message
  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <h1 className="text-2xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="gap-1">
            <Link to="/projects">
              <ChevronLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <Button variant="outline" className="gap-1">
            <Edit className="h-4 w-4" />
            Edit Project
          </Button>
        </div>

        <ProjectHeader
          title={project.title}
          description={project.description}
          progress={project.progress}
          dueDate={project.dueDate}
          startDate={project.startDate}
          status={project.status}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <TasksList tasks={project.tasks} />
          </div>
          <div>
            <TeamMembersList members={project.team} />
          </div>
        </div>

        <CommentSection 
          comments={project.comments} 
          currentUser={currentUser}
          projectId={project.id}
        />
      </div>
    </DashboardLayout>
  );
}
