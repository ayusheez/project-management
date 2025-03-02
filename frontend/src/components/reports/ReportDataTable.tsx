
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReportDataTableProps {
  type: "projects" | "tasks" | "time";
}

export function ReportDataTable({ type }: ReportDataTableProps) {
  // Different mock data based on the report type
  const renderData = () => {
    switch (type) {
      case "projects":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableHeader>Project Name</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Start Date</TableHeader>
                <TableHeader>Due Date</TableHeader>
                <TableHeader className="text-right">Progress</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Website Redesign</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>Feb 10, 2023</TableCell>
                <TableCell>Mar 15, 2023</TableCell>
                <TableCell className="text-right">75%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mobile App Development</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>Jan 15, 2023</TableCell>
                <TableCell>Apr 20, 2023</TableCell>
                <TableCell className="text-right">45%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marketing Campaign</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell>Jan 05, 2023</TableCell>
                <TableCell>Feb 28, 2023</TableCell>
                <TableCell className="text-right">100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Database Migration</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none">
                    On Hold
                  </Badge>
                </TableCell>
                <TableCell>Mar 01, 2023</TableCell>
                <TableCell>Jun 15, 2023</TableCell>
                <TableCell className="text-right">10%</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "tasks":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableHeader>Task Name</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Project</TableHeader>
                <TableHeader>Assigned To</TableHeader>
                <TableHeader className="text-right">Due Date</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Design homepage mockup</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none">
                    Done
                  </Badge>
                </TableCell>
                <TableCell>Website Redesign</TableCell>
                <TableCell>Sarah Johnson</TableCell>
                <TableCell className="text-right">Feb 15</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Implement responsive navigation</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
                    In Progress
                  </Badge>
                </TableCell>
                <TableCell>Website Redesign</TableCell>
                <TableCell>Michael Brown</TableCell>
                <TableCell className="text-right">Feb 28</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Create content management system</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none">
                    In Progress
                  </Badge>
                </TableCell>
                <TableCell>Website Redesign</TableCell>
                <TableCell>Emma Wilson</TableCell>
                <TableCell className="text-right">Mar 5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">QA testing and bug fixes</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-none">
                    To-Do
                  </Badge>
                </TableCell>
                <TableCell>Website Redesign</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell className="text-right">Mar 10</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      case "time":
        return (
          <>
            <TableHead>
              <TableRow>
                <TableHeader>Project</TableHeader>
                <TableHeader>Task</TableHeader>
                <TableHeader>Team Member</TableHeader>
                <TableHeader className="text-right">Hours</TableHeader>
                <TableHeader className="text-right">Date</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Website Redesign</TableCell>
                <TableCell>Design homepage mockup</TableCell>
                <TableCell>Sarah Johnson</TableCell>
                <TableCell className="text-right">8</TableCell>
                <TableCell className="text-right">Feb 12, 2023</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Website Redesign</TableCell>
                <TableCell>Implement responsive navigation</TableCell>
                <TableCell>Michael Brown</TableCell>
                <TableCell className="text-right">6</TableCell>
                <TableCell className="text-right">Feb 15, 2023</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mobile App</TableCell>
                <TableCell>User authentication</TableCell>
                <TableCell>Emma Wilson</TableCell>
                <TableCell className="text-right">10</TableCell>
                <TableCell className="text-right">Feb 10, 2023</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Database Migration</TableCell>
                <TableCell>Initial setup</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell className="text-right">4</TableCell>
                <TableCell className="text-right">Mar 02, 2023</TableCell>
              </TableRow>
            </TableBody>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>{renderData()}</Table>
    </div>
  );
}
