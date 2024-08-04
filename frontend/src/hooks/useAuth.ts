// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface AuthData {
  token: string;
  role: string;
}

export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  // Check if there's a token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setAuthData({ token: storedToken, role: storedRole });
    }
  }, []);

  // Function to log in the user
  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuthData({ token, role });
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthData(null);
  };

  // Function to get the current role
  const getRole = () => authData?.role;

  return { authData, login, logout, getRole };
};
