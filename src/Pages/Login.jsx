import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCredentials } from "../Redux/slice.js";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const authenticateUser = async () => {
    const { email, password } = formData;
    
    // Admin login shortcut
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/Admin");
      return { success: true, role: "admin" };
    }
    
    try {
      const endpoint = `http://localhost:5188/api/UserProfile/search?email=${email}&password=${password}`;
      const response = await fetch(endpoint);
      return await response.json();
    } catch (error) {
      console.error("Authentication error:", error);
      return { success: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { email, password } = formData;
      const userData = await authenticateUser();
      
      if (userData.name && userData.email) {
        dispatch(addCredentials({ email, password }));
        
        if (userData.serviceProvider === false) {
          navigate("/User/Home");
          showNotification("Login successful", "success");
        } else {
          navigate("/Doctor");
          showNotification("Login successful", "success");
        }
      } else if (email === "admin@gmail.com" && password === "admin123") {
        // Admin is already handled in authenticateUser
        showNotification("Admin login successful", "success");
      } else {
        showNotification("Invalid email or password", "error");
      }
    } catch (error) {
      showNotification("Login failed. Please try again.", "error");
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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to continue</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              required
            />
            <div className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
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
            <span>Continue with Google</span>
          </button>
          
          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={() => navigate("/signup")}>
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;