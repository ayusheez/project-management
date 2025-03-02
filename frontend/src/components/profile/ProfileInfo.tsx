
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, UserRound, AtSign, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProfileInfo() {
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Project Manager with 5+ years of experience in agile development and team leadership. Passionate about optimizing workflows and delivering high-quality projects on time.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    department: "Engineering",
    timeZone: "PST",
    language: "English"
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Profile information updated successfully!");
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-950 to-transparent">
        <CardTitle className="text-white flex items-center gap-2">
          <UserRound className="h-5 w-5 text-cyan-500" />
          Profile Information
        </CardTitle>
        <CardDescription className="text-cyan-500/80">
          Update your personal details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="bg-black/50 border-cyan-500/20 focus:border-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-black/50 border-cyan-500/20 focus:border-cyan-500"
              disabled
            />
            <p className="text-xs text-cyan-500/80">Contact admin to change email address</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-white">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="bg-black/50 border-cyan-500/20 focus:border-cyan-500 min-h-24"
            placeholder="Write a short bio about yourself"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="bg-black/50 border-cyan-500/20 focus:border-cyan-500 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-white">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="bg-black/50 border-cyan-500/20 focus:border-cyan-500 pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="department" className="text-white">Department</Label>
            <Select 
              value={formData.department} 
              onValueChange={(value) => handleChange("department", value)}
            >
              <SelectTrigger id="department" className="w-full bg-black/50 border-cyan-500/20">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeZone" className="text-white">Time Zone</Label>
            <Select 
              value={formData.timeZone} 
              onValueChange={(value) => handleChange("timeZone", value)}
            >
              <SelectTrigger id="timeZone" className="w-full bg-black/50 border-cyan-500/20">
                <SelectValue placeholder="Select time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="MST">Mountain Standard Time (MST)</SelectItem>
                <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language" className="text-white">Preferred Language</Label>
          <Select 
            value={formData.language} 
            onValueChange={(value) => handleChange("language", value)}
          >
            <SelectTrigger id="language" className="w-full md:max-w-sm bg-black/50 border-cyan-500/20">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Spanish</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
              <SelectItem value="Chinese">Chinese</SelectItem>
              <SelectItem value="Japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
