import React, { useState, useEffect } from "react";
import { TbWindowMinimize } from "react-icons/tb";

const GlobalTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0); 
  const [running, setRunning] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [subject, setSubject] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false); 

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("global-timer"));
    if (saved) {
      setTimeLeft(saved.timeLeft);
      setRunning(saved.running);
      setSubject(saved.subject);
      setStarted(saved.started || false);
      setFinished(saved.finished || false);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "global-timer",
      JSON.stringify({ timeLeft, running, subject, started, finished })
    );
  }, [timeLeft, running, subject, started, finished]);

  // Countdown
  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (running && timeLeft === 0 && !finished) {
      setRunning(false);
      setFinished(true);
    }
    return () => clearInterval(timer);
  }, [running, timeLeft, finished]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (!timeLeft || !subject) return alert("Enter time and subject code!");
    setRunning(true);
    setStarted(true);
    setFinished(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setSubject("");
    setRunning(false);
    setStarted(false);
    setFinished(false);
    setExpanded(true);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white shadow-xl rounded-2xl border border-gray-300 p-4 z-50 transition-all duration-300
      ${expanded ? "w-72 h-auto" : "w-40 h-12 flex justify-between items-center gap-4"} sm:w-72 sm:p-5`}
    >
      {expanded ? (
        <div className="flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-gray-700">⏱️ Timer</h2>
            <button
              className="text-sm text-gray-500 underline"
              onClick={() => setExpanded(false)}
            >
              <TbWindowMinimize className="w-6 h-6" />
            </button>
          </div>

          {!started ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Subject Code (example: MAT241)"
                value={subject}
                onChange={(e) => setSubject(e.target.value.toUpperCase())}
                className="border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Set Time (minutes)"
                onChange={(e) => setTimeLeft(Number(e.target.value) * 60)}
                className="border p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={startTimer}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
              >
                Start Timer
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 items-center">
              {finished ? (
                <span className="text-base font-bold text-red-400">⏰ Time Finished for {subject}!</span>
              ) : (
                <>
                  <span className="text-2xl font-mono">{formatTime(timeLeft)}</span>
                  <span className="text-sm font-medium text-gray-600">{subject}</span>
                </>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setRunning(!running)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition"
                  disabled={finished}
                >
                  {running ? "⏸️ Pause" : "▶️ Resume"}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex justify-between items-center cursor-pointer gap-2"
          onClick={() => setExpanded(true)}
        >
          <span className="font-mono">{finished ? "Time Finished!" : formatTime(timeLeft)}</span>
          <button
          className="flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              setRunning(!running);
            }}
            disabled={finished}
          >
            {running ? "run" : "pause"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GlobalTimer;


 