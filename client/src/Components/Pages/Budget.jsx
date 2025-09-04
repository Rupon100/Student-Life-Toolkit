import React, { useEffect, useState } from "react";
import CommonNav from "../Common/CommonNav";
import budget from "../../assets/images/budget.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetAmout from "../Components/BudgetAmout";
import { useQueryClient } from "@tanstack/react-query";
import CommonTitle from "../Common/CommonTitle";

const Budget = () => {
  const { user } = useAuth();
  const [incomeType, setIncomeType] = useState("income");
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();
  const [isEntryLoading, setIsEntryLoading] = useState(false);

  // title for page
  useEffect(() => {
    document.title = 'StudyEase | Budget Tracker'
  }, []);

  const incomeCategories = ["Scholarship", "Allowance", "Job", "Other"];
  const expenseCategories = ["Food", "Transport", "Books", "Entertainment", "Savings", "Other"];

  // add a entry value
  const handleAddEntry = async (e) => {
    e.preventDefault();

    setIsEntryLoading(true);

    const form = e.target;
    const amount = parseFloat(form.amount.value);
    const date = form.date.value;

    // frontend validation
    if (isNaN(amount) || amount <= 0) {
      return toast.error("Please enter a valid positive amount!");
    }

    if (!date) {
      return toast.error("Please select a valid date!");
    }

    const budgetEntry = {
      user: user?.email,
      incomeType,
      amount,
      category,
      date,
    };

    try {
      const res = await axios.post(`https://server-nu-roan.vercel.app/budget`, budgetEntry);

      if (res?.data?.insertedId) {
        toast.success("Budget added to DB!");
        form.reset();
        setIncomeType("income");
        setCategory("");
        queryClient.invalidateQueries(["budget", user?.email]);
      }
    } catch (err) {
      toast.error("Failed to add budget!");
    }finally{
      setIsEntryLoading(false);
    }
  };

  // calculate min & max date for input
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    .toISOString()
    .split("T")[0];
  const minDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  return (
    <div className="flex flex-col min-h-screen flex-start p-4">
      <CommonNav />
      <div className="p-6 md:p-10 space-y-4">
        <CommonTitle image={budget} title={`Budget Tracker`} />

        <div className="max-w-xl mx-auto shadow-md p-6 rounded-xl">
          <form onSubmit={handleAddEntry} className="space-y-2">
            {/* income / expense type */}
            <select
              value={incomeType}
              onChange={(e) => { setIncomeType(e.target.value); setCategory(""); }}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              name="type"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* amount */}
            <input
              type="number"
              min="0"
              name="amount"
              placeholder="Enter amount"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />

            {/* category - depends on type */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select Category</option>
              {(incomeType === "income" ? incomeCategories : expenseCategories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* date - min/max */}
            <input
              type="date"
              name="date"
              min={minDate}
              max={maxDate}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />

            <button
              type="submit"
              disabled={isEntryLoading}
              className="w-full cursor-pointer btn btn-neutral text-white font-semibold py-2 rounded-lg shadow"
            >
              { isEntryLoading ? 'Entry Adding..' : 'Add Entry' }
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










