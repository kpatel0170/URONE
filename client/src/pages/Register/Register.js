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
    confirmPassword: ''
  });

  const {name, email, password, confirmPassword} = formData;

  const [formError, setFormError] = useState({
      input_name: '',
      input_email: '',
      input_password: '',
      input_confirmPassword: ''
  });

  const { input_name, input_email, input_password, input_confirmPassword } = formError;

  useEffect(() => {
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
                }else if(value.length < 6){
                    formInput[name] = "Password must be 6 characters or more";
                } else if (formData.confirmPassword && value !== formData.confirmPassword) {
                    formInput["confirmPassword"] = "Password does not match.";
                } else {
                    formInput["confirmPassword"] = formData.confirmPassword ? "" : formError.confirmPassword;
                }
                break;

            case "confirmPassword" :
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

      if(name.trim() === '' || email.trim() === '' || password.length === 0 || confirmPassword.length === 0){ 
        setFormError({   
            name: 'Please enter user name',
            email: 'Please enter an email address',   
            password: 'Please enter password',
            confirmPassword: 'Please enter confirm password'
        })
      }else if(password.length < 6){
        setFormError({  
          password: 'Password must be 6 characters or more'
        })
      }else if(password != confirmPassword) {
        console.log("password do not match")
        setFormError({  
          confirmPassword: 'Password do not match'
        })
      }else{
        const userData = {
          name,
          email,
          password
        }
        dispatch(userRegister(userData))
      }
  }
    return (
      <Grid container sx={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Grid item xs={9} sm={6} md={4} lg={4} sx={{mt: 6}}>
          <Typography sx={{mb: 6, textAlign: 'center', fontWeight: 'bold', fontSize: '48px'}}>rOne</Typography>            
          <form sx={{width: 1}} onSubmit={registerFormHandler}>
              <Box sx={{mb:2}}>
                  <Typography sx={{mb: 1}}>Username</Typography>
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
                    {formError.name && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem' }}>{formError.name}</Typography>}
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
                    {formError.email && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem' }}>{formError.email}</Typography>}
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
                      placeholder="******"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                    {formError.password && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem' }}>{formError.password}</Typography>}
              </Box>
              <Box>
                  <Typography sx={{mb: 1}}>Confirm Password</Typography>
                  <TextField
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      onChange={formInputHandler}
                      onBlur={formValidateHandler}
                      value={confirmPassword}
                      placeholder="******"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
                  {formError.confirmPassword && <Typography variant="subtitle1" sx={{ color: "red", fontWeight: 'medium', fontSize: '0.9rem' }}>{formError.confirmPassword}</Typography>}
              </Box>
              <Box>
                  <Button variant="contained" sx={{p:1, borderRadius: '25px', width: 1, mt: 3, bgcolor: '#0e69d6',}} type="submit">
                      Sign Up
                  </Button>
              </Box>
          </form>
          <Box sx={{ borderTop: 1, mt: 4, mb: 4, borderColor: '#dedede' }}>
              <Button variant="outlined" sx={{ mt: 4, mb: 2, p:1, width: 1, borderRadius: '25px', border: 1, borderColor: '#dedede' }}>
                Sign Up with Google
              </Button>
              <Typography sx={{ textAlign: 'center'}}>Already have an account? <Link to="/login"><Button>Sign In</Button></Link></Typography>              
          </Box>
        </Grid>
      </Grid>
    )
}

export default Register