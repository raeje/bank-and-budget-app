import React, { useState } from "react";
import ItemList from "./ItemList";
import AddItems from "./AddItems";
import "./Budget.css";

const Budget = () => {
    return (
        <div className="budget-page glass">
            <ItemList />
            <AddItems />
        </div>
    );
};

export default Budget;