import axios from 'axios'

const API = 'https://rone.onrender.com/api/v1/posts/'

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
const commentService = {
    createComment
}

export default commentService;
