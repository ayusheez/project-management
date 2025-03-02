
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { PageHeader } from "@/components/layout/PageHeader";

const Projects = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <PageHeader 
          title="Projects" 
          description="Manage your projects" 
        />
        <ProjectsSection />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
