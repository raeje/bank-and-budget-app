import React, { useState } from "react";
import { Notifications } from "../parts";
import {
  getCurrentUser,
  getUsers,
  updateLocalStorage,
  validateFields,
} from "../utils";
import "./Profile.css";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  const users = getUsers();

  const handleSave = () => {
    const acctNum = currentUser.acctNum;
    const balance = currentUser.balance;
    const role = currentUser.role;
    const img = currentUser.img || "default.jpeg";

    const fName = document.querySelector(".field-value.fName").value;
    const lName = document.querySelector(".field-value.lName").value;
    const mobileNum = document.querySelector(".field-value.mobileNum").value;
    const username = document.querySelector(".field-value.username").value;
    const password = document.querySelector(".field-value.password").value;
    const confirmPassword = document.querySelector(
      ".field-value.confirm-password"
    ).value;

    const result = validateFields(
      [
        { "First Name": fName },
        { "Last Name": lName },
        { "Mobile Number": [mobileNum, acctNum] },
        { Username: [username, acctNum] },
        { Password: password },
        { "Confirm Password": [password, confirmPassword] },
      ],
      setNotif
    );

    if (result) {
      const index = users.findIndex((user) => user.acctNum === acctNum);
      const modifiedUser = {
        username,
        password,
        fName,
        lName,
        balance,
        mobileNum,
        acctNum,
        role,
        isLoggedIn: true,
        img,
      };

      const newUsers = users.map((user, i) => {
        if (i === index) {
          return modifiedUser;
        }
        return user;
      });

      setCurrentUser(modifiedUser);
      updateLocalStorage("users", newUsers);
      setNotif({ status: "success", message: "Profile updated!" });
    }
  };

  return (
    <>
      <div className="immutable-panel glass panel profile-panel">
        <div className="image-container">
          <img
            src={require(`./../images/${currentUser.img}`)}
            alt="A wonderful portrait"
          />
        </div>

        <div className="text-fields">
          <span className="field-name acct-num">Account Number: </span>
          <span className="field-value acct-num">{currentUser.acctNum}</span>

          <span className="field-name balance">Balance: </span>
          <span className="field-value balance">{currentUser.balance}</span>

          <span className="field-name">Role: </span>
          <span className="field-value">{currentUser.role}</span>
        </div>
      </div>

      <div className="mutable-panel glass panel profile-panel">
        <div className="text-fields">
          <span className="field-name">First Name: </span>
          <input
            type="text"
            className="field-value fName"
            defaultValue={currentUser.fName}
          />
          <span className="field-name">Last Name: </span>
          <input
            type="text"
            className="field-value lName"
            defaultValue={currentUser.lName}
          />
          <span className="field-name">Mobile Number: </span>
          <input
            type="text"
            className="field-value mobileNum"
            defaultValue={currentUser.mobileNum}
            minLength={11}
            pattern="[0-9]*"
            onWheel={(event) => event.currentTarget.blur()}
          />
          <span className="field-name">Username: </span>
          <input
            type="text"
            className="field-value username"
            defaultValue={currentUser.username}
          />
          <span className="field-name">Password: </span>
          <input
            type="password"
            className="field-value password"
            defaultValue={currentUser.password}
          />
          <span className="field-name">Confirm Password: </span>
          <input
            type="password"
            className="field-value confirm-password"
            defaultValue=""
          />
        </div>

        <Notifications status={notif.status} message={notif.message} />

        <button className="save" onClick={handleSave}>
          SAVE
        </button>
      </div>
    </>
  );
};

export default Profile;
