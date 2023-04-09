import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import photoServices from '../services/photoServices'

const initialState={
    photos:[],
    photo:{},
    loading:false,
    error:false,
    sucess:false,
    message:null
}

export const getUserPhotos=createAsyncThunk('photo/getUserPhotos',async (userId,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token

    const res=await photoServices.getUserPhotos(userId,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const commentPhoto=createAsyncThunk('photo/commentPhoto',async (comment,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token
    const res=await photoServices.commentPhoto(comment.id,comment.msg,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const getPhotosById=createAsyncThunk('photo/getPhotosById',async (id,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token

    const res=await photoServices.getPhotosById(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const likePhoto=createAsyncThunk('photo/likePhoto',async (id,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token

    const res=await photoServices.likePhoto(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const removeLikePhoto=createAsyncThunk('photo/removeLikePhoto',async (id,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token

    const res=await photoServices.removeLikePhoto(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const insertPhoto=createAsyncThunk('photo/insertPhoto',async (photo,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token

    const res=await photoServices.insertPhoto(photo,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const getAllPhotos=createAsyncThunk('photo/getAllPhotos',async (user,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token
    const res=await photoServices.getAllPhotos(token)
    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

export const updatePhoto=createAsyncThunk('photo/updatePhoto',async (data,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token
    const res=await photoServices.updatePhoto(data.id,data.title,token)
    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }

    return res
})

const photoSlice=createSlice({
    name:'photo',
    initialState,
    reducers:{
        resetMessage:function(state){
            state.message=null
        },
        resetPhoto:function(state){
            state.photo={}
        }
    },
    extraReducers:function(build){
        build
            .addCase(getUserPhotos.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photos=action.payload.reverse()
                state.sucess=true
            })
            .addCase(getUserPhotos.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(getUserPhotos.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(getPhotosById.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photo=action.payload
                state.sucess=true
            })
            .addCase(getPhotosById.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(getPhotosById.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(commentPhoto.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                if(state.photo.comments){
                    state.photo.comments.push(action.payload.comment);
                }
                state.photos.map(photo=>{
                    if(photo._id===action.payload.comment.id){
                        return photo.comments.push(action.payload.comment)
                    }

                    return false
                })
                state.sucess=true
            })
            .addCase(commentPhoto.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(commentPhoto.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(likePhoto.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                if(state.photo.likes){
                    state.photo.likes.push(action.payload.userId);
                }
                state.photos.map((photo)=>{
                    if(photo._id===action.payload.photoId){
                        return photo.likes.push(action.payload.userId)
                    }

                    return false
                })
                state.sucess=true
            })
            .addCase(likePhoto.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(likePhoto.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(removeLikePhoto.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photo.likes=action.payload.likes
                state.photos.map(photo=>{
                    if(photo._id===action.payload._id){
                        return photo.likes=[...action.payload.likes]    
                    }

                    return false
                })
                state.sucess=true
            })
            .addCase(removeLikePhoto.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(removeLikePhoto.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(insertPhoto.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photos.push(action.payload)
                state.sucess=true
            })
            .addCase(insertPhoto.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(insertPhoto.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(getAllPhotos.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photos=action.payload.reverse()
                state.sucess=true
            })
            .addCase(getAllPhotos.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(getAllPhotos.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })
            .addCase(updatePhoto.fulfilled,(state,action)=>{
                state.loading=false
                state.error=false
                state.photo=action.payload
                state.sucess=true
            })
            .addCase(updatePhoto.pending,(state,action)=>{
                state.loading=true
                state.error=false
            })
            .addCase(updatePhoto.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
                state.photos=null
            })              
    }
})

export const {resetMessage,resetPhoto}=photoSlice.actions
export default photoSlice.reducer