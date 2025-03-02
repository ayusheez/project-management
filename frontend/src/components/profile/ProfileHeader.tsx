
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Mail, UserRound, Briefcase } from "lucide-react";
import { toast } from "sonner";

export function ProfileHeader() {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Project Manager",
    avatar: "/placeholder.svg"
  });

  const handleAvatarUpload = () => {
    toast.info("Avatar upload functionality would be implemented here");
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-40 md:h-60 rounded-t-lg overflow-hidden bg-gradient-to-r from-cyan-950 to-cyan-900/70">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay bg-repeat" />
      </div>
      
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row gap-6 p-6 -mt-16 md:-mt-20 relative z-10">
        <div className="relative">
          <Avatar className="h-28 w-28 md:h-36 md:w-36 border-4 border-background ring-2 ring-cyan-500/20 shadow-xl">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-cyan-950 text-cyan-200 text-3xl">
              {user.name.split(" ").map(n => n[0]).join("")}
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
        
        <div className="mt-6 md:mt-14 space-y-1">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Mail className="h-4 w-4 text-cyan-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Briefcase className="h-4 w-4 text-cyan-500" />
              <span>{user.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
