import React, { useState, useEffect } from "react";
import { Notifications } from "../parts";
import { updateUsersList } from "../utils";
import { Deposit, Withdraw, UserLookup } from "./";

const Transaction = ({ type }) => {
  const [customer, setCustomer] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBtnClick = () => {
    let updatedCustomer = customer;
    const total =
      type === "deposit" && amount
        ? Deposit(customer, amount, setNotif)
        : Withdraw(customer, amount, setNotif);
    if (amount > 0) {
      updatedCustomer.balance = total;
      setBalance(updatedCustomer.balance);
      setCustomer(updatedCustomer);
      updateUsersList(customer.username, "balance", updatedCustomer.balance);
    }
  };

  useEffect(() => {
    setCustomer(undefined);
    setBalance(0);
    setAmount(0);
    setNotif({ status: undefined, message: undefined });
    document.querySelector(".balance-value").innerText = 0;
    document.querySelector(".account-number").value = "";
    document.querySelector(".amount").value = "";
  }, [type]);

  // Displays initial balance
  // Sets balance
  useEffect(() => {
    if (customer) {
      setBalance(customer.balance);
    }
  });

  return (
    <>
      <UserLookup
        customer={customer}
        setCustomer={setCustomer}
        setNotif={setNotif}
      />

      <div className="transact-panel glass panel">
        <div className="balance-info">
          <span className="balance-text">Balance: </span>
          <span className="balance-value">{balance}</span>
        </div>
        <div className="amount-container">
          <label labelfor="amount" className="amount-text">Amount: </label>
          <input
            type="number"
            disabled={customer === undefined}
            step="0.01"
            min="0.01"
            className="amount"
            id="amount"
            defaultValue={amount}
            onChange={(e) => handleAmountChange(e)}
          />
        </div>
        <Notifications status={notif.status} message={notif.message} />
        <button
          type="button"
          disabled={customer === undefined}
          className="transact-btn btn"
          onClick={handleBtnClick}
        >
          {type.toUpperCase()}
        </button>
      </div>
    </>
  );
};

export default Transaction;
