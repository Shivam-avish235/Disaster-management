import React from "react";
import { Link } from "react-router-dom";
import { FaUserShield, FaUsers, FaExclamationTriangle, FaTasks } from "react-icons/fa";
import MapComponent from "./MapComponent";
const HomePage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block rounded-3xl transform transition-all ease-in-out duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Disaster Dashboard</h2>
        <nav className="space-y-6 text-gray-700">
          <Link
            to="/"
            className="flex items-center space-x-4 hover:text-blue-600 hover:scale-105 transition-all duration-200 transform"
          >
            <FaUserShield className="text-2xl text-blue-600" />
            <span className="text-xl font-semibold">SignIN</span>
          </Link>
          <Link
            to="/AboutUs"
            className="flex items-center space-x-4 hover:text-green-600 hover:scale-105 transition-all duration-200 transform"
          >
            <FaUsers className="text-2xl text-green-600" />
            <span className="text-xl font-semibold">About us</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center space-x-4 hover:text-red-600 hover:scale-105 transition-all duration-200 transform"
          >
            <FaExclamationTriangle className="text-2xl text-red-600" />
            <span className="text-xl font-semibold">Report Disaster</span>
          </Link>
          <Link
            to="/Operation"
            className="flex items-center space-x-4 hover:text-yellow-600 hover:scale-105 transition-all duration-200 transform"
          >
            <FaTasks className="text-2xl text-yellow-600" />
            <span className="text-xl font-semibold">Operation Dashboard</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <div className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Welcome to Disaster Management Dashboard
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Admin Login Card */}
          <Link
            to="/"
            className="bg-white shadow-2xl p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FaUserShield className="text-5xl text-blue-500 mb-6 transition-all" />
            <h3 className="text-xl font-bold text-gray-800">SgnIN</h3>
            <p className="text-sm text-gray-600 mt-2">Access the admin panel and control center for disaster management.</p>
          </Link>

          {/* People Login Card */}
          <Link
            to="/AboutUs"
            className="bg-white shadow-2xl p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FaUsers className="text-5xl text-green-500 mb-6 transition-all" />
            <h3 className="text-xl font-bold text-gray-800">About us</h3>
            <p className="text-sm text-gray-600 mt-2">About us</p>
          </Link>

          {/* Report Disaster Card */}
          <Link
            to="/report"
            className="bg-white shadow-2xl p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FaExclamationTriangle className="text-5xl text-red-500 mb-6 transition-all" />
            <h3 className="text-xl font-bold text-gray-800">Report Disaster</h3>
            <p className="text-sm text-gray-600 mt-2">Quickly report any disaster events with detailed information to get timely assistance.</p>
          </Link>

          {/* Team Dashboard Card */}
          <Link
            to="/team"
            className="bg-white shadow-2xl p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <FaTasks className="text-5xl text-yellow-500 mb-6 transition-all" />
            <h3 className="text-xl font-bold text-gray-800">Team Dashboard</h3>
            <p className="text-sm text-gray-600 mt-2">Coordinate with emergency response teams and monitor ongoing tasks.</p>
          </Link>
          {/* 📍 Map Section */}
      <div className="col-span-full">
        <MapComponent />
        </div>
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
