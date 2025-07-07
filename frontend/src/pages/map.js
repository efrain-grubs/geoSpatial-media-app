import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import socket from '../api/socket';
import customAxios from '../api/customAxios';

// Circular icon with image
const createUserIcon = (imgUrl) =>
  L.divIcon({
    html: `<div class="user-marker"><img src="${imgUrl}" alt="marker"/></div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

function Map() {
  const [posts, setPosts] = useState([]);
  const [coordinate, setCoordinate] = useState(null);
  const [geoError, setGeoError] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const getInfo = await customAxios.get('/post/all');
        setPosts(getInfo.data.allPosts);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    getPost();

    socket.on('new-post', (newPost) => {
      setPosts((prev) => [...prev, newPost]);
    });

    return () => socket.off('new-post');
  }, []);

  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          resolve(coords);
        },
        (error) => {
          console.log('error: ', error);
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const coordinates = await getUserLocation();
        setCoordinate({
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        });
      } catch (err) {
        setGeoError(true);
      }
    };
    getCoordinates();
  }, []);

  return (
    <div>

      <style>
        {`
          .user-marker {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid white;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: white;
          }

          .user-marker img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .popup-img {
            width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
          }
        `}
      </style>

      {geoError ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>📍 Unable to load map</h2>
          <p>Please enable location access and try again.</p>
        </div>
      ) : coordinate ? (
        <MapContainer
          center={[coordinate.latitude, coordinate.longitude]}
          zoom={13}
          style={{ height: '90vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {posts.map((post) => (
            <Marker
              key={post._id}
              icon={createUserIcon(post.postImage)}
              position={[
                post.location.coordinates[1],
                post.location.coordinates[0],
              ]}
            >
              <Popup>
                <div style={{ width: '200px', textAlign: 'center' }}>
                  <img
                    className="popup-img"
                    src={post.postImage}
                    alt="user post"
                  />
                  <h2 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    {post.description}
                  </p>
                  <Link
                    to={`/chat/${post._id}/${post.userId}`}
                    style={{ color: '#3b82f6', fontWeight: 'bold' }}
                  >
                    Message User
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading map...</p>
        </div>
      )}
    </div>
  );
}

export default Map;

