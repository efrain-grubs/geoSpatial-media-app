const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors')
const cookie = require('cookie-parser')
require('dotenv').config()
const app = express()
const server = http.createServer(app)


//socket.io set up
const Messages = require('./models/message') // save past chat 
const io = new Server(server,{
cors: {

    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST","GET"]
}})
io.on('connection',(socket) => { 
console.log("socket connected",socket.id)

//what is going on with socket.io

socket.on('new-post',(postData) => { 

console.log('got a new post',postData)

io.emit('new-post',postData)

})

socket.on('join-user',(userId) => { 

    console.log('user joined personal room',userId)
socket.join(userId)

})

socket.on('join-room',(roomId) => { 

socket.join(roomId)
console.log(`Socket: ${socket.id} joined room: ${roomId}`)

})

socket.on('send-message',async(newMessage) => {

console.log('message',newMessage)

const pastMessages = new Messages({

    senderId: newMessage.senderId,
    postId: newMessage.postId,
    text: newMessage.text,
    receiverId: newMessage.receiverId


})
await pastMessages.save()
io.to(newMessage.roomId).emit('receive-message',newMessage)




})




socket.on('disconnect', () => { 

    console.log("socket disconnected",socket.id)
})

})

app.use(cookie())
app.use(cors({ 
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json())
//import files here
const user = require('./routes/user')
const refresh = require('./routes/refresh')
const post = require('./routes/post')
const messaging = require('./routes/savedMessage')
app.use('/user',user)
app.use('/refresh',refresh)
app.use('/post',post)
app.use('/',messaging)

const PORT = process.env.PORT || 5050
mongoose.connect(process.env.MONGO_URI)

.then(() => server.listen(PORT,() =>console.log(`connected to port ${PORT}`)))
.catch((err) => console.log("unable to connect mongoDB ",err))