import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const disasterTypeSuggestions = {
  hilly: "Landslide",
  river: "Flood",
  city: "Fire",
  mountain: "Earthquake",
  hospital: "Medical Emergency",
};

const ReportDisaster = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.length > 2) {
      const timeout = setTimeout(() => {
        axios
          .get("https://nominatim.openstreetmap.org/search", {
            params: {
              q: location,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
            headers: {
              Accept: "application/json",
              "User-Agent": "DisasterApp/1.0",
            },
          })
          .then((res) => {
            setLocationSuggestions(res.data);
          })
          .catch(() => {
            toast.error("Failed to fetch location suggestions.");
          });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  const handleSuggestionClick = (loc) => {
    setLocation(loc.display_name);
    // AI Placeholder: You could use AI to suggest based on loc.address
    if (loc.display_name.toLowerCase().includes("hill")) {
      setDisasterType(disasterTypeSuggestions.hilly);
    } else if (loc.display_name.toLowerCase().includes("river")) {
      setDisasterType(disasterTypeSuggestions.river);
    } else if (loc.display_name.toLowerCase().includes("hospital")) {
      setDisasterType(disasterTypeSuggestions.hospital);
    } else {
      setDisasterType("");
    }
    setLocationSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !description || !disasterType) {
      toast.error("All fields are required!");
      return;
    }

    const newReport = {
      id: Date.now(),
      name,
      location,
      type: disasterType,
      description,
      time: new Date().toISOString(),
      status: "Pending",
    };

    const existing = JSON.parse(localStorage.getItem("disasterReports")) || [];
    const updated = [...existing, newReport];
    localStorage.setItem("disasterReports", JSON.stringify(updated));

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Report submitted!");
      setName("");
      setLocation("");
      setDescription("");
      setDisasterType("");
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🚨 Report a Disaster</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {locationSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white shadow-md border mt-1 rounded-md max-h-40 overflow-y-auto w-full">
              {locationSuggestions.map((loc, i) => (
                <li
                  key={i}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(loc)}
                >
                  {loc.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={disasterType}
          onChange={(e) => setDisasterType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Select Disaster Type</option>
          <option value="Accident">Accident</option>
          <option value="Building Collapse">Building Collapse</option>
          <option value="Fire">Fire</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Medical Emergency">Medical Emergency</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the disaster"
          className="w-full p-3 border border-gray-300 rounded-md"
          rows={4}
        />
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white font-semibold ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportDisaster;
