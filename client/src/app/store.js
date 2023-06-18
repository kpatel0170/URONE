import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/AuthSlice';
import postReducer from '../features/Post/PostSlice';
import commentReducer from '../features/Comment/CommentSlice';
import drawerReducer from '../features/Home/HomeSlice';
import userReducer from '../features/User/UserSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        comments: commentReducer,
        drawer: drawerReducer,
        users: userReducer
    }
})