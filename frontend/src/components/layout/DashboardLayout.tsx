
import { 
  SidebarProvider, Sidebar, SidebarContent, SidebarGroup, 
  SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton 
} from "@/components/ui/sidebar";
import { 
  Bell, LayoutDashboard, FileText, Users, Calendar, 
  Settings, LogOut, Search, User, BarChart2, MessageSquare, 
  CheckSquare, Home, PieChart
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { createContext, useContext, useState } from "react";

export const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSignOut = () => {
    console.log("User signed out");
    navigate("/login");
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Home">
                        <Link to="/" className={location.pathname === "/" ? "text-cyan-500" : ""}>
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Projects">
                        <Link to="/projects" className={location.pathname === "/projects" ? "text-cyan-500" : ""}>
                          <FileText className="h-4 w-4" />
                          <span>Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                   
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Reports">
                        <Link to="/reports" className={location.pathname === "/reports" ? "text-cyan-500" : ""}>
                          <PieChart className="h-4 w-4" />
                          <span>Reports</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Team">
                        <Link to="/team" className={location.pathname === "/team" ? "text-cyan-500" : ""}>
                          <Users className="h-4 w-4" />
                          <span>Team</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Calendar">
                        <Link to="/calendar" className={location.pathname === "/calendar" ? "text-cyan-500" : ""}>
                          <Calendar className="h-4 w-4" />
                          <span>Calendar</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Collaboration">
                        <Link to="/collaboration" className={location.pathname === "/collaboration" ? "text-cyan-500" : ""}>
                          <MessageSquare className="h-4 w-4" />
                          <span>Collaboration</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                   
                     
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltipContent="Settings">
                        <Link to="/settings" className={location.pathname === "/settings" ? "text-cyan-500" : ""}>
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full" onClick={handleSignOut} tooltipContent="Sign Out">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1">
            <header className="w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-8">
                  <h1 className="text-xl font-bold text-cyan-500">[task-Galaxy]</h1>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-8 bg-black/50 border-cyan-500/20"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link to="/notifications" className="p-2 hover:bg-cyan-500/10 rounded-full relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
                  </Link>
                  <Link to="/profile" className="p-2 hover:bg-cyan-500/10 rounded-full">
                    <User className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </header>
            <main className="p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SearchContext.Provider>
  );
}
