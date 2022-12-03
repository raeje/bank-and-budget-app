import React, { useState, useEffect } from "react";
import "./Workspace.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Transaction } from "../components";

const Workspace = ({ activeTab = "deposit" }) => {
  const [type, setType] = useState();

  useEffect(() => {
    setType(activeTab);
  }, [activeTab]);

  return (
    <div className="workspace container glass">
      <span className="workspace-title">{type}</span>
      <Transaction type={activeTab} />
    </div>
  );
};

export default Workspace;
