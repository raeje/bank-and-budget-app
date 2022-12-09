import React, { useEffect } from "react";
import "./TopNav.css";
import data from "../data/users.json";
import budget from "../data/budget.json";
import theme from "../data/theme.json";
import { LoadData, ClearData, ChangeTheme } from "../components/";
import { getSavedTheme, updateLocalStorage } from "../utils";

const handleLoadUsers = () => {
  LoadData("users", data);
  LoadData("budget", budget);
  LoadData("darkTheme", theme);
};

const handleClearData = () => {
  ClearData();
};

function TopNav(props) {
  const savedTheme = getSavedTheme();
  ChangeTheme(savedTheme);

  useEffect(() => {
    document.querySelector("#switch").checked = !savedTheme;
  });

  const handleSwitchChange = (e) => {
    const isChecked = e.target.checked;
    updateLocalStorage("darkTheme", !isChecked);
    ChangeTheme(!isChecked);
  };

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
