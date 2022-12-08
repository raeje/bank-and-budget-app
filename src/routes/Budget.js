import React, { useState } from "react";
import ItemList from "./ItemList";
import AddItems from "./AddItems";
import SetBudget from "./SetBudget";
import "./Budget.css";
import { getCurrentUser, getFilteredBudgetList } from "../utils/Util";

const Budget = () => {
  const user = getCurrentUser();
  const localBudgetList = getFilteredBudgetList("username", user.username);
  const [budgetList, setBudgetList] = useState(localBudgetList);

  return (
    <div className="budget-page glass">
      <ItemList list={budgetList} />
      <div className="input-balance-container">
        <AddItems setBudgetList={setBudgetList} />
        <SetBudget />
      </div>
    </div>
  );
};

export default Budget;
