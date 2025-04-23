import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState('admin'); // 'admin', 'public', 'team'
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {userType === 'admin' ? 'Admin Login' : userType === 'public' ? 'Public Login' : 'Team Member Login'}
        </h2>

        <div className="flex justify-center mb-6 space-x-2">
          {['admin', 'public', 'team'].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`px-4 py-2 rounded-full text-sm ${
                userType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          {userType === 'admin' && 'Login using admin credentials.'}
          {userType === 'public' && 'Login as a public user to report/view disasters.'}
          {userType === 'team' && 'Team members can login here to see tasks & updates.'}
        </p>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/Registration')}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
