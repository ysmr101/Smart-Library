import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { fetchToken, postUser } from '../services/api';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getUserInfo: () => UserInfo | null;
}
interface UserInfo {
    user_id: string;
    username: string;
    role: string;
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        logout();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (username: string, password: string) => {

      const response = await fetchToken(username, password);
      if (response.access_token) {
        const accessToken = response.access_token;
        setToken(accessToken);
        localStorage.setItem('authToken', accessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
  };

  const signup = async (username: string, password: string) => {
      await postUser(username, password);
      await login(username, password);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/';
  };

  const getUserInfo = (): UserInfo | null => {
    if (token) {
      const decoded: any = jwtDecode(token);
      return {
        user_id: decoded.user_id,
        username: decoded.sub,
        role: decoded.role, 
      };
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, getUserInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
