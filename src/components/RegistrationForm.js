import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RegistrationForm = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(eventId);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log('fetching the event details of the event :',eventId);
        const response = await fetch(`http://localhost:5000/api/public/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }
        const data = await response.json();
        setEvent(data);
        const initialFormData = {};
        data.registrationForm.forEach(field => {
          initialFormData[field.title] = '';
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/public/register/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      alert('Registration successful!');
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration');
    }
  };

  if (loading) return <div class="relative h-screen w-screen bg-gray-800 flex flex-col  align-center justify-center items-center">
  <div class="absolute animate-spin rounded-full m-4 h-32 w-32 border-t-4 border-b-4 border-purple-500"></div> 
  <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full mt-16 mx-2  h-28 w-28" alt='Loading-with-image-by-ravi-buraga'/><div className=' mt-12 text-pink-400 flex justify-center align-center text-2xl  font-bold'><p>Loading Your RegistrationForm</p></div> </div> ;
  if (error) return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full text-pink-400 text-xl flex justify-center align-center  font-bold max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">Sorry to inform you that we <br/> {error} Your Registration Form <br/> Contact Your Invitee</div></div>;

  return (
    <div className="p-6 h-screen m-12 bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-pink-300 mb-6">Register for Event</h2>
      <p  className='text-2xl font-bold text-center text-pink-300 mb-6'>Hello Welcome to the event planner technologies</p>
      {event && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold text-pink-300 mb-4">{event.name}</h3>
          {event.registrationForm.map((field) => (
            <div key={field.title} className="mb-4">
              <label htmlFor={field.title} className="block text-sm font-semibold text-pink-300 mb-2">{field.title}:</label>
              <input
                type={field.type}
                id={field.title}
                name={field.title}
                value={formData[field.title]}
                onChange={handleChange}
                className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required={field.required}
              />
            </div>
          ))}
          <button type="submit" className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
