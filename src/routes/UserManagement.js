import React, { useEffect, useState } from "react";
import {
  getFilteredUsersList,
  getUsers,
  updateLocalStorage,
  generateAcctNum,
} from "../utils";
import { User } from "../components";

import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState(getUsers());
  const [acctNum, setAcctNum] = useState();
  const [balance, setBalance] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [mobileNum, setMobileNum] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const [modifyState, setModifyState] = useState(false);

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

  const disableAddUserFields = (bool) => {
    const addUserFields = document.querySelectorAll(
      ".add-user-field, .add-actions.save"
    );
    addUserFields.forEach((field) => {
      field.disabled = bool;
    });
  };
  const handleChange = (setter, e) => {
    setter(e.target.value);
  };

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleAdd = () => {
    const acctNum = generateAcctNum();
    document.querySelector(".add-user-field.acctNum").innerHTML = acctNum;

    setModifyState(true);
    setAcctNum(acctNum);
    setRole("customer");
    disableAddUserFields(false);
  };

  const handleSave = () => {
    const newUsers = [
      {
        username: username,
        password: password,
        fName: fName,
        lName: lName,
        balance: balance,
        mobileNum: mobileNum,
        acctNum: acctNum,
        role: role,
        isLoggedIn: false,
      },
      ...users,
    ];
    setUsers(newUsers);
    updateLocalStorage("users", newUsers);
    document.querySelector(".add-user-field.acctNum").innerHTML =
      "auto-generated";

    setAcctNum("auto-generated");
    setModifyState(false);
    disableAddUserFields(true);
  };

  const handleDelete = (acctNum) => {
    const newUsers = users.filter((u) => u.acctNum !== acctNum);
    setUsers(newUsers);
    updateLocalStorage("users", newUsers);
  };

  const renderHeader = () => {
    return header.map((f, index) => {
      return (
        <div className={`header col${index}`} key={`col${index}`}>
          {f}
        </div>
      );
    });
  };

  const renderAddUserField = () => {
    const className = `user-field add-user-field`;
    return (
      <>
        <div className="user-actions-cell">
          <button
            className={`user-actions add add-actions`}
            onClick={handleAdd}
            disabled={modifyState}
          >
            <i className="fa-solid fa-user-plus"></i>
          </button>
          <button
            className={`user-actions save add-actions`}
            onClick={handleSave}
            disabled={!modifyState}
          >
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        </div>
        <div className={`${className} acctNum`}>auto-generated</div>
        <input
          type="number"
          min=".01"
          placeholder="0"
          className={`${className} balance`}
          onChange={(e) => {
            handleChange(setBalance, e);
          }}
          disabled={true}
        ></input>
        <input
          type="text"
          placeholder="John"
          className={`${className} fName`}
          onChange={(e) => {
            handleChange(setFName, e);
          }}
          disabled={true}
        ></input>
        <input
          type="text"
          placeholder="Doe"
          className={`${className} lName`}
          onChange={(e) => {
            handleChange(setLName, e);
          }}
          disabled={true}
        ></input>
        <input
          type="number"
          placeholder="09171231203"
          className={`${className} mobileNum`}
          onChange={(e) => {
            handleChange(setMobileNum, e);
          }}
          disabled={true}
        ></input>
        <input
          type="text"
          placeholder="johnd"
          className={`${className} username`}
          onChange={(e) => {
            handleChange(setUsername, e);
          }}
          disabled={true}
        ></input>
        <input
          type="text"
          placeholder="s3cur3_p@ssw0RD!"
          className={`${className} password`}
          onChange={(e) => {
            handleChange(setPassword, e);
          }}
          disabled={true}
        ></input>
        <select
          type="select"
          className={`${className} role`}
          disabled={true}
          onChange={(e) => {
            handleChange(setRole, e);
          }}
        >
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </>
    );
  };

  const renderActionButtons = (user) => {
    return (
      <>
        <button className={`user-actions edit ${user.acctNum}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          className={`user-actions delete ${user.acctNum}`}
          disabled={user.role === "admin" ? true : false}
          onClick={() => handleDelete(user.acctNum)}
        >
          <i className="fa-solid fa-trash-can fa-1x"></i>
        </button>
        <button className={`user-actions save ${user.acctNum}`} disabled={true}>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </>
    );
  };

  const renderUsers = () => {
    return users.map((user, index) => {
      const className = `user-field row${index + 1} ${user.acctNum}`;
      return (
        <>
          <div
            className={`${className} user-actions-cell`}
            key={`${user.acctNum}-action`}
          >
            {renderActionButtons(user)}
          </div>
          <div
            className={`${className} acctNum`}
            key={`${user.acctNum}-acctNum`}
          >
            {user.acctNum}
          </div>
          <div
            className={`${className} balance`}
            key={`${user.acctNum}-balance`}
          >
            {user.balance}
          </div>
          <div className={`${className} fName`} key={`${user.acctNum}-fName`}>
            {user.fName}
          </div>
          <div className={`${className} lName`} key={`${user.acctNum}-lName`}>
            {user.lName}
          </div>
          <div
            className={`${className} mobileNum`}
            key={`${user.acctNum}-mobileNum`}
          >
            {user.mobileNum}
          </div>
          <div
            className={`${className} username`}
            key={`${user.acctNum}-username`}
          >
            {user.username}
          </div>
          <div
            className={`${className} password`}
            key={`${user.acctNum}-password`}
          >
            {"CONFIDENTIAL"}
          </div>
          <div className={`${className} role`} key={`${user.acctNum}-role`}>
            {user.role}
          </div>
        </>
      );
    });
  };

  return (
    <div className="users-table">
      {renderHeader()}
      {renderAddUserField()}
      {renderUsers()}
    </div>
  );
};

export default UserManagement;
