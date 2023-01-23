import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likes:[],
    dislikes:[]
}

const likeSlice = createSlice({
    name:'like',
    initialState,
    reducers:{
        likeVideo:(state,action)=>{
            console.log(state.likes)
            let index = state.likes.indexOf(action.payload);
            if(index<0){
                state.likes.push(action.payload);
                state.dislikes = state.dislikes.filter(el=>el!==action.payload)
            }
        },
        dislikeVideo:(state,action)=>{
            let index = state.dislikes.indexOf(action.payload);
            if(index<0){
                state.dislikes.push(action.payload);
                state.likes = state.likes.filter(el=>el!==action.payload)
            }
        },
        setLike:(state,action)=>{
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
        }
    }
})

export default likeSlice.reducer;
export const {likeVideo,dislikeVideo,setLike} = likeSlice.actions