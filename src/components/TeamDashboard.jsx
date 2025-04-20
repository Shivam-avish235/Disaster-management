import React, { useState, useEffect } from 'react';

function TeamDashboard() {
  const [disasterReports, setDisasterReports] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([
    { id: 1, name: 'Team A', location: 'Mumbai', department: 'Rescue', status: 'Available' },
    { id: 2, name: 'Team B', location: 'Bangalore', department: 'Medical', status: 'Working' },
    { id: 3, name: 'Team C', location: 'Chennai', department: 'Fire', status: 'Completed' },
    { id: 4, name: 'Team D', location: 'Kolkata', department: 'Rescue', status: 'Available' },
    { id: 5, name: 'Team E', location: 'Delhi', department: 'Medical', status: 'Working' },
  ]);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [uniqueLocations, setUniqueLocations] = useState([]);

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('disasterReports')) || [];
    setDisasterReports(reports);
    setUniqueLocations([...new Set(reports.map((r) => r.location))]);
  }, []);

  const handleAssignTeam = (reportId, team) => {
    if (team.status === 'Available') {
      // Update report
      const updatedReports = disasterReports.map((r) =>
        r.id === reportId ? { ...r, assignedTeam: team.name, status: 'In Progress' } : r
      );
      setDisasterReports(updatedReports);
      localStorage.setItem('disasterReports', JSON.stringify(updatedReports));
      // Update team status to Working
      setAvailableTeams((prev) =>
        prev.map((t) => (t.id === team.id ? { ...t, status: 'Working' } : t))
      );
    }
  };

  const handleResolve = (reportId) => {
    const updatedReports = disasterReports.map((r) => {
      if (r.id === reportId) {
        // find assigned team
        const team = availableTeams.find((t) => t.name === r.assignedTeam);
        // update team status to Completed
        if (team) {
          setAvailableTeams((prev) =>
            prev.map((t) => (t.id === team.id ? { ...t, status: 'Completed' } : t))
          );
        }
        return { ...r, status: 'Resolved' };
      }
      return r;
    });
    setDisasterReports(updatedReports);
    localStorage.setItem('disasterReports', JSON.stringify(updatedReports));
  };

  const handleRemoveReport = (id) => {
    const updated = disasterReports.filter((r) => r.id !== id);
    setDisasterReports(updated);
    localStorage.setItem('disasterReports', JSON.stringify(updated));
  };

  // Filter displayed reports
  const filteredReports = disasterReports.filter((r) => {
    const locOk = filterLocation ? r.location === filterLocation : true;
    const typeOk = filterType ? r.type === filterType : true;
    return locOk && typeOk;
  });

  // Filter displayed teams
  const displayedTeams = availableTeams.filter((t) => {
    return teamFilter ? t.status === teamFilter : true;
  });

  return (
    <div style={styles.container}>
      {/* Left: Disaster Reports */}
      <div style={styles.reportsContainer}>
        <h2 style={styles.heading}>Team Dashboard</h2>
        <div style={styles.filtersTop}>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} style={styles.select}>
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.select}>
            <option value="">All Types</option>
            {[...new Set(disasterReports.map((r) => r.type))].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredReports.map((r) => (
          <div key={r.id} style={styles.card}>
            <h3 style={styles.cardTitle}>🚨 {r.type} in {r.location}</h3>
            <p><strong>Reported by:</strong> {r.reporter || r.name}</p>
            <p><strong>Time:</strong> {new Date(r.time).toLocaleString()}</p>
            <p><strong>Status:</strong> <span style={styles.status[r.status]}>{r.status}</span></p>
            {r.assignedTeam && <p><strong>Assigned Team:</strong> {r.assignedTeam}</p>}
            <div style={styles.cardActions}>
              {r.status === 'Pending' && (
                <button
                  style={styles.buttonPrimary}
                  onClick={() => handleAssignTeam(r.id, availableTeams.find(t => t.location === r.location && t.status === 'Available'))}
                >Assign Team</button>
              )}
              {r.status === 'In Progress' && (
                <button style={styles.buttonSuccess} onClick={() => handleResolve(r.id)}>Mark Resolved</button>
              )}
              <button style={styles.buttonDanger} onClick={() => handleRemoveReport(r.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Team Cards & Filters */}
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarHeading}>Teams</h3>
        <div style={styles.teamFilterContainer}>
          <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} style={styles.select}>
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Working">Working</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {displayedTeams.map((t) => (
          <div key={t.id} style={styles.teamCard}>
            <h4 style={styles.teamName}>{t.name}</h4>
            <p><strong>Department:</strong> {t.department}</p>
            <p><strong>Location:</strong> {t.location}</p>
            <p><strong>Status:</strong> <span style={styles.status[t.status]}>{t.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', padding: '2rem', maxWidth: '1200px', margin: 'auto', backgroundColor: '#f5f5f5' },
  reportsContainer: { flex: 2, marginRight: '2rem' },
  heading: { fontSize: '2rem', marginBottom: '1rem', color: '#2c3e50' },
  filtersTop: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  select: { padding: '0.5rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' },
  card: { background: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  cardTitle: { fontSize: '1.2rem', marginBottom: '0.5rem' },
  status: {
    Pending: { backgroundColor: '#f1c40f', color: '#fff', padding: '2px 8px', borderRadius: '6px' },
    'In Progress': { backgroundColor: '#3498db', color: '#fff', padding: '2px 8px', borderRadius: '6px' },
    Resolved: { backgroundColor: '#2ecc71', color: '#fff', padding: '2px 8px', borderRadius: '6px' },
  },
  cardActions: { display: 'flex', gap: '0.5rem', marginTop: '1rem' },
  buttonPrimary: { backgroundColor: '#2980b9', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  buttonSuccess: { backgroundColor: '#27ae60', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  buttonDanger: { backgroundColor: '#e74c3c', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  sidebar: { flex: 1, background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  sidebarHeading: { fontSize: '1.5rem', marginBottom: '1rem' },
  teamFilterContainer: { marginBottom: '1rem' },
  teamCard: { background: '#f9f9f9', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' },
  teamName: { fontSize: '1.1rem', marginBottom: '0.5rem' },
};

export default TeamDashboard;
