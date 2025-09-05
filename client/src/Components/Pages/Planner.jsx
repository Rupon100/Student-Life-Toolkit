import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import planner from "../../assets/images/statistics.png";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CommonTitle from "../Common/CommonTitle";
import TaskChild from "../Components/TaskChild";

const Planner = () => {
  const { user, loading: authLoading } = useAuth();
  const [isTaskAddLoading, setIsTaskAddLoading] = useState(false);

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
      const res = await fetch(
        `https://server-nu-roan.vercel.app/plan/${user?.email}`
      );
      return res.json();
    },
    enabled: !!user?.email,
  });

  // task sorted
  const sortedTask = [...allTask].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  // task add to db
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (newTask?.deadline && new Date(newTask?.deadline) < new Date()) {
      return toast.error("Deadline cannot be in past and today!");
    }
    setIsTaskAddLoading(true);

    const task = { ...newTask, user: user?.email };

    try {
      const res = await axios.post(
        "https://server-nu-roan.vercel.app/plan",
        task
      );
      if (res?.data?.insertedId) {
        refetch();
        setNewTask({
          subject: "",
          task: "",
          difficulty: "Easy",
          status: "Not Started",
          priority: "Medium",
          deadline: "",
        });
        toast.success("Task added to DB!");
      } else {
        toast.error("Failed to add task!");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later!");
    } finally {
      setIsTaskAddLoading(false);
    }
  };

  // handle delete task
  const handleDeleteTask = async (id) => {
    try{
      const res = await axios.delete(`https://server-nu-roan.vercel.app/task/${id}`);
      if(res?.data?.deletedCount > 0){
        refetch();
        return toast.success("Task deleted from the DB!");
      }
    }catch(err){
       
      toast.error(err.message);
    }

  }

  // handle status change for progress
  const handleStatusChange = (id, value) => {
    axios
      .put(`https://server-nu-roan.vercel.app/plan`, { id, value })
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

  // loading for auth
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
            value={newTask.deadline}
            onChange={(e) =>
              setNewTask({ ...newTask, deadline: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={isTaskAddLoading}
            className="w-full btn btn-neutral text-white font-semibold py-2 rounded-lg"
          >
            {isTaskAddLoading ? "Adding Task..." : "Add Task"}
          </button>
        </form>

        {/* Task List */}
        <div className="w-full max-w-3xl mt-6 space-y-4">
          {isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            sortedTask.map((task) => (
              <TaskChild 
              key={task._id}
              task={task}
              handleStatusChange={handleStatusChange}
              getProgress={getProgress}
              getRemainingTime={getRemainingTime}
              handleDeleteTask={handleDeleteTask}
              > </TaskChild>
          
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
 