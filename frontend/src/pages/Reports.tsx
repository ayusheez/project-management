
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart2, Calendar, Download, FileText, PieChart, File, FileDown } from "lucide-react";
import { ProjectProgressChart } from "@/components/reports/ProjectProgressChart";
import { TaskCompletionStats } from "@/components/reports/TaskCompletionStats";
import { ReportDataTable } from "@/components/reports/ReportDataTable";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export default function Reports() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: "pdf" | "csv", reportType: string) => {
    setIsExporting(true);
    
    // Simulate export loading time
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`${reportType} report exported as ${type.toUpperCase()}`, {
        description: `Your report has been successfully exported.`,
      });
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Exports</h1>
          <p className="text-muted-foreground mt-2">Generate and export project reports and statistics</p>
        </div>

        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="summary">
              <FileText className="h-4 w-4 mr-2" />
              Project Summary
            </TabsTrigger>
            <TabsTrigger value="task-stats">
              <PieChart className="h-4 w-4 mr-2" />
              Task Statistics
            </TabsTrigger>
            <TabsTrigger value="time-reports">
              <Calendar className="h-4 w-4 mr-2" />
              Time Reports
            </TabsTrigger>
          </TabsList>

          {/* Project Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Project Progress Overview
                  </CardTitle>
                  <CardDescription>
                    Progress of your active projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectProgressChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects Status</CardTitle>
                  <CardDescription>
                    Status of your most recent projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Website Redesign</span>
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mobile App Development</span>
                      <span className="text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database Migration</span>
                      <span className="text-muted-foreground">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Marketing Campaign</span>
                      <span className="text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Project Summary Report</CardTitle>
                  <CardDescription>
                    Export detailed project summary reports
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport("csv", "Project Summary")}
                    disabled={isExporting}
                  >
                    <File className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export CSV"}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleExport("pdf", "Project Summary")}
                    disabled={isExporting}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export PDF"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportDataTable type="projects" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Task Statistics Tab */}
          <TabsContent value="task-stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-4 w-4 mr-2" />
                    Task Status Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of tasks by current status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskCompletionStats />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Metrics</CardTitle>
                  <CardDescription>
                    Key task statistics and metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          Completed Tasks
                        </div>
                        <div className="text-2xl font-bold">24</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          In Progress
                        </div>
                        <div className="text-2xl font-bold">13</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          Pending Tasks
                        </div>
                        <div className="text-2xl font-bold">8</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          Completion Rate
                        </div>
                        <div className="text-2xl font-bold">76%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Task Statistics Report</CardTitle>
                  <CardDescription>
                    Export detailed task completion statistics
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport("csv", "Task Statistics")}
                    disabled={isExporting}
                  >
                    <File className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export CSV"}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleExport("pdf", "Task Statistics")}
                    disabled={isExporting}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export PDF"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportDataTable type="tasks" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Reports Tab */}
          <TabsContent value="time-reports" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2" />
                    Weekly Time Distribution
                  </CardTitle>
                  <CardDescription>
                    Time spent on projects per day
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-muted-foreground">Weekly time tracking chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Tracking Summary</CardTitle>
                  <CardDescription>
                    Hours logged by project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Website Redesign</span>
                        <span className="text-muted-foreground">42 hrs</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mobile App Development</span>
                        <span className="text-muted-foreground">28 hrs</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Database Migration</span>
                        <span className="text-muted-foreground">12 hrs</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Marketing Campaign</span>
                        <span className="text-muted-foreground">18 hrs</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Time Tracking Report</CardTitle>
                  <CardDescription>
                    Export detailed time tracking data
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleExport("csv", "Time Tracking")}
                    disabled={isExporting}
                  >
                    <File className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export CSV"}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleExport("pdf", "Time Tracking")}
                    disabled={isExporting}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export PDF"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportDataTable type="time" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
