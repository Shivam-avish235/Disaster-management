import React, { useState, useEffect } from 'react';

const disasterKitMap = {
  Fire: ['Fire extinguisher', 'Smoke masks', 'Water buckets'],
  Flood: ['Boat', 'Life jackets', 'Rescue rope'],
  Earthquake: ['First Aid Kit', 'Flashlight', 'Emergency whistle'],
  'Medical Emergency': ['First Aid Kit', 'Stretcher', 'Oxygen cylinder'],
  'Building Collapse': ['Rescue dogs', 'Search light', 'Helmet'],
  Accident: ['First Aid', 'Stretcher', 'Ambulance support'],
  Other: ['Basic gear', 'First Aid Kit']
};

const disasterSuggestions = {
  Fire: ['Evacuate area', 'Use extinguishers', 'Check for gas leaks'],
  Flood: ['Move to higher ground', 'Rescue stranded people', 'Secure essentials'],
  Earthquake: ['Search and rescue', 'Stabilize structure', 'Provide medical help'],
  'Medical Emergency': ['Call ambulance', 'Give CPR', 'Provide oxygen'],
  'Building Collapse': ['Clear debris', 'Check for survivors', 'Secure zone'],
  Accident: ['Check vitals', 'Stabilize injuries', 'Transport to hospital'],
  Other: ['Assess situation', 'Contact supervisor', 'Proceed with caution']
};

const VolunteerDashboard = () => {
  const [currentTask, setCurrentTask] = useState({
    type: 'Fire',
    location: 'Mumbai',
    status: 'In Progress',
    taskId: 12345,
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main Panel */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Team Member Dashboard
        </h2>

        {/* Task Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Assigned Task</h3>
          <div className="space-y-2">
            <p><strong>Disaster:</strong> {currentTask.type}</p>
            <p><strong>Location:</strong> {currentTask.location}</p>
            <p><strong>Status:</strong> {currentTask.status}</p>
            <p><strong>Task ID:</strong> {currentTask.taskId}</p>
          </div>
        </div>

        {/* Update Task Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Update Task Status</h3>
          <form className="space-y-4">
            <select className="w-full p-2 border rounded-md">
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="w-full bg-blue-600 text-white p-2 rounded-md">
              Update
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[300px] bg-white border-l p-4">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Equipments Required</h3>
        <ul className="list-disc list-inside text-gray-800 mb-6">
          {disasterKitMap[currentTask.type]?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-blue-700 mb-4">Suggested Actions</h3>
        <ul className="list-decimal list-inside text-gray-800">
          {disasterSuggestions[currentTask.type]?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
