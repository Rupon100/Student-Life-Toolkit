import React, { useState } from "react";
import classes from "../../assets/images/2025.png";
import { Link } from "react-router";
import overview from "../../assets/images/statistics.png";
import budget from "../../assets/images/budget.png";
import studyPlanner from "../../assets/images/pencil.png";
import quiz from "../../assets/images/quiz.png";

const Classes = () => {

  const [ day, setDay ] = useState(null);


  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const instructor = form.instructor.value;
    const startTime = form.initial_time.value;
    const endTime = form.ending_time.value;
    const schedule = { subject, instructor, day, startTime, endTime };
    console.log(schedule)
  }

  return (
    <div className="min-h-screen flex flex-col flex-start p-4">
      {/* link  */}
      <div className="border flex justify-center items-center gap-4 md:gap-8 w-fit mx-auto p-2 rounded-2xl">
        <Link to={"/"}>
          <img className="h-8 w-8" src={overview} alt="overview image" />
        </Link>
        <div className="divider divider-horizontal"></div>
        <Link to={"/budget"}>
          <img className="h-8 w-8" src={budget} alt="overview image" />
        </Link>
        <div className="divider divider-horizontal"></div>
        <Link to={"/planner"}>
          <img className="h-8 w-8" src={studyPlanner} alt="overview image" />
        </Link>
        <div className="divider divider-horizontal"></div>
        <Link to={"/quiz"}>
          <img className="h-8 w-8" src={quiz} alt="overview image" />
        </Link>
      </div>


      
      <div className="p-6 md:p-10 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          <img
            className="h-8 w-8 md:h-10 md:w-10"
            src={classes}
            alt="overview image"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Classes Schedule</h1>
        </div>

        {/* input form */}
        <form onSubmit={(e) => handleAdd(e)} className="flex flex-col gap-2 w-full my-6">
          <input
          name="subject"
            type="text"
            placeholder="Subject Code (example:  MAT241)"
            required
            className="border p-2 rounded"
          />
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
          name="initial_time"
            type="time"
            // value={startTime}
            // onChange={(e) => setStartTime(e.target.value)}
            required
            className="border p-2 rounded"
          /> 
        
          <input
          name="ending_time"
            type="time"
            // value={endTime}
            // onChange={(e) => setEndTime(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input className="btn btn-neutral" type="submit" value="Add" />
        </form>

        <div>show all the classes list</div>
      </div>
    </div>
  );
};

export default Classes;
