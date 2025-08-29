import { useQuery } from "@tanstack/react-query";
import React from "react";
import { NavLink } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useAuth from "../../AuthProvider/useAuth";

const BudgetAmout = () => {
  const { user } = useAuth();

  const { data: budgets, isLoading } = useQuery({
    queryKey: ["budget", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4080/budget/${user?.email}`);
      return res.json();
    },
  });

  console.log(budgets);

  return (
    <div className="border rounded-xl p-4">
      <Tabs className={`w-full flex flex-col justify-center items-center`}>
        <TabList className={`flex gap-2`}>
          <Tab>
            <button className="btn btn-neutral">Budget Graph</button>
          </Tab>
          <Tab>
            <button className="btn btn-neutral">Budget Details</button>
          </Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : budgets && budgets.length > 0 ? (
            <h1>Total Entries: {budgets.length}</h1>
          ) : (
            <h2>No Data available</h2>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BudgetAmout;
