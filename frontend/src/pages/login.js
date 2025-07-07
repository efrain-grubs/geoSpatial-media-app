import React, { useState } from 'react';
import customAxios from '../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[errorMessage,setErrorMessage] = useState('')
  const[Error,setError] = useState('')
  const navigate = useNavigate();

  const sendLogin = async () => {
    try {
      const sendLogin = await customAxios.post('/user/login', {
        username,
        password,
      });

      localStorage.setItem('token', sendLogin.data.token);
      localStorage.setItem('userId', sendLogin.data.userId);

      console.log('login: ', sendLogin);

      if (sendLogin) {
        navigate('/post');
      }
    } catch(error) {
     
  
    console.log(error)
    
setErrorMessage(error?.response?.data?.message[0]?.msg)
setError(error?.response?.data?.message)

    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendLogin();
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
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
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
        {errorMessage ? <h1 className = "flex justify-center font-bold text-red-500">{errorMessage}</h1> : <h1 className = "flex justify-center font-bold text-red-500">{Error}</h1>}
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <h1 className = 'flex justify-center text-blue-700 font-bold '>Dont have an account</h1>
        <div className = 'flex justify-center'>
<Link to = '/'><button className = ' rounded flex justify-center bg-blue-700 text-white px-2 py-1'>register</button></Link>
</div>
      </form>
    </div>
  );
}

export default Login;
