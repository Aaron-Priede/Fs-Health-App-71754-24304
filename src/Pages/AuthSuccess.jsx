// AuthSuccess.jsx
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCredentials } from "../Redux/slice.js";

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get query parameters
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const name = params.get('name');
    const isServiceProvider = params.get('isServiceProvider') === 'true';

    if (email) {
      // Add credentials to Redux store
      dispatch(addCredentials({ 
        email: email, 
        // Since Google OAuth doesn't provide password, you might want to handle this differently
        // For now, setting a placeholder or empty string
        password: '' 
      }));

      // Navigate based on user type
      if (isServiceProvider) {
        navigate("/Doctor");
        alert("Login successful");
      } else {
        navigate("/User/home");
        alert("Login successful");
      }
    } else {
      // Handle error
      alert("Authentication failed");
      navigate("/login");
    }
  }, [dispatch, location.search, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h2>Completing authentication...</h2>
          <p>Please wait while we redirect you.</p>
        </div>
      </div>
    </div>
  );
}

export default AuthSuccess;