const express = require('express')
const router = express.Router()
const {register,login} = require('../controllers/authControllers')
const {verifyLogin,verifyRegister} = require('../middleware/validate')


router.post('/register',verifyRegister,register)
router.post('/login',verifyLogin,login)



module.exports = router