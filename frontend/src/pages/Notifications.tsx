
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CalendarClock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type NotificationType = "task" | "update" | "deadline";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "task":
      return <CheckCircle className="h-5 w-5 text-cyan-500" />;
    case "update":
      return <Bell className="h-5 w-5 text-emerald-500" />;
    case "deadline":
      return <CalendarClock className="h-5 w-5 text-orange-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "task":
      return "border-l-4 border-l-cyan-500";
    case "update":
      return "border-l-4 border-l-emerald-500";
    case "deadline":
      return "border-l-4 border-l-orange-500";
    default:
      return "";
  }
};

export default function Notifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "task",
      title: "New Task Assigned",
      description: "You have been assigned to the UI redesign project",
      timestamp: "2 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      type: "update",
      title: "Project Update",
      description: "Backend integration phase completed",
      timestamp: "1 hour ago",
      isRead: false,
    },
    {
      id: "3",
      type: "deadline",
      title: "Upcoming Deadline",
      description: "Project presentation due in 2 days",
      timestamp: "3 hours ago",
      isRead: true,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">
            Stay updated with your tasks, projects, and deadlines
          </p>
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${getNotificationColor(
                notification.type
              )} transition-all hover:bg-black/50 ${
                !notification.isRead ? "bg-black/30" : "bg-black/10"
              }`}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
