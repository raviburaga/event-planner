// src/components/CalendarView.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching events');
        }

        const data = await response.json();
        setEvents(Object.values(data)); // Convert event objects to an array
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  if (loading) return <div class="relative h-screen w-screen bg-gray-800 flex flex-col  align-center justify-center items-center">
  <div class="absolute animate-spin rounded-full m-4 h-32 w-32 border-t-4 border-b-4 border-purple-500"></div> 
  <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full mt-16 mx-2  h-28 w-28" alt='Loading-with-image-by-ravi-buraga'/><div className=' mt-12 text-pink-400 flex justify-center align-center text-2xl  font-bold'><p>Loading Your Events in CalendarView ....... </p></div> </div> ;
  if (error) return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full text-pink-400 flex justify-center align-center  font-bold max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">{error}</div></div>;

  if (events.length === 0) return <p className="text-pink-300">No events found.</p>;
  // Helper function to group events by date
  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const date = new Date(event.date).toISOString().split('T')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(event);
    });
    return grouped;
  };

  // Helper function to get today's date and tomorrow's date
  const getDateLabels = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return {
      today: today.toISOString().split('T')[0],
      tomorrow: tomorrow.toISOString().split('T')[0]
    };
  };

  // Group events by date
  const groupedEvents = groupEventsByDate(events);
  const { today, tomorrow } = getDateLabels();

  // Get events for today and tomorrow
  const todayEvents = groupedEvents[today] || [];
  const tomorrowEvents = groupedEvents[tomorrow] || [];
  const upcomingEvents = Object.entries(groupedEvents).filter(([date]) => date > tomorrow).sort(([a], [b]) => new Date(a) - new Date(b));

  // Navigate to event details page
  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="calendar-view min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-5xl bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-pink-300 mb-4">Event Schedule</h2>
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}
        <div className="space-y-6">
          {todayEvents.length > 0 && (
            <div className="events-group">
              <h3 className="text-xl font-semibold text-pink-300 mb-2">Today</h3>
              <ul className="space-y-2">
                {todayEvents.map((event) => (
                  <li
                    key={event._id}
                    className="p-3 bg-gray-700 text-pink-200 border border-pink-600 rounded cursor-pointer hover:bg-pink-700 transition"
                    onClick={() => handleEventClick(event._id)}
                  >
                    {event.name} - {new Date(event.date).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tomorrowEvents.length > 0 && (
            <div className="events-group">
              <h3 className="text-xl font-semibold text-pink-300 mb-2">Tomorrow</h3>
              <ul className="space-y-2">
                {tomorrowEvents.map((event) => (
                  <li
                    key={event._id}
                    className="p-3 bg-gray-700 text-pink-200 border border-pink-600 rounded cursor-pointer hover:bg-pink-700 transition"
                    onClick={() => handleEventClick(event._id)}
                  >
                    {event.name} - {new Date(event.date).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {upcomingEvents.length > 0 && (
            <div className="events-group">
              <h3 className="text-xl font-semibold text-pink-300 mb-2">Upcoming Events</h3>
              <ul className="space-y-2">
                {upcomingEvents.map(([date, events]) => (
                  <div key={date}>
                    <h4 className="text-lg font-semibold text-pink-300 mb-1">{new Date(date).toDateString()}</h4>
                    <ul className="space-y-2">
                      {events.map((event) => (
                        <li
                          key={event._id}
                          className="p-3 bg-gray-700 text-pink-200 border border-pink-600 rounded cursor-pointer hover:bg-pink-700 transition"
                          onClick={() => handleEventClick(event._id)}
                        >
                          {event.name} - {new Date(event.date).toLocaleTimeString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => window.location.reload()} // Refresh the component
            className="mt-6 px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
