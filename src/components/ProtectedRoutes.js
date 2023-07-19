import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return token !== null; 
};

const ProtectedRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    if (!isAuth) {
      navigate('/login'); 
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
