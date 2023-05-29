import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
    const [userRegister, setUserRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [emailTouch, setemailTouch] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [passwordIsEmpty, setPasswordIsEmpty] = useState();

    const [formIsValid, setFormIsValid] = useState(false);
    
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
            // setEmailIsValid(email.includes('@'));
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

    const loginFormHandler = (event) =>{
        event.preventDefault();
        const formObj = {
            "email": email,
            "password": password
        }
        console.log(formObj)
        console.log(formIsValid)
        
        if(formIsValid){
            setEmail('');
            setEmailIsValid();
            setIsEmpty();
            setPassword('');
            setPasswordIsValid();
            setPasswordIsEmpty();
            setFormIsValid(true);

            props.onLogin(email, password);
        }else{
            if(formObj.password.length < 6){
                setPasswordIsValid(false);
                if(formObj.password.length === 0){
                    setPasswordIsEmpty(true);
                }else{
                    setPasswordIsEmpty(false);
                }
            }else{
                setPasswordIsValid(true);
                setPasswordIsEmpty(false);
            }
            if(formObj.email.trim() !== ''){
                setIsEmpty(false)
            }else{
                setIsEmpty(true)
            }
            setFormIsValid(false)
        }  
    }

    const registerFormHandler = (event) => {
        console.log("click from login")
        event.preventDefault();
        setUserRegister(true);
        console.log(userRegister)
        props.onUserRegister(true);
    }

    const backToLoginHandler = (event) => {
        console.log('')
    }

    return(
        <div className="mt-6">            
            <form onSubmit={loginFormHandler}>
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
                <div className="mb-1">
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
                <p className='mb-5 text-blue-600/100 text-sm font-light'>Forget Password?</p>
                <button className="w-full bg-[#1473E6] hover:bg-[#0e69d6] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline hover:drop-shadow-md transition duration-100 ease-in-out" type="submit">
                    Sign In
                </button>
            </form>
            <div className='mt-10 border-t border-solid border-t mb-10'>
                <button className="mt-4 w-full border bg-white hover:bg-[#1473E6] hover:text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out" type="submit">
                    Sign In with Google
                </button>
                {/* <button onClick={registerFormHandler} className="mt-4 w-full border border-2 bg-white hover:bg-[#1473E6] hover:text-white text-[#1473E6] font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out" type="submit">
                    New to LOS? Join now
                </button> */}
                <Link to="/register">
                    <button className="mt-4 w-full border border-2 bg-white hover:bg-[#1473E6] hover:text-white text-[#1473E6] font-medium py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-100 ease-in-out" type="submit">
                        New to LOS? Join now
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Login;