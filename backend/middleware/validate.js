const {body,validationResult} = require('express-validator')
const express = require('express')


const verifyLogin = [body('username').notEmpty().withMessage('fill empty fields'),body('password').notEmpty().withMessage('fill empty fields')
,(req,res,next) => {

const error = validationResult(req)
if(!error.isEmpty()){

    return res.status(400).json({message: error.array()})
}
next()
}]

const verifyRegister = [body('name').notEmpty().withMessage('fill empty fields'),body('username').notEmpty().withMessage('fill empty fields')


.isLength({min: 4}).withMessage('username must be more than 4 characters'),body('password').notEmpty().withMessage('fill empty fields').
isLength({min: 4}).withMessage('password must be more than 4 characters'),
(req,res,next) => {

const error = validationResult(req)

if(!error.isEmpty()){

    return res.status(400).json({message: error.array()})
}
next()
}


]


module.exports =  {verifyLogin,verifyRegister}