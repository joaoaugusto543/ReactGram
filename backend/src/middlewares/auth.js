require('dotenv/config')

const jwt=require('jsonwebtoken')
const User = require('../models/User')

async function auth(req,res,next){

    const authHeader=req.headers.authorization

    if(!authHeader){
        res.status(401).json({errors:["Acesso negado"]})
        return
    }

    const [ ,token]=authHeader.split(' ')

    try {

        const verified=jwt.verify(token,process.env.JWT_SECRET)

        req.user= await User.findById(verified.id).select('-password')
        
        next()

        return

    } catch (error) {
        res.status(401).json({errors:["Token inválido"]})
        return
    }
}

module.exports=auth