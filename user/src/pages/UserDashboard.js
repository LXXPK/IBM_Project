import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/User/UserNavbar";
import AvailableEvents from "../components/User/AvailableEvents";
import RegisteredEvents from "../components/User/RegisteredEvents";
import "./UserDashboard.css";

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <Navbar />
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="available" element={<AvailableEvents />} />
          <Route path="registered" element={<RegisteredEvents />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
