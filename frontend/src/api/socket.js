import io from 'socket.io-client'

const socket = io("https://geospatial-media-app.onrender.com",{ 
    withCredentials: true
})

export default socket