import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Initial check for token
    const token = localStorage.getItem('m2_auth_token');
    if (token) {
      // TODO: Validate token with API
      // Mock validation for now
      setState({
        user: {
          id: '1',
          email: 'admin@m2phenom.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          createdAt: new Date().toISOString(),
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }

    // Listen for unauthorized events from axios
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem('m2_auth_token', token);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('m2_auth_token');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
