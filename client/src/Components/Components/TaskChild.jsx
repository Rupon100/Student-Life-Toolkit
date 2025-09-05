import React, { useState, useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

const TaskChild = ({
  task,
  handleStatusChange,
  getProgress,
  getRemainingTime,
  handleDeleteTask
}) => {
  const [status, setStatus] = useState(task.status);
  const remaining = getRemainingTime(task.deadline);

  // keep in sync with parent when parent data changes
  useEffect(() => {
    setStatus(task.status);
  }, [task.status]);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus); // update local
    handleStatusChange(task._id, newStatus); // notify Planner + Server
  };

  return (
    <div
      className={`border relative rounded-lg p-4 shadow-sm hover:shadow-md transition ${
        status === "Completed" ? "bg-green-50 border-green-300" : ""
      }`}
    >
      <div
        className={`${
          status === "Completed"
            ? "absolute h-7 w-7 rounded-full bg-white border -top-2 -right-2 flex justify-center items-center"
            : "hidden"
        }`}
      >
        <FcCheckmark size={20} />
      </div>
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

      <p className="text-gray-600">{task.task}</p>

      {/* progress */}
      <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
        <div
          className="h-4 rounded-full bg-green-500"
          style={{ width: `${getProgress(status)}%` }}
        ></div>
      </div>

      <p className="text-sm mt-1">
        {getProgress(status)}% completed – {status}
      </p>

      {/* deadline */}
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
            `(Due in ${remaining} day${remaining === 1 ? "" : "s"})`}
        </p>
      )}

      {/* dropdown */}
      <select
        value={status}
        disabled={status === "Completed"}
        onChange={handleChange}
        className="mt-2 w-full border rounded-lg px-3 py-2"
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* delete button only if completed */}
        {status === "Completed" && (
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="flex cursor-pointer mt-3 items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition"
          >
            <MdDelete size={18} /> Delete
          </button>)}
    </div>
  );
};

export default TaskChild;
