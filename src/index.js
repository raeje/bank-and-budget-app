import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Home, Dashboard, Transfer, Budget, UserManagement, Profile } from "./routes";
import { Transaction } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile profile="true" />,
      },
      {
        path: "/dashboard/user-management",
        element: <UserManagement />,
      },
      {
        path: "/dashboard/deposit",
        element: <Transaction type="deposit" />,
      },
      {
        path: "/dashboard/withdraw",
        element: <Transaction type="withdraw" />,
      },
      {
        path: "/dashboard/transfer",
        element: <Transfer />,
      },
      {
        path: "/dashboard/budget",
        element: <Budget />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
