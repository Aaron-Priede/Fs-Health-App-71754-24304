import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar1.css';

export default function Navbar1() {
  return (
    <nav className="navbar1">
      {/* Left Section */}
      <div className="navbar1-left">
        <Link to="/Doctor/create" className="navbar1-link">Create Availability</Link>
      </div>

      {/* Middle Section */}
      <div className="navbar1-middle">
        <Link to="/Doctor" className="navbar1-link">Show Availabilities</Link>
      </div>
      <div className="navbar1-middle">
        <Link to="/Doctor/request" className="navbar1-link">Show request</Link>
      </div>
      <div className="navbar1-middle">
        <Link to="/Doctor/complete" className="navbar1-link">Complete Request</Link>
      </div>
      <div className="navbar1-middle">
        <Link to="/Doctor/prescription" className="navbar1-link">Show Prescriptions</Link>
      </div>
      
      {/* Right Section */}
      {/* <div className="navbar1-right" style={{ marginRight: '45px' }}>
        <Link to="/Doctor/about" className="navbar1-link">About Us</Link>
      </div> */}
      <div className="navbar1-right" style={{ marginRight: '45px' }}>
        <Link to="/" className="navbar1-link">Log Out</Link>
      </div>
    </nav>
  );
}