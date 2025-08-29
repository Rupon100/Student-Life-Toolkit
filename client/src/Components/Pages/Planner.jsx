// import React from "react";
// import CommonNav from "../Common/CommonNav";
// import planner from "../../assets/images/statistics.png";

// const Planner = () => {
//   return (
//     <div className="min-h-screen flex flex-col flex-start p-4">
//       <CommonNav></CommonNav>
//       <div className="p-6 md:p-10 flex flex-col justify-center items-center">
//         <div className="flex justify-center items-center gap-2">
//           <img
//             className="h-8 w-8 md:h-10 md:w-10"
//             src={planner}
//             alt="overview image"
//           />
//           <h1 className="text-2xl md:text-3xl font-bold">Study Planner</h1>
//         </div>
//         <div>
//             planner
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Planner;
 










// import React, { useState } from "react";
// import CommonNav from "../Common/CommonNav";
// import planner from "../../assets/images/statistics.png";

// const Planner = () => {
//   // Dummy tasks
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       subject: "Math",
//       task: "Chapter 1 Exercises",
//       difficulty: "Easy",
//       status: "Not Started",
//       progress: 10,
//     },
//     {
//       id: 2,
//       subject: "Physics",
//       task: "Lab Notes",
//       difficulty: "Medium",
//       status: "In Progress",
//       progress: 30,
//     },
//     {
//       id: 3,
//       subject: "Chemistry",
//       task: "Revision",
//       difficulty: "Hard",
//       status: "Completed",
//       progress: 100,
//     },
//   ]);

//   // Status update
//   const handleStatusChange = (id, newStatus) => {
//     setTasks(prev =>
//       prev.map(task =>
//         task.id === id
//           ? {
//               ...task,
//               status: newStatus,
//               progress:
//                 newStatus === "Not Started"
//                   ? 0
//                   : newStatus === "In Progress"
//                   ? 25
//                   : 100,
//             }
//           : task
//       )
//     );
//   };

//   // Color for difficulty
//   const getDifficultyColor = (diff) => {
//     switch (diff) {
//       case "Easy":
//         return "bg-green-400";
//       case "Medium":
//         return "bg-yellow-400";
//       case "Hard":
//         return "bg-red-400";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col flex-start p-4">
//       <CommonNav />
//       <div className="p-6 md:p-10 flex flex-col justify-center items-center w-full">
//         <div className="flex justify-center items-center gap-2">
//           <img
//             className="h-8 w-8 md:h-10 md:w-10"
//             src={planner}
//             alt="planner"
//           />
//           <h1 className="text-2xl md:text-3xl font-bold">Study Planner</h1>
//         </div>

//         <div className="w-full max-w-3xl mt-6 space-y-4">
//           {tasks.map(task => (
//             <div
//               key={task.id}
//               className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="font-semibold text-lg">{task.subject}</h2>
//                 <span
//                   className={`px-2 py-1 rounded text-white text-sm ${getDifficultyColor(
//                     task.difficulty
//                   )}`}
//                 >
//                   {task.difficulty}
//                 </span>
//               </div>
//               <p className="text-gray-600">{task.task}</p>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
//                 <div
//                   className={`h-4 rounded-full ${
//                     task.progress < 50
//                       ? "bg-blue-400"
//                       : task.progress < 100
//                       ? "bg-yellow-500"
//                       : "bg-green-500"
//                   }`}
//                   style={{ width: `${task.progress}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm mt-1">
//                 {task.progress}% completed - {task.status}
//               </p>

//               {/* Status Selector */}
//               <select
//                 value={task.status}
//                 onChange={(e) => handleStatusChange(task.id, e.target.value)}
//                 className="mt-2 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
//               >
//                 <option value="Not Started">Not Started</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Completed">Completed</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Planner;














import React, { useState } from "react";
import CommonNav from "../Common/CommonNav";
import planner from "../../assets/images/statistics.png";

const Planner = () => {
  // Dummy tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      subject: "Math",
      task: "Chapter 1 Exercises",
      difficulty: "Easy",
      status: "Not Started",
      progress: 10,
    },
    {
      id: 2,
      subject: "Physics",
      task: "Lab Notes",
      difficulty: "Medium",
      status: "In Progress",
      progress: 30,
    },
    {
      id: 3,
      subject: "Chemistry",
      task: "Revision",
      difficulty: "Hard",
      status: "Completed",
      progress: 100,
    },
  ]);

  // New task form state
  const [newTask, setNewTask] = useState({
    subject: "",
    task: "",
    difficulty: "Easy",
    status: "Not Started",
  });

  // Handle status change for existing tasks
  const handleStatusChange = (id, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              status: newStatus,
              progress:
                newStatus === "Not Started"
                  ? 0
                  : newStatus === "In Progress"
                  ? 25
                  : 100,
            }
          : task
      )
    );
  };

  // Difficulty color helper
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy":
        return "bg-green-400";
      case "Medium":
        return "bg-yellow-400";
      case "Hard":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  // Handle adding new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.subject || !newTask.task) return;

    const id = tasks.length + 1;
    const progress =
      newTask.status === "Not Started"
        ? 0
        : newTask.status === "In Progress"
        ? 25
        : 100;

    setTasks(prev => [...prev, { ...newTask, id, progress }]);
    setNewTask({ subject: "", task: "", difficulty: "Easy", status: "Not Started" });
  };

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
          className="w-full max-w-3xl mt-6 p-4 rounded-lg  space-y-3"
        >
          {/* <h2 className="font-semibold text-lg">Add New Task</h2> */}
          <input
            type="text"
            placeholder="Subject"
            className="w-full border rounded-lg px-3 py-2"
            value={newTask.subject}
            onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
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
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
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
          {tasks.map(task => (
            <div
              key={task.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{task.subject}</h2>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${getDifficultyColor(
                    task.difficulty
                  )}`}
                >
                  {task.difficulty}
                </span>
              </div>
              <p className="text-gray-600">{task.task}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
                <div
                  className={`h-4 rounded-full ${
                    task.progress < 50
                      ? "bg-blue-400"
                      : task.progress < 100
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {task.progress}% completed - {task.status}
              </p>

              {/* Status Selector */}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
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
