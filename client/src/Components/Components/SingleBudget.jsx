import React from "react";

const SingleBudget = ({ budget, index }) => {
    const {incomeType, category, amount, date} = budget;
  return (
    <tr>
      <th>{index + 1}</th>
      <td className={`${incomeType === 'saving' ? 'text-green-500' : 'text-red-500'}`} >{incomeType}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>{date}</td>
    </tr>
  );
};

export default SingleBudget;
