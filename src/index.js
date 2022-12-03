import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Home, Dashboard } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
