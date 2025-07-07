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
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Link to="/myPost">
        <button style={buttonStyle}>My Post</button>
      </Link>
      <Link to="/map">
        <button style={buttonStyle}>Map</button>
      </Link>
      <Link to="/post">
        <button style={buttonStyle}>Create Post</button>
      </Link>
      <Link to="/chats">
        <button style={buttonStyle}>Chats</button>
      </Link>
      <Link to="/login">
        <button
          style={{ ...buttonStyle, backgroundColor: '#ef4444' }}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
          }}
        >
          Logout
        </button>
      </Link>
    </div>
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
};

export default NavBar;
