import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Grid} from '@mui/material';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comment from '../../components/Comments/Comments';
import Newsfeed from '../../components/Newsfeed/Newsfeed';

import { getAllPosts, reset } from '../../features/Post/PostSlice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  // destructure the states
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }else{
      console.log('user is here')
      if (!isError) {
        dispatch(getAllPosts())
      }
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, navigate, dispatch])

  return (
    <>
      <Box sx={{position: 'fixed', width: '100%', zIndex: '2'}}>
        <Box className="header_wrap">
          <Header/>
        </Box>
      </Box>

      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={9} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>          
          {isLoading ? (
              <Box> data is still loading </Box>
            ) : (
              <Box>
              {posts.map((post) => (
                <Box key={post._id}>
                  <Newsfeed post={post}/>
                </Box>
              ))}
              </Box>
          )}
        </Grid>
        <Grid item xs={0} sm={3} sx={{position: 'relative'}}>
          <Sidebar />
        </Grid>
      </Grid>      
    </>
  )
}

export default Home;