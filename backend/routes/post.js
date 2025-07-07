const express = require('express')
const router = express.Router()
const {createPost,getPost,deletePost,allPost} = require('../controllers/postControlller')
const upload = require('../middleware/sendImage')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,upload.single('URL'),createPost)

router.get('/',verifyToken,getPost)
router.delete('/:id',verifyToken,deletePost)
router.get('/all',allPost)



module.exports = router