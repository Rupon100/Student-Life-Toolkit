import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import planner from "../../assets/images/statistics.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CommonTitle from "../Common/CommonTitle";

const Planner = () => {
  const { user, loading: authLoading } = useAuth();

  // custom title
  useEffect(() => {
    document.title = "StudyEase | Planner";
  }, []);

  // New task form state
  const [newTask, setNewTask] = useState({
    subject: "",
    task: "",
    difficulty: "Easy",
    status: "Not Started",
    priority: "Medium",
    deadline: "",
  });

  // get all task
  const {
    data: allTask = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4080/plan/${user?.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  const sortedTask = [...allTask].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  // task add
  const handleAddTask = (e) => {
    e.preventDefault();

    if (newTask?.deadline && new Date(newTask?.deadline) < new Date()) {
      return toast.error("Deadline cannot be in past!");
    }

    const task = { ...newTask, user: user?.email };

    axios
      .post("http://localhost:4080/plan", task)
      .then((res) => {
        if (res?.data?.insertedId) {
          refetch();
          setNewTask({
            subject: "",
            task: "",
            difficulty: "Easy",
            status: "Not Started",
            deadline: "",
          });
          toast.success("Task added to DB!");
        }
      })
      .catch(() => {
        toast.error("Failed to add task!");
      });
  };

  // handle status change for progress
  const handleStatusChange = (id, value) => {
    axios
      .put(`http://localhost:4080/plan`, { id, value })
      .then((res) => {
        if (res?.data?.modifiedCount > 0) {
          refetch();
          toast.success("Progress Updated!!");
        }
      })
      .catch(() => toast.error("Failed to update status!"));
  };

  // manage progress
  const getProgress = (status) => {
    switch (status) {
      case "Not Started":
        return 10;
      case "In Progress":
        return 50;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  // calculate remaining day || time
  const getRemainingTime = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const due = new Date(deadline);
    const diffTime = Math.ceil((due - today) / (24 * 60 * 60 * 1000));
    return diffTime >= 0 ? diffTime : null;
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col flex-start p-4">
      {/* common nav for page */}
      <CommonNav></CommonNav>
      <div className="p-6 md:p-10 flex flex-col justify-center items-center w-full">
        {/* title for study planner */}
        <CommonTitle image={planner} title={`Study Planner`}></CommonTitle>

        {/* Add New Task Form */}
        <form
          onSubmit={handleAddTask}
          className="w-full max-w-xl p-4 rounded-lg  space-y-3 shadow-md"
        >
          {/* <h2 className="font-semibold text-lg">Add New Task</h2> */}
          {/* choose subject from here */}
          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg px-3 py-2"
            value={newTask.subject}
            onChange={(e) =>
              setNewTask({ ...newTask, subject: e.target.value })
            }
            required
          />
          {/* task name */}
          <input
            type="text"
            placeholder="Task Name"
            className="w-full border rounded-lg px-3 py-2"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            required
          />

          {/* difficulty level */}
          <select
            value={newTask.difficulty}
            onChange={(e) =>
              setNewTask({ ...newTask, difficulty: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* progress of task */}
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* deadline */}
          <input
            className="w-full border rounded-lg px-3 py-2"
            type="date"
            name="status"
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full btn btn-neutral text-white font-semibold py-2 rounded-lg"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="w-full max-w-3xl mt-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            sortedTask.map((task) => {
              const remaining = getRemainingTime(task.deadline);

              return (
                <div
                  key={task._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* first row */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{task.subject}</h2>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        task.difficulty === "Easy"
                          ? "bg-green-400"
                          : task.difficulty === "Medium"
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                    >
                      {task.difficulty}
                    </span>
                  </div>

                  {/* second row */}
                  <p className="text-gray-600">{task.task}</p>

                  {/* third row----progress */}
                  <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
                    <div
                      className="h-4 rounded-full bg-green-500"
                      style={{ width: `${getProgress(task.status)}%` }}
                    ></div>
                  </div>

                  {/* forth row value */}
                  <p className="text-sm mt-1">
                    {getProgress(task.status)}% completed - {task.status}
                  </p>

                  {/* deadline content */}
                  {task.deadline && (
                    <p
                      className={`text-sm mt-1 ${
                        remaining !== null && remaining <= 2
                          ? "text-red-500 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      Deadline: {new Date(task.deadline).toLocaleDateString()}{" "}
                      {remaining !== null &&
                        `(Due in ${remaining} day${
                          remaining === 1 ? "" : "s"
                        })`}
                    </p>
                  )}

                  {/* fifth row option for status */}
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task._id, e.target.value)
                    }
                    className="mt-2 w-full border rounded-lg px-3 py-2"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Planner;
