import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subscribers:[]
}

const subscribeSlice = createSlice({
    name:'subscribe',
    initialState,
    reducers:{
        subscribe:(state,action)=>{
            let index = state.subscribers.indexOf(action.payload);
            if(index>-1){
               state.subscribers = state.subscribers.filter(el=>el !==action.payload)
            }else{
                state.subscribers.push(action.payload);
            }
        },
        setSubscribe:(state,action)=>{
            state.subscribers = action.payload
        }
    }
})

export default subscribeSlice.reducer;
export const {subscribe,setSubscribe} = subscribeSlice.actions