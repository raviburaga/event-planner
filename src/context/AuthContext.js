import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // useNavigate should be inside the component

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setToken(storedToken);
        setUser({ ...decoded, token: storedToken });
      } catch (err) {
        // Handle token decode error
        console.error('Failed to decode token:', err);
        logout();
      }
    }
  }, []); 
  // Added navigate to dependency array

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setToken(token);
      setUser({ ...decoded, token });
      localStorage.setItem('token', token); // Store token in local storage
    } catch (err) {
      // Handle token decode error
      console.error('Failed to decode token during login:', err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token'); 
    navigate('/login');  // Redirect to login page after logout
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
