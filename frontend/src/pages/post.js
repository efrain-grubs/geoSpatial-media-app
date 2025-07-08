import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import customAxios from '../api/customAxios';
import socket from '../api/socket';
import {toast} from 'react-hot-toast'
function Post() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [frontend, setFrontend] = useState(null);

  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          console.log(coords);
          resolve(coords);
        },
        (error) => {
          console.error('error: ', error);
          reject(error);
        }
      );
    });
  };

  const capture = async () => {
    const takePic = webcamRef.current.getScreenshot();
    setFrontend(takePic);
    const blob = await fetch(takePic).then((res) => res.blob());
    setImage(blob);
  };

  const sendInfo = async () => {
    const userCoordinates = await getUserLocation();

    const location = {
      coordinates: [userCoordinates.lng, userCoordinates.lat],
    };

    const formData = new FormData();
    formData.append('URL', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('postImage', frontend);
    formData.append('location', JSON.stringify(location));

    try {
      const info = await customAxios.post('/post/', formData);

      console.log('info: ', info);
      socket.emit('new-post', info.data.newPost);
      if(info) {
        toast.success('upload successful')
      }
    } catch (err) {
      toast.error('upload unsucessful')
      console.log('error: ', err);
    }
  };

  const submission = async() => {

setDescription('')
setTitle('')
setImage(null)

  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ marginBottom: '1.5rem' }}>Upload Post</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendInfo();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        {image ? (
          <div style={{ textAlign: 'center' }}>
            <img
              src={frontend}
              alt="Preview"
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Retake Photo
            </button>
          </div>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{ borderRadius: '8px', width: '100%' }}
            />
            <button
              type="button"
              onClick={() => capture()}
              style={{
                padding: '0.75rem',
                backgroundColor: '#3b82f6',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Take Picture
            </button>
          </>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />

        <button onClick ={() => {
submission()
        }}
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
          Upload
        </button>
      </form>
    </div>
  );
}

export default Post;
