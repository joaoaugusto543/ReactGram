const express=require('express')
const routes=express.Router()
const photosValidation=require('../middlewares/photosValidation')
const auth = require('../middlewares/auth')
const validator=require('../middlewares/handleValidation')
const { imageUpload } = require('../middlewares/imageUpload')
const PhotosController= require('../controllers/PhotosController')

routes.use(auth)

routes.post('/',imageUpload.single('image'),photosValidation.photoInsertValidation(),validator,PhotosController.insertPhoto)
routes.delete('/:id',PhotosController.deletePhoto)
routes.get('/',PhotosController.getAllPhotos)
routes.get('/:id',PhotosController.getPhotosById)
routes.put('/:id',imageUpload.single('image'),photosValidation.photoUpdateValidation(),validator,PhotosController.updatePhoto)
routes.get('/user/:id',PhotosController.getUserPhotos)
routes.put('/like/:id',PhotosController.likePhoto)
routes.put('/removeLike/:id',PhotosController.removeLikePhoto)
routes.put('/comments/:id',photosValidation.commentValidation(),validator,PhotosController.commentPhoto)



module.exports=routes