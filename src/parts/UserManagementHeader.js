import React from "react";

const UserManagementHeader = () => {
  const header = [
    "Actions",
    "Account Number",
    "Outstanding Balance",
    "First Name",
    "Last Name",
    "Mobile Number",
    "Username",
    "Password",
    "Role",
  ];

  return header.map((f, index) => {
    return (
      <div className={`header col${index}`} key={`col${index}`}>
        {f}
      </div>
    );
  });
};

export default UserManagementHeader;
