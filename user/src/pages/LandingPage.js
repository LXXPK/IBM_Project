import React from "react";
import { Link } from "react-router-dom";
import "./Landingpage.css"; 

function Landingpage() {
  return (
    <div className="landingpage">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <h1 className="welcome-message">Welcome, All</h1>
        <p className="subtext">Your journey to amazing events begins here!</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </div>
    </div>
  );
}

export default Landingpage;
