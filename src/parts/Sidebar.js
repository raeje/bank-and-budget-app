import React from "react";
import "./Sidebar.css";

const Sidebar = (props) => {
  return <div className="sidebar-container">{props.children}</div>;
};

export default Sidebar;
