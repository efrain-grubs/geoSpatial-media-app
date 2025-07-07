const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/',(req,res) => { 

const refreshToken = req.cookies.refreshToken

try { 

const verifyToken = jwt.verify(refreshToken,process.env.REFRESH_SECRET)


if(!verifyToken) { 


    return res.status(400).json({message: "invalid refresh token"})
}

const newToken = jwt.sign({userId: verifyToken.userId},process.env.JWT_SECRET,{expiresIn: '15m'})


return res.status(200).json({token: newToken})


}catch(err) { 

    console.log("error: ",err)

    return res.status(500).json({message:"unable to send new token"})
}



    
})





module.exports = router