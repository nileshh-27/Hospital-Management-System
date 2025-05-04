
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import EditPatientProfile from "./pages/EditPatientProfile";
import EditDoctorProfile from "./pages/EditDoctorProfile";

const queryClient = new QueryClient();

// Helper component to determine if header/footer should be shown
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Don't show header/footer on login/register pages
  const shouldShowHeaderFooter = () => {
    const noHeaderFooterPaths = ["/login", "/register"];
    return !noHeaderFooterPaths.includes(location.pathname);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowHeaderFooter() && <Header />}
      <main className="flex-grow">{children}</main>
      {shouldShowHeaderFooter() && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/register" element={<Layout><Register /></Layout>} />
              <Route path="/patient-dashboard" element={<Layout><PatientDashboard /></Layout>} />
              <Route path="/doctor-dashboard" element={<Layout><DoctorDashboard /></Layout>} />
              <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
              <Route path="/book-appointment" element={<Layout><BookAppointment /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/edit-patient-profile" element={<Layout><EditPatientProfile /></Layout>} />
              <Route path="/edit-doctor-profile" element={<Layout><EditDoctorProfile /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
