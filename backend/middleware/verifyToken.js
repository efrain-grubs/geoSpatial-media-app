const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function verify(req,res,next) { 
const authHeader = req.headers.authorization

if(!authHeader || !authHeader.startsWith("Bearer ")) { 

    return res.status(401).json({message: "invalid token"})
}

const token = authHeader.split(" ")[1]




try{

  const verifyToken = jwt.verify(token,process.env.JWT_SECRET)
req.userId = verifyToken.userId
next()

}catch(err) {


    return res.status(401).json({message: "invalid token"})
}



}

module.exports = verify