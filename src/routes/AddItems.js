import React, { useState } from "react";
import "./Budget.css";

const AddItems = (props) => {
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [type, setType] = useState("EXPENSE");

    const AddTransaction = () => {
        console.log({ name, amount, type });
    }

    return (
        <div className="budget-info">
            <div className="form-container glass">
                <div className="budget-name-container">
                    <label labelfor="budget-name" className="budget-name-label">Name: </label>
                    <input
                    type="text"
                    className="budget-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
                <div className="budget-amount-container">
                    <label labelfor="budget-amount" className="budget-amount-label">Amount: </label>
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
                    <label labelfor="income">Income</label>
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
                <button
                    type="button"
                    className="budget-btn"
                    onClick={AddTransaction}
                >
                    ADD
                </button>
            </div>
        </div>
    );
};

export default AddItems;