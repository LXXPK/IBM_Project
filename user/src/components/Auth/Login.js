import React, { useState } from "react";
import axios from "../../utils/api";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login", form);
      if (response.data?.token) {
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);

        
        navigate(response.data.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            className="input-field"
            required
          />
          <select name="role" value={form.role} onChange={handleInputChange} className="select-field">
            <option value="user" className="options">User</option>
            <option value="admin"  className="options">Admin</option>
          </select>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? 
          <span
            onClick={() => navigate("/signup")}
            className="register-link"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
