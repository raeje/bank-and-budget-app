import React from "react";
import { NavLink } from "react-router-dom";
import "./Tab.css";
import { Icons } from "../components";

const Tab = (props) => {
  const destination = (icon) => {
    if (icon !== "logout") return `/dashboard/${icon}`;
    return "/home";
  };
  return (
    <NavLink
      to={destination(props.icon)}
      className={props.icon + "-btn tab container"}
      id={props.icon}
      onClick={props.onClick}
      style={{ textDecoration: "none" }}
    >
      <Icons name={props.icon} />
      {props.text}
    </NavLink>
  );
};

export default Tab;
