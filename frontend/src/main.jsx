import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./pages/navigation";

import Landing from "./pages/landing";
import Registration from "./pages/register";
import Login from "./pages/login";

import ErrorPage from "./error-page";

import "./styles/main.css";
import Calculator from "./pages/calculator";
import About from "./pages/about";
import Listing from "./pages/listing";

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
        path: "listing",
        element: <Listing />,
      },
      {
        path: "about",
        element: <About />,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
