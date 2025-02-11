import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import authSlice from './slices/authSlice'
import todoSlice from './slices/todoSlice'
export const store=configureStore({
    reducer:{
        counter:counterSlice,
        auth:authSlice,
        todos:todoSlice
    },
})