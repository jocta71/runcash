
import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Define user type
interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  signInWithGoogle: async () => {},
  signInWithGitHub: async () => {},
});

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, fetch from API or Supabase
  const mockUsers = [
    {
      id: '1',
      email: 'demo@example.com',
      password: 'demo123456',
      name: 'Demo User',
      avatar_url: 'https://ui-avatars.com/api/?name=Demo+User',
    },
    {
      id: '2',
      email: 'user@example.com',
      password: 'password123',
      name: 'Test User',
      avatar_url: 'https://ui-avatars.com/api/?name=Test+User',
    },
  ];

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - replace with actual auth logic
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        toast({
          title: "Invalid credentials",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return { error: 'Invalid email or password' };
      }

      // Create a user object without the password
      const authenticatedUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar_url: foundUser.avatar_url,
      };

      // Store user in state and localStorage
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      toast({
        title: "Success",
        description: "Successfully logged in"
      });
      
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive"
      });
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      // Check if user already exists
      const userExists = mockUsers.some((u) => u.email === email);
      if (userExists) {
        toast({
          title: "Error",
          description: "User already exists",
          variant: "destructive"
        });
        return { error: 'User already exists' };
      }

      // In a real app, this would create a user in your database
      // Here, we'll just simulate success
      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account."
      });
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive"
      });
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Success",
      description: "Logged out successfully"
    });
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      // Mock Google authentication
      const googleUser = {
        id: 'google-123',
        email: 'google-user@example.com',
        name: 'Google User',
        avatar_url: 'https://ui-avatars.com/api/?name=Google+User',
      };

      setUser(googleUser);
      localStorage.setItem('user', JSON.stringify(googleUser));
      toast({
        title: "Success",
        description: "Logged in with Google"
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Error",
        description: "Failed to log in with Google",
        variant: "destructive"
      });
    }
  };

  // Sign in with GitHub
  const signInWithGitHub = async () => {
    try {
      // Mock GitHub authentication
      const githubUser = {
        id: 'github-123',
        email: 'github-user@example.com',
        name: 'GitHub User',
        avatar_url: 'https://ui-avatars.com/api/?name=GitHub+User',
      };

      setUser(githubUser);
      localStorage.setItem('user', JSON.stringify(githubUser));
      toast({
        title: "Success",
        description: "Logged in with GitHub"
      });
    } catch (error) {
      console.error('GitHub sign in error:', error);
      toast({
        title: "Error",
        description: "Failed to log in with GitHub",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithGitHub,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
