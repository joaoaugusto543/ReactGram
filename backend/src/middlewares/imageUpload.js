const multer=require('multer')
const path=require('path')
const uuid=require('uuid')

const imageStorage=multer.diskStorage({
    destination:function(req,file,cb){
        let folder

        if(req.baseUrl.includes('users')){
            folder='user'
        }else if(req.baseUrl.includes('photos')){
            folder='photos'
        }

        cb(null,`uploads/${folder}/`)
    },
    filename:function(req,file,cb){
        const id=uuid.v4()
        cb(null,id + path.extname(file.originalname))
    }
})

const imageUpload=multer({
    storage:imageStorage,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, envie apenas png e jpg!'))
        }
        cb(undefined,true)
    }
})

module.exports={imageUpload}