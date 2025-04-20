import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ReportDisaster() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.length > 3) {
      const timeout = setTimeout(() => {
        axios
          .get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: location,
              format: 'json',
              addressdetails: 1,
              limit: 5,
            },
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'DisasterApp/1.0 (your-email@example.com)',
            },
          })
          .then((res) => {
            setLocationSuggestions(res.data.map(loc => loc.display_name));
          })
          .catch((err) => {
            console.error('Location fetch failed:', err);
          });
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setLocationSuggestions([]);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !description || !disasterType) {
      toast.error('All fields are required!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    const newReport = {
      id: Date.now(),
      name,
      location,
      type: disasterType,
      description,
      time: new Date().toISOString(),
      status: 'Pending',
    };

    const existingReports = JSON.parse(localStorage.getItem('disasterReports')) || [];
    const updatedReports = [...existingReports, newReport];
    localStorage.setItem('disasterReports', JSON.stringify(updatedReports));

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Disaster report submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setName('');
      setLocation('');
      setDescription('');
      setDisasterType('');
      setLocationSuggestions([]);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report a Disaster</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          style={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {locationSuggestions.length > 0 && (
          <ul style={styles.suggestionList}>
            {locationSuggestions.map((suggestion, index) => (
              <li
                key={index}
                style={styles.suggestionItem}
                onClick={() => setLocation(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <select
          value={disasterType}
          onChange={(e) => setDisasterType(e.target.value)}
          style={styles.select}
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
          placeholder="Describe the disaster"
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.6 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '600px', margin: 'auto' },
  heading: { fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', fontSize: '1rem' },
  textarea: { padding: '0.75rem', fontSize: '1rem', minHeight: '100px' },
  select: { padding: '0.75rem', fontSize: '1rem' },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    transition: 'opacity 0.3s ease',
  },
  suggestionList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  suggestionItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
};

export default ReportDisaster;