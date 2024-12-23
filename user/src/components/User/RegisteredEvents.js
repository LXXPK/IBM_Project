import React, { useState, useEffect } from 'react';
import axios from '../../utils/api';
import './RegisteredEvents.css'; 

const RegisteredEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not logged in.');
        return;
      }

      try {
        const response = await axios.get('/api/events/registered', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length === 0) {
          setError('You have not registered for any events.');
        } else {
          setUserEvents(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching registered events.');
        console.error(err);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="registered-events-container">
      <h3 className="title">Your Registered Events</h3>
      {error && <p className="error-message">{error}</p>}
      {userEvents.length > 0 ? (
        userEvents.map((event, index) => (
          <div key={index} className="event-card">
            <h4 className="event-name">{event.eventName}</h4>
            <p className="event-description">{event.eventDescription}</p>
            <p className="event-date">{new Date(event.eventDate).toLocaleDateString()}</p>
            {event.qrCode && (
              <a href={`http://localhost:5000${event.qrCode}`} download>
                <button className="download-button">Download QR Code</button>
              </a>
            )}
            {event.image && (
              <div className="event-image-container">
                <img
                  src={`http://localhost:5000${event.image}`}
                  alt="Event"
                  className="event-image"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-events-message">No registered events found.</p>
      )}
    </div>
  );
};

export default RegisteredEvents;
