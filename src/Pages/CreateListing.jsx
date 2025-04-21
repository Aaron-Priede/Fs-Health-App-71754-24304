import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Separate styling into a more organized structure with better class names
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #cbd5e0',
    fontSize: '1rem',
    width: '100%',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #cbd5e0',
    fontSize: '1rem',
    width: '100%',
    minHeight: '120px',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#3182ce',
  },
};

// Create a reusable FormField component for DRY code
const FormField = ({ label, id, type = 'text', value, onChange, placeholder, required = true, rows }) => {
  const isTextarea = type === 'textarea';
  
  return (
    <div style={styles.formGroup}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          required={required}
          style={styles.textarea}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={styles.input}
        />
      )}
    </div>
  );
};

export default function CreateListing() {
  // Get user email from Redux store
  const userEmail = useSelector((state) => state.slice.email);
  
  // Initialize state with proper default values
  const [formData, setFormData] = useState({
    name: userEmail || '',
    description: '',
    location: '',
    contact: '',
    timing: '',
    charges: '',
    availability: true,
  });
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  // API endpoint
  const API_ENDPOINT = 'http://localhost:5188/api/ServiceListing/';
  
  // Separate API call into its own function with error handling
  const createListing = async (listingData) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  };
  
  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: userEmail || '',
      description: '',
      location: '',
      contact: '',
      timing: '',
      charges: '',
      availability: true,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await createListing(formData);
      
      if (result && result.id) {
        alert('Doctor Appointment Listing Created Successfully!');
        resetForm();
      } else {
        alert('Failed to create listing. Please check the data and try again.');
      }
    } catch (error) {
      alert('An error occurred while creating the listing. Please try again later.');
    }
  };
  
  // Form fields configuration for easier maintenance
  const formFields = [
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: '',
    },
    {
      id: 'location',
      label: 'Location',
      placeholder: '',
    },
    {
      id: 'contact',
      label: 'Contact Information',
      placeholder: '',
    },
    {
      id: 'timing',
      label: 'Appointment Hours',
      placeholder: '',
    },
    {
      id: 'charges',
      label: 'Consultation Fee',
      placeholder: '',
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Doctor Appointment Listing</h2>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type || 'text'}
            value={formData[field.id]}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows}
          />
        ))}
        
        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
          }}
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}