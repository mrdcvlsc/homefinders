import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root';

import Landing from './routes/landing';
import Registration from './routes/register';
import Login from './routes/login';

import ErrorPage from './error-page';

import './styles/index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
