import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import socket from '../api/socket';

function NavBar() {
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join-user', userId);
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <NavButton to="/myPost" label="My Post" />
      <NavButton to="/map" label="Map" />
      <NavButton to="/post" label="Create Post" />
      <NavButton to="/chats" label="Chats" />
      <NavButton
        to="/login"
        label="Logout"
        styleOverride={{ backgroundColor: '#ef4444' }}
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
        }}
      />
    </div>
  );
}

function NavButton({ to, label, styleOverride = {}, onClick }) {
  return (
    <Link to={to}>
      <button
        style={{ ...buttonStyle, ...styleOverride }}
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  );
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1rem',
  cursor: 'pointer',
  whiteSpace: 'nowrap', // prevents buttons from breaking text
};

export default NavBar;

