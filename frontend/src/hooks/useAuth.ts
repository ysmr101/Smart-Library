import { useState, useEffect } from 'react';

interface AuthData {
  token: string;
  role: string;
}

export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    if (storedToken && storedRole) {
      setAuthData({ token: storedToken, role: storedRole });
    }
  }, []);


  const login = (token: string, role: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setAuthData({ token, role });
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setAuthData(null);
  };


  const getRole = () => authData?.role;

  return { authData, login, logout, getRole };
};
