import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../AuthProvider/useAuth";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BudgetGraph = () => {
  const { user, budgtsDetails } = useAuth();

  const { data: dataAmount, isLoading } = useQuery({
    queryKey: ["budget-calculate", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4080/budget-graph/${user?.email}`
      );
      return res.json();
    },
  });

  if(isLoading){
    return <div><span className="loading loading-spinner loading-md" ></span></div>
  }



  

  console.log("data", dataAmount);
  console.log("details: ", budgtsDetails);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="p-4">

        {/* direction  */}
        <div className="flex" >
            <div className="order-2 flex items-center btn btn-sm bg-red-500 text-white">
                <div className="" >Expense</div>
                <span>{dataAmount?.totalExpense}</span>
            </div>
            <div className="flex items-center btn btn-sm bg-green-500 text-white">
                <div className="" >Saving</div>
                <span>{dataAmount?.totalSaving}</span>
            </div>
        </div>

     <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default BudgetGraph;



 