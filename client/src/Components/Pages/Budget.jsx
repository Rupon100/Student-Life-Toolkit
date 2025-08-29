import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import budget from "../../assets/images/budget.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import BudgetAmout from "../Components/BudgetAmout";

const Budget = () => {
  const { user } = useAuth();
  const [incomeType, setIncomeType] = useState(null);
  const [category, setCategory] = useState(null);

  const handleAddEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = form.amount.value;
    const date = form.date.value;

    const budget = { user: user?.email, incomeType, amount, category, date };

    axios.post(`http://localhost:4080/budget`, budget).then((res) => {
      console.log(res.data);
      if (res?.data?.insertedId) {
        toast.success("Budget added to DB!");
        form.reset();
      }
    });

    console.log(budget);
  };

  return (
    <div className="flex flex-col min-h-screen flex-start p-4">
      <CommonNav></CommonNav>
      <div className="p-6 md:p-10 space-y-4">
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-8 w-8 md:h-10 md:w-10"
            src={budget}
            alt="overview image"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Budget Tracker</h1>
        </div>

        {/* form section for track the budget */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={(e) => handleAddEntry(e)} className="space-y-2 ">
            {/* Type */}
            <div>
              {/* <label className="block mb-2 font-medium">Type</label> */}
              <select
                onChange={(e) => setIncomeType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                name="type"
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              {/* <label className="block mb-2 font-medium">Amount</label> */}
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Category */}
            <div>
              {/* <label className="block mb-2 font-medium">Category</label> */}
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">-- Select Category --</option>
                <option value="income">
                  Income (Scholarship, Allowance, Job)
                </option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="books">Books</option>
                <option value="entertainment">Entertainment</option>
                <option value="savings">Savings</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div>
              {/* <label className="block mb-2 font-medium">Date</label> */}
              <input
                type="date"
                name="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer btn btn-neutral text-white font-semibold py-2 rounded-lg shadow"
            >
              Add Entry
            </button>
          </form>
        </div>

        {/* budget amount show using tab */}
        <div>
          <BudgetAmout></BudgetAmout>
        </div>
      </div>
    </div>
  );
};

export default Budget;
