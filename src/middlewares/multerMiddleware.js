const multer = require('multer')
const path = require('path')

const storageConfiguration = multer.diskStorage({
    destination : (req,file,next)=>{//pass a callback function to a property of an object in JavaScript.
        next(null,'uploads/')
    },
    filename : (req,file,next)=>{
        console.log(file);
        next(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploader = multer({storage : storageConfiguration})
module.exports = uploader;