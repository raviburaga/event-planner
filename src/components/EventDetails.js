import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust import path as necessary

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL parameters
  const { token } = useAuth(); // Get token from AuthContext
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const [showRegistrations, setShowRegistrations] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`https://backend-event-planner.onrender.com/api/events/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching event details');
        }

        const data = await response.json();
        setEvent(data);
        setUpdatedEvent(data); // Initialize updatedEvent with current event data
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://backend-event-planner.onrender.com/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting event');
      }

      navigate('/'); // Redirect to event list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://backend-event-planner.onrender.com/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error('Error updating event');
      }

      setEvent(updatedEvent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedEvent(event); // Revert changes if canceled
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div class="relative h-screen w-screen bg-gray-800 flex flex-col  align-center justify-center items-center">
  <div class="absolute animate-spin rounded-full m-4 h-32 w-32 border-t-4 border-b-4 border-purple-500"></div> 
  <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full mt-16 mx-2  h-28 w-28" alt='Loading-with-image-by-ravi-buraga'/><div className=' mt-12 text-pink-400 flex justify-center align-center  font-bold'><p>Loading Your Event Details</p></div> </div> ;
  if (error) return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full text-pink-400 flex justify-center align-center  font-bold max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">{error}</div></div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-4xl w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 text-center">Event Details</h2>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          {!isEditing ? (
            <>
              <h3 className="text-xl font-semibold text-pink-300">{event.name}</h3>
              <p className="text-pink-200">Date: {event.date}</p>
              <p className="text-pink-200">Time: {event.time}</p>
              <p className="text-pink-200">Location: {event.location}</p>
              <p className="text-pink-200">Description: {event.description}</p>
              <p className="text-pink-200">Category: {event.category}</p>
              
                <button
                  onClick={() => setShowRegistrations(!showRegistrations)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  {showRegistrations ? 'Hide Registrations' : 'Show Registrations'}
                </button>
              
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                >
                  Edit Event
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete Event
                </button>
              </div>
            </>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-pink-300 mb-4">Edit Event</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-pink-200">Event Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={updatedEvent.name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-pink-200">Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={updatedEvent.date || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-pink-200">Time:</label>
                  <input
                    type="time"
                    name="time"
                    value={updatedEvent.time || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-pink-200">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={updatedEvent.location || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-pink-200">Description:</label>
                  <textarea
                    name="description"
                    value={updatedEvent.description || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-pink-200">Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={updatedEvent.category || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-600 text-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-4 py-2 bg-pink-700 text-white rounded-lg hover:bg-pink-600 transition duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
  
        {showRegistrations && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-pink-300">Registrations</h3>
            <table className="w-full bg-gray-700 text-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr>
                  {event.registrationForm.map((field, index) => (
                    <th key={index} className="px-4 py-2 bg-gray-800">
                      {field.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {event.registrations.map((registration, index) => (
                  <tr key={index} className="bg-gray-600 hover:bg-gray-500">
                    {event.registrationForm.map((field, fieldIndex) => (
                      <td key={fieldIndex} className="px-4 text-center py-2">
                        {registration[field.title]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-pink-200">
              Total Registrations: {event.registrations.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
