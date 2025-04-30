import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/transactions", { amount, type, user: user._id });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;