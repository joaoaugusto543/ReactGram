const User = require('../models/User')
const Photos = require('../models/Photos')
const  mongoose  = require('mongoose')
const fs=require('fs')

async function insertPhoto(req,res){
    try {
        const {title}=req.body

        const image=req.file.filename

        const reqUser=req.user

        const user=await User.findById(reqUser._id)

        if(!user){
            res.status(404).json({errors:['Usuário não encontrado']})
            return
        }

        const newPhoto=await Photos.create({
            title,
            image,
            userId:user._id,
            userName:user.name,
            userImage:user.profileImage,
        })

        return res.status(201).json(newPhoto)

    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function deletePhoto(req,res){
    try {
        
        const {id}=req.params

        const reqUser=req.user

        const photo=await Photos.findById(new mongoose.Types.ObjectId(id))

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        if(!photo.userId.equals(reqUser._id)){
            res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
            return
        }
 
        fs.unlink(`uploads/photos/${photo.image}`,()=>{})
    
        await Photos.findByIdAndDelete(id)

        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function getAllPhotos(req,res){
    try {
        const photos=await Photos.find({})
        return res.status(200).json(photos)
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function getUserPhotos(req,res){
    try {
        const {id}=req.params
        const photos=await Photos.find({userId:id})
        res.status(200).json(photos)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function getPhotosById(req,res){
    try {

        const {id}=req.params

        const photo= await Photos.findById(new mongoose.Types.ObjectId(id))

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        res.status(200).json(photo)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function updatePhoto(req,res){
    try {

        const {id}=req.params
        const {title}=req.body

        const reqUser=req.user

        const photo= await Photos.findById(new mongoose.Types.ObjectId(id))

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        if(!photo.userId.equals(reqUser._id)){
            res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
            return
        }

        if(title){
            photo.title=title
        }

        await photo.save()

        res.status(200).json(photo)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function likePhoto(req,res){
    try {
        const {id}=req.params
        const reqUser=req.user

        const photo=await Photos.findById(id)

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        if(photo.likes.includes(reqUser._id)){
            res.status(422).json({ errors: ['Você já curtiu esta foto.'] })
            return
        }

        photo.likes.push(reqUser._id)

        await photo.save()

        res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function removeLikePhoto(req,res){
    try {
        const {id}=req.params
        const reqUser=req.user

        const photo=await Photos.findById(id)

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        if(!photo.likes.includes(reqUser._id)){
            return res.status(422).json({ errors: ['Você nunca curtiu esta foto.'] })
        }

        photo.likes=photo.likes.filter((like)=>!like.equals(reqUser._id))

        await photo.save()

        res.status(200).json(photo);
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

async function commentPhoto (req,res){
    try {
        const {id}=req.params
        const {comment}=req.body
        const reqUser=req.user

        const photo=await Photos.findById(id)

        if(!photo){
            res.status(404).json({errors:['Foto não encontrada']})
            return
        }

        const userComment={
            comment,
            id,
            userImage:reqUser.profileImage,
            userId:reqUser._id,
            userName:reqUser.name
        }

        photo.comments.push(userComment)

        await photo.save()

        res.status(200).json({
            comment: userComment,
            message: "Comentário adicionado com sucesso!",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({errors:['Ocorreu um erro, tente novamente mais tarde']}) 
        return
    }
}

const PhotosController ={
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotosById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    removeLikePhoto
}

module.exports=PhotosController