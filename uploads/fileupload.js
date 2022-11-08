// MULTER
const multer = require("multer");

// File Upload JavaScript Function
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './uploadsFolder')
    },

    filename : (req, file, cb)=>{
        cb(null, Date.now() +  file.originalname) // naming it date wise
    }
})

const filter=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/JPG"){
        cb(null, true)

    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage : storage,
    fileFilter: filter
})
module.exports = upload;