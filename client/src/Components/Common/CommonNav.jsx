import React from "react";
import overview from "../../assets/images/statistics.png";
import budget from "../../assets/images/budget.png";
import studyPlanner from "../../assets/images/pencil.png";
import quiz from "../../assets/images/quiz.png";
import day from '../../assets/images//2025.png';
import { Link, NavLink } from "react-router";

const CommonNav = () => {
  return (
    <div className="border flex justify-center items-center gap-4 md:gap-8 w-fit mx-auto p-2 rounded-2xl">
      <NavLink to={"/"}>
        <img className="h-8 w-8" src={overview} alt="overview image" />
      </NavLink>
      <div className="divider divider-horizontal"></div>
      <NavLink to={"/classes"}>
        <img className="h-8 w-8" src={day} alt="overview image" />
      </NavLink>
      <div className="divider divider-horizontal"></div>
      <NavLink to={"/budget"}>
        <img className="h-8 w-8" src={budget} alt="overview image" />
      </NavLink>
      <div className="divider divider-horizontal"></div>
      <NavLink to={"/planner"}>
        <img className="h-8 w-8" src={studyPlanner} alt="overview image" />
      </NavLink>
      <div className="divider divider-horizontal"></div>
      <NavLink to={"/quiz"}>
        <img className="h-8 w-8" src={quiz} alt="overview image" />
      </NavLink>
    </div>
  );
};

export default CommonNav;
