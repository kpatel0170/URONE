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

const editSingleUser = async (data, id, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(data)
    const userData = {
        "name": data.name,
        "email": data.email,
        "profilePicture": data.profilePicture,
        "about": data.about,
        "userType": data.type
    }
    const response = await axios.patch(API_URL + 'users/' + data.id , userData, config)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const userService = {
    getSingleUser, 
    editSingleUser
}

export default userService;