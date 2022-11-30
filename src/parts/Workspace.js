import React, { useEffect, useState } from "react";
import "./Workspace.css";
import { getFilteredUsersList } from "../utils";
import UserInfo from "./UserInfo";

const Workspace = (props) => {
  const [customer, setCustomer] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountNumberOptions, setAccountNumberOptions] = useState();

  const handleAcctNumChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const setOptions = (filteredList) => {
    setAccountNumberOptions(
      filteredList.map((opt, index) => (
        <option key={(opt, index)}>{opt.acctNum}</option>
      ))
    );
  };

  useEffect(() => {
    let filtered = [];
    if (accountNumber) {
      filtered = getFilteredUsersList("acctNum", accountNumber);
      setOptions(filtered);
      if (accountNumber.length === 8 && filtered.length === 1) {
        setCustomer(filtered);
      }
      if (accountNumber.length < 8) {
        setCustomer("");
      }
    }
  }, [accountNumber]);

  return (
    <div className="workspace container glass">
      <div className="customer-info glass space">
        <div className="search-input">
          <label labelfor="account-number">Search by account number: </label>
          <input
            type="text"
            className="account-number"
            id="account-number"
            list="accounts"
            autoComplete="off"
            onChange={(e) => handleAcctNumChange(e)}
          />
          <datalist id="accounts">{accountNumberOptions}</datalist>
        </div>

        <UserInfo customer={customer} />
      </div>

      <div className="transact-space glass space">
        <span className="balance-text">Balance: </span>
        <span className="balance-value">0</span>
      </div>

      {props.children}
    </div>
  );
};

export default Workspace;
