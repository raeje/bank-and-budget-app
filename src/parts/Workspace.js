import React, { useEffect, useState } from "react";
import "./Workspace.css";
import { getFilteredUsersList, updateUsersList } from "../utils";
//import UserInfo from "./UserInfo";
import { UserInfo, Notifications } from "./";

const Workspace = (props) => {
  const [customer, setCustomer] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [accountNumberOptions, setAccountNumberOptions] = useState(); // dropdown list of account numbers
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  const handleAcctNumChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleDepAmtChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDeposit = () => {
    let updatedCustomer = customer;

    if (depositAmount < 0.01 || !depositAmount) {
      setNotif({
        status: "error",
        message: "Deposit amount must be greater than 0.",
      });
      return;
    }

    updatedCustomer.balance =
      parseFloat(customer.balance) + parseFloat(depositAmount);

    setBalance(updatedCustomer.balance);
    setCustomer(updatedCustomer);
    updateUsersList(customer.username, "balance", updatedCustomer.balance);

    setNotif({ status: "success", message: "Transaction complete!" });
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

  // Displays initial balance
  // Sets balance
  useEffect(() => {
    if (customer) {
      setBalance(customer.balance);
    }
  });

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
        <div className="balance-info">
          <span className="balance-text">Balance: </span>
          <span className="balance-value">{balance}</span>
        </div>
        <div className="deposit-amount-container">
          <label labelfor="deposit-amount">Amount: </label>
          <input
            type="number"
            disabled={customer === undefined}
            step="0.01"
            min="0.01"
            className="deposit-amount"
            id="deposit-amount"
            defaultValue={depositAmount}
            onChange={(e) => handleDepAmtChange(e)}
          />
        </div>
        <Notifications status={notif.status} message={notif.message} />
        <button
          type="button"
          disabled={customer === undefined}
          className="deposit-btn btn"
          onClick={handleDeposit}
        >
          Deposit
        </button>
      </div>

      {props.children}
    </div>
  );
};

export default Workspace;
