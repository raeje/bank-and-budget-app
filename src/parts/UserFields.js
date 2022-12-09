import React from "react";

const UserFields = () => {
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

  return renderUsers();
};

export default UserFields;
