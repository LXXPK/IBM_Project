import React, { useState } from "react";
import axios from "../../utils/api";
import "./VerifyUser.css"; 

const VerifyUser = () => {
  const [verifyQRCode, setVerifyQRCode] = useState("");
  const [error, setError] = useState("");

  const handleVerifyQRCode = async () => {
    try {
      const response = await axios.post(
        "/api/participants/checkin",
        { userId: verifyQRCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      setVerifyQRCode(""); 
      setError(""); 
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying QR code.");
    }
  };

  return (
    <div className="verify-user-container">
      <h3 className="verify-title">Verify User via QR Code</h3>
      <div className="verify-form">
        <input
          type="text"
          value={verifyQRCode}
          onChange={(e) => setVerifyQRCode(e.target.value)}
          placeholder="Enter QR Code"
          className="verify-input"
          required
        />
        <button onClick={handleVerifyQRCode} className="verify-button">
          Verify User
        </button>
      </div>
      <h3>{error && <p className="error-message">{error}</p>}</h3>
    </div>
  );
};

export default VerifyUser;
