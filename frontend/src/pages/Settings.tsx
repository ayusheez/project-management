
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("user@example.com");
  const [fullName, setFullName] = useState("John Doe");
  const [role, setRole] = useState("member");
  const [timeZone, setTimeZone] = useState("UTC");
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleAvatarUpload = () => {
    toast.info("Avatar upload functionality would be implemented here");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 px-4 md:px-8 py-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="glass-card p-6 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-2 ring-cyan-500/20">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-cyan-500/10 text-lg">
                  {fullName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 rounded-full hover:bg-cyan-500/10 hover:border-cyan-500"
                onClick={handleAvatarUpload}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-6 flex-1 w-full">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-white">Full Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-black/50 border-cyan-500/20 focus:border-cyan-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/50 border-cyan-500/20 focus:border-cyan-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger className="bg-black/50 border-cyan-500/20 w-full md:max-w-sm">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Role Management */}
        <Card className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Team & Permissions</h2>
          <div className="space-y-2">
            <Label className="text-white">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-black/50 border-cyan-500/20 w-full md:max-w-sm">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="member">Team Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-cyan-500/80">
              Your role determines what actions you can perform in the system
            </p>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-white">Email Notifications</Label>
                <p className="text-sm text-cyan-500/80">
                  Receive email notifications about your projects
                </p>
              </div>
              <Switch 
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-white">Dark Mode</Label>
                <p className="text-sm text-cyan-500/80">
                  Toggle dark mode appearance
                </p>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
