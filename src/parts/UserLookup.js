import React, { useState, useEffect } from "react";
import { getFilteredUsersList, updateUsersList } from "../utils";
import UserInfo from "./UserInfo";

const UserLookup = (props) => {
  const [customer, setCustomer] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountNumberOptions, setAccountNumberOptions] = useState(); // dropdown list of account numbers
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

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

  // Finds customer by account number
  // Sets customer
  useEffect(() => {
    let filtered = [];
    if (accountNumber) {
      filtered = getFilteredUsersList("acctNum", accountNumber);
      setOptions(filtered);

      if (accountNumber.length === 8 && filtered.length === 1) {
        setCustomer(filtered[0]);
      }
      if (accountNumber.length !== 8) {
        setCustomer();
      }

      setNotif({ status: undefined, message: undefined });
    }
  }, [accountNumber]);

  return (
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
  );
};

export default UserLookup;
