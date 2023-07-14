import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return token !== null; 
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  if (!isAuth) {
    navigate('/login'); 
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoutes;



