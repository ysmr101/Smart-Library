import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth';

interface UnAuthinticatedRoute {
  component: React.ComponentType<any>;
}

const UnAuthinticatedRoute: React.FC<UnAuthinticatedRoute> = ({ component: Component, ...rest }) => {
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo();
  if (userInfo) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default UnAuthinticatedRoute;
