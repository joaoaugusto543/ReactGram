const express=require('express')
const Router=express()

Router.use('/api/users',require('./UserRoutes'))
Router.use('/api/photos',require('./PhotosRoutes'))

module.exports=Router