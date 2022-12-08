import React from "react";
import ItemList from "./ItemList";
import AddItems from "./AddItems";
import SetBudget from "./SetBudget";
import "./Budget.css";

const Budget = () => {
    return (
        <div className="budget-page glass">
            <ItemList />
            <div className="input-balance-container">
                <AddItems />
                <SetBudget />
            </div>
        </div>
    );
};

export default Budget;