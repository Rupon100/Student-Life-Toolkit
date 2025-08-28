// import React, { useState } from "react";
// import toast from "react-hot-toast";

// const Class = ({ cls, refetch }) => {
//   const { _id, day, instructor, subject, startTime, endTime, color } = cls;
//   const [open, setOpen] = useState(false);
   

//   const handleDelete = (id) => {
//     console.log(id);
//     fetch(`http://localhost:4080/class/${id}`, {
//         method: 'DELETE'
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         if(data?.deletedCount > 0){
//             refetch();
//             toast.success("Class is deleted!!!");
//         }
//     })
//   }


//   const handleEdit = (id) => {
//     console.log(id);
//     setOpen(true);
//   }


  

//   return (
//     <div 
//     className="p-4  my-2 min-w-xs w-full md:min-w-xl rounded-xl shadow-md border flex flex-col gap-2 text-black"
//       style={{ borderLeft: `8px solid ${color || "#6366f1"}` }} 
//     >
//       {/* Info */}
//       <div className="flex-1 space-y-1" >
//         <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-white bg-indigo-500 rounded-full">
//           {subject}
//         </span>
//         <p className="text-sm">📅 {day}</p>
//         <p className="text-sm">👨‍🏫 {instructor}</p>
//         <p className="text-sm">
//           ⏰ {startTime} – {endTime}
//         </p>
//       </div>

//       {/* Action buttons */}
//       <div className="flex gap-2 justify-center mt-2">
//         <button
//             onClick={() => handleEdit(_id)}
//           className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
//         >
//           Edit
//         </button>
//         <button
//             onClick={() => handleDelete(_id)}
//           className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
//         >
//           Delete
//         </button>
//       </div>



 

//     </div>
//   );
// };

// export default Class;










import React, { useState } from "react";
import toast from "react-hot-toast";

const Class = ({ cls, refetch }) => {
  const { _id, day, instructor, subject, startTime, endTime, color } = cls;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    day,
    instructor,
    subject,
    startTime,
    endTime,
    color
  });

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4080/class/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if(data?.deletedCount > 0){
      refetch();
      toast.success("Class deleted!");
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); // open modal
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4080/class/${_id}`, {
      method: 'PATCH', // only updating changed fields
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data);
    if(data?.modifiedCount > 0){
      toast.success("Class updated!");
      refetch();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div 
        className="p-4  my-2 min-w-xs w-full md:min-w-xl rounded-xl shadow-md border flex flex-col gap-2 text-black"
        style={{ borderLeft: `8px solid ${color || "#6366f1"}` }} 
      >
        {/* Info */}
        <div className="flex-1 space-y-1">
          <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-white bg-indigo-500 rounded-full">
            {subject}
          </span>
          <p className="text-sm">📅 {day}</p>
          <p className="text-sm">👨‍🏫 {instructor}</p>
          <p className="text-sm">⏰ {startTime} – {endTime}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-center mt-2">
          <button
            onClick={handleEdit}
            className="px-3 cursor-pointer py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="px-3 cursor-pointer py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-bluer bg-slate-800/60 bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg w-96 flex flex-col gap-3"
          >
            <h2 className="text-xl font-semibold">Update Class</h2>
            <span className="text-sm italic text-slate-300" >subject & instructor cant changeable!</span>

            <input
              type="text"
              placeholder="Subject"
              readOnly
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Instructor"
              readOnly
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="border p-2 rounded"
            />
            <select
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">Select Day</option>
              <option value="Mon">Mon</option>
              <option value="Tue">Tue</option>
              <option value="Wed">Wed</option>
              <option value="Thu">Thu</option>
              <option value="Fri">Fri</option>
              <option value="Sat">Sat</option>
              <option value="Sun">Sun</option>
            </select>

            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="border p-2 rounded"
            />

            <div className="flex gap-2 justify-end mt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Class;










