import React, { useEffect, useState } from "react";
import "./Budget.css";
import { updateLocalStorage } from "../utils";

const ItemList = ({ list }) => {
  const [budgetItems, setBudgetItems] = useState(list);

  useEffect(() => {
    setBudgetItems(list);
  }, [list]);

  const deleteBudgetItem = (item) => {
    const newBudgetItems = budgetItems.filter(
      (budgetItem) => budgetItem !== item
    );
    setBudgetItems(newBudgetItems);
    updateLocalStorage("budget", newBudgetItems);
  };

  // Function to update the category or amount of an item
  const updateBudgetItem = (event, item) => {
    const updatedBudgetItems = budgetItems.map((budgetItem) => {
      if (budgetItem !== item) return budgetItem;

      // Update the category or amount of the selected item
      return {
        ...budgetItem,
        [event.target.name]: event.target.value,
      };
    });
    setBudgetItems(updatedBudgetItems);
    updateLocalStorage("budget", updatedBudgetItems);
  };

  // Function to toggle the edit mode for an item
  const toggleEditMode = (item) => {
    const updatedBudgetItems = budgetItems.map((budgetItem) => {
      if (budgetItem !== item) return budgetItem;

      // Toggle the edit mode for the selected item
      return {
        ...budgetItem,
        isEditing: !budgetItem.isEditing,
      };
    });
    setBudgetItems(updatedBudgetItems);
    updateLocalStorage("budget", updatedBudgetItems);
  };

  let totalAmount = 0;
  for (let i = 0; i < budgetItems.length; i++) {
    if (budgetItems[i].type === "EXPENSE") {
      totalAmount -= parseFloat(budgetItems[i].amount);
    } else if (budgetItems[i].type === "INCOME") {
      totalAmount += parseFloat(budgetItems[i].amount);
    }
  }

  let totalAmountPesoSign = `₱${totalAmount}`;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("UTC", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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
              {item.isEditing ? (
                <input
                  type="text"
                  name="category"
                  value={item.category}
                  onChange={(event) => updateBudgetItem(event, item)}
                />
              ) : (
                <li>{item.category}</li>
              )}
              <span className="item-date">{formattedDate}</span>
            </div>
            {item.isEditing ? (
              <input
                type="number"
                name="amount"
                value={item.amount}
                onChange={(event) => updateBudgetItem(event, item)}
              />
            ) : (
              <li
                style={{ color: item.type === "EXPENSE" ? "#CF1020" : "green" }}
              >
                {item.type === "EXPENSE" ? "-" : "+"}
                {item.amount.toLocaleString()}
              </li>
            )}
            <div className="budget-actions">
              <i
                className="fa-regular fa-pen-to-square fa-1x"
                onClick={() => toggleEditMode(item)}
              ></i>
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
