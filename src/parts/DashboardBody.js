import React from "react";
import "./DashboardBody.css";

const DashboardBody = (props) => {
  return (
    <section className="dashboard-body container">{props.children}</section>
  );
};

export default DashboardBody;
