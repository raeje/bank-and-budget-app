import React from "react";
import { Link } from "react-router-dom";
import "./Tab.css";
import { Icons } from "../components";

const Tab = (props) => {
  const destination = (icon) => {
    if (icon !== "logout") return `/dashboard/${icon}`;
    return "/home";
  };
  return (
    <Link
      to={destination(props.icon)}
      className={props.icon + "-btn tab container"}
      id={props.icon}
      onClick={props.onClick}
    >
      <Icons name={props.icon} />
      {props.text}
    </Link>
  );
};

export default Tab;
