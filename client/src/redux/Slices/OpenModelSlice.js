import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false
}

const OpenModelSlice = createSlice({
    name:'OpenModel',
    initialState,
    reducers:{
        toggleOpen:(state)=>{
            state.open = !state.open;
        }
    }
})

export default OpenModelSlice.reducer;

export const {toggleOpen} = OpenModelSlice.actions
