import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  type: 'user' | 'admin' | 'both';
  children: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ type, children }) => {
  const user = useSelector(selectUser);

  if (user && (type === 'both' || user.role === type)) return children;

  return <Navigate to='/home' />;
};

export default ProtectedRoute;
