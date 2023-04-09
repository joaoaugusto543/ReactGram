const express=require('express')
const validator=require('../middlewares/handleValidation')
const userValidations=require('../middlewares/userValidations')
const  userController  = require('../controllers/UserController')
const auth = require('../middlewares/auth')
const { imageUpload } = require('../middlewares/imageUpload')


const routes=express.Router()

routes.post('/register',userValidations.userCreateValidation(),validator,userController.register)
routes.post('/login',userValidations.loginValidation(),validator,userController.login)
routes.get('/search',auth, userController.searchUsers);
routes.get('/profile',auth,userController.getCurrentUser)
routes.put('/',auth,userValidations.updateUserValidation(),validator,imageUpload.single('profileImage'),userController.update)
routes.put('/follow/:id',auth,userController.follow)
routes.put('/removefollow/:id',auth,userController.removeFollow)
routes.put('/image',auth,userController.removeProfileImage)
routes.get('/:id',auth,userController.getUserById)


module.exports=routes
