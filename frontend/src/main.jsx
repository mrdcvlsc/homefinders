import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./pages/navigation";
import Landing from "./pages/landing";
import Calculator from "./pages/calculator";
import About from "./pages/about";
import Login from "./pages/login";
import Registration from "./pages/register";

import Listing from "./pages/listing";
import PropertyAdd from "./pages/property-add";
import PropertyManage from "./pages/property-manage";

import ErrorPage from "./error-page";

import "./styles/main.css";

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
        path: "add-property",
        element: <PropertyAdd />,
      },
      {
        path: "manage-property",
        element: <PropertyManage />,
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
