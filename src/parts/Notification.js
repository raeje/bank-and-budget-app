import React from "react";

const Notifications = (props) => {
  const status = props.status;
  const message = props.message;
  const visible = status === undefined ? "hidden" : "visible";

  return <span className={`notif ${visible} ${status}`}>{message}</span>;
};

export default Notifications;
