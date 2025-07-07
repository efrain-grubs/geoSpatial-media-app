const cloudinaryAcc = require('../middleware/cloudinaryAcc')
const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')




const storage = new CloudinaryStorage({

cloudinary: cloudinaryAcc,

params: { 

folder: 'geoPosts',
allowed_formats: ['jpg','jpeg','png']



}




})

const upload = multer({storage}) 


module.exports = upload