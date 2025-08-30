import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import quiz from "../../assets/images/quiz.png";
import useAuth from "../../AuthProvider/useAuth";

const Quiz = () => {
    const { user } = useAuth();
    const [quizs, setQuizs] = useState({
        user: user?.email,
        subject: "computer",
        difficulty: "easy"
    })

    const handleQuizManual = () => {
        // e.preventDefault()
        console.log(quizs)
    }

  return (
    <div className="min-h-screen flex flex-col flex-start p-4">
      <CommonNav></CommonNav>
      <div className="p-6 md:p-10 flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center gap-2 mb-6">
          <img className="h-8 w-8 md:h-10 md:w-10" src={quiz} alt="planner" />
          <h1 className="text-2xl md:text-3xl font-bold">Exam Q&A</h1>
        </div>

        {/* form here */}
        <form  className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          {/* Subject Choice */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Select Subject</label>
            <select 
            onChange={(e) => setQuizs({
                ...quizs, 
                subject: e.target.value
            })}
            className="w-full border rounded-lg p-2">
              <option value="">Choose Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="computer">Computer</option>
            </select>
          </div>

          {/* Difficulty Level */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Difficulty Level</label>
            <select 
            onChange={(e) => setQuizs({
                ...quizs, 
                difficulty: e.target.value
            })}
            className="w-full border rounded-lg p-2">
              <option value="">Choose Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              type="button"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Generate with AI
            </button>
            <button
            onClick={handleQuizManual}
              type="button"
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Generate Manually
            </button>
          </div>
          <span className="text-xs italic pt-1 text-slate-500" >Note: AI answer will not save result</span>
        </form>
        
      </div>
    </div>
  );
};

export default Quiz;
