const express = require('express')
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const register = async(req,res) => { 

const {username,password,name} = req.body

if(!username || !password || !name) { 

    return res.status(400).json({message: "missing fields"})
}


try { 

const findUser = await user.findOne({username})

if(findUser) { 

    return res.status(400).json({message: "user already exist"})
}

const hashPassword = await bcrypt.hash(password,10)

const newUser = new user({username,name,password: hashPassword})

await newUser.save()

return res.status(201).json({message: "user registered",username,name})


}
catch(err) { 

    console.log("error: ",err)

    return res.status(500).json({message: "something went wrong registering user"})


}



}


const login = async(req,res) => { 

const{username,password} = req.body
if(!username || !password) { 

    return res.status(400).json({message: "missing fields"})
}

try { 

const existingUser = await user.findOne({username})

if(!existingUser) {
    return res.status(400).json({message: "user not found"})
}

const verifyPassword = await bcrypt.compare(password,existingUser.password)

if(!verifyPassword) {
    return res.status(400).json({message: "incorrect password"})
}

const token = jwt.sign({userId: existingUser._id},process.env.JWT_SECRET,{expiresIn: '15m'})

const refreshToken = jwt.sign({userId: existingUser._id},process.env.REFRESH_SECRET)


res.cookie('refreshToken',refreshToken,{

    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 604800000 
})

return res.status(200).json({message: "user logged in",token,userId: existingUser._id})



}catch(err) {
    console.log("error: ",err)

    return res.status(500).json({message: "something went wrong loggin in"})
}

}




module.exports = {register,login}