import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import "./AvailableEvents.css"; 

const AvailableEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data); 
      } catch (err) {
        setError("Unable to fetch events.");
      }
    };

    fetchEvents();
  }, []);


  const handleRegisterEvent = async (eventId) => {
    const isConfirmed = window.confirm("Are you sure you want to register for this event?");
    if (!isConfirmed) return;
  
    try {
      const token = localStorage.getItem("token"); 
  
      
      if (!token) {
        alert("User not logged in or authentication token is missing.");
        return;
      }
  
   
      const response = await axios.post(
        `/api/events/register`, 
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 201) {
        alert("Successfully registered for the event!");
        setError(""); 
      } else if (response.status === 200 && response.data.message === 'You are already registered for this event.') {
        alert("You are already registered for this event."); 
        setError(""); 
      } else {
        setError("Failed to register for the event.");
      }
    } catch (err) {
      setError("Error registering for the event.");
      console.error(err);
    }
  };

  return (
    <div className="available-events-container">
      <h2 className="events-title">Available Events</h2>
      {error && <p className="error-message">{error}</p>}
      {events.length === 0 ? (
        <p className="no-events">No events to display.</p>
      ) : (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} className="event-card">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-date">{new Date(event.date).toLocaleString()}</p>
              <button onClick={() => handleRegisterEvent(event._id)} className="register-button">
                Register
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableEvents;
