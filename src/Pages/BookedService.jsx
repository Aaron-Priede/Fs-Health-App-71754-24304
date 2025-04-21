import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BookedService.css'; // Renamed to match component name

export default function BookedService() {
  const navigate = useNavigate();
  const email = useSelector((state) => state.slice.email);
  
  const [bookedServices, setBookedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ENDPOINT = 'http://localhost:5188/api/ServiceListing';

  // Fetch all services
  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINT);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load your booked services. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get specific service by ID
  const getServiceById = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}/`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch service with ID: ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  };

  // Update service
  const updateService = async (id, data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update service with ID: ${id}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating service ${id}:`, error);
      throw error;
    }
  };

  // Cancel booking
  const handleCancelBooking = async (id) => {
    setIsLoading(true);
    try {
      // Get current service data
      const serviceData = await getServiceById(id);
      
      // Update service to remove booking
      const updatedData = {
        ...serviceData,
        booking: false,
        availability: true,
        customer: null
      };
      
      await updateService(id, updatedData);
      
      // Update local state by removing the canceled booking
      setBookedServices(prevServices => 
        prevServices.filter(service => service.id !== id)
      );
      
      // Show success message
      showNotification("Booking canceled successfully", "success");
      
      // Optionally refresh the entire list
      if (bookedServices.length <= 1) {
        navigate("/User/home");
      }
    } catch (error) {
      showNotification("Failed to cancel booking. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    // Replace with a better notification system in the future
    alert(message);
  };

  useEffect(() => {
    fetchServices()
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filter for user's booked services
          const userBookings = data.filter(service => 
            service.availability !== true && 
            service.confirmation !== true && 
            service.customer === email
          );
          setBookedServices(userBookings);
        }
      })
      .catch(() => {
        // Error is already handled in fetchServices
      });
  }, [email]);

  if (isLoading && bookedServices.length === 0) {
    return (
      <div className="booked-services-loading">
        <div className="loader"></div>
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booked-services-error">
        <div className="error-message">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booked-services-page">
      <div className="booked-services-header">
        <h1>Your Booked Services</h1>
        <p>Manage your current service bookings</p>
      </div>
      
      {bookedServices.length === 0 ? (
        <div className="no-bookings">
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No Current Bookings</h3>
            <p>You don't have any active service bookings at the moment.</p>
            <button 
              className="browse-services-btn"
              onClick={() => navigate("/User/home")}
            >
              Browse Available Services
            </button>
          </div>
        </div>
      ) : (
        <div className="booked-services-grid">
          {bookedServices.map((service) => (
            <div key={service.id} className="booking-card">
              <div className="booking-header">
                <h3>{service.name}</h3>
                <span className="status-badge">Pending</span>
              </div>
              
              <div className="booking-details">
                <div className="detail-row">
                  <span className="detail-icon">📝</span>
                  <div>
                    <strong>Description</strong>
                    <p>{service.description || "No description available"}</p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <span className="detail-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>{service.location || "Location not specified"}</p>
                  </div>
                </div>
                
                <div className="detail-row">
                  <span className="detail-icon">💰</span>
                  <div>
                    <strong>Price</strong>
                    <p>{service.charges || "Price not specified"}</p>
                  </div>
                </div>
                
                {service.timing && (
                  <div className="detail-row">
                    <span className="detail-icon">⏰</span>
                    <div>
                      <strong>Timing</strong>
                      <p>{service.timing}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="booking-actions">
                <button
                  className="cancel-booking-btn"
                  onClick={() => handleCancelBooking(service.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Cancel Booking"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}