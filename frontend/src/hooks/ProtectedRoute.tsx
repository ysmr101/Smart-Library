import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ children, requiredRole }) => {
  const { authData, getRole } = useAuth();
 if (authData === null) {
     return <div className="spinner flex justify-center items-center h-full">
         <ClipLoader size={100} color={'#ffffff'}/>
     </div>;
 }
    if (!authData) {

        return <Navigate to="/login" replace/>;
    }

    if (requiredRole && getRole() !== requiredRole) {
        return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


