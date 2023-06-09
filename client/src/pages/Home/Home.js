import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Grid, Typography} from '@mui/material';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Newsfeed from '../../components/Newsfeed/Newsfeed';
import Loading from '../../components/Loading/Loading';

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
    console.log('general ... ')
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }else{
      if(!isError){
        console.log('no error')
        dispatch(getAllPosts())
        console.log(posts)
      }
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, navigate, dispatch])

  return (
    <>
      <Header/>
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={9} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>          
          {isLoading ? (
              <Loading />
            ) : (
              <Box>
                {posts.length != 0 ? (
                  <>
                    {posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
                      <Box key={index}>
                        <Newsfeed post={post}/>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography>No post yet</Typography>
                )}
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