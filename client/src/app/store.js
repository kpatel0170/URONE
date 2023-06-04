import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/AuthSlice';
import postReducer from '../features/Post/PostSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})