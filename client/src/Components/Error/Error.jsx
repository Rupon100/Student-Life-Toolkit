import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Error = () => {
    useEffect(() => {
        document.title = 'Error'
    }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Error Code */}
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-lg md:text-2xl text-gray-700 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error;
