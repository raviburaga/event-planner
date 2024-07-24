import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useAuth } from '../context/AuthContext'; // Adjust import path as necessary
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const navigate = useNavigate(); // Get navigation object for navigation
  const { token } = useAuth(); // Get token from AuthContext
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://backend-event-planner.onrender.com/api/events', {
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
  <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full mt-16 mx-2  h-28 w-28" alt='Loading-with-image-by-ravi-buraga'/><div className=' mt-12 text-pink-400 flex justify-center align-center text-2xl  font-bold'><p>Loading Your Events.....</p></div> </div> ;
  if (error) return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full text-pink-400 flex justify-center align-center  font-bold max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">{error}</div></div>;

  if (events.length === 0) return <p className="text-pink-300">No events found.</p>;

  return (
    <div className="max-w-4xl  mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
   
      <h2 className="text-2xl font-bold text-center text-pink-300 mb-6">Event List</h2>
      
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="relative bg-gray-800 bg-opacity-70 backdrop-blur-lg p-4 rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gray-700 bg-opacity-30 rounded-lg"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-pink-300">{event.name}</h3>
              <p className="text-sm text-pink-300"><strong>Date:</strong> {event.date}</p>
              <div className="mt-4">
                <Link 
                  to={`/events/${event._id}`} 
                  className="inline-block px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
};

export default EventList;
