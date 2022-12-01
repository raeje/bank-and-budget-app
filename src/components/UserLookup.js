import React, { useState, useEffect } from "react";
import { getFilteredUsersList } from "../utils";
import { UserInfo } from "../parts";

const UserLookup = ({ customer, setCustomer, setNotif }) => {
  const [accountNumber, setAccountNumber] = useState();
  const [accountNumberOptions, setAccountNumberOptions] = useState(); // dropdown list of account numbers

  const handleAcctNumChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const setOptions = (filteredList) => {
    setAccountNumberOptions(
      filteredList.map((opt, index) => (
        <option key={(opt, index)} value={opt.acctNum}>
          {opt.fName} {opt.lName}
        </option>
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

  useEffect(() => {
    document.querySelector(".account-number").value = "";
  }, [customer]);

  return (
    <div className="customer-info glass panel">
      <div className="search-input">
        <label labelfor="account-number">Search by account number: </label>
        <input
          type="text"
          className="account-number"
          id="account-number"
          list="accounts"
          autoComplete="off"
          maxLength="8"
          onChange={(e) => handleAcctNumChange(e)}
        />
        <datalist id="accounts">{accountNumberOptions}</datalist>
      </div>

      <UserInfo customer={customer} />
    </div>
  );
};

export default UserLookup;
