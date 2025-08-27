import React from "react";
import { Link } from "react-router-dom";
import overview from "../../assets/images/statistics.png";
import calender from "../../assets/images/2025.png";
import budget from "../../assets/images/budget.png";
import planner from "../../assets/images/pencil.png";
import quiz from "../../assets/images/quiz.png";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 md:p-10">
        <div className="flex flex-start">
          <div className="flex justify-center items-center gap-2">
            <img
              className="h-8 w-8 md:h-10 md:w-10"
              src={overview}
              alt="overview image"
            />
            <h1 className="text-2xl md:text-3xl font-bold">
              Dashboard Overview
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4 md:py-6">
          {/* Classes Card */}
          <Link
            to="/classes"
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src={calender}
                alt="classes date image"
              />
              <h2 className="text-lg md:text-xl font-semibold">Classes</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Next class: <span className="font-medium">Math 10:00 AM</span>
            </p>
            <span className="mt-4 text-sm text-blue-500 font-medium">
              View Schedule →
            </span>
          </Link>

          {/* Budget Card */}
          <Link
            to="/budget"
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex gap-2 items-center">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src={budget}
                alt="budget icon"
              />

              <h2 className="text-lg md:text-xl font-semibold">Budget</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Balance: <span className="font-medium">$320</span>
            </p>
            <span className="mt-4 text-sm text-green-500 font-medium">
              Manage Money →
            </span>
          </Link>

          {/* Planner Card */}
          <Link
            to="/planner"
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex gap-2 items-center">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src={planner}
                alt="planner icon"
              />
              <h2 className="text-lg md:text-xl font-semibold">Study Planner</h2>
            </div>
            <p className="text-gray-600 mt-2">
              Upcoming: <span className="font-medium">Physics Assignment</span>
            </p>
            <span className="mt-4 text-sm text-purple-500 font-medium">
              Plan Tasks →
            </span>
          </Link>

          {/* Quiz Card */}
          <Link
            to="/quiz"
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <img
                className="h-6 w-6 md:h-8 md:w-8"
                src={quiz}
                alt="quiz icon"
              />
              <h2 className="text-lg md:text-xl font-semibold">Quiz</h2>
            </div>
            <p className="text-gray-600 mt-2">Practice with AI questions</p>
            <span className="mt-4 text-sm text-orange-500 font-medium">
              Start Quiz →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
