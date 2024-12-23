import React, { useState } from "react";
import axios from "../../utils/api";
import { useNavigate } from "react-router-dom";
import './Signup.css'; 

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
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
      const response = await axios.post("/api/auth/register", form);
      alert(response.data.message);
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            className="input-field"
            required
          />
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
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="submit-button">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? 
          <span
            onClick={() => navigate("/login")}
            className="register-link"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
