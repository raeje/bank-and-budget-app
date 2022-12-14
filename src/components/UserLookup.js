import React, { useState, useEffect } from "react";
import { getFilteredUsersList } from "../utils";
import { UserInfo } from "../parts";

const UserLookup = ({
  id = 0,
  customer,
  setCustomer,
  setNotif,
  transactionType = undefined,
}) => {
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

  /*
  useEffect(() => {
    setAccountNumber(0);
  }, [customer]);
  */

  return (
    <div className="customer-info">
      <div className="search-input glass">
        <label labelfor="account-number" className="search-label">
          Search by account number:{" "}
        </label>
        <input
          type="text"
          className="account-number"
          id={"account-number-" + id}
          list={"accounts-" + id}
          autoComplete="off"
          maxLength="8"
          onChange={(e) => handleAcctNumChange(e)}
        />
        <datalist id={"accounts-" + id}>{accountNumberOptions}</datalist>
      </div>

      <UserInfo customer={customer} transactionType={transactionType} />
    </div>
  );
};

export default UserLookup;
