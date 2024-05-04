import React from "react";
import Home from "./home/Home";
import Cources from "./cources/Cources";
import { Route, Routes, Navigate } from "react-router-dom"; // Update import statement
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Cources /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
