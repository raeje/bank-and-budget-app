import React, { useState } from "react";
import "./Dashboard.css";
import { TopNav, DashboardBody, Sidebar, Tabs, Tab, Workspace } from "../parts";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, getUserTabs } from "../utils";
import { Logout } from "../components";

const Dashboard = (props) => {
  const { state } = useLocation();
  const user = state ? state : getCurrentUser();
  const [activeTab, setActiveTab] = useState();

  const handleTabClick = (tab) => {
    console.log("clicked", tab.target.id);
    setActiveTab(tab.target.id);
  };

  const tabs = getUserTabs();
  const renderTabs = (tabs) => {
    return tabs.map((tab) => {
      return (
        <li key={tab.icon}>
          <Tab
            icon={tab.icon}
            text={tab.text}
            onClick={(icon) => handleTabClick(icon)}
          />
        </li>
      );
    });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    Logout({ username: user.username });
    navigate("/home", { replace: true });
  };

  return (
    <div className="dashboard-container">
      <TopNav name="IBB" />
      <DashboardBody>
        <Sidebar>
          <h3>
            Hello,{" "}
            <span className="fullname">
              {user.fName} {user.lName}
            </span>
            !
          </h3>
          <Tabs>{renderTabs(tabs)}</Tabs>
          <Tab icon="logout" text="Logout" onClick={handleLogout} />
        </Sidebar>
        <Workspace activeTab={activeTab} />
      </DashboardBody>

      <section className="dash-main"></section>
      <section className="dash-footer"></section>
    </div>
  );
};

export default Dashboard;
