import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

interface AdminProtectedRouteProps {
  component: React.ComponentType<any>;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.role.includes('Admin')) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default AdminProtectedRoute;
