import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust import path as necessary
import { ClipboardCopyIcon } from '@heroicons/react/outline'; // Ensure you have @heroicons/react installed

const EventForm = () => {
  const { token } = useAuth(); // Get token from AuthContext
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [emails, setEmails] = useState('');
  const [isRegistrationRequired, setIsRegistrationRequired] = useState(false);
  const [registrationFields, setRegistrationFields] = useState([{ title: '', type: '' }]);
  const [eventLink, setEventLink] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormChange = (index, event) => {
    const values = [...registrationFields];
    values[index][event.target.name] = event.target.value;
    setRegistrationFields(values);
  };

  const handleAddField = () => {
    setRegistrationFields([...registrationFields, { title: '', type: '' }]);
  };

  const handleRemoveField = (index) => {
    const values = [...registrationFields];
    values.splice(index, 1);
    setRegistrationFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventCategory = category === 'other' ? customCategory : category;
    const eventData = {
      name,
      date,
      time,
      location,
      description,
      category: eventCategory,
      emails,
      isRegistrationRequired,
      registrationFields: isRegistrationRequired ? registrationFields : [],
    };

    console.log('Sending event data:', eventData);

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse.message || 'Error creating event');
      }

      const data = await response.json();
      console.log('Event created successfully:', data);
      alert('Event created successfully');
      setEventLink(data.eventLink); // Set the event link from the response
      if (data.registrationLink) {
        setRegistrationLink(data.registrationLink); // Set the registration link if available
        setIsModalOpen(true); // Open the modal to show the registration link
      }

      // Clear the form fields
      setName('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
      setCategory('');
      setCustomCategory('');
      setEmails('');
      setIsRegistrationRequired(false);
      setRegistrationFields([{ title: '', type: '' }]);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, link }) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(link);
      alert('Link copied to clipboard');
    };

    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={onClose}></div>
        <div className="relative flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h3 className="text-lg font-bold text-pink-300 mb-4">Registration Link</h3>
          <p className="text-gray-300 mb-4">{link}</p>
          <button
            onClick={copyToClipboard}
            className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300"
          >
            <ClipboardCopyIcon className="w-5 h-5 mr-2" />
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-pink-300 mb-6">Create Event</h2>
        {/* Existing form fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-pink-300 mb-2">Event Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold text-pink-300 mb-2">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-semibold text-pink-300 mb-2">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-semibold text-pink-300 mb-2">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-pink-300 mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-semibold text-pink-300 mb-2">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option value="">Select Category</option>
            <option value="meeting">Meeting</option>
            <option value="birthday">Birthday</option>
            <option value="wedding">Wedding</option>
            <option value="other">Other</option>
          </select>
        </div>
        {category === 'other' && (
          <div className="mb-4">
            <label htmlFor="customCategory" className="block text-sm font-semibold text-pink-300 mb-2">Custom Category:</label>
            <input
              type="text"
              id="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="emails" className="block text-sm font-semibold text-pink-300 mb-2">Emails:</label>
          <input
            type="text"
            id="emails"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isRegistrationRequired" className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isRegistrationRequired"
              checked={isRegistrationRequired}
              onChange={(e) => setIsRegistrationRequired(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-sm font-semibold text-pink-300">Require Registration</span>
          </label>
        </div>
        {isRegistrationRequired && registrationFields.map((field, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`fieldTitle-${index}`} className="block text-sm font-semibold text-pink-300 mb-2">Field {index + 1} Title:</label>
            <input
              type="text"
              id={`fieldTitle-${index}`}
              name="title"
              value={field.title}
              onChange={(e) => handleFormChange(index, e)}
              className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <label htmlFor={`fieldType-${index}`} className="block text-sm font-semibold text-pink-300 mt-2 mb-2">Field {index + 1} Type:</label>
            <select
              id={`fieldType-${index}`}
              name="type"
              value={field.type}
              onChange={(e) => handleFormChange(index, e)}
              className="w-full p-3 border border-pink-600 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Type</option>
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Remove Field
            </button>
          </div>
        ))}
        {isRegistrationRequired && (
          <button
            type="button"
            onClick={handleAddField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Add Field
          </button>
        )}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300"
          >
            Create Event
          </button>
        </div>
      </form>

      {/* Modal for registration link */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-pink-300 mb-4">Registration Link</h3>
            <p className="text-gray-300 mb-4">{registrationLink}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(registrationLink);
                alert('Link copied to clipboard');
              }}
              className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-300"
            >
              <ClipboardCopyIcon className="w-5 h-5 mr-2" />
              Copy Link
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventForm;
