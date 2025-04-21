import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FinishedMedications.css';

export default function FinishedMedications() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get email from Redux store with fallback
  const email = useSelector((state) => state.slice.email) || '';

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5188/api/Medication/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch medications: ${response.status}`);
        }
        
        const data = await response.json();
        setMedications(data);
      } catch (err) {
        console.error("Error fetching medications:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  // Safely filter medications
  const completedMeds = medications.filter(med => {
    // Safe checks for both properties to avoid undefined errors
    const isCompleted = med.status && med.status.toLowerCase() === 'completed';
    const isForCurrentUser = med.patientName && email && 
                             med.patientName.toLowerCase() === email.toLowerCase();
    
    return isCompleted && isForCurrentUser;
  });

  if (loading) {
    return <div className="medications-loading">Loading medications...</div>;
  }

  if (error) {
    return <div className="medications-error">Error: {error}</div>;
  }

  return (
    <div className="completed-medications-container">
      <h2 className="medications-title">Completed Medications</h2>

      {completedMeds.length === 0 ? (
        <div className="medications-empty">
          <p>No completed medications found.</p>
        </div>
      ) : (
        <div className="medications-list">
          {completedMeds.map((med) => (
            <div key={med.id} className="medication-card">
              <div className="medication-header completed">
                <h3>{med.medicationName || 'Unnamed Medication'}</h3>
              </div>
              <div className="medication-details">
                <div className="medication-detail">
                  <span className="detail-label">Dosage:</span>
                  <span className="detail-value">{med.dosage || 'Not specified'}</span>
                </div>
                <div className="medication-detail">
                  <span className="detail-label">Patient:</span>
                  <span className="detail-value">{med.patientName || 'Not specified'}</span>
                </div>
                <div className="medication-detail">
                  <span className="detail-label">Doctor:</span>
                  <span className="detail-value">{med.doctorName || 'Not specified'}</span>
                </div>
                <div className="medication-detail">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value status-completed">{med.status}</span>
                </div>
                <div className="medication-detail">
                  <span className="detail-label">Instructions:</span>
                  <span className="detail-value">{med.instruction || 'None provided'}</span>
                </div>
                <div className="medication-dates">
                  <div className="medication-date">
                    <span className="date-label">Issue Date:</span>
                    <span className="date-value">{med.issueDate || 'Not specified'}</span>
                  </div>
                  <div className="medication-date">
                    <span className="date-label">Expiry Date:</span>
                    <span className="date-value">{med.expiryDate || 'Not specified'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}