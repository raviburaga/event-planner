import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { token } = useAuth(); // Get token from AuthContext
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://backend-event-planner.onrender.com/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name || 'Not Available',
          phoneNumber: response.data.phoneNumber || 'Not Available',
          email: response.data.email || 'Not Available',
          gender: response.data.gender || 'Not Available',
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('https://backend-event-planner.onrender.com/api/user/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUser(formData);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating user data:', err);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) return <div class="relative h-screen w-screen bg-gray-800 flex flex-col  align-center justify-center items-center">
  <div class="absolute animate-spin rounded-full m-4 h-32 w-32 border-t-4 border-b-4 border-purple-500"></div> 
  <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full mt-16 mx-2  h-28 w-28" alt='Loading-with-image-by-ravi-buraga'/><div className=' mt-12 text-pink-400 flex justify-center align-center text-2xl  font-bold'><p>Loading Your Profile Details</p></div> </div> ;
  if (error) return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full text-2xl text-pink-400 flex justify-center align-center  font-bold max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">{error}</div></div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center text-pink-300">User Profile</h1>
        {user ? (
          <div>
            {isEditing ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-300">Phone Number:</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email Address:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-300">Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button onClick={handleSave} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">Save</button>
                  <button onClick={handleCancel} className="py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition duration-300">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300">Name:</label>
                  <p className="text-gray-200">{user.name || 'Not Available'}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300">Phone Number:</label>
                  <p className="text-gray-200">{user.phoneNumber || 'Not Available'}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300">Email Address:</label>
                  <p className="text-gray-200">{user.email || 'Not Available'}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-300">Gender:</label>
                  <p className="text-gray-200">{user.gender || 'Not Available'}</p>
                </div>
                <button onClick={handleEditClick} className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">Edit</button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center">No user data available</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
