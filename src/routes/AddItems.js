import React, { useEffect, useState } from "react";
import "./Budget.css";
import {
  getCurrentUser,
  updateLocalStorage,
  getLocalBudget,
  getFilteredBudgetList,
} from "../utils";
import { Notifications } from "../parts";
import { useNavigate } from "react-router-dom";

const AddItems = ({ setBudgetList }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [notif, setNotif] = useState({ status: undefined, message: undefined });

  const user = getCurrentUser();
  const username = user ? user.username : undefined;
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);
  let localBudget = getLocalBudget();

  const date = new Date();
  const formattedDate = date.toLocaleDateString("UTC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const AddTransaction = () => {
    if (amount < 0) {
      setNotif({ status: "error", message: "Amount must be greater than 0" });
      setCategory("");
      setAmount("");
      return;
    } else if (category === "" && amount === "") {
      setNotif({
        status: "error",
        message: "Category and amount cannot be empty",
      });
      setCategory("");
      setAmount("");
      return;
    }
    localBudget.push({ username, category, amount, type, date: formattedDate });
    updateLocalStorage("budget", localBudget);
    const userBudgetList = getFilteredBudgetList("username", username);
    setBudgetList(userBudgetList);
    setNotif({ status: undefined, message: undefined });
    setCategory("");
    setAmount("");
  };

  return (
    <div className="budget-info">
      <div className="form-container glass">
        <div className="budget-name-container">
          <label labelfor="budget-name" className="budget-name-label">
            Category:{" "}
          </label>
          <input
            type="text"
            className="budget-name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="budget-amount-container">
          <label labelfor="budget-amount" className="budget-amount-label">
            Amount:{" "}
          </label>
          <input
            type="number"
            className="budget-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="budget-type-container">
          <label labelfor="expense">Expense</label>
          <input
            type="radio"
            className="expense-radio"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            onChange={(e) => setType(e.target.value)}
            required
          />
          <label labelfor="income" className="budget-income-label">
            Income
          </label>
          <input
            type="radio"
            className="income-radio"
            name="type"
            value="INCOME"
            checked={type === "INCOME"}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="notif-btn-container">
          <Notifications status={notif.status} message={notif.message} />
          <button
            type="button"
            className="budget-submit-btn"
            onClick={AddTransaction}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
