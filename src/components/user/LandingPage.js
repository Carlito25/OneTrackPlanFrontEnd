import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <Link to="/Login">Login</Link>
      <Link to="/Registration">Register</Link>
    </div>
  );
};

export default LandingPage;
