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
      error_name: '',
      error_email: '',
      error_password: '',
      error_confirmPassword: ''
  });

  const { error_name, error_email, error_password, error_confirmPassword } = formError;

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

  }

  const registerFormHandler = (event) => {
      event.preventDefault();

      if(password != confirmPassword) {
        console.log("password do not match")
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
        <Grid item xs={10} sm={3} sx={{mt: 6}}>
          <Typography sx={{mb: 6, textAlign: 'center', fontWeight: 'bold', fontSize: 'h6.fontSize'}}>rOne</Typography>            
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
                      placeholder="********"
                      sx={{width:1}}
                      className={styles.user_input}
                      />
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