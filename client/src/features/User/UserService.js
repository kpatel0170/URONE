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

const userService = {
    getSingleUser
}

export default userService;