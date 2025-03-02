
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Collaboration from "./pages/Collaboration";
import Kanban from "./pages/Kanban";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
