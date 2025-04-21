import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Signup.css"; // We'll create a separate CSS file with matching styles

function Signup() {
  const navigate = useNavigate();
  const API_ENDPOINT = "http://localhost:5188/api/UserProfile";
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    serviceProvider: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      serviceProvider: e.target.checked
    }));
  };

  const createUserAccount = async () => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      return await response.json();
    } catch (error) {
      console.error("Account creation error:", error);
      return { success: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = await createUserAccount();
      
      if (userData.id) {
        showNotification("Signup Successful!", "success");
        navigate("/"); // Redirect to login page after successful signup
      } else {
        showNotification("Failed to create account. Please try again.", "error");
      }
    } catch (error) {
      showNotification("Signup failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    // Replace alert with a more sophisticated notification system
    // For now, we'll use alert for simplicity
    alert(message);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5188/auth/login';
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Please fill in your information to get started</p>
        </div>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-field checkbox-field">
            <input
              type="checkbox"
              id="serviceProvider"
              name="serviceProvider"
              checked={formData.serviceProvider}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="serviceProvider">I am a healthcare provider (Doctor)</label>
          </div>
          
          <button 
            type="submit" 
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <button 
            type="button" 
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="google-icon" />
            <span>Sign Up with Google</span>
          </button>
          
          <div className="login-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={() => navigate("/")}>
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;