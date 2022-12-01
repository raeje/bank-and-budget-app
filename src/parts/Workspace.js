import React, { useState, useEffect } from "react";
import "./Workspace.css";
import { Transaction } from "../components";

const Workspace = ({ activeTab }) => {
  const [type, setType] = useState();

  useEffect(() => {
    setType(activeTab);
  }, [activeTab]);

  return (
    <div className="workspace container glass">
      <span className="workspace-title">{type}</span>
      <Transaction type={type} />
    </div>
  );
};

export default Workspace;
