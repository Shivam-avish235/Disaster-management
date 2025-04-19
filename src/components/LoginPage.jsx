import React, { useState } from 'react';

const LoginPage = () => {
  // State to toggle between admin and public login
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          {isAdmin ? "Admin Login" : "Public Login"}
        </h2>
        
        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-l-lg ${isAdmin ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white'}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg ${!isAdmin ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white'}`}
            onClick={() => setIsAdmin(false)}
          >
            Public
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Login
          </button>
        </div>

        {/* Additional Text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          {isAdmin ? (
            <span>If you are an admin, use your admin credentials to log in.</span>
          ) : (
            <span>If you are a public user, you can report disasters or view updates.</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
