
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigateToDashboard = () => {
    if (user?.role === "patient") {
      navigate("/patient-dashboard");
    } else if (user?.role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">EdocHospital</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem onClick={() => navigate("/services/cardiology")}>
                  Cardiology
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/services/neurology")}>
                  Neurology
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/services/pediatrics")}>
                  Pediatrics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/services/orthopedics")}>
                  Orthopedics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                  Locations <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem onClick={() => navigate("/locations/main")}>
                  Main Campus
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/locations/north")}>
                  North Branch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/locations/south")}>
                  South Branch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/doctors" className="text-gray-700 hover:text-blue-600 font-medium">
              Our Doctors
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact Us
            </Link>
          </nav>

          {/* Login/Register or User Profile Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Profile Button */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                    >
                      <User size={16} />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={navigateToDashboard}>Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      if (user?.role === "patient") {
                        navigate("/edit-patient-profile");
                      } else if (user?.role === "doctor") {
                        navigate("/edit-doctor-profile");
                      }
                    }}>Edit Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  onClick={() => navigate("/login")}
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  Log In
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md py-4">
          <nav className="flex flex-col px-4 space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <button 
              className="text-gray-700 hover:text-blue-600 font-medium text-left"
              onClick={() => navigate("/services")}
            >
              Services
            </button>
            <button 
              className="text-gray-700 hover:text-blue-600 font-medium text-left"
              onClick={() => navigate("/locations")}
            >
              Locations
            </button>
            <Link 
              to="/doctors" 
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Doctors
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={() => {
                      navigateToDashboard();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    onClick={() => {
                      if (user?.role === "patient") {
                        navigate("/edit-patient-profile");
                      } else if (user?.role === "doctor") {
                        navigate("/edit-doctor-profile");
                      }
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="destructive"
                    className="justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="justify-start"
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
