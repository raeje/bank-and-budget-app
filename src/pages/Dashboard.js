import React from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils";

const Dashboard = (props) => {
  const { state } = useLocation();
  const user = state ? state : getCurrentUser();
  console.log(user);

  //const user = props.username;
  return (
    <div className="dashboard-container">
      <h1>
        Welcome {user.fName} {user.lName}!
      </h1>
      <section className="dash-sidebar"></section>
      <section className="dash-main"></section>
      <section className="dash-footer"></section>
    </div>
  );
};

export default Dashboard;
