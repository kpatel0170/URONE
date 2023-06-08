import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './PostService';

const initialState = {
    posts: [],
    like: [],
    disLike: [],
    comment: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create post
export const createPost = createAsyncThunk('posts/', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.createPost(postData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Update post
export const updateSinglePost = createAsyncThunk('posts/updatePost', async(id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.updatePost(id, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Get all posts
export const getAllPosts = createAsyncThunk('posts/getPosts', async(_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.getAllPosts(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
        throw new Error(message)
    }
})

// Get post
export const getSinglePost = createAsyncThunk('posts/getPost', async(id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.getSinglePost(id, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete posts
export const deletePost = createAsyncThunk('posts/deletePost', async(id, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.deletePost(id, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// Like posts
export const likePost = createAsyncThunk('posts/like', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;        
        return await postService.LikePost(postData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


// Undo like posts
export const undoLikePost = createAsyncThunk('posts/undoLike', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.undoLikePost(postData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// create comment
export const createComment = createAsyncThunk('posts/createComment', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.createComment(postData, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

// delete comment
export const deleteComment = createAsyncThunk('posts/deleteComment', async(postData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user._id;
        return await postService.deleteComment(postData, token)
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
                    (post) => post._id !== action.payload.data._id
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
                const {_id} = action.payload;
                state.posts = state.posts.map((post) =>
                    post._id === _id ? { ...post, ...action.payload } : post
                );
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
            .addCase(likePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const {_id} = action.payload;
                state.posts = state.posts.map((post) =>
                    post._id === _id ? { ...post, ...action.payload } : post
                );
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(undoLikePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(undoLikePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const {_id2} = action.payload;
                state.posts = state.posts.map((post) =>
                    post._id === _id2 ? { ...post, ...action.payload } : post
                );
            })
            .addCase(undoLikePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const {_id} = action.payload;
                state.posts = state.posts.map((post) =>
                    post._id === _id ? { ...post, ...action.payload } : post
                );
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.data._id
                )
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = postSlice.actions;

export default postSlice.reducer;