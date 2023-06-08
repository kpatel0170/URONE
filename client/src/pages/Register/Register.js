import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister, reset } from '../../features/Auth/AuthSlice';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import styles from "../Login/Login.module.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // destructure the states
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const {name, email, password, passwordConfirmation} = formData;

  const [formError, setFormError] = useState({
      input_name: '',
      input_email: '',
      input_password: '',
      input_passwordConfirmation: ''
  });

  const { input_name, input_email, input_password, input_passwordConfirmation } = formError;

  useEffect(() => {
    if(isError){
      console.log(message) 
      if(message === 'Email is already registered'){
        setFormError({  
          email: message + ". Please use a unique email to create an account."
        }) 
      }  
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const formInputHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState, 
      [event.target.name]: event.target.value,
    }))
  }

  const formValidateHandler = (event) => {
    let {name, value} = event.target;
    console.log("hi", event.name)
    setFormError(prev => {
        const formInput = {...prev, [name]: ""};

        console.log(formInput)

        switch(name){
            case "name" :
                if(!value || value.trim() === '') {
                  formInput[name] = "Please enter user name";
                }
                break;
            case "email" :
                if(!value || value.trim() === '') {
                    formInput[name] = "Please enter an email address";
                }else{
                    console.log(value)                        
                }
                break;

            case "password" :
                if(!value) {
                    formInput[name] = "Please enter password";
                }else if(value.length < 8){
                    formInput[name] = "Password must be 8 characters or more";
                } else if (formData.passwordConfirmation && value !== formData.passwordConfirmation) {
                    formInput["passwordConfirmation"] = "Password does not match.";
                } else {
                    formInput["passwordConfirmation"] = formData.passwordConfirmation ? "" : formError.passwordConfirmation;
                }
                break;

            case "passwordConfirmation" :
                if(!value) {
                    formInput[name] = "Please enter confirm password";
                } else if(formData.password && value !== formData.password){
                    formInput[name] = "Password does not match.";
                }
                break;

            default:
                break;
        }

        return formInput;
    });
}

  const registerFormHandler = (event) => {
      event.preventDefault();

      if(name.trim() === '' || email.trim() === '' || password.length === 0 || passwordConfirmation.length === 0){ 
        setFormError({   
            name: 'Please enter user name',
            email: 'Please enter an email address',   
            password: 'Please enter password',
            passwordConfirmation: 'Please enter confirm password'
        })
      }else if(password.length < 6){
        setFormError({  
          password: 'Password must be 6 characters or more'
        })
      }else if(password != passwordConfirmation) {
        console.log("password do not match")
        setFormError({  
          passwordConfirmation: 'Password do not match'
        })
      }else{
        const userData = {
          name,
          email,
          password,
          passwordConfirmation
        }

        console.log(userData)
        dispatch(userRegister(userData))
      }
  }
    return (
      <Grid container sx={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Grid item xs={9} sm={6} md={4} lg={4} sx={{mt: 6}}>
          <Typography sx={{mb: 6, textAlign: 'center', fontWeight: 'bold', fontSize: '48px'}}>rOne</Typography>            
          <form sx={{width: 1}} onSubmit={registerFormHandler}>
              <Box sx={{mb:2}}>
                  <Typography sx={{mb: 1}}>Name</Typography>
                  <TextField 
                      id="name" 
                      name="name"
                      type="text" 
                      onChange={formInputHandler}
                      onBlur={formValidateHandler}
                      value={name}
                      placeholder="Enter username"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                    {formError.name && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem', lineHeight: '1.2', paddingTop: '4px' }}>{formError.name}</Typography>}                    
              </Box>
              <Box sx={{mb:2}}>
                  <Typography sx={{mb: 1}}>Email</Typography>
                  <TextField 
                      id="email" 
                      name="email"
                      type="email" 
                      onChange={formInputHandler}
                      onBlur={formValidateHandler}
                      value={email}
                      placeholder="Enter email"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                    {formError.email && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem', lineHeight: '1.2', paddingTop: '4px' }}>{formError.email}</Typography>}                    
              </Box>
              <Box sx={{mb:2}}>
                  <Typography sx={{mb: 1}}>Password</Typography>
                  <TextField
                      id="password" 
                      name="password"
                      type="password" 
                      onChange={formInputHandler}
                      onBlur={formValidateHandler}
                      value={password}
                      placeholder="********"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                    {formError.password && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem', lineHeight: '1.2', paddingTop: '4px' }}>{formError.password}</Typography>}
              </Box>
              <Box>
                  <Typography sx={{mb: 1}}>Confirm Password</Typography>
                  <TextField
                      id="passwordConfirmation" 
                      name="passwordConfirmation"
                      type="password" 
                      onChange={formInputHandler}
                      onBlur={formValidateHandler}
                      value={passwordConfirmation}
                      placeholder="********"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                  {formError.passwordConfirmation && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem', lineHeight: '1.2', paddingTop: '4px' }}>{formError.passwordConfirmation}</Typography>}
              </Box>
              <Box>
                  <Button variant="contained" sx={{p:1, borderRadius: '25px', width: 1, mt: 3, bgcolor: '#0e69d6',}} type="submit">
                      Sign Up
                  </Button>
              </Box>
          </form>
          <Box sx={{ borderTop: 1, mt: 4, mb: 4, borderColor: '#dedede' }}>
              {/* <Button variant="outlined" sx={{ mt: 4, mb: 2, p:1, width: 1, borderRadius: '25px', border: 1, borderColor: '#dedede' }}>
                Sign Up with Google
              </Button> */}
              <Typography sx={{ textAlign: 'center',  mt: 4,}}>Already have an account? <Link to="/login"><Button>Sign In</Button></Link></Typography>              
          </Box>
        </Grid>
      </Grid>
    )
}

export default Register