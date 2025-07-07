const mongoose = require('mongoose')


const MessageSchema = mongoose.Schema({

senderId: { 
    type: mongoose.Schema.Types.ObjectId
},
postId: {
    type: mongoose.Schema.Types.ObjectId
},
text: { 
    type: String
},
receiverId: {
    type: mongoose.Schema.Types.ObjectId
},
roomId: {
    type: mongoose.Schema.Types.ObjectId
}


})


module.exports = mongoose.model('message',MessageSchema)