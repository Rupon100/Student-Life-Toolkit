import React from "react";

const CommonTitle = ({ image, title }) => {
  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      <img className="h-8 w-8 md:h-10 md:w-10" src={image} alt="planner" />
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default CommonTitle;
