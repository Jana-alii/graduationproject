import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('blue');
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('videosum_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('videosum_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('videosum_user');
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('videosum_user');
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    // Protect chat page - require login
    if (page === 'chat' && !user) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={handleNavigate} 
          theme={theme} 
          setTheme={setTheme}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'chat' && (
        <ChatPage 
          onNavigate={handleNavigate}
          theme={theme}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          theme={theme}
        />
      )}
      
      {currentPage === 'signup' && (
        <SignUpPage 
          onNavigate={handleNavigate}
          onSignUp={handleLogin}
          theme={theme}
        />
      )}
    </div>
  );
}