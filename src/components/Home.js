import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventList from './EventList';
import CalendarView from './CalendarView';
import EventForm from './EventForm'; // Adjust import path as necessary
import planningIllustration from '../assets/planning-illustration.jpg';
import eventIllustration from '../assets/event-illustration.jpg';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Home = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [showEventForm, setShowEventForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleEventForm = () => {
    setShowEventForm(!showEventForm);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-pink-900 text-white p-4 shadow-lg rounded-b-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Event Planner</div>
          {isAuthenticated ? (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className=" bg-transaparent text-pink-500 px-4 py-2 rounded-lg hover:text-pink-200 transition duration-300"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className=" bg-transaparent text-pink-500 px-4 py-2 rounded-lg hover:text-pink-200  transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="  bg-transaparent text-pink-500 px-4 py-2 rounded-lg hover:text-pink-200  transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-6">
        {isAuthenticated ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Welcome {user ? user.name : 'User'}!</h1>
              <p className="text-lg mb-4">Welcome to the Event Planner app, created by Ravi Buraga. Manage your events efficiently with ease.</p>
              <button
                onClick={toggleEventForm}
                className="bg-pink-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
              >
                {showEventForm ? 'Hide Event Form' : 'Create Event'}
              </button>
            </div>

            {/* Event Form */}
            {showEventForm && (
              <div className="mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
                <EventForm />
              </div>
            )}

            {/* Event List */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
              <EventList />
            </div>

            {/* Calendar View */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
              <CalendarView />
            </div>
          </>
        ) : (
          <>
            {/* Section 1 */}
            <section className="flex flex-col md:flex-row items-center mb-16">
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-bold mb-4">Plan Your Events with Ease</h2>
                <p className="text-lg mb-4">
                Our app simplifies event planning from start to finish. Easily create and customize events, manage RSVPs with tailored registration forms, and track your schedule with our interactive calendar. Real-time updates and integrated communication tools ensure you stay connected with attendees, while comprehensive reporting and analytics help you measure success. With a user-friendly interface and responsive design, our app makes managing your events effortless and efficient.</p>
               
              </div>
              <div className="md:w-1/2 p-4">
                <img src={eventIllustration} alt="Event Planning" className="w-full rounded-lg shadow-md" />
              </div>
            </section>
            <div className='flex align-center justify-center mb-12'>
            <button
                  onClick={() => navigate('/login')}
                  className="bg-pink-700 flex a text-white px-8 py-4 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
                >
                  Get Started
                </button></div>
            {/* Section 2 */}
            <section className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <img src={planningIllustration} alt="Event Management" className="w-full rounded-lg shadow-md" />
              </div>
              <div className="md:w-1/2 p-4">
                <h2 className="text-3xl font-bold mb-4">How We Help You</h2>
                <p className="text-lg mb-4">Our app offers a complete solution for event management. Easily track RSVPs, send invitations, and handle all aspects of your event from a single platform. Enjoy seamless organization, real-time updates, and comprehensive reporting to ensure everything runs smoothly.</p>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-pink-900 text-white p-6 flex justify-between items-center rounded-t-lg">
  <div className="flex flex-col space-y-4">
    <div className="text-lg font-bold">Event Planner</div>
    <div className="flex space-x-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition duration-300">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition duration-300">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition duration-300">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition duration-300">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
  <div className="flex space-x-12">
    <div className="flex flex-col space-y-2">
      <div className="font-semibold">Contact Us</div>
      <a href="mailto:contact@example.com" className="hover:text-pink-300 transition duration-300">Email: contact@example.com</a>
      <a href="tel:+1234567890" className="hover:text-pink-300 transition duration-300">Phone: +123-456-7890</a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition duration-300 flex items-center">
        <i className="fab fa-facebook-f mr-2"></i> Facebook
      </a>
    </div>
    <div className="flex flex-col space-y-2">
      <div className="font-semibold">Our Others</div>
      <a href="#about" className="hover:text-pink-300 transition duration-300">About Us</a>
      <a href="#services" className="hover:text-pink-300 transition duration-300">Services</a>
      <a href="#careers" className="hover:text-pink-300 transition duration-300">Careers</a>
      <a href="#contact" className="hover:text-pink-300 transition duration-300">Contact</a>
    </div>
  </div>
  <div className="flex items-center space-x-4">
    <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12" />
    <div className="text-lg font-bold">Event Planner</div>
  </div>
</footer>

    </div>
  );
};

export default Home;
