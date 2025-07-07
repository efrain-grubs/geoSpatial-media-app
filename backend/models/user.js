const express = require('express')
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({ 


name: { 

    type: String,
    required: true
},
username: { 
    unique: true,
    required: true,
    type: String
},
password: { 
    required: true,
    type: String
}






},{timestamps: true})

module.exports = mongoose.model('user',UserSchema)