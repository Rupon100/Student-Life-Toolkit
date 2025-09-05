import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../AuthProvider/useAuth";

const BudgetGraph = () => {
  const { user } = useAuth();

  // fetch all budget entries
  const { data: budgets, isLoading } = useQuery({
    queryKey: ["budget", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://server-nu-roan.vercel.app/budget/${user?.email}`);
      return res.json(); // expects array of budget entries
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!budgets || budgets.length === 0) {
    return <h2 className="text-center">No budget data available</h2>;
  }

  const chartDataMap = {};

  budgets.forEach((b) => {
    if (!b.incomeType) return; // skip if type is null
    const cat = b.category || "Other";
    if (!chartDataMap[cat]) chartDataMap[cat] = { name: cat, income: 0, expense: 0, saving: 0 };
    chartDataMap[cat][b.incomeType] += Number(b.amount);
  });

  const chartData = Object.values(chartDataMap);

  // --- Calculate totals ---
  const totalIncome = budgets
    .filter((b) => b.incomeType === "income")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  const totalExpense = budgets
    .filter((b) => b.incomeType === "expense")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  // --- Color map ---
  const COLORS = {
    income: "#22c55e", // green
    expense: "#ef4444", // red
    saving: "#3b82f6", // blue
  };

  return (
    <div className="p-4 w-full h-[500px] flex flex-col">
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`$${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
          />
          <Bar dataKey="income" fill={COLORS.income} radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill={COLORS.expense} radius={[4, 4, 0, 0]} />
          <Bar dataKey="saving" fill={COLORS.saving} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Custom totals / legend */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-1 rounded">
          <span className="w-3 h-3 block rounded-full bg-white"></span>
          <span>Income: ${totalIncome}</span>
        </div>
        <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded">
          <span className="w-3 h-3 block rounded-full bg-white"></span>
          <span>Expense: ${totalExpense}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetGraph;





