import { Link, useNavigate } from "react-router-dom";
import overview from "../../assets/images/statistics.png";
import calender from "../../assets/images/2025.png";
import budget from "../../assets/images/budget.png";
import planner from "../../assets/images/pencil.png";
import quiz from "../../assets/images/quiz.png";
import useAuth from "../../AuthProvider/useAuth";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      toast.success("Logged Out!");
      navigate("/login");
    });
  };

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classesFirst", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:4080/classes/${user?.email}`);
      return res.json();
    },
    // enabled: !!day && !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        {" "}
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  console.log(classes[0]?.subject);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-base-100 shadow-md p-4 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl">StudyEase</h2>
        </div>

        <div className="flex gap-2">
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm btn-neutral">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-primary">
                Login
              </Link>
              <Link to="/signin" className="btn btn-sm btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="flex justify-center items-center flex-1">
        <div className="p-6 md:p-10 w-full max-w-6xl">
          <div className="flex items-center gap-4">
            <img className="h-8 w-8" src={overview} alt="overview" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4 md:py-6">
            {/* Classes Card */}
            <Link
              to="/classes"
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={calender}
                  alt="classes"
                />
                <h2 className="text-lg md:text-xl font-semibold">Classes</h2>
              </div>
              {/* <p className="text-gray-600 mt-2">
                Next class:{" "}
                <span className="font-medium">
                  {classes?.[0]?.subject} {classes?.[0]?.startTime}
                </span>
              </p> */}

              <p className="text-gray-600 mt-2">
                Next class:{" "}
                <span className="font-medium">
                  {classes?.length > 0
                    ? `${classes[0].subject} ${classes[0].startTime}`
                    : "No classes available"}
                </span>
              </p>

              <span className="mt-4 text-sm text-blue-500 font-medium">
                View Schedule →
              </span>
            </Link>

            {/* Budget Card */}
            <Link
              to="/budget"
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex gap-2 items-center">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={budget}
                  alt="budget"
                />
                <h2 className="text-lg md:text-xl font-semibold">Budget</h2>
              </div>
              <p className="text-gray-600 mt-2">
                Balance: <span className="font-medium">$320</span>
              </p>
              <span className="mt-4 text-sm text-green-500 font-medium">
                Manage Money →
              </span>
            </Link>

            {/* Planner Card */}
            <Link
              to="/planner"
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex gap-2 items-center">
                <img
                  className="h-6 w-6 md:h-8 md:w-8"
                  src={planner}
                  alt="planner"
                />
                <h2 className="text-lg md:text-xl font-semibold">
                  Study Planner
                </h2>
              </div>
              <p className="text-gray-600 mt-2">
                Upcoming:{" "}
                <span className="font-medium">Physics Assignment</span>
              </p>
              <span className="mt-4 text-sm text-purple-500 font-medium">
                Plan Tasks →
              </span>
            </Link>

            {/* Quiz Card */}
            <Link
              to="/quiz"
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex items-center gap-2">
                <img className="h-6 w-6 md:h-8 md:w-8" src={quiz} alt="quiz" />
                <h2 className="text-lg md:text-xl font-semibold">Quiz</h2>
              </div>
              <p className="text-gray-600 mt-2">Practice with AI questions</p>
              <span className="mt-4 text-sm text-orange-500 font-medium">
                Start Quiz →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
