import React from 'react';
import { MdLocalHospital, MdSchedule, MdWarning, MdCheckCircle, MdAccessTime, MdEmergency } from 'react-icons/md';

const MedicationPolicy = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1976D2, #64B5F6, #E3F2FD)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1.2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        padding: '2.5rem',
        maxWidth: '800px',
        width: '100%',
        border: '1px solid #BBDEFB',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: 'linear-gradient(to right, #1976D2, #64B5F6)',
        }}></div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: '#0D47A1',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold',
        }}>
          <MdLocalHospital style={{ fontSize: '2.5rem', marginRight: '0.8rem', color: '#1976D2' }} />
          Medication Appointment Policy
        </div>

        <p style={{
          color: '#37474F',
          lineHeight: '1.7',
          fontSize: '1.1rem',
          marginBottom: '1.5rem',
        }}>
          At our hospital, your health and timely medication are our top priorities. To ensure the highest standard of care, we require all patients to schedule appointments in advance for medication consultations and prescriptions.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.8rem',
            color: '#0D47A1',
            fontWeight: '600',
            fontSize: '1.2rem',
          }}>
            <MdSchedule style={{ marginRight: '0.5rem', fontSize: '1.4rem' }} />
            Key Policy Points
          </div>

          <ul style={{
            listStyleType: 'none',
            padding: '0',
            margin: '0',
          }}>
            <li style={{
              padding: '0.8rem 0',
              borderBottom: '1px solid #E3F2FD',
              display: 'flex',
              alignItems: 'center',
            }}>
              <MdCheckCircle style={{ color: '#2E7D32', marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span>Appointments must be scheduled at least <strong style={{ color: '#0D47A1' }}>24 hours in advance</strong>.</span>
            </li>
            <li style={{
              padding: '0.8rem 0',
              borderBottom: '1px solid #E3F2FD',
              display: 'flex',
              alignItems: 'center',
            }}>
              <MdAccessTime style={{ color: '#F57F17', marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span>If you are unable to attend, please cancel or reschedule at least <strong style={{ color: '#0D47A1' }}>12 hours before</strong> your appointment.</span>
            </li>
            <li style={{
              padding: '0.8rem 0',
              borderBottom: '1px solid #E3F2FD',
              display: 'flex',
              alignItems: 'center',
            }}>
              <MdWarning style={{ color: '#C62828', marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span>Patients arriving more than <strong style={{ color: '#0D47A1' }}>15 minutes late</strong> may need to reschedule.</span>
            </li>
            <li style={{
              padding: '0.8rem 0',
              borderBottom: '1px solid #E3F2FD',
              display: 'flex',
              alignItems: 'center',
            }}>
              <MdEmergency style={{ color: '#C62828', marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span>Emergency medication needs should be directed to the <strong style={{ color: '#0D47A1' }}>ER or urgent care</strong> desk.</span>
            </li>
            <li style={{
              padding: '0.8rem 0',
              display: 'flex',
              alignItems: 'center',
            }}>
              <MdCheckCircle style={{ color: '#2E7D32', marginRight: '0.8rem', fontSize: '1.2rem' }} />
              <span>Prescriptions are only provided after proper consultation.</span>
            </li>
          </ul>
        </div>

        <p style={{
          color: '#37474F',
          lineHeight: '1.7',
          fontSize: '1.1rem',
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#E3F2FD',
          borderRadius: '0.5rem',
          borderLeft: '4px solid #1976D2',
        }}>
          Thank you for cooperating with our medication policy to help us deliver consistent and quality care to every patient.
        </p>
      </div>
    </div>
  );
};

export default MedicationPolicy;