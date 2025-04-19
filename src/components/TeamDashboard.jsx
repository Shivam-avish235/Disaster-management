import React from 'react';

function TeamDashboard() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Team Dashboard</h2>
      <p style={styles.text}>Monitor current disaster reports and assign response teams.</p>

      <div style={styles.card}>
        <h3>🚨 Flood in Mumbai</h3>
        <p>Reported by: Priya</p>
        <p>Status: Pending</p>
        <button style={styles.button}>Assign Team</button>
      </div>

      <div style={styles.card}>
        <h3>🔥 Fire in Bangalore</h3>
        <p>Reported by: Aman</p>
        <p>Status: In Progress</p>
        <button style={styles.button}>View Details</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  heading: { fontSize: '2rem', marginBottom: '1rem' },
  text: { fontSize: '1rem', marginBottom: '2rem' },
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#2ecc71',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default TeamDashboard;
