import axios from 'axios'

// const API = 'https://rone.onrender.com/api/v1/posts/'
const API = 'http://localhost:3001/api/v1/posts/'


// create comment
const createComment = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }    
    const body = {
        "userId": postData.userId
    }
    const response = await axios.post(API + postData.id  + '/comment', body, config)
    return response.data
}

// delete comment
const deleteComment = async (postData, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }    
    const body = {
        "userId": postData.userId
    }
    const response = await axios.patch(API + postData.id  + '/comment', body, config)
    return response.data
}

const commentService = {
    createComment,
    deleteComment
}

export default commentService;
