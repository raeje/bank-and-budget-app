import React, { useEffect } from "react";
import "./Budget.css";
import { getCurrentUser, getFilteredBudgetList } from "../utils";
import { useNavigate } from "react-router-dom";

const SetBudget = () => {
  const user = getCurrentUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);

  const calculateBalance = (items) => {
    let balance = user ? user.balance : 0;

    items.forEach((item) => {
      if (item.type === "EXPENSE") {
        balance -= parseFloat(item.amount);
      } else if (item.type === "INCOME") {
        balance += parseFloat(item.amount);
      }
    });

    localStorage.setItem("balance", balance);

    return balance;
  };

  const items = user ? getFilteredBudgetList("username", user.username) : [];

  const balance = calculateBalance(items);

  return (
    <div className="budget-balance glass">
      <div className="budget-balance-info">
        <span className="budget-balance-label">Remaining Balance:</span>
        <span className="budget-balance-total">{user ? user.balance : 0}</span>
      </div>
      <div className="projected-balance">
        <span className="proj-balance-label">Projected Balance:</span>
        <span className="proj-balance-total">{balance}</span>
      </div>
    </div>
  );
};

export default SetBudget;
