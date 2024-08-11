import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthData {
  token: string;
  role: string;
}

interface AuthContextProps {
  authData: AuthData | null;
  login: (token: string) => void;
  logout: () => void;
  getRole: () => string | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken: any = jwtDecode(storedToken);
      const role = decodedToken.role;
      setAuthData({ token: storedToken, role });
    }
  }, []);

  const login = (token: string) => {
    const decodedToken: any = jwtDecode(token);
    const role = decodedToken.role;
    localStorage.setItem('token', token);
    setAuthData({ token, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthData(null);
  };

  const getRole = () => authData?.role;

  return (
    <AuthContext.Provider value={{ authData, login, logout, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
