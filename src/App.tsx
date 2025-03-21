
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MentorRoute from "./components/MentorRoute";
import Index from "./pages/Index";
import Mentors from "./pages/Mentors";
import Resources from "./pages/Resources";
import Opportunities from "./pages/Opportunities";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile";
import MentorDashboard from "./pages/mentor/Dashboard";
import JobCreate from "./pages/mentor/jobs/JobCreate";
import CourseCreate from "./pages/mentor/courses/CourseCreate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            {/* Mentor Routes */}
            <Route 
              path="/mentor/dashboard" 
              element={
                <MentorRoute>
                  <MentorDashboard />
                </MentorRoute>
              } 
            />
            <Route 
              path="/mentor/jobs/new" 
              element={
                <MentorRoute>
                  <JobCreate />
                </MentorRoute>
              } 
            />
            <Route 
              path="/mentor/courses/new" 
              element={
                <MentorRoute>
                  <CourseCreate />
                </MentorRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
