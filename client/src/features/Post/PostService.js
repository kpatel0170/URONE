import axios from 'axios'

const API = 'https://rone.onrender.com/api/v1/posts/'

// Get all posts
const getAllPosts = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API , config)
    return response.data.data
}

// Get single post
const getSinglePost = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API + "getPostById/" + id , config)
    return response.data
}

// Create post
const createPost = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            Content_Type: 'multipart/form-data',
        }
    }    
    const response = await axios.post(API , postData, config)
    return response.data.data
}

// Update post
const updatePost = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API + "updatePost/", id, config)
    return response.data
}

// Delete post
const deletePost = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("post service ... ", id)
    const response = await axios.delete(API + id , config)
    return response.data
}

// Like Post
const LikePost = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        "userId": postData.userId
    }
    const response = await axios.post(API + postData.id  + '/like', body, config)
    return response.data.data;
}

// disLike Post
const undoLikePost = async (postData, token) => {  
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const body = {
        "userId": postData.userId
    }    
    const response = await axios.delete(API + postData.id  + '/like', body, config);  
    return response.data.data
}

// Like Post
const disLikePost = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const body = {
        "userId": postData.userId
    }
    const response = await axios.post(API + postData.id  + '/dislike', body, config)
    return response.data.data;
}

// disLike Post
const undoDisLikePost = async (postData, token) => {  
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }  
    const body = {
        "userId": postData.userId
    }     
    const response = await axios.patch(API + postData.id  + '/dislike', body, config);  
    return response.data.data
}

// create comment
const createComment = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }    
    const body = {
        "userId": postData.userId,
        "comment": postData.commentInput
    }
    const response = await axios.post(API + postData.id  + '/comment', body, config)
    return response.data.data
}

// delete comment
const deleteComment = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }    
    const body = {
        "userId": postData.userId,
        "comment": postData.commentInput
    }
    const response = await axios.patch(API + postData.id  + '/comment', body, config)
    return response.data.data
}

const postService = {
    createPost,
    updatePost,
    getAllPosts,
    getSinglePost,
    deletePost,
    LikePost,
    undoLikePost,
    disLikePost,
    undoDisLikePost,
    createComment,
    deleteComment
}

export default postService;