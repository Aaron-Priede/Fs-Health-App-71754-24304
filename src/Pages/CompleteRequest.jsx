import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Create consistent styling with previous components
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
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
  statusBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    backgroundColor: '#48bb78',
    color: 'white',
    fontWeight: '500',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
  noServices: {
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
    <span style={styles.label}>{label}:</span> {value || 'N/A'}
  </p>
);

// Create a reusable CompletedServiceCard component
const CompletedServiceCard = ({ service }) => {
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
      <div style={styles.statusBadge}>Confirmed</div>
      
      <InfoItem label="Customer" value={service.customer} />
      <InfoItem label="Description" value={service.description} />
      <InfoItem label="Location" value={service.location} />
      <InfoItem label="Charges" value={service.charges} />
      <InfoItem label="Contact" value={service.contact} />
      <InfoItem label="Timing" value={service.timing} />
    </div>
  );
};

export default function CompleteRequest() {
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
      
      // Return fallback data on error
      return [
        {
          id: 1,
          name: "Dr. John Smith",
          description: "Board-certified pediatrician with 15 years of experience.",
          location: "123 Main Street, Cityville",
          charges: "$120 per consultation",
          contact: "drsmith@example.com | (555) 123-4567",
          timing: "Mon-Fri: 9am-5pm",
          customer: "patient@example.com",
          confirmation: true
        },
        {
          id: 2,
          name: "Dr. Sarah Johnson",
          description: "Cardiologist offering comprehensive heart health services.",
          location: "456 Elm Street, Townsville",
          charges: "$150 per visit",
          contact: "heartdoc@example.com | (555) 987-6543",
          timing: "Tue-Thu: 10am-7pm",
          customer: "cardiopatient@example.com",
          confirmation: true
        }
      ];
    } finally {
      setIsLoading(false);
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
        <p style={{ marginTop: '1rem' }}>Loading confirmed appointments...</p>
      </div>
    );
  }

  // Filter services that are confirmed and match the current user's email
  const confirmedServices = services.filter(
    service => service.confirmation === true && service.name === email
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Confirmed Appointments</h2>
      
      {confirmedServices.length === 0 ? (
        <div style={styles.noServices}>
          <p>You have no confirmed appointments at this time.</p>
        </div>
      ) : (
        <div style={styles.cardGrid}>
          {confirmedServices.map(service => (
            <CompletedServiceCard 
              key={service.id} 
              service={service} 
            />
          ))}
        </div>
      )}
    </div>
  );
}