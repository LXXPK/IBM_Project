import React, { useState } from "react";
import axios from "../../utils/api";
import "./PostEvent.css"; 

const PostEvent = () => {
  const [newEvent, setNewEvent] = useState({ name: "", description: "", date: "" });
  const [error, setError] = useState("");

  const handleNewEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/events/create", newEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      alert("Event posted successfully!");
      setNewEvent({ name: "", description: "", date: "" });
      setError(""); 
    } catch (err) {
      setError("Error posting event. Please try again.");
    }
  };

  return (
    <div className="post-event-container">
      <h3 className="post-event-title">Post a New Event</h3>
      <form className="post-event-form" onSubmit={handleNewEventSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          required
          className="form-input"
        />
        <textarea
          placeholder="Event Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          required
          className="form-textarea"
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Submit Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PostEvent;
