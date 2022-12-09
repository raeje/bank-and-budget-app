import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import AddItems from "./AddItems";
import SetBudget from "./SetBudget";
import "./Budget.css";
import { getCurrentUser, getFilteredBudgetList } from "../utils/Util";
import { useNavigate } from "react-router-dom";

const Budget = () => {
  const user = getCurrentUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/home", { replace: true });
      return;
    }
  }, []);

  const localBudgetList = (() => {
    if (user) {
      return getFilteredBudgetList("username", user.username);
    }
    return [];
  })();

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
