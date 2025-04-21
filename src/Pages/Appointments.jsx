import React, { useState } from 'react';
import './Appointments.css'; // Import the CSS file for styling

export default function Appointments() {
  // Sample list of appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Alice Johnson',
      specialization: 'Cardiologist',
      timeSlot: '9:00 AM - 12:00 PM',
    },
    {
      id: 2,
      doctorName: 'Dr. Bob Smith',
      specialization: 'Dermatologist',
      timeSlot: '1:00 PM - 4:00 PM',
    },
    {
      id: 3,
      doctorName: 'Dr. Charlie Brown',
      specialization: 'Neurologist',
      timeSlot: '10:00 AM - 1:00 PM',
    },
  ]);

  // Handle cancel appointment
  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    alert('Appointment canceled successfully!');
  };

  return (
    <div className="appointments-container">
      <h1>Your Appointments</h1>
      {appointments.length > 0 ? (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h2>{appointment.doctorName}</h2>
              <p><strong>Specialization:</strong> {appointment.specialization}</p>
              <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
              <button
                className="cancel-button"
                onClick={() => handleCancel(appointment.id)}
              >
                Cancel Appointment
              </button>

              <button
                className="cancel-button"
                onClick={() => handleCancel(appointment.id)}
              >
                Reschedule Appointment
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}