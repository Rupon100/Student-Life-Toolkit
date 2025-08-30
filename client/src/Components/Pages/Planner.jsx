import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import planner from "../../assets/images/statistics.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Planner = () => {
  // Dummy tasks
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  // New task form state
  const [newTask, setNewTask] = useState({
    subject: "",
    task: "",
    difficulty: "Easy",
    status: "Not Started",
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
  });

  useEffect(() => {
    console.log(allTask);
  }, [allTask]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { ...newTask, user: user?.email };
    console.log(task);

    axios.post("http://localhost:4080/plan", task).then((res) => {
      console.log(res?.data);
      if (res?.data?.insertedId) {
        refetch();
        setNewTask({
          subject: "",
          task: "",
          difficulty: "Easy",
          status: "Not Started",
        });
        toast.success("Task added to DB!");
      }
    });
  };

  // handle status change for progress
  const handleStatusChange = (id, value) => {
    console.log(`change for ${id} - ${value}`);
    axios.put(`http://localhost:4080/plan`, { id, value }).then((res) => {
      console.log(res?.data);
      if (res?.data?.modifiedCount > 0) {
        refetch();
        toast.success("Progress Updated!!");
      }
    });
  };


  // manage progress
  const getProgress = (status) => {
    switch(status){
        case "Not Started":
            return 10;
        case "In Progress":
            return 50;
        case "Completed":
            return 100;
        default:
            return 0;             
    }
  }


  if (isLoading) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  return (
    <div className="min-h-screen flex flex-col flex-start p-4">
      <CommonNav />
      <div className="p-6 md:p-10 flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-8 w-8 md:h-10 md:w-10"
            src={planner}
            alt="planner"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Study Planner</h1>
        </div>

        {/* Add New Task Form */}
        <form
          onSubmit={handleAddTask}
          className="w-full max-w-3xl mt-6 p-4 rounded-lg  space-y-3 shadow-md"
        >
          {/* <h2 className="font-semibold text-lg">Add New Task</h2> */}
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
          <input
            type="text"
            placeholder="Task Name"
            className="w-full border rounded-lg px-3 py-2"
            value={newTask.task}
            onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
            required
          />
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
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            type="submit"
            className="w-full btn btn-neutral text-white font-semibold py-2 rounded-lg"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="w-full max-w-3xl mt-6 space-y-4">
          {allTask.map((task) => (
            <div
              key={task._id}
              className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition  `}
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
                      : "bg-red-500" // Hard
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
                  className={`h-4 rounded-full bg-green-500`}
                  style={{ width: `${getProgress(task?.status)}%` }}
                ></div>
              </div>

              {/* forth row value */}
              <p className="text-sm mt-1">
                {getProgress(task?.status)}% completed - {task.status}
              </p>


              {/* fifth row option for status */}
              <select
              disabled={task?.status === "Completed"}
                value={task.status}
                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                className="mt-2 w-full border rounded-lg px-3 py-2"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
