import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authService from '../services/authService'

const user=JSON.parse(localStorage.getItem('user'))

const initialState={
    user : user ? user : null,
    error:false,
    loading:false,
    sucess:false
}

export const register=createAsyncThunk('auth/register',async (user,thunkAPI)=>{

    const data=await authService.register(user)

    if(data.errors){
        const errors=data.errors
        return thunkAPI.rejectWithValue(errors)
    }

    return data

})

export const login=createAsyncThunk('auth/login',async(user,thunkAPI)=>{

    const data=await authService.login(user)

    if(data.errors){
        const errors=data.errors
        return thunkAPI.rejectWithValue(errors)
    }

    return data

})

export const logout=createAsyncThunk('auth/logout',async (user,thunkAPI)=>{
    localStorage.removeItem('user')
})

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:function(state){
            state.error=false
            state.loading=false
            state.user=null
            state.sucess=false
        }
    },
    extraReducers:function(build){
        build
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.user=action.payload
            state.sucess=true
        })
        .addCase(register.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.user=null
            state.sucess=false
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.sucess=true
            state.user=action.payload
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            state.user=null
            state.sucess=false
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.sucess=true
            state.user=null
        })
        .addCase(logout.pending,(state)=>{
            state.loading=true
            state.error=null
        })
    }
    
})

export const {reset} = authSlice.actions
export default authSlice.reducer