import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk('loginWithGoogle',async(user)=>{
   return await axios.post('http://localhost:5000/auth/googleauth',user)
})

export const getUser = createAsyncThunk('getUser',async(id)=>{
    return await axios.get(`http://localhost:5000/users/${id}`)
 })
 

const initialState = {
    currentUser:JSON.parse(localStorage.getItem('currentUser'))||null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:{
        [login.fulfilled]:(state,action)=>{
            localStorage.setItem("currentUser",JSON.stringify(action.payload.data))
            state.currentUser = action.payload.data
        },
        [getUser.fulfilled]:(state,action)=>{
            let currentUser = {...state.currentUser,...action.payload.data};
            localStorage.setItem('currentUser',JSON.stringify(currentUser));
            state.currentUser = currentUser;
        }
    }
})

export default authSlice.reducer;
