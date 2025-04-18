
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type User = {
  id?: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Demo authentication check
  const checkAuth = async () => {
    setLoading(true);
    try {
      // Check if we have a user in local storage
      const storedUser = localStorage.getItem('runcash_user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Authentication check error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Demo authentication
      if (email === 'demo@example.com' && password === 'demo123456') {
        const user = { id: 'demo-id', email };
        setUser(user);
        localStorage.setItem('runcash_user', JSON.stringify(user));
        toast.success('Login bem-sucedido!');
        return { error: null };
      }
      
      // Simulate sign in delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For now, just accept any valid email/password
      if (email && password.length >= 6) {
        const user = { id: 'user-' + Date.now(), email };
        setUser(user);
        localStorage.setItem('runcash_user', JSON.stringify(user));
        toast.success('Login bem-sucedido!');
        return { error: null };
      }
      
      toast.error('Credenciais inválidas');
      return { error: 'Credenciais inválidas' };
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Erro ao fazer login');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate sign up delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For now, just accept any valid email/password
      if (email && password.length >= 6) {
        const user = { id: 'user-' + Date.now(), email };
        setUser(user);
        localStorage.setItem('runcash_user', JSON.stringify(user));
        toast.success('Conta criada com sucesso!');
        return { error: null };
      }
      
      toast.error('Email ou senha inválidos');
      return { error: 'Email ou senha inválidos' };
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Erro ao criar conta');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('runcash_user');
    toast.success('Logout realizado com sucesso');
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    
    try {
      // In this demo, we'll just create a mock Google user
      const mockGoogleUser = { id: 'google-user-' + Date.now(), email: 'google-user@example.com' };
      setUser(mockGoogleUser);
      localStorage.setItem('runcash_user', JSON.stringify(mockGoogleUser));
      toast.success('Login com Google realizado com sucesso!');
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Erro ao fazer login com Google');
    } finally {
      setLoading(false);
    }
  };

  // Sign in with GitHub
  const signInWithGitHub = async () => {
    setLoading(true);
    
    try {
      // In this demo, we'll just create a mock GitHub user
      const mockGitHubUser = { id: 'github-user-' + Date.now(), email: 'github-user@example.com' };
      setUser(mockGitHubUser);
      localStorage.setItem('runcash_user', JSON.stringify(mockGitHubUser));
      toast.success('Login com GitHub realizado com sucesso!');
    } catch (error) {
      console.error('GitHub sign in error:', error);
      toast.error('Erro ao fazer login com GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        signInWithGitHub,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
