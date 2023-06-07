import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './PostService';

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create post
export const createPost = createAsyncThunk('posts/', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createPost(postData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Update post
export const updateSinglePost = createAsyncThunk('posts/updatePost', async(id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.updatePost(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all posts
export const getAllPosts = createAsyncThunk('posts/getPosts', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getAllPosts(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
        throw new Error(message)
    }
})

// Get post
export const getSinglePost = createAsyncThunk('posts/getPost', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getSinglePost(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete posts
export const deletePost = createAsyncThunk('posts/deletePost', async(id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletePost(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.id
                )
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateSinglePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSinglePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.findIndex(post => post.id === action.payload.id);                
                state.posts = state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            })
            .addCase(updateSinglePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSinglePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getSinglePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = postSlice.actions;

export default postSlice.reducer;