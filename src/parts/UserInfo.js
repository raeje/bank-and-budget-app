import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  const customer = props.customer ? props.customer : "";

  if (!customer) {
    return "";
  }

  /*
  const displayInfo = (() => {
    let info = (
      <>
        <span className="field-name">First Name: </span>
        <span className="field-value">{customer.fName}</span>

        <span className="field-name">Last Name: </span>
        <span className="field-value">{customer.lName}</span>

        <span className="field-name">Username: </span>
        <span className="field-value">{customer.username}</span>
      </>
    );
    if (!props.transactionType) {
      info += (
        <>
          <span className="field-name">Mobile: </span>
          <span className="field-value">{customer.mobileNum}</span>

          <span className="field-name">Role: </span>
          <span className="field-value">{customer.role}</span>
        </>
      );
    }
    return info;
  })();
  */

  const additionalInfo = (() => {
    if (props.transactionType) {
      return;
    }
    return (
      <>
        <span className="field-name">Mobile: </span>
        <span className="field-value">{customer.mobileNum}</span>

        <span className="field-name">Role: </span>
        <span className="field-value">{customer.role}</span>
      </>
    );
  })();

  const displayInfo = (
    <>
      <span className="field-name">First Name: </span>
      <span className="field-value">{customer.fName}</span>
      <span className="field-name">Last Name: </span>
      <span className="field-value">{customer.lName}</span>
      <span className="field-name">Username: </span>
      <span className="field-value">{customer.username}</span>{additionalInfo}
    </>
  );

  /*
  if (customer) {
    info = (
      <div className="user-info-container">
        <span className="field-name">First Name: </span>
        <span className="field-value">{customer.fName}</span>

        <span className="field-name">Last Name: </span>
        <span className="field-value">{customer.lName}</span>

        <span className="field-name">Username: </span>
        <span className="field-value">{customer.username}</span>

        <span className="field-name">Mobile: </span>
        <span className="field-value">{customer.mobileNum}</span>

        <span className="field-name">Role: </span>
        <span className="field-value">{customer.role}</span>
      </div>
    );
  }
  */

  return <div className="user-info-container">{displayInfo}</div>;
};

export default UserInfo;
