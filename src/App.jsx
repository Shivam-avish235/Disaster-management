import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ ADD THIS
import 'react-toastify/dist/ReactToastify.css';  // ✅ Import toastify styles

import Registration from "./components/Register";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ReportDisaster from "./components/ReportDisaster";
import TeamDashboard from "./components/TeamDashboard";
import AboutUs from "./components/Aboutus";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 p-4">
        <nav className="flex gap-4 justify-center mb-4">
          <Link to="/Registration" className="text-blue-600 font-semibold">Registration</Link>
          <Link to="/report" className="text-blue-600 font-semibold">Report</Link>
          <Link to="/team" className="text-blue-600 font-semibold">Team</Link>
          <Link to="/home" className="text-blue-600 font-semibold">Home</Link>
          <Link to="/AboutUs" className="text-blue-600 font-semibold">About Us</Link>
        </nav>

        <Routes>
          <Route path="/Registration" element={<Registration />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/report" element={<ReportDisaster />} />
          <Route path="/team" element={<TeamDashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>

        {/* ✅ This allows toast to appear for disaster submission */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
