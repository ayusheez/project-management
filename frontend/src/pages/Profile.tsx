
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { ActivitySummary } from "@/components/profile/ActivitySummary";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-fade-in">
        <ProfileHeader />
        
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-black/30 p-1 border border-cyan-500/20">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
            >
              Activity
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="connected" 
              className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-500"
            >
              Connections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileInfo />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <ActivitySummary />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="connected" className="space-y-4">
            <ConnectedAccounts />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
