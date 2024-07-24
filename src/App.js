import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import EventDetails from './components/EventDetails';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import Event from './components/EventList';
import UserProfile from './components/UserProfile'; // Import UserProfile component
import RegistrationForm from './components/RegistrationForm'; // Import RegistrationForm component


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/register/:eventId" element={<RegistrationForm />} />
        <Route path="/events" element={<Event />} /> {/* Route for event list */}
        <Route path="/events/:id" element={<EventDetails />} /> {/* Route for event details */}
        <Route path="/profile" element={<UserProfile />} /> {/* Route for user profile */}
        
       
      </Routes>
    
  );
};

export default App;
