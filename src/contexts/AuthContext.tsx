
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define user types
type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  // Additional properties based on role can be added here
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock users for testing - in a real app, this would come from MongoDB
  const mockUsers = {
    "patient@example.com": {
      id: "P12345678",
      email: "patient@example.com",
      password: "password",
      name: "John Doe",
      role: "patient" as UserRole,
    },
    "doctor@example.com": {
      id: "D12345",
      email: "doctor@example.com",
      password: "password",
      name: "Dr. Maria Rodriguez",
      role: "doctor" as UserRole,
    },
    "admin@example.com": {
      id: "A12345",
      email: "admin@example.com",
      password: "password",
      name: "Admin User",
      role: "admin" as UserRole,
    },
  };

  const login = async (email: string, password: string) => {
    // In a real application, this would be an API call to MongoDB
    console.log("Attempting login with", email, password);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (mockUser && mockUser.password === password) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      // Save to localStorage to persist login across page refreshes
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return;
    }
    
    throw new Error("Invalid email or password");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check for existing login on component mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
