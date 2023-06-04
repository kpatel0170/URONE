import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, Grid, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getAllPosts, reset } from '../../features/Post/PostSlice';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  // destructure the states
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    // if(!user){
    //   navigate('/login')
    // }

    dispatch(getAllPosts());

    return() => {
      dispatch(reset());
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
        <Grid item xs={9} sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>
          <Card sx={{ maxWidth: 480, mt: 3 }} className={styles.card_wrap}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  {/* <svg width="20" height="20" viewBox="0 0 32 32"><path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/><path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/><path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/></svg> */}
                  <MoreVertIcon />
                </IconButton>
              }
              title="David"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <Box sx={{margin: 2}}>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                alt="Paella dish"
                sx={{height: '250px'}}
              />
            </Box>
            
            <CardActions disableSpacing sx={{ borderTop: 1, borderColor: '#dcdcdc', m: 2, justifyContent: 'space-between' }}>              
              <IconButton aria-label="add to favorites">
                <ThumbUpOffAltIcon />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <ThumbDownOffAltIcon />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <ChatBubbleOutlineIcon />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} sx={{position: 'relative'}}>
          <Sidebar />
        </Grid>
      </Grid>      
    </>
  )
}

export default Home;