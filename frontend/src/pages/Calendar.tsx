
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CalendarIcon className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Calendar</h2>
          </div>
          <div className="flex justify-center">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-card"
            />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
