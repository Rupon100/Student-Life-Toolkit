import React, { useState, useEffect, useRef } from "react";
import { FcReading } from "react-icons/fc";
import { GiCoffeeCup } from "react-icons/gi";
import { FcLandscape } from "react-icons/fc";
import { FcApprove } from "react-icons/fc";

const GlobalTimer = ({ subjects = [] }) => {
  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 10 * 60;
  const SESSIONS_BEFORE_LONG_BREAK = 4;

  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(""); // work later

  const intervalRef = useRef(null);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setMode("focus");
    setSeconds(FOCUS_TIME);
    setCompletedSessions(0);
    setSelectedSubject("");
  };

  // Timer countdown
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(
        () => setSeconds((prev) => prev - 1),
        1000
      );
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Handle session end
  useEffect(() => {
    if (seconds < 0) {
      if (mode === "focus") {
        const nextBreak =
          (completedSessions + 1) % SESSIONS_BEFORE_LONG_BREAK === 0
            ? "longBreak"
            : "shortBreak";
        setMode(nextBreak);
        setSeconds(nextBreak === "longBreak" ? LONG_BREAK : SHORT_BREAK);
        setCompletedSessions((prev) => prev + 1);
        setSelectedSubject("");
      } else {
        setMode("focus");
        setSeconds(FOCUS_TIME);
      }
    }
  }, [seconds, mode, completedSessions]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getModeLabel = () => {
    switch (mode) {
      case "focus":
        return (
          <span className="flex justify-center items-center gap-2">
            <FcReading /> Focus Time
          </span>
        );
      case "shortBreak":
        return (
          <span className="flex justify-center items-center gap-2">
            <GiCoffeeCup /> Time Break
          </span>
        );
      case "longBreak":
        return (
          <span className="flex justify-center items-center gap-2">
            <FcLandscape />
            Long Break
          </span>
        );
      default:
        return "";
    }
  };

  // Progress percentage
  const totalTime =
    mode === "focus"
      ? FOCUS_TIME
      : mode === "shortBreak"
      ? SHORT_BREAK
      : LONG_BREAK;
  const progress = ((totalTime - seconds) / totalTime) * 100;

  return (
    <div className="max-w-sm w-full mx-auto bg-slate-300/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-2xl">
      <h2 className="text-xl font-semibold mb-2">{getModeLabel()}</h2>

      {/* Subject selection ------ i will work on it */}
      {mode === "focus" && subjects.length > 0 && (
        <select
          className="w-full mb-3 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-300"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      {/* Circular Progress Timer */}
      <div className="relative flex justify-center items-center w-40 h-40 mx-auto my-4">
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="10"
            className="text-gray-200"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="url(#grad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={
              2 * Math.PI * 70 - (progress / 100) * (2 * Math.PI * 70)
            }
            fill="transparent"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
        <p className="text-3xl font-bold">{formatTime(seconds)}</p>
      </div>

      {/* actions button */}
      <div className="flex justify-center gap-3">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Subject info --- work later */}
      {mode === "focus" && selectedSubject && (
        <p className="text-gray-600 text-sm mt-2">
          Current Subject:{" "}
          <span className="font-medium">{selectedSubject}</span>
        </p>
      )}

      {/* Session count */}
      <p className="mt-3 text-gray-500 text-sm flex justify-center items-center gap-1">
        <span>
          <FcApprove className="w-6 h-6" />
        </span>
        Completed Focus Sessions:{" "}
        <span className="font-medium">{completedSessions}</span>
      </p>
    </div>
  );
};

export default GlobalTimer;
