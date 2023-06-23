import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Calendar, Forum, Home, Login, Logout, Profil, Recipe, Settings, Signup } from './Views';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },{
    path: "/Login",
    element: <Login></Login>,
  },{
    path: "/Signup",
    element: <Signup></Signup>,
  },{
    path: "/Calendar",
    element: <Calendar></Calendar>,
  },{
    path: "/Recipe",
    element: <Recipe></Recipe>,
  },{
    path: "/Forum",
    element: <Forum></Forum>,
  },{
    path: "/Logout",
    element: <Logout></Logout>,
  },{
    path: "/Settings",
    element: <Settings></Settings>,
  },{
    path: "/Profil",
    element: <Profil></Profil>,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);