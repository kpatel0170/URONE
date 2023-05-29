import React from 'react';
import {useState} from 'react';
import styles from "./Sidebar.module.css";
import Login from '../Login/Login';
import CreatePostSidebarButton from '../Post/CreatePostButton';

const Sidebar = props => {
    const [userIsLoggedin, setUserIsLoggedin] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    // const [isRegisterOn, setIsRegisterOn] = useState(false);

    const loginHandler = (email, password) => {
        console.log(email)
        console.log(password)
        setUserIsLoggedin(true);
    };

    const registerHandler = (status) => {
        console.log("catch from sidebar", status)
        props.onUserRegister(status);
    }

    const toggleHandle = (event) => {
        console.log('toggle div')
        setIsToggled(!isToggled)
    }

    return(
        <div className={ " h-screen border-solid border-l md: px-3 lg:px-6 py-4 md:w-24 lg:w-80 bg-white fixed right-0 overflow-y-auto hidden lg:block mb-10 transition duration-100 ease-in-out"}>   
            {/* <div className='hidden lg:block'>
                {!userIsLoggedin && <Login onLogin={loginHandler} onRegister={registerHandler} />}
            </div>
            
            {userIsLoggedin && <CreatePostSidebarButton />} */}

            {userIsLoggedin ? (
                <CreatePostSidebarButton />
            ) : (
                <div className='hidden lg:block'>
                    <Login onLogin={loginHandler} onUserRegister={registerHandler} />
                </div>
            )}
        </div>
    )
}
export default Sidebar;