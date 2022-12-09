import React, { useEffect, useState } from "react";
import {
  getUsers,
  updateLocalStorage,
  generateAcctNum,
  validateFields,
  domValue,
  getFilteredUsersList,
} from "../utils";
import { UserManagementHeader, Notifications } from "../parts";
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
  const [editMode, setEditMode] = useState(false);
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  useEffect(() => {
    setAcctNum();
    setBalance(0);
    setFName();
    setLName();
    setMobileNum();
    setUsername();
    setPassword();
    disableEditableFields(true, "button.save");
  }, [users]);

  const disableAddUserFields = (bool) => {
    const addUserFields = document.querySelectorAll(".add-user-field");
    addUserFields.forEach((field) => {
      field.disabled = bool;
      field.value = field.classList.contains("role") ? "customer" : "";
    });
  };

  const disableEditableFields = (bool, id) => {
    const fields = document.querySelectorAll(id);
    fields.forEach((field) => {
      field.disabled = bool;
    });
  };

  const handleDelete = (acctNum) => {
    const newUsers = users.filter((u) => u.acctNum !== acctNum);
    setUsers(newUsers);
    updateLocalStorage("users", newUsers);
  };

  const handleChange = (setter, e) => {
    setter(e.target.value);
  };

  const handleEdit = (e) => {
    const id = e.target.classList[0];
    const domId = `.editable-${id}`;
    const userBalance = parseFloat(
      document.querySelector(`.balance-${id}`).innerHTML
    );

    setBalance(userBalance);
    setFName(domValue(`${domId}.fName`));
    setLName(domValue(`${domId}.lName`));
    setMobileNum(domValue(`${domId}.mobileNum`));
    setUsername(domValue(`${domId}.username`));
    setPassword(domValue(`${domId}.password`));
    setRole(domValue(`${domId}.role`));

    setEditMode(true);
    disableEditableFields(false, domId);
    disableEditableFields(true, "button.edit");
    disableEditableFields(false, `#save-${id}`);
  };

  const handleSaveEdit = (e) => {
    const acctNum = e.target.classList[0];
    const user = getFilteredUsersList("acctNum", acctNum)[0];
    const img = user.img;
    const id = `.editable-${e.target.classList[0]}`;
    const result = validateFields(
      [
        { "First Name": fName },
        { "Last Name": lName },
        { "Mobile Number": [mobileNum, acctNum] },
        { Username: [username, acctNum] },
        { Password: password },
        { Role: role },
      ],
      setNotif
    );

    if (result) {
      const index = users.findIndex((user) => user.acctNum === acctNum);
      const isLoggedIn = role === "admin" ? true : false;
      const modifiedUser = {
        username,
        password,
        fName,
        lName,
        balance,
        mobileNum,
        acctNum,
        role,
        isLoggedIn,
        img,
      };

      const newUsers = users.map((user, i) => {
        if (i === index) {
          return modifiedUser;
        }
        return user;
      });

      setUsers(newUsers);
      updateLocalStorage("users", newUsers);

      setEditMode(false);
      disableEditableFields(true, id);
      disableEditableFields(false, "button.edit");
      disableEditableFields(true, `#save-${e.target.classList[0]}`);
      setNotif({ status: undefined, message: undefined });
    }
  };

  const handleAdd = () => {
    const acctNum = generateAcctNum();
    document.querySelector(".add-user-field.acctNum").innerHTML = acctNum;

    setModifyState(true);
    setAcctNum(acctNum);
    setRole("customer");
    disableAddUserFields(false);
    disableEditableFields(true, "button.edit");
  };

  const handleSave = () => {
    const img = "default.webp";
    const newUsers = [
      {
        username,
        password,
        fName,
        lName,
        balance,
        mobileNum,
        acctNum,
        role,
        isLoggedIn: false,
        img,
      },
      ...users,
    ];
    const result = validateFields(
      [
        { Balance: balance },
        { "First Name": fName },
        { "Last Name": lName },
        { "Mobile Number": [mobileNum, acctNum] },
        { Username: [username, acctNum] },
        { Password: password },
        { Role: role },
      ],
      setNotif,
      true
    );
    if (result) {
      setUsers(newUsers);
      updateLocalStorage("users", newUsers);
      document.querySelector(".add-user-field.acctNum").innerHTML =
        "auto-generated";

      setAcctNum("auto-generated");
      setModifyState(false);
      disableAddUserFields(true);
      disableEditableFields(false, "button.edit");
      setNotif({ status: undefined, message: undefined });
    }
  };

  const renderAddUserField = () => {
    const className = `user-field add-user-field`;
    return (
      <>
        <div className="user-actions-cell">
          <button
            className={`user-actions add add-actions`}
            onClick={handleAdd}
            disabled={modifyState || editMode}
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
          onWheel={(event) => event.currentTarget.blur()}
          onChange={(e) => {
            handleChange(setBalance, e);
          }}
          disabled={true}
        />

        <input
          type="text"
          placeholder="John"
          className={`${className} fName`}
          onChange={(e) => {
            handleChange(setFName, e);
          }}
          disabled={true}
        />

        <input
          type="text"
          placeholder="Doe"
          className={`${className} lName`}
          onChange={(e) => {
            handleChange(setLName, e);
          }}
          disabled={true}
        />

        <input
          type="number"
          placeholder="09171231203"
          onWheel={(event) => event.currentTarget.blur()}
          className={`${className} mobileNum`}
          onChange={(e) => {
            handleChange(setMobileNum, e);
          }}
          disabled={true}
        />

        <input
          type="text"
          placeholder="johnd"
          className={`${className} username`}
          onChange={(e) => {
            handleChange(setUsername, e);
          }}
          disabled={true}
        />

        <input
          type="password"
          placeholder="s3cur3_p@ssw0RD!"
          className={`${className} password`}
          onChange={(e) => {
            handleChange(setPassword, e);
          }}
          disabled={true}
        />

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
        <button
          className={`${user.acctNum} user-actions edit fa-solid fa-pen-to-square`}
          onClick={(e) => handleEdit(e)}
          key={`${user.acctNum}-action-edit`}
          disabled={editMode}
        ></button>
        <button
          className={`${user.acctNum} user-actions delete fa-solid fa-trash-can fa-1x`}
          onClick={() => handleDelete(user.acctNum)}
          key={`${user.acctNum}-action-delete`}
          disabled={user.role === "admin" ? true : false}
        ></button>
        <button
          className={`${user.acctNum} user-actions save fa-solid fa-floppy-disk`}
          key={`${user.acctNum}-action-save`}
          id={`save-${user.acctNum}`}
          onClick={(e) => handleSaveEdit(e)}
        ></button>
      </>
    );
  };

  const renderUsers = () => {
    return users.map((user, index) => {
      const className = `user-field row${index + 1}`;
      const editable = `editable-${user.acctNum}`;
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
            className={`${className} ${editable} balance-${user.acctNum}`}
            key={`${user.acctNum}-balance`}
          >
            {user.balance}
          </div>

          <input
            type="text"
            className={`${className} ${editable} fName`}
            key={`${user.acctNum}-fName`}
            defaultValue={user.fName}
            onChange={(e) => handleChange(setFName, e)}
            disabled={true}
          />

          <input
            type="text"
            className={`${className} ${editable} lName`}
            key={`${user.acctNum}-lName`}
            defaultValue={user.lName}
            onChange={(e) => handleChange(setLName, e)}
            disabled={true}
          />

          <input
            type="number"
            minLength={11}
            pattern="[0-9]*"
            onWheel={(event) => event.currentTarget.blur()}
            className={`${className} ${editable} mobileNum`}
            key={`${user.acctNum}-mobileNum`}
            defaultValue={user.mobileNum}
            onChange={(e) => handleChange(setMobileNum, e)}
            disabled={true}
          />

          <input
            type="text"
            className={`${className} ${editable} username`}
            key={`${user.acctNum}-username`}
            defaultValue={user.username}
            onChange={(e) => handleChange(setUsername, e)}
            disabled={true}
          />

          <input
            type="password"
            className={`${className} ${editable} password`}
            key={`${user.acctNum}-password`}
            defaultValue={user.password}
            onChange={(e) => handleChange(setPassword, e)}
            disabled={true}
          />

          <select
            type="select"
            className={`${className} ${editable} role`}
            key={`${user.acctNum}-role`}
            defaultValue={user.role}
            onChange={(e) => handleChange(setRole, e)}
            disabled={true}
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </select>
        </>
      );
    });
  };

  return (
    <>
      <Notifications status={notif.status} message={notif.message} />
      <div className="users-table">
        <UserManagementHeader />
        {renderAddUserField()}
        {renderUsers()}
      </div>
    </>
  );
};

export default UserManagement;
