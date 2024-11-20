import React, { useState, useEffect } from 'react';
import './upcoming-events.css';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //Lambda Function URL
  const functionURL = 'https://us-central1-serverless-441520.cloudfunctions.net/event';

  const fetchEvents = async () => {
    try {
      const response = await fetch(functionURL);
      const data = await response.json();

      console.log('API Response:', data);

      if (response.ok) {
        // Check if data.events is an object
        if (data.events && typeof data.events === 'object') {
          // Convert the object values to an array
          setUpcomingEvents(Object.values(data.events));
        } else {
          setError('Invalid data format: Expected an object with events.');
        }
      } else {
        setError(data.message || 'Failed to fetch events.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="events-container">
      <h1 className="events-title">Upcoming Events</h1>
      <div className="events-list">
        {upcomingEvents.map((event) => (
          <Link
            key={event.eventId}
            to="/event-registration"
            state={event}
            className="event-card"
          >
            <h2 className="event-name">{event.title}</h2>
            <h3 className="event-date">{event.date}</h3>
            <p className="event-description">{event.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;