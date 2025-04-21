import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Create consistent styling similar to previous components
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '28vh auto 0',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50',
    fontSize: '2rem',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
  },
  title: {
    color: '#4299e1',
    margin: '0 0 1rem 0',
    fontSize: '1.3rem',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '0.75rem',
  },
  infoItem: {
    margin: '0.5rem 0',
    color: '#4a5568',
  },
  label: {
    fontWeight: '600',
    marginRight: '0.5rem',
  },
  confirmButton: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  confirmButtonHover: {
    backgroundColor: '#38a169',
  },
  noRequests: {
    textAlign: 'center',
    padding: '3rem 1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    color: '#4a5568',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
  },
  loader: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
};

// Create a reusable InfoItem component for service details
const InfoItem = ({ label, value }) => (
  <p style={styles.infoItem}>
    <span style={styles.label}>{label}:</span>
    {value}
  </p>
);

// Create a reusable ServiceRequestCard component
const ServiceRequestCard = ({ service, onConfirm }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={styles.title}>{service.name}</h3>
      <InfoItem label="Charges" value={service.charges} />
      <InfoItem label="Contact" value={service.contact} />
      <InfoItem label="Customer" value={service.customer} />
      <InfoItem label="Description" value={service.description} />
      <InfoItem label="Location" value={service.location} />
      
      <button 
        style={styles.confirmButton}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = styles.confirmButtonHover.backgroundColor;
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = styles.confirmButton.backgroundColor;
        }}
        onClick={() => onConfirm(service.id)}
      >
        Confirm Transaction
      </button>
    </div>
  );
};

export default function ShowRequest() {
  const email = useSelector((state) => state.slice.email);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_ENDPOINT = 'http://localhost:5188/api/ServiceListing';

  // Improved fetch function with error handling
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINT}/search?name=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      setError(error.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get service by ID
  const getServiceById = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}/`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch service with ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      throw error;
    }
  };

  // Update service
  const updateService = async (id, data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update service with ID ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
      throw error;
    }
  };

  // Handle confirmation of a transaction
  const handleConfirm = async (id) => {
    try {
      // Get current service data
      const serviceData = await getServiceById(id);
      
      // Update the service properties
      const updatedService = {
        ...serviceData,
        confirmation: true,
        booking: true,
        availability: false
      };
      
      // Send updated data to API
      const result = await updateService(id, updatedService);
      
      // Update UI and notify user
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === id ? { ...service, confirmation: true } : service
        )
      );
      
      alert("Transaction Confirmed Successfully!");
    } catch (error) {
      alert(`Failed to confirm transaction: ${error.message}`);
    }
  };

  // Load services on component mount
  useEffect(() => {
    fetchServices()
      .then(data => {
        console.log("Services data:", data);
        setServices(data || []);
      })
      .catch(err => {
        console.error("Failed to fetch services:", err);
      });
  }, [email]);

  // Loading state
  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: '1rem' }}>Loading requests...</p>
      </div>
    );
  }

  // Filter services that have customers but are not yet confirmed
  const pendingRequests = services.filter(
    service => service.customer !== null && service.confirmation !== true
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Pending Appointment Requests</h2>
      
      {pendingRequests.length === 0 ? (
        <div style={styles.noRequests}>
          <p>You have no pending appointment requests at this time.</p>
        </div>
      ) : (
        <div style={styles.cardGrid}>
          {pendingRequests.map(service => (
            <ServiceRequestCard 
              key={service.id} 
              service={service} 
              onConfirm={handleConfirm} 
            />
          ))}
        </div>
      )}
    </div>
  );
}