import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Consistent styling structure similar to the CreateListing component
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1.1rem',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  serviceCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
  },
  serviceHeader: {
    backgroundColor: '#4299e1',
    padding: '1rem',
    color: 'white',
  },
  serviceTitle: {
    margin: 0,
    fontSize: '1.3rem',
  },
  serviceBody: {
    padding: '1.5rem',
    flexGrow: 1,
  },
  description: {
    marginTop: 0,
    marginBottom: '1.5rem',
    color: '#4a5568',
    lineHeight: '1.6',
  },
  serviceDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  detailIcon: {
    fontSize: '1.2rem',
    color: '#4299e1',
    width: '24px',
    textAlign: 'center',
  },
  detailText: {
    color: '#4a5568',
  },
  serviceFooter: {
    padding: '1rem',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f7fafc',
  },
  contactButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  contactButtonHover: {
    backgroundColor: '#3182ce',
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
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#fff5f5',
    borderRadius: '8px',
    color: '#c53030',
  },
  retryButton: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Create a reusable ServiceCard component
const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.serviceCard,
        ...(isHovered ? styles.serviceCardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.serviceHeader}>
        <h3 style={styles.serviceTitle}>{service.name}</h3>
      </div>
      
      <div style={styles.serviceBody}>
        <p style={styles.description}>{service.description}</p>
        
        <div style={styles.serviceDetails}>
          <DetailItem icon="📍" text={service.location} />
          <DetailItem icon="💰" text={service.charges} />
          <DetailItem icon="📞" text={service.contact} />
          <DetailItem icon="⏰" text={service.timing} />
        </div>
      </div>
      
      <div style={styles.serviceFooter}>
        <button 
          style={styles.contactButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.contactButtonHover.backgroundColor;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.contactButton.backgroundColor;
          }}
        >
          Contact Provider
        </button>
      </div>
    </div>
  );
};

// Create a detail item component for service information
const DetailItem = ({ icon, text }) => (
  <div style={styles.detailItem}>
    <span style={styles.detailIcon}>{icon}</span>
    <span style={styles.detailText}>{text}</span>
  </div>
);

export default function ShowService() {
  const email = useSelector((state) => state.slice.email);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ENDPOINT = 'http://localhost:5188/api/ServiceListing';

  // Improved fetch services function with error handling
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

  // Sample fallback data
  const fallbackServices = [
    {
      id: 1,
      name: "Dr. John Smith",
      description: "Board-certified pediatrician with 15 years of experience. Specializing in childhood development and preventive care.",
      location: "123 Main Street, Cityville",
      charges: "$120 per consultation",
      contact: "drsmith@example.com | (555) 123-4567",
      timing: "Mon-Fri: 9am-5pm"
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      description: "Cardiologist offering comprehensive heart health services including ECG, stress tests, and cardiac consultations.",
      location: "456 Elm Street, Townsville",
      charges: "$150 per visit",
      contact: "heartdoc@example.com | (555) 987-6543",
      timing: "Tue-Thu: 10am-7pm"
    },
    {
      id: 3,
      name: "Dr. Michael Lee",
      description: "Experienced dermatologist treating skin conditions, performing skin checks, and offering cosmetic procedures.",
      location: "789 Oak Avenue, Suburbia",
      charges: "$100 initial consultation",
      contact: "drmlee@example.com | (555) 567-8901",
      timing: "Mon, Wed, Fri: 8am-6pm"
    }
  ];

  useEffect(() => {
    fetchServices()
      .then((data) => {
        console.log("Services data:", data);
        setServices(data && data.length > 0 ? data : fallbackServices);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setServices(fallbackServices);
      });
  }, [email]);

  // Loading state
  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: '1rem' }}>Loading available services...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          style={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Filter available services
  const availableServices = services.filter(service => service.customer === null);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Available Doctor Appointments</h1>
        <p style={styles.subtitle}>Browse through our selection of professional medical services</p>
      </div>
      
      {availableServices.length === 0 ? (
        <div style={styles.noServices}>
          <p>No available services found at the moment.</p>
          <p>Please check back later or refresh the page.</p>
        </div>
      ) : (
        <div style={styles.servicesGrid}>
          {availableServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}