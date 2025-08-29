import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import budget from "../../assets/images/budget.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetAmout from "../Components/BudgetAmout";
import { useQueryClient } from "@tanstack/react-query";

const Budget = () => {
  const { user } = useAuth();
  const [incomeType, setIncomeType] = useState("income");
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient(); // ✅ access React Query cache

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.amount.value;
    const date = form.date.value;

    const budgetEntry = { user: user?.email, incomeType, amount, category, date };

    try {
      const res = await axios.post(`http://localhost:4080/budget`, budgetEntry);

      if (res?.data?.insertedId) {
        toast.success("Budget added to DB!");
        form.reset();
        setIncomeType("income");
        setCategory("");
        // ✅ Refresh the budget query so chart updates immediately
        queryClient.invalidateQueries(["budget", user?.email]);
      }
    } catch (err) {
      toast.error("Failed to add budget!");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen flex-start p-4">
      <CommonNav />
      <div className="p-6 md:p-10 space-y-4">
        <div className="flex justify-center items-center gap-2">
          <img className="h-8 w-8 md:h-10 md:w-10" src={budget} alt="overview" />
          <h1 className="text-2xl md:text-3xl font-bold">Budget Tracker</h1>
        </div>

        {/* form section */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleAddEntry} className="space-y-2">
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              name="type"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="saving">Saving</option>
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="income">Income (Scholarship, Allowance, Job)</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="books">Books</option>
              <option value="entertainment">Entertainment</option>
              <option value="savings">Savings</option>
              <option value="other">Other</option>
            </select>

            <input
              type="date"
              name="date"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />

            <button
              type="submit"
              className="w-full cursor-pointer btn btn-neutral text-white font-semibold py-2 rounded-lg shadow"
            >
              Add Entry
            </button>
          </form>
        </div>

        {/* Budget chart and details */}
        <BudgetAmout />
      </div>
    </div>
  );
};

export default Budget;





