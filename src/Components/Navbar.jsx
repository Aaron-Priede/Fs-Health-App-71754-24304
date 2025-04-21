import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <Link to="/User/home" className="navbar-link">Home</Link>
      </div>

      {/* Middle Section */}
      <div className="navbar-middle">
        <Link to="/User/booked" className="navbar-link">booking</Link>
        <Link to="/User/complete" className="navbar-link">Completed booking</Link>
          <Link to="/User/unfinish" className="navbar-link">Medications</Link>
          <Link to="/User/finish" className="navbar-link">Completed Medications</Link>
          <Link to="/User/medicationpolicy" className="navbar-link">Medications Policy</Link>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Logout</Link>
      </div>
    </nav>
  );
}