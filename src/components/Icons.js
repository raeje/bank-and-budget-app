import React from "react";

const Icons = (props) => {
  const name = props.name;
  let icon = undefined;

  if (name === "profile") {
    icon = <i className="fa-solid fa-user"></i>;
  }

  if (name === "deposit") {
    icon = <i className="fa-solid fa-piggy-bank"></i>;
  }

  if (name === "withdraw") {
    icon = <i className="fa-solid fa-money-bill"></i>;
  }

  if (name === "transfer") {
    icon = <i className="fa-solid fa-money-bill-transfer"></i>;
  }

  if (name === "budget") {
    icon = <i className="fa-sharp fa-solid fa-file-invoice-dollar"></i>;
  }

  if (name === "logout") {
    icon = <i className="fa-solid fa-right-from-bracket"></i>;
  }

  return icon;
};

export default Icons;
