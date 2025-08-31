import React from "react";
import overview from "../../assets/images/statistics.png";
import budget from "../../assets/images/budget.png";
import studyPlanner from "../../assets/images/pencil.png";
import quiz from "../../assets/images/quiz.png";
import day from "../../assets/images/2025.png";
import { NavLink } from "react-router";

const CommonNav = () => {
  return (
    <div className="">
      <div className="max-w-5xl border rounded-full mx-auto flex md:overflow-visible justify-between md:justify-between items-center gap-4 md:gap-6 p-2">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-2 rounded-full transition ${
              isActive ? "border border-slate-400" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 md:h-8 md:w-8 object-contain" src={overview} alt="overview" />
        </NavLink>

        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `p-2 rounded-full transition ${
              isActive ? "border border-slate-400" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 md:h-8 md:w-8 object-contain" src={day} alt="classes" />
        </NavLink>

        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `p-2 rounded-full transition ${
              isActive ? "border border-slate-400" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 md:h-8 md:w-8 object-contain" src={budget} alt="budget" />
        </NavLink>

        <NavLink
          to="/planner"
          className={({ isActive }) =>
            `p-2 rounded-full transition ${
              isActive ? "border border-slate-400" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 md:h-8 md:w-8 object-contain" src={studyPlanner} alt="planner" />
        </NavLink>

        <NavLink
          to="/quiz"
          className={({ isActive }) =>
            `p-2 rounded-full transition ${
              isActive ? "border border-slate-400" : "hover:bg-gray-100"
            }`
          }
        >
          <img className="h-6 w-6 md:h-8 md:w-8 object-contain" src={quiz} alt="quiz" />
        </NavLink>
      </div>
    </div>
  );
};

export default CommonNav;
