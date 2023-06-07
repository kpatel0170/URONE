import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './CommentService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export default commentSlice.reducer;