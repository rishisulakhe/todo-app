import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice'
import todoSlice from './slices/todoSlice'
export const store=configureStore({
    reducer:{
        auth:authSlice,
        todos:todoSlice
    },
})