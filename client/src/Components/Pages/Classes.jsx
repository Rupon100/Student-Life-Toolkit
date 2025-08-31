import React, { useEffect, useState } from "react";
import useAuth from "../../AuthProvider/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import CommonNav from "../Common/CommonNav";
import dayy from "../../assets/images/2025.png";
import Class from "./Class";
import CommonTitle from "../Common/CommonTitle";

const Classes = () => {
  const [day, setDay] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
      document.title = 'StudyEase | Classes'
    }, [])

  // subject color
  const subjectColors = [
    "#ef4444", // red
    "#f59e0b", // amber
    "#10b981", // green
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#14b8a6", // teal
    "#f43f5e", // rose
  ];

  // subject with match color
  const subjects = [
    { name: "Mathematics", color: subjectColors[0] },
    { name: "Physics", color: subjectColors[1] },
    { name: "Computer Science", color: subjectColors[2] },
    { name: "Chemistry", color: subjectColors[3] },
    { name: "Biology", color: subjectColors[4] },
    { name: "Economics", color: subjectColors[5] },
  ];

  // add a class
  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const instructor = form.instructor.value;
    const startTime = form.initial_time.value;
    const endTime = form.ending_time.value;
    const schedule = {
      user: user?.email,
      subject: selectedSubject,
      instructor,
      day,
      startTime,
      endTime,
      color: selectedColor,
    };
   
    axios.post("http://localhost:4080/classes", schedule).then((res) => {
      if (res?.data?.insertedId) {
        refetch();
        toast.success("Class added to schedule!");
        form.reset();
      }
    });
  };

  const {
    data: classes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["classes", user?.email, day, start, end],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4080/classes/${user?.email}`
      );
      return res.json();
    },
    // enabled: !!day && !!user?.email,
  });

 


  return (
    <div className="min-h-screen flex flex-col flex-start p-4">
      {/* common nav */}
      <CommonNav></CommonNav>

      <div className="p-6 md:p-10 flex flex-col justify-center items-center">
        {/* title for the page */}
        <CommonTitle image={dayy} title={`Classes Schedule`} ></CommonTitle>

        {/* input form */}
        <form
          onSubmit={(e) => handleAdd(e)}
          className="flex flex-col gap-2 w-full  max-w-xl shadow-md p-6 rounded-xl"
        >
          {/* // subject choice */}
          <select
            name="subject"
            value={selectedSubject}
            onChange={(e) => {
              const subjectName = e.target.value;
              setSelectedSubject(subjectName);

              // auto-pick color from array
              const found = subjects.find((s) => s.name === subjectName);
              setSelectedColor(found?.color || "#3b82f6");
            }}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Subject</option>
            {subjects.map((s, idx) => (
              <option key={idx} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            name="instructor"
            type="text"
            placeholder="Instructor"
            required
            className="border p-2 rounded"
          />
          <select
            onChange={(e) => setDay(e.target.value)}
            required
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
          onChange={(e) => setStart(e.target.value)}
            name="initial_time"
            type="time"
            required
            className="border p-2 rounded"
          />

          <input
          onChange={(e) => setEnd(e.target.value)}
            name="ending_time"
            type="time"
            required
            className="border p-2 rounded"
          />
          <input className="btn btn-neutral" type="submit" value="Add" />
        </form>

        <div>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : error ? (
            toast.error("Something Wrong!!")
          ) : (
            classes?.map((cls, i) => <Class key={i} cls={cls} refetch={refetch} ></Class>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
