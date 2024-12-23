import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css"; 

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <Link to="/admin-dashboard/post-event" className="nav-link">Post Event</Link>
        <Link to="/admin-dashboard/verify-user" className="nav-link">Verify User</Link>
        <Link to="/admin-dashboard/view-events" className="nav-link">View Events</Link>
        <Link to="/login" className="nav-link" onClick={() => localStorage.clear()}>Logout</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
