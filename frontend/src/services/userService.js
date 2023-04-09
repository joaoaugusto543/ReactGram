import { api } from "../api/api"

async function profile(token){
    try {

        api.defaults.headers.authorization=`Bearer ${token}`
        
        const response=await api.get('/users/profile')
        const res=response.data
        return res
    
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

async function updateUser(data,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`
        const response=await api.put('/users/',data)
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function removeProfileImage(token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.put('/users/image')

        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function getUserById(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.get(`/users/${id}`)
        
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function searchUsers(query,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.get(`/users/search?q=${query}`)
        
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function follow(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.put(`/users/follow/${id}`)
        
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

async function removeFollow(id,token){
    try {
        api.defaults.headers.authorization=`Bearer ${token}`

        const response=await api.put(`/users/removefollow/${id}`)
        
        return response.data
    } catch (error) {
        console.log(error)
        return error.data
    }
}

const userService={
    profile,
    updateUser,
    removeProfileImage,
    getUserById,
    searchUsers,
    follow,
    removeFollow
}

export default userService