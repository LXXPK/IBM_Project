import React, { useState, useEffect } from "react";
import axios from "../../utils/api";
import "./ViewEvents.css";

const ViewEvents = () => {
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


  const handleDeleteEvent = async (eventId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`/api/events/delete/${eventId}`);
        if (response.status === 200) {
          setEvents(events.filter((event) => event._id !== eventId));
        }
      } catch (err) {
        setError("Failed to delete the event.");
      }
    }
  };

  return (
    <div className="view-events-container">
      <h2 className="view-events-title">View Events</h2>
      {error && <p className="error-message">{error}</p>}
      {events.length === 0 ? (
        <p className="no-events">No events to display.</p>
      ) : (
        <ul className="events-list">
          {events.map((event) => (
            <li key={event._id} className="event-card">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-date">{new Date(event.date).toLocaleString()}</p>
              <button
                onClick={() => handleDeleteEvent(event._id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewEvents;
