import axios from 'axios'

const API = '/api/posts/'

// Get all posts
const getAllPosts = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API + "getPosts/", config)
    return response.data
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
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API + "createPost/", postData, config)
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
    const response = await axios.delete(API + "deletePost/" + id , config)
    return response.data
}


const postService = {
    createPost,
    updatePost,
    getAllPosts,
    getSinglePost,
    deletePost
}

export default postService;