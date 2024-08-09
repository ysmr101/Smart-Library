import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthData {
  token: string;
  role: string;
}

export const useAuth = () => {
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

  return { authData, login, logout, getRole };
};
