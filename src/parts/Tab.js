import React from "react";
import "./Tab.css";
import { Icons } from "../components";

const Tab = (props) => {
  return (
    <div
      className={props.icon + "-btn tab container"}
      onClick={props.onClick}
      id={props.icon}
    >
      <Icons name={props.icon} />
      {props.text}
    </div>
  );
};

export default Tab;
