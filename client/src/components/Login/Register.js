import React, {Fragment} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

const UserRegister = props => {
    const [userName, setUserName] = useState('');  
    const [userNameTouch, setUserNameTouch] = useState(false);
    const [userNameIsValid, setUserNameIsValid] = useState(true);

    const [email, setEmail] = useState('');
    const [emailTouch, setemailTouch] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [passwordIsEmpty, setPasswordIsEmpty] = useState();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState();
    const [confirmPasswordIsEmpty, setConfirmPasswordIsEmpty] = useState();

    const [formIsValid, setFormIsValid] = useState(false);

    const isUserNameValid = !(userName.trim() !== '') && userNameTouch;        
    
    // username::
    const userNameHandler = event => {
        setUserName(event.target.value);
        setUserNameIsValid(true); 
    }

    const validateUserNameHandler = event => {
        setUserNameTouch(true);

        if(userName.trim() !== ''){
            console.log('no white space')
            setUserNameIsValid(true);
        }else{
            setUserNameIsValid(false);
        }
    }

    // email::
    const emailHandler = event => {
        setEmail(event.target.value);        
        setEmailIsValid(); 
        setIsEmpty(false);  
        
        setFormIsValid(
            event.target.value.includes('@') && password.trim().length >= 6
        );
    }

    const validateEmailHandler = event => {
        setemailTouch(true);

        if(email.trim() !== ''){
            console.log('no white space')
            setIsEmpty(false)
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            setEmailIsValid(regex.test(email));
        }else{
            console.log("in the else => white space")
            setIsEmpty(true)
        }

        console.log("isEmpty", isEmpty)
        console.log("emailIsValid", emailIsValid)        
    }

    // password::
    const passwordHandler = event => {
        setPassword(event.target.value);
        setPasswordIsValid();
        setPasswordIsEmpty();

        setFormIsValid(
            email.includes('@') && event.target.value.trim().length >= 6
        );

        console.log('form valid!', formIsValid)
    }

    const validatePasswordHandler = event => {
        setPasswordIsValid(password.trim().length >= 6);
        
        if(password.length === 0){
            setPasswordIsEmpty(true);
        }else{
            setPasswordIsEmpty(false);
        }
    }

    // confirm password::
    const confirmPasswordHandler = event => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordIsValid();
        setConfirmPasswordIsEmpty();
    }

    const validateConfirmPasswordHandler = event => {
        setConfirmPasswordIsValid(confirmPassword.trim().length >= 6);
        console.log(confirmPassword)
        if(confirmPassword.length === 0){
            setConfirmPasswordIsEmpty(true);
        }else{
            setConfirmPasswordIsEmpty(false);
            if(password !== confirmPassword){
                setConfirmPasswordIsValid(false)
            }
        }
    }

    const registerFormHandler = event => {
        console.log("start register handler")
        event.preventDefault();
        const formObj = {
            "username": userName,
            "email": email,
            "password": password,
            "confirm_password": confirmPassword
        }
        console.log(formObj)

        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <React.Fragment>
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md">
                    <p className=" text-center text-2xl mt-5 mb-9 font-bold">rOne</p>
                    <form onSubmit={registerFormHandler} className="bg-white">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input 
                                id="username" 
                                type="text" 
                                onChange={userNameHandler}
                                onBlur={validateUserNameHandler}
                                value={userName}
                                autoComplete='off'
                                placeholder="Enter username"
                                className={(!userNameIsValid ? 'border-red-500' : '') + " appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} />
                            {!userNameIsValid && <p className="text-sm font-light">Please enter your user name.</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                id="email" 
                                type="text" 
                                onChange={emailHandler}
                                onBlur={validateEmailHandler}
                                value={email}
                                placeholder="Enter email"
                                className={(isEmpty === true || emailIsValid === false ? 'border-red-500' : '') + " appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} />
                            {isEmpty && <p className="text-sm font-light">Please enter an email address.</p>}   
                            {(emailIsValid === false) && <p className="text-sm font-light">Please enter valid email address.</p>}                     
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>                        
                            <input className={(passwordIsValid === false ? 'border-red-500' : '') + " appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" }                            
                                id="password" 
                                type="password" 
                                onChange={passwordHandler}
                                onBlur={validatePasswordHandler}
                                value={password}
                                placeholder="********" />
                            {passwordIsValid === false && !passwordIsEmpty && <p className="text-sm font-light">Password must be 6 characters or more.</p>}   
                            {(passwordIsEmpty && formIsValid === false) && <p className="text-sm font-light">Please enter your password.</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Confirm Password
                            </label>
                            <input 
                                className={(confirmPasswordIsValid === false ? 'border-red-500' : '') + " appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} 
                                id="confirmpassword" 
                                type="password" 
                                onChange={confirmPasswordHandler}
                                onBlur={validateConfirmPasswordHandler}
                                value={confirmPassword}
                                placeholder="********" />
                            {(!confirmPasswordIsEmpty && confirmPasswordIsValid === false) && <p className="text-sm font-light">Password doesn't match.</p>}   
                            {(confirmPasswordIsEmpty && formIsValid === false) && <p className="text-sm font-light">Please enter your password.</p>}   
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                Join
                            </button>
                        </div>
                    </form>
                    <button className="mt-4 w-full border bg-white hover:bg-[#1473E6] hover:text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out" type="submit">
                        Sign Up with Google
                    </button>
                    <div className='text-center mt-5'>                        
                        <p className='font-light'>Already have an account? <Link to="/"><button className='text-[#1473E6] font-bold'>Sign In</button></Link> here</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserRegister;