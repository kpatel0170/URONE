import axios from 'axios';
import { API_URL } from '../../utils/env';

//@desc Get single user
//@route GET /API_URL/users/:id

const getSingleUser = async (id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'users/' + id , config)
    return response.data.data
}

//@desc Update single user
//@route PATCH /API_URL/users/:id

const editSingleUser = async (userData, userId, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.patch(API_URL + 'users/' + userId , userData, config)   
    return response.data
}

const userService = {
    getSingleUser, 
    editSingleUser
}

export default userService;