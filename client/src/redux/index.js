import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import likeSlice from "./Slices/likeSlice";
import OpenModelSlice from "./Slices/OpenModelSlice";
import subscribeSlice from "./Slices/subscribeSlice";

export const store = configureStore({
    reducer:{
        auth:authSlice,
        openModel:OpenModelSlice,
        like:likeSlice,
        subscribe:subscribeSlice
    }
})