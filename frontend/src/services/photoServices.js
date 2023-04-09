import { api } from "../api/api";

async function getUserPhotos(userid,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.get(`/photos/user/${userid}`)

        return response.data

    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function commentPhoto(id,comment,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.put(`/photos/comments/${id}`,{comment})
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function getPhotosById(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.get(`/photos/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function likePhoto(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.put(`/photos/like/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function removeLikePhoto(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.put(`/photos/removeLike/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function insertPhoto(photo,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.post('/photos/',photo)
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function deletePhoto(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        await api.delete(`/photos/${id}`)
        return    
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function getAllPhotos(token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.get('/photos/')
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function updatePhoto(id,title,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.put(`/photos/${id}`,{title})
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

const photoServices={
    getUserPhotos,
    commentPhoto,
    getPhotosById,
    likePhoto,
    removeLikePhoto,
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    updatePhoto
}

export default photoServices