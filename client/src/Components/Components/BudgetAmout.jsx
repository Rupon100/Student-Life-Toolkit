import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { NavLink } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useAuth from "../../AuthProvider/useAuth";
import SingleBudget from "./SingleBudget";
import BudgetGraph from "./BudgetGraph";

const BudgetAmout = () => {
  const { user, setBudgetDetails } = useAuth();

  const { data: budgets, isLoading } = useQuery({
    queryKey: ["budget", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4080/budget/${user?.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if(budgets){

      setBudgetDetails(budgets);
    }

  }, [user?.email, budgets])

  console.log(budgets);


  if (isLoading) {
  return <span className="loading loading-spinner loading-md" ></span>;
}


  return (
    <div className="p-4">
      <Tabs className={`w-full flex flex-col justify-center items-center`}>
        <TabList className={`flex gap-2`}>
          <Tab>
            <button className="btn btn-neutral">Budget Graph</button>
          </Tab>
          <Tab>
            <button className="btn btn-neutral">Budget Details</button>
          </Tab>
        </TabList>

        {/* tab panel for budget graph */}
        <TabPanel className={`w-full`} >
          <BudgetGraph></BudgetGraph>
        </TabPanel>

        {/* tab panel for budget details */}
        <TabPanel>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : budgets && budgets.length > 0 ? (
            <div className="overflow-x-auto w-full rounded-box border border-base-content/5 bg-base-100 m-4 ">
              <table className="table w-full border">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.map((budget, i) => (
                    <SingleBudget
                      key={budget?._id}
                      budget={budget}
                      index={i}
                    ></SingleBudget>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>No Data available</h2>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BudgetAmout;
