import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navigation from './pages/navigation';

import Landing from './pages/landing';
import Registration from './pages/register';
import Login from './pages/login';

import ErrorPage from './error-page';

import './styles/index.css'
import Units from './pages/units';
import Calculator from './pages/calculator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        // default
        index: true,
        element: <Landing />,
      },
      {
        path: "home",
        element: <Landing />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
      {
        path: "units",
        element: <Units />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
