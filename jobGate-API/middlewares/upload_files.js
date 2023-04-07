const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        if (path.extname(file.originalname) === '.pdf'){
            cb(null, "storages/cvs")
        }else{
            cb(null, "storages/images")
        }
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }

})


const upload = multer({
    storage:storage,
    limits:{fileSize:"1000000"},
    fileFilter:(req, file, cb)=>{
        const fileTypes = /jpg|png|gif|pdf/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimeType, extname){
            return cb(null, true)
        }
        cb("give proper files format to upload")
    }
})

module.exports = upload