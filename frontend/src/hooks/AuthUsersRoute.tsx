import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ClipLoader from 'react-spinners/ClipLoader';
const AuthUsersRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ children, requiredRole }) => {
  const { authData, getRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [authData]);

  if (loading) {
    return (
      <div className="spinner flex justify-center items-center h-full">
        <ClipLoader size={100} color={'#ffffff'} />
      </div>
    );}

    if (authData) {
        return <Navigate to="/" replace/>;
    }

  return <>{children}</>;
};

export default AuthUsersRoute;


