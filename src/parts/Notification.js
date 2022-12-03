import React from "react";

const Notifications = (props) => {
  const status = props.status;
  const message = props.message;
  const visible = status === undefined ? "hidden" : "visible";
  let displayMessage = status ? status.toUpperCase() : undefined;
  displayMessage += ":\n" + message;

  return <span className={`notif ${visible} ${status}`}>{displayMessage}</span>;
};

export default Notifications;
