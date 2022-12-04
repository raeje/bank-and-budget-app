import React, { useState } from "react";
import "./Budget.css";

const ItemList = () => {
    return (
        <div className="budget-list glass">
            <div className="budget-list-labels">
                <span>Name</span>
                <span>Amount</span>
                <span>Actions</span>
            </div>
            <ul className="budget-container">
                <li>Salary</li>
                <li>3000</li>
                <li></li>
            </ul>
        </div>
    );
};

export default ItemList;