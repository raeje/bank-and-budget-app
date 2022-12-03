import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { TopNav, DashboardBody, Sidebar, Tabs, Tab, Workspace } from "../parts";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, getUserTabs } from "../utils";
import { Logout } from "../components";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState();
  const currentUser = getCurrentUser();
  const tabs = getUserTabs(currentUser);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);

  const handleLogout = () => {
    Logout({ username: currentUser.username });
    navigate("/home", { replace: true });
    return;
  };

  const handleTabClick = (tab) => {
    console.log("clicked", tab.target.id);
    setActiveTab(tab.target.id);
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
        <Workspace activeTab={activeTab} />
      </DashboardBody>

      <section className="dash-main"></section>
      <section className="dash-footer"></section>
    </div>
  );
};

export default Dashboard;
