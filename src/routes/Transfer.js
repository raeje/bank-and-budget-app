import React, { useState } from "react";
import { UserLookup, Withdraw, Deposit } from "../components";
import { Notifications } from "../parts";
import { updateUsersList } from "../utils";
import "./Transfer.css";

const Transfer = () => {
  const [sender, setSender] = useState(undefined);
  const [receiver, setReceiver] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBtnClick = () => {
    // Catcher error: invalid amount
    if (amount < 0.01 || !amount) {
      setNotif({
        status: "error",
        message: "Amount must be greater than 0.",
      });
      return;
    }
    // Catcher error: invalid sender and/or receiver
    if (sender.acctNum === receiver.acctNum) {
      setNotif({
        status: "error",
        message: "SENDER must NOT be the same as the RECEIVER.",
      });
      return;
    }
    // Catcher error: sender insufficient balance
    if (parseFloat(amount) > parseFloat(sender.balance)) {
      setNotif({
        status: "error",
        message: "AMOUNT must NOT exceed SENDER's balance.",
      });
      return;
    }
    // Withdraw amount from sender
    let updatedSender = sender;
    updatedSender.balance = Withdraw(sender, amount, setNotif);
    setSender(updatedSender);
    updateUsersList(sender.username, "balance", updatedSender.balance);
    // Deposit amount to receiver
    let updatedReceiver = receiver;
    updatedReceiver.balance = Deposit(receiver, amount, setNotif);
    setReceiver(updatedReceiver);
    updateUsersList(receiver.username, "balance", updatedReceiver.balance);
    // Notify on successful transaction
    setNotif({
      status: "success",
      message: `Deducted ${amount} credits from ${sender.username.toUpperCase()}'s balance.\n
        Added ${amount} credits to ${receiver.username.toUpperCase()}'s balance.`,
    });
  };

  return (
    <>
      <div className="transfer-container">
        <div className="search-customer-container">
          <span className="customer-type sender">SENDER</span>
          <UserLookup
            id="sender"
            customer={sender}
            setCustomer={setSender}
            setNotif={setNotif}
            transactionType="transfer"
          />
        </div>

        <div className="search-customer-container">
          <span className="customer-type sender">RECEIVER</span>
          <UserLookup
            id="receiver"
            customer={receiver}
            setCustomer={setReceiver}
            setNotif={setNotif}
            transactionType="transfer"
          />
        </div>
      </div>
      <div className="transfer-panel transact-panel glass panel">
        <div className="balance-info">
          <span className="balance-text">Sender's balance: </span>
          <span className="balance-value">{sender ? sender.balance : 0}</span>
        </div>
        <div className="balance-info">
          <span className="balance-text">Receiver's balance: </span>
          <span className="balance-value">
            {receiver ? receiver.balance : 0}
          </span>
        </div>
        <div className="amount-container">
          <label labelfor="amount" className="amount-text">
            Amount:
          </label>
          <input
            type="number"
            disabled={sender === undefined || receiver === undefined}
            step="0.01"
            min="0.01"
            max={sender ? sender.balance : 0}
            className="amount"
            id="amount"
            defaultValue={amount}
            onChange={(e) => handleAmountChange(e)}
          />
        </div>
        <Notifications status={notif.status} message={notif.message} />
        <button
          type="button"
          disabled={sender === undefined}
          className="transact-btn btn"
          onClick={handleBtnClick}
        >
          TRANSFER
        </button>
      </div>
    </>
  );
};

export default Transfer;
