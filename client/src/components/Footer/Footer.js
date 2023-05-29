import React from 'react';
import {useState} from 'react';
import CreatePostSidebarButton from '../Post/CreatePostButton';
import { Link } from 'react-router-dom';

const Footer = props => {
    const [userRegister, setUserRegister] = useState(false);
    const [userIsLoggedin, setUserIsLoggedin] = useState(false);

    // const registerFormHandler = (event) => {
    //     console.log("click from footer")
    //     event.preventDefault();
    //     setUserRegister(true);
    //     props.onFooterRegister(userRegister);
    // }

    const signInHandler = (event) =>{
        props.onFooterLogIn(true);
    }
    
    return(
        <div className="flex justify-center"> 
            <div>
                <button className="border mr-2 w-32 border-2 bg-white hover:bg-[#1473E6] hover:text-white text-[#1473E6] font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out" type="submit">
                    Sign in
                </button> 
            </div>            
            
            <Link to="/register">
                <button className='w-32 border border-2 bg-white hover:bg-[#1473E6] hover:text-white text-[#1473E6] font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out' type="submit">
                    Join now
                </button>  
            </Link>        
            {userIsLoggedin && <CreatePostSidebarButton />}
        </div>
    )
}
export default Footer;