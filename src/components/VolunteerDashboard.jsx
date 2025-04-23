import React from 'react';

const VolunteerDashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Team Member Dashboard
      </h2>

      {/* Alerts */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-lg">
        ⚠️ Alert: New disaster request received in your zone!
      </div>

      {/* Assigned Tasks */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
        <ul className="space-y-2">
          <li className="border p-3 rounded-md bg-gray-50">
            🔥 Fire in Mumbai - <span className="text-green-600 font-semibold">In Progress</span>
          </li>
          <li className="border p-3 rounded-md bg-gray-50">
            🌊 Flood in Kerala - <span className="text-yellow-600 font-semibold">Pending</span>
          </li>
        </ul>
      </div>

      {/* Update Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Update Task Status</h3>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Task ID"
            className="w-full p-2 border rounded-md"
          />
          <select className="w-full p-2 border rounded-md">
            <option value="">Select Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="w-full bg-blue-600 text-white p-2 rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
