require('dotenv/config')
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcryptjs=require('bcryptjs');
const  mongoose  = require('mongoose');
const fs=require('fs')

function genereteToken(id){
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}

async function register(req,res){
    try {

        const {name,email,password}=req.body

        const user=await User.findOne({email})

        if(user){
            res.status(422).json({errors:['Usuário já cadastrado']})
            return
        }
        
        const salt=await bcryptjs.genSalt()

        const passwordHash=await bcryptjs.hash(password,salt)

        const newUser=await User.create({
            name,
            email,
            password:passwordHash,
            profileImage:'anonimo.png',
            noPhoto:true
        })

        if(!newUser){
            res.status(422).json({errors:['Ocorreu um erro, tente novamente mais tarde']})
            return 
        }

        return res.status(201).json({
            id:newUser._id,
            token:genereteToken(newUser._id)
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']})
    }
}

async function login(req,res){
    try {

        const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
            return res.status(404).json({errors:['Usuário/ senha inválido']})
        }

        const samePasswords=await bcryptjs.compare(password,user.password)

        if(!samePasswords){
            return res.status(404).json({errors:['Usuário/ senha inválido']})
        }

        return res.status(200).json({
            id:user._id,
            profileImage:user.profileImage,
            token:genereteToken(user._id)
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']})
    }

}

async function getCurrentUser(req,res){
    try {
        const user=req.user
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']})
    }
}

async function update(req,res){
    try {

        const {name,password,bio}=req.body

        let profleImage

        const reqUser=req.user

        if(req.file){
            if(reqUser.profileImage && reqUser.profileImage!=='anonimo.png'){
                fs.unlink(`uploads/user/${reqUser.profileImage}`,()=>{})
                fs.rename(`uploads/user/${req.file.filename}`,`uploads/user/${reqUser.profileImage}`,()=>{})
            }else{
                profleImage=req.file.filename
            }

        }
        
        const user=await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password')

        if(!user){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        if(name){
            user.name=name
        }

        if(password){
            const salt=await bcryptjs.genSalt()
            const passwordHash=await bcryptjs.hash(password,salt)
            user.password=passwordHash
        }

        if(profleImage){
            user.profileImage=profleImage
        }

        if(profleImage!== 'anonimo.png'){
            user.noPhoto=false
        }

        if(bio){
            user.bio=bio
        }

        await user.save()

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']})
    }
}

async function getUserById(req,res){
    try {
        const {id}=req.params
        const user=await User.findById(new mongoose.Types.ObjectId(id)).select('-password')
        if(!user){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
    }
}

async function removeProfileImage(req,res){
    try {
    
        const reqUser=req.user
         
        const user=await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password')

        if(!user){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }
        
        if(user.profileImage!=='anonimo.png'){
            fs.unlink(`uploads/user/${user.profileImage}`,()=>{})
            fs.copyFile('uploads/user/anonimo.png',`uploads/user/${user.profileImage}`,()=>{})
            user.noPhoto=true
        }

        await user.save()
    
        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
    }
}

async function searchUsers(req,res){
    try {
        const {q}=req.query

        const users=await User.find({name:new RegExp(q,'i')}).exec()

        return res.status(200).json(users)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
    }
}

async function follow(req,res){
    try {

        const reqUser=req.user

        const {id}=req.params

        const user=await User.findById(id)

        const userAuth=await User.findById(reqUser.id)

        if(!userAuth){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        if(!user){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        const checkFollower=user.followers.filter(user=> user.userId===reqUser._id)

        const checkFollowing=userAuth.following.filter(user=> user.userId===id)

        if(checkFollower.length!==0 || checkFollowing.length!==0){
            return res.status(404).json({errors:['Você já segui ou está seguindo esse usuário']})
        }
        
        user.followers.push({userId:reqUser._id,userImage:reqUser.profileImage,userName:reqUser.name})
        userAuth.following.push({userId:user._id,userImage:user.profileImage,userName:user.name})

        user.save()

        userAuth.save()

       return res.status(200).json({userAuth,user})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
    }
}

async function removeFollow(req,res){
    try {

        const reqUser=req.user

        const {id}=req.params

        const user=await User.findById(id)

        const userAuth=await User.findById(reqUser.id)

        if(!userAuth){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        if(!user){
            return res.status(404).json({errors:['Usuário não encontrado']})
        }

        if(user._id === userAuth._id){
            return res.status(404).json({errors:['Você não pode se seguir']})
        }

        const checkFollower=user.followers.filter(user=> user.userId.equals(userAuth._id))

        const checkFollowing=userAuth.following.filter(user=> user.userId.equals(id))

        if(checkFollower.length===0 || checkFollowing.length===0){
            return res.status(404).json({errors:['Você não está seguindo esse usuário']})
        }

        user.followers=user.followers.filter(user=>!user.userId.equals(reqUser._id) )
        userAuth.following=userAuth.following.filter(user=> !user.userId.equals(id))
        
        user.save()

        userAuth.save()

       return res.status(200).json({userAuth,user})

    } catch (error) {
        console.log(error)
        return res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
    }
}

module.exports={
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
    searchUsers,
    removeProfileImage,
    follow,
    removeFollow
}