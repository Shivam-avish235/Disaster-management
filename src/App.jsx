import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Registration from "./components/Register";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ReportDisaster from "./components/ReportDisaster";
import TeamDashboard from "./components/OperationsDashboard";
import AboutUs from "./components/Aboutus";
import VolunteerDashboard from './components/VolunteerDashboard'; 
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md py-4 px-8 rounded-b-3xl flex justify-center gap-6">
          <Link to="/" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">Login</Link>
          <Link to="/Registration" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">Registration</Link>
          <Link to="/home" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">Home</Link>
          <Link to="/report" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">Report</Link>
          <Link to="/Operation" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">Operations</Link>
          <Link to="/VolunteerDashboard" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">VolunteerDashboard</Link> 
          <Link to="/AboutUs" className="text-lg text-blue-600 font-bold hover:text-blue-800 transition">About Us</Link>
        </nav>

        {/* Routes */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/report" element={<ReportDisaster />} />
            <Route path="/Operation" element={<TeamDashboard />} />
            <Route path="/VolunteerDashboard" element={<VolunteerDashboard />} /> 
            <Route path="/AboutUs" element={<AboutUs />} />
          </Routes>
        </div>

        {/* Toast Notification Container */}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
