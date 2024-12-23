import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/Admin/AdminNavbar";
import PostEvent from "../components/Admin/PostEvent";
import VerifyUser from "../components/Admin/VerifyUser";
import ViewEvents from "../components/Admin/ViewEvents";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard</h2>
      </div>
      <div className="dashboard-container">
        <Routes>
          <Route path="post-event" element={<PostEvent />} />
          <Route path="verify-user" element={<VerifyUser />} />
          <Route path="view-events" element={<ViewEvents />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
