import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/user/Dashboard';
import LandingPage from "./components/user/LandingPage";
import Login from "./components/user/Login";

function App() {

  return (
    <LandingPage />
  );
}

export default App;
