
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// Generate a random captcha string
const generateCaptcha = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  return captcha;
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and conditions to register.",
        variant: "destructive",
      });
      return;
    }
    
    if (userCaptcha !== captcha) {
      toast({
        title: "Invalid Captcha",
        description: "The captcha you entered is incorrect. Please try again.",
        variant: "destructive",
      });
      refreshCaptcha();
      return;
    }

    setIsLoading(true);

    try {
      // This is just a placeholder for actual registration logic
      // In a real app, this would make an API call to your backend
      console.log("Registering with", { firstName, lastName, email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in to your account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      name="last-name"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Captcha */}
                <div>
                  <Label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                    Enter the code below
                  </Label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="bg-gray-200 px-4 py-2 rounded-md font-mono text-lg tracking-wider">
                      {captcha}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={refreshCaptcha}
                    >
                      Refresh
                    </Button>
                  </div>
                  <Input
                    id="captcha"
                    name="captcha"
                    type="text"
                    required
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    className="mt-2"
                    placeholder="Type the code above"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms} 
                    onCheckedChange={() => setAcceptTerms(!acceptTerms)} 
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <div
            className="absolute inset-4 h-2048 w-2048  bg-center "
            style={{ backgroundImage: "url('/loginimage.avif')" }}
          />
        </div>
      </div>
  );
};

export default Register;
