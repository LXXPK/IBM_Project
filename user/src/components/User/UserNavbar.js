import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/user-dashboard/available" className="navbar-link">Available Events</Link>
        <Link to="/user-dashboard/registered" className="navbar-link">Registered Events</Link>
        <Link to="/login" className="navbar-link logout" onClick={() => localStorage.clear()}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
