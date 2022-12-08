import React, { useEffect, useState } from "react";
import "./Budget.css";
import { getCurrentUser, updateLocalStorage, getLocalBudget, getFilteredBudgetList } from "../utils";

const ItemList = () => {
    const user = getCurrentUser();
    
    const localBudgetList = getFilteredBudgetList("username", user.username);
    const [budgetItems , setBudgetItems] = useState(getFilteredBudgetList("username", user.username));
    
    useEffect(() => {
        setBudgetItems(localBudgetList);
    }, [localBudgetList]);

    const deleteBudgetItem = (item) => {
        const newBudgetItems = budgetItems.filter((budgetItem) => budgetItem !== item);
        setBudgetItems(newBudgetItems);
        updateLocalStorage("budget", newBudgetItems);
    };

    let totalAmount = 0;
    for (let i = 0; i < budgetItems.length; i++) {
        if (budgetItems[i].type === "EXPENSE") {
            totalAmount -= parseFloat(budgetItems[i].amount);
        } else if (budgetItems[i].type === "INCOME") {
            totalAmount += parseFloat(budgetItems[i].amount);
        }
    };

    let totalAmountPesoSign = `₱${totalAmount}`;

    const date = new Date();
    const formattedDate = date.toLocaleDateString("UTC", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return (
        <div className="budget-list glass">
            <div className="budget-list-labels">
                <span>Name</span>
                <span>Amount</span>
                <span>Actions</span>
            </div>
            <div className="all-items-container">
                {budgetItems.map((item) => (
                    <ul className="budget-container" key={item.date}>
                        <div className="date-category">
                            <li>{item.category}</li>
                            <span className="item-date">{formattedDate}</span>
                        </div>
                        <li style={{ color: item.type === "EXPENSE" ? "#CF1020" : "green" }}>
                            {item.type === "EXPENSE" ? "-" : "+"}
                            {item.amount.toLocaleString()}
                        </li>
                        <div className="budget-actions">
                            <i className="fa-regular fa-pen-to-square fa-1x"></i>
                            <i 
                            className="fa-regular fa-trash-can fa-1x"
                            onClick={() => deleteBudgetItem(item)}
                            ></i>
                        </div>
                    </ul>
                ))}
            </div>
            <div className="total-amount-container">
                <span>Total Amount:</span>
                <span>{totalAmountPesoSign}</span>
            </div>
        </div>
    );
};

export default ItemList;