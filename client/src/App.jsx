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

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />
          <div>
            <GlobalTimer></GlobalTimer>
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
            <Route path="/budget" element={<Budget></Budget>}></Route>
            <Route path="/planner" element={<Planner></Planner>}></Route>
            <Route path="/quiz" element={<Quiz></Quiz>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signin" element={<Register></Register>}></Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
