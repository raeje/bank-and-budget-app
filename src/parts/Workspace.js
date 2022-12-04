import React, { useState, useEffect } from "react";
import "./Workspace.css";
import { Outlet } from "react-router-dom";

const Workspace = ({ activeTab = "deposit" }) => {
  const [type, setType] = useState();

  useEffect(() => {
    setType(activeTab);
  }, [activeTab]);

  return (
    <div className="workspace container">
      <span className="workspace-title">{type}</span>
      <Outlet />
    </div>
  );
};

export default Workspace;
