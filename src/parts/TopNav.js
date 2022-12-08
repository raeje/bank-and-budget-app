import React from "react";
import "./TopNav.css";
import data from "../data/users.json";
import budget from "../data/budget.json";
import { LoadData, ClearData } from "../components/";

const handleLoadUsers = () => {
  LoadData("users", data);
  LoadData("budget", budget);
};

const handleClearData = () => {
  ClearData();
};

function TopNav(props) {
  return (
    <div className="main">
      <span className="abbr">{props.name}</span>
      <div className="load-clear-container">
        <button type="button" className="btn-load-data" onClick={handleLoadUsers}>
          Load Data
        </button>
        <button
          type="button"
          className="btn-clear-data"
          onClick={handleClearData}
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}

export default TopNav;
