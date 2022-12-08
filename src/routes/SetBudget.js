import React from "react";
import "./Budget.css";
import { getCurrentUser, getLocalBudget, getFilteredBudgetList } from "../utils";

const SetBudget = () => {
    const user = getCurrentUser();
    
    const calculateBalance = (items) => {
        let balance = user.balance;

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
    
    const items = getFilteredBudgetList("username", user.username);

    const balance = calculateBalance(items);

    return (
        <div className="budget-balance glass">
            <div className="balance-info">
                <span className="budget-balance-label">Remaining Balance:</span>
                <span className="budget-balance-total">{user.balance}</span>
            </div>
            <div className="projected-balance">
                <span className="proj-balance-label">Projected Balance:</span>
                <span className="proj-balance-total">{balance}</span>
            </div>
        </div>
    );
};

export default SetBudget;