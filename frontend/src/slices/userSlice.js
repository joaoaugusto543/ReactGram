import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState={
    user:{},
    userPage:{},
    error:false,
    loading:false,
    sucess:false,
    message:null
}

export const profile=createAsyncThunk('user/profile',async (user,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token
    const res=await userService.profile(token)
    if(!res){
        thunkAPI.rejectWithValue('Ocorreu um erro, volte mais tarde!')
    }
    return res
})

export const updateUser=createAsyncThunk('user/update',async (data,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token

    const res=await userService.updateUser(data,token)
    
    if(res.errors){
        const errors=res.data.errors
        thunkAPI.rejectWithValue(errors)
    }

    return res

})

export const removeProfileImage=createAsyncThunk('user/removeProfileImage',async (user,thunkAPI)=>{

    const token=thunkAPI.getState().auth.user.token

    const res=await userService.removeProfileImage(token)

    if(res.errors){
        const errors=res.data.errors
        thunkAPI.rejectWithValue(errors)
    }
 
    return res
})

export const getUserById=createAsyncThunk('user/userProfile',async (id,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token

    const res=await userService.getUserById(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }
    return res
})

export const follow=createAsyncThunk('user/follow',async (id,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token

    const res=await userService.follow(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }
    return res
})

export const removeFollow=createAsyncThunk('user/removeFollow',async (id,thunkAPI)=>{
    const token=thunkAPI.getState().auth.user.token

    const res=await userService.removeFollow(id,token)

    if(res.errors){
        thunkAPI.rejectWithValue(res.errors)
    }
    return res
})

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        resetMessage:function(state){
            state.message=null
        },
        resetUser:function(state){
            state.user={}
        }
    },
    extraReducers:function(build){
        build
            .addCase(profile.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.user=action.payload
                state.loading=false
            })
            .addCase(profile.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(profile.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
            .addCase(updateUser.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.user=action.payload
                state.loading=false
                state.message='Usuário atualizado'
            })
            .addCase(updateUser.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(updateUser.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
            .addCase(removeProfileImage.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.user=action.payload
                state.loading=false
                state.message='foto Removida'
            })
            .addCase(removeProfileImage.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(removeProfileImage.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
            .addCase(getUserById.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.userPage=action.payload
                state.loading=false
            })
            .addCase(getUserById.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(getUserById.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
            .addCase(follow.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.userPage.followers=action.payload.user.followers
                state.user.following=action.payload.userAuth.following
                state.loading=false
            })
            .addCase(follow.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(follow.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
            .addCase(removeFollow.fulfilled,(state,action)=>{
                state.error=null
                state.sucess=true
                state.userPage.followers=action.payload.user.followers
                state.user.following=action.payload.userAuth.following
                state.loading=false
            })
            .addCase(removeFollow.pending,(state,action)=>{
                state.error=null
                state.loading=true
            })
            .addCase(removeFollow.rejected,(state,action)=>{
                state.error=action.payload
                state.sucess=false
                state.user=null
                state.loading=false
            })
    }
})

export const {resetMessage, resetUser}=userSlice.actions
export default userSlice.reducer