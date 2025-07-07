const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const Messages = require('../models/message')


router.get('/messages/:postId/:otherId',verifyToken,async(req,res) => { 

const{postId,otherId} = req.params
const userId = req.userId
try { 
    const findChat = await Messages.find({
        postId,
        $or: [
          { senderId: userId, receiverId: otherId },
          { senderId: otherId, receiverId: userId }
        ]
      })
      

    if(findChat.length === 0) { 

        return res.status(400).json({message: 'chat not found'})
    }

    return res.status(200).json({message: "chat found",findChat})

}catch(err) {

    console.log("error: ",err)
    return res.status(500).json({message: "something went wrong"})
}



})

router.get('/inbox/:userId',verifyToken,async(req,res)=> {

const userId = req.userId
try {

const findUserMessages = await Messages.find({ $or: [{ senderId: userId }, { receiverId: userId }]}).sort({ createdAt: 1 })

const map = new Map()


findUserMessages.forEach((msg) =>{
    const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
    const key = `${otherId}-${msg.postId}`;
    if (!map.has(key)) {
      map.set(key, {
        postId: msg.postId,
        senderId: otherId,
        lastMessage: msg.text,
        roomId: msg.roomId
      
      });
    } else {
      map.set(key, {
        ...map.get(key),
        lastMessage: msg.text
      });
    }
    
})

res.json(Array.from(map.values()));



}catch(err) {
console.log("error: ",err)
    return res.status(500).json({message: "unable to fetch messages"})
}





})





module.exports = router


