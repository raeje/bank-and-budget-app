import React from "react";
import "./UserInfo.css";

const UserInfo = (props) => {
  const customer = props.customer ? props.customer : "";

  if (!customer) {
    return "";
  }

  const accountInfo = (() => {
    if (!props.profile) {
      return;
    }
    return (
      <>
        <span className="field-name acct-num">Account Number: </span>
        <span className="field-value acct-num">{customer.acctNum}</span>

        <span className="field-name balance">Balance: </span>
        <span className="field-value balance">{customer.balance}</span>
      </>
    );
  })();

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
      {accountInfo}
      <span className="field-name">First Name: </span>
      <span className="field-value">{customer.fName}</span>
      <span className="field-name">Last Name: </span>
      <span className="field-value">{customer.lName}</span>
      <span className="field-name">Username: </span>
      <span className="field-value">{customer.username}</span>
      {additionalInfo}
    </>
  );

  return (
    <div className="user-info-container" id={props.profile ? "profile" : ""}>
      {displayInfo}
    </div>
  );
};

export default UserInfo;
