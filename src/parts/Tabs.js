import React from "react";
import "./Tabs.css";

const Tabs = (props) => {
  return <div className="tabs container">{props.children}</div>;
};

export default Tabs;
