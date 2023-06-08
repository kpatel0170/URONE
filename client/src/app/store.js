import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/AuthSlice';
import postReducer from '../features/Post/PostSlice';
import commentReducer from '../features/Comment/CommentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comments: commentReducer
    }
})