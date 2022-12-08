import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import { TopNav, DashboardBody, Sidebar, Tabs, Tab } from "../parts";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserTabs } from "../utils";
import { Logout } from "../components";

const Dashboard = ({ defaultTab = "profile" }) => {
  const childURL = window.location.pathname.match(/.+\/(.*$)/)[1];
  const workspaceClassName = `workspace container glass ${childURL}`;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [workspace, setWorkspace] = useState();
  const currentUser = getCurrentUser();
  const tabs = getUserTabs(currentUser);

  console.log("url", childURL);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);

  useEffect(() => {
    setWorkspace(workspaceClassName);
    console.log(workspace);
  }, [childURL]);

  const handleLogout = () => {
    Logout({ username: currentUser.username });
    navigate("/home", { replace: true });
    return;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab.target.id);
    //this.forceUpdate();
  };

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

  return (
    <div className="dashboard-container">
      <TopNav name="IBB" />
      <DashboardBody>
        <Sidebar>
          <h3>
            Hello,{" "}
            <span className="fullname">
              {currentUser ? `${currentUser.fName} ${currentUser.lName}` : ""}
            </span>
            !
          </h3>
          <Tabs>{currentUser ? renderTabs(tabs) : ""}</Tabs>
          <Tab icon="logout" text="Logout" onClick={handleLogout} />
        </Sidebar>

        <div className={`${workspace}`}>
          <span className="workspace-title">
            {childURL === "user-management" ? "Manage Users" : childURL}
          </span>
          <Outlet />
        </div>
      </DashboardBody>

      <section className="dash-main"></section>
      <section className="dash-footer"></section>
    </div>
  );
};

export default Dashboard;
