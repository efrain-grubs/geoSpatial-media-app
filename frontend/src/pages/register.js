import React, { useState } from 'react';
import customAxios from '../api/customAxios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[errorMessage,setErrorMessage] = useState('')
  const navigate = useNavigate();

  const sendRegistration = async () => {
    try {
      const userInfo = await customAxios.post('/user/register', {
        username,
        name,
        password,
      });

      console.log('info: ', userInfo);

      if (userInfo) {
        navigate('/login');
      }
    } catch (err) {
      console.log('error: ', err);
      setErrorMessage(err.response?.data?.message[0]?.msg)
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendRegistration();
          setName('');
          setUsername('');
          setPassword('');
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          width: '300px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</h2>

        <input
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
<h1 className = 'flex justify-center text-center text-red-500 font-bold'>{errorMessage}</h1>
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Register
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0.5rem 0' }}>Have an account?</p>
          <Link to="/login">
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
