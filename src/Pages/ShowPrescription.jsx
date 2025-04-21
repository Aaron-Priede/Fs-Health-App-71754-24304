import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ShowPrescription = () => {
    const navigate = useNavigate();
  const [medications, setMedications] = useState([]);
  const email = useSelector((state) => state.slice.email); // Adjust based on your Redux state shape

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('http://localhost:5188/api/Medication/');
        const data = await response.json();
        console.log(data); // Log the fetched data for debugging
        setMedications(data);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };

    fetchMedications();
  }, []);

  const filteredMedications = medications.filter(
    (med) => med.doctorName === email
  );

  return (
    <div style={{ padding: '16px', fontFamily: 'Arial, sans-serif',  marginTop:"10vh",}}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        My Medications
      </h2>
      {filteredMedications.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredMedications.map((med) => (
            <li
              key={med.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <p><strong>Name:</strong> {med.doctorName}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Instructions:</strong> {med.instruction}</p>
              <p><strong>Issue Date:</strong> {med.issueDate}</p>
              <p><strong>Expiry Date:</strong> {med.expiryDate}</p>
              <p><strong>Patient:</strong> {med.patientName}</p>
              <p><strong>Status:</strong> {med.status}</p>
              <button onClick={(e)=>{
                e.preventDefault();
                navigate("/Doctor/write",{
                    state:{
                        id:med.id
                    }
                })
              }}>
                Write prescription
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No medications found for your account.</p>
      )}
    </div>
  );
};

export default ShowPrescription;
