import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReportDisaster() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !location || !description) {
      toast.error('All fields are required!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Disaster report submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setName('');
      setLocation('');
      setDescription('');
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report a Disaster</h2>
      <p style={styles.text}>Please fill in the details to report a disaster in your area.</p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          style={styles.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe the disaster"
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
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
  heading: { fontSize: '2rem', marginBottom: '1rem' },
  text: { fontSize: '1rem', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', fontSize: '1rem' },
  textarea: { padding: '0.75rem', fontSize: '1rem', minHeight: '100px' },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    transition: 'opacity 0.3s ease',
  },
};

export default ReportDisaster;
