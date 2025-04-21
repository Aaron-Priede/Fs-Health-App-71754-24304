import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CompletedBooking.css';

export default function CompletedBooking() {
  const email = useSelector((state) => state.slice.email);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5188/api/ServiceListing/");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestPrescription = async (doctor) => {
    const prescriptionData = {
      medicationName: "",
      dosage: "",
      instruction: "T",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      doctorName: doctor.name,
      patientName: email,
      status: "unfinished",
    };
  
    try {
      const response = await fetch("http://localhost:5188/api/Medication/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptionData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Prescription requested successfully!");
        navigate("/User/home");
        return result;
      } else {
        throw new Error(`Failed to create prescription: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the prescription request.");
    }
  };

  const completedBookings = doctors.filter(
    (doctor) => doctor.confirmation === true && doctor.customer === email
  );

  if (isLoading) {
    return <div className="loading-spinner">Loading your completed bookings...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="completed-bookings-container">
      <h2 className="page-title">Completed Bookings</h2>
      
      {completedBookings.length === 0 ? (
        <div className="no-bookings-message">
          <p>You don't have any completed bookings yet.</p>
        </div>
      ) : (
        <div className="booking-grid">
          {completedBookings.map((doctor) => (
            <div key={doctor.id} className="booking-card">
              <div className="booking-header">
                <h3>{doctor.name}</h3>
              </div>
              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{doctor.description || "No description available"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{doctor.location || "Not specified"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">${doctor.charges || "Not specified"}</span>
                </div>
              </div>
              <div className="booking-actions">
                <button 
                  className="prescription-button"
                  onClick={() => requestPrescription(doctor)}
                >
                  Request Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}