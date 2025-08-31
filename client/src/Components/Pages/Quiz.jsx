import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import quiz from "../../assets/images/quiz.png";
import useAuth from "../../AuthProvider/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const Quiz = () => {
  const { user } = useAuth();
  const [quizs, setQuizs] = useState({
    user: user?.email,
    subject: "",
    difficulty: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiData, setAiData] = useState([]);

  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["quizs", quizs?.subject, quizs?.difficulty],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4080/quizes?subject=${quizs.subject}&difficulty=${quizs.difficulty}`
      );
      return res.json();
    },
    enabled: false,
  });

  console.log(data);

  const handleQuizManual = () => {
    if (!quizs.subject || !quizs.difficulty) {
      toast.error("Please fill up the form first!!");
      return;
    }

    refetch();
  };

   
  const handleQuizAi = async () => {
    if (!quizs.subject || !quizs.difficulty) {
      toast.error("Please fill up the form first!!");
      return;
    }

    try {
      setIsOpen(true);
      setAiLoading(true);

      const res = await axios.post(`http://localhost:4080/quiz-ai`, {
        subject: quizs?.subject,
        difficulty: quizs?.difficulty,
      });

      console.log(res.data);
      setAiData(res.data.quiz); // 👈 store quiz in state
    } catch (error) {
      console.log(error);
      toast.error("AI failed to generate quiz");
    } finally {
        refetch(); // refetch the form
      setAiLoading(false);
    }
  };

  console.log(isOpen);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col flex-start p-4 ">
      <CommonNav></CommonNav>
      <div className="p-6 md:p-10 flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center gap-2 mb-6">
          <img className="h-8 w-8 md:h-10 md:w-10" src={quiz} alt="planner" />
          <h1 className="text-2xl md:text-3xl font-bold">Exam Q&A</h1>
        </div>

        {/* form here */}
        <form className="w-full mb-4 md:mb-8 lg:mb-10 max-w-xl bg-white p-6 rounded-2xl shadow-md">
          {/* Subject Choice */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Select Subject</label>
            <select
              onChange={(e) =>
                setQuizs({
                  ...quizs,
                  subject: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="">Choose Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
              <option value="computer">Computer</option>
            </select>
          </div>

          {/* Difficulty Level */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Difficulty Level</label>
            <select
              onChange={(e) =>
                setQuizs({
                  ...quizs,
                  difficulty: e.target.value,
                })
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="">Choose Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-6">
            <button
              onClick={handleQuizAi}
              type="button"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer transition"
            >
              Generate with AI
            </button>
            <button
              onClick={handleQuizManual}
              type="button"
              className="flex-1 bg-black text-white py-2 px-4 rounded-lg cursor-pointer transition"
            >
              Generate Manually
            </button>
          </div>
          <span className="text-xs italic pt-1 text-red-500">
            For AI: Please don’t generate too many quizzes at once — limit reached may stop it for everyone.
          </span>
        </form>

        {/* show mcq here */}
        <div className="w-full max-w-2xl">
          {data.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No quiz found.</p>
          )}
          {data.map((singleQuiz, idx) => (
            <div
              key={singleQuiz._id}
              className="mb-4 p-4 border rounded-xl shadow-sm bg-white"
            >
              <p className="font-semibold mb-2">
                {idx + 1}. {singleQuiz.question}
              </p>
              <ul className="list-disc list-inside mb-2">
                {singleQuiz.options.map((opt, i) => (
                  <li key={i} className="text-gray-700 list-decimal">
                    {opt}
                  </li>
                ))}
              </ul>
              <p className="text-green-500 font-medium">
                Answer: {singleQuiz.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}

        {isOpen && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-scroll">
              <h2 className="text-xl font-bold mb-4 text-center">
                AI Generated Quiz
              </h2>

              {aiLoading ? (
                <div className="flex justify-center items-center py-10">
                  <span className="loading loading-spinner loading-lg"></span>
                  <p className="ml-3 text-gray-600">
                    AI is preparing quiz be patient...
                  </p>
                </div>
              ) : (
                <div className="space-y-4 ">
                  {aiData.map((q, idx) => (
                    <div key={idx} className="p-4 border rounded-xl bg-gray-50">
                      <p className="font-semibold">
                        {idx + 1}. {q.question}
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        {q.options.map((opt, i) => (
                          <li key={i} className="text-gray-700">
                            {opt}
                          </li>
                        ))}
                      </ul>
                      <p className="text-green-600 font-medium mt-2">
                        Answer: {q.correctAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <button
                  className="px-4 py-1 bg-black cursor-pointer text-white rounded-lg hover:bg-slate-600"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
