import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Pages/Dashboard";
import Classes from "./Components/Pages/Classes";
import Budget from "./Components/Pages/Budget";
import Planner from "./Components/Pages/Planner";
import Quiz from "./Components/Pages/Quiz";
import GlobalTimer from "./Components/Common/GlobalTimer";
import Login from "./Components/Pages/Login";
import Register from "./Components/Pages/Register";
import PrivateRoute from "./AuthProvider/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { CiTimer } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Error from "./Components/Error/Error";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [timerOpen, setTimerOpen] = useState(false);
  console.log(timerOpen);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />

          {/* pomodro timer here */}
          <div>
            <button
              onClick={() => setTimerOpen(!timerOpen)}
              className="btn btn-circle btn-neutral fixed bottom-5 left-5 md:bottom-10 md:left-10 z-100"
            >
              {timerOpen ? <IoCloseOutline /> : <CiTimer />}
            </button>

            {timerOpen && (
              <div
                className={`fixed inset-0 flex justify-center items-center min-h-screen transition-opacity duration-500 ease-in-out transform
                  ${timerOpen ? "opacity-100 bg-gray-200/5 backdrop-blur-md z-50" : "opacity-0 pointer-events-none"}`}
              >
                <GlobalTimer />
              </div>
            )}
          </div>

          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route
              path="/classes"
              element={
                <PrivateRoute>
                  <Classes></Classes>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/budget"
              element={
                <PrivateRoute>
                  <Budget></Budget>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/planner"
              element={
                <PrivateRoute>
                  <Planner></Planner>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <Quiz></Quiz>
                </PrivateRoute>
              }
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signin" element={<Register></Register>}></Route>
            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
