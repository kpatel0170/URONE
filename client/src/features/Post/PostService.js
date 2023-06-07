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
    return response.data
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
const LikePost = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("post service ... ", id)
    const response = await axios.post(API + id  + '/like', config)
    return response.data
}

// disLike Post
const disLikePost = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log("post service ... ", id)
    const response = await axios.delete(API + id  + '/like', config)
    return response.data
}

const postService = {
    createPost,
    updatePost,
    getAllPosts,
    getSinglePost,
    deletePost,
    LikePost
}

export default postService;