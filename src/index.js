import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Income from './components/user/Income';
import Expenses from './components/user/Expenses';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './components/user/Dashboard';
import Task from './components/user/Task';
import CompletedTask from './components/user/CompletedTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/income",
    element: <Income />,
  },
  {
    path: "/expenses",
    element: <Expenses />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Task",
    element: <Task />,
  },
  {
    path: "/CompletedTask",
    element: <CompletedTask />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
