import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Income from './components/user/Income';
import Expenses from './components/user/Expenses';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './components/user/Dashboard';
import Task from './components/user/Task';
import CompletedTask from './components/user/CompletedTask';
import ContentPlanner from './components/user/ContentPlanner';
import ScheduledContent from './components/user/ScheduledContent';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import ProtectedRoutes from './components/ProtectedRoutes';
import LandingPage from './components/user/LandingPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<LandingPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<App />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/completedTask" element={<CompletedTask />} />
          <Route path="/contentPlanner" element={<ContentPlanner />} />
          <Route path="/scheduledContent" element={<ScheduledContent />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </Router>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();









