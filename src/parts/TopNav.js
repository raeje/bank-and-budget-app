import React, { useEffect, useState } from "react";
import "./TopNav.css";
import data from "../data/users.json";
import budget from "../data/budget.json";
import { LoadData, ClearData, ChangeTheme } from "../components/";

const handleLoadUsers = () => {
  LoadData("users", data);
  LoadData("budget", budget);
};

const handleClearData = () => {
  ClearData();
};

function TopNav(props) {
  const [theme, setTheme] = useState();

  const handleSwitchChange = (e) => {
    console.log("switch", e.target.checked);
    const isChecked = e.target.checked;
    setTheme(isChecked);
    ChangeTheme(theme);
  };

  useEffect(() => {
    //console.log("theme", theme);
    //ChangeTheme(theme);
  });

  return (
    <div className="main">
      <span className="abbr">{props.name}</span>
      <div className="load-clear-container">
        <button
          type="button"
          className="btn-load-data"
          onClick={handleLoadUsers}
        >
          Load Data
        </button>
        <button
          type="button"
          className="btn-clear-data"
          onClick={handleClearData}
        >
          Clear Data
        </button>
        <div className="switch-container">
          <input
            type="checkbox"
            id="switch"
            onChange={(e) => handleSwitchChange(e)}
          />
          <label htmlFor="switch">Toggle</label>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
