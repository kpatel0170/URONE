import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, Grid, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Comment from '../../components/Comments/Comments';
import { getAllPosts, reset } from '../../features/Post/PostSlice';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  // destructure the states
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )

  const [isComment, setIsComment] = useState(false);

  const showCommentHandler = () => {
    setIsComment(!isComment);
  };

  useEffect(() => {
    console.log(user)
    if(!user){
      navigate('/login')
    }

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
        <Grid item xs={12} sm={9} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>
          <Card sx={{ maxWidth: 540, mt: 3, padding: 2, marginBottom: 2 }} className={styles.card_wrap}>
            <CardHeader
              avatar={
                <Avatar 
                  aria-label="user-avatar"
                  src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="David"
              subheader="2023-05-31"
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
            
            <CardActions disableSpacing sx={{ borderTop: 1, borderColor: '#dcdcdc', m: 2, marginBottom: 0, justifyContent: 'space-between' }}>              
              <IconButton aria-label="up-voting">
                <ThumbUpOffAltIcon />
              </IconButton>
              <IconButton aria-label="down-voting">
                <ThumbDownOffAltIcon />
              </IconButton>
              <IconButton aria-label="comment" onClick={showCommentHandler}>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>

            <Collapse in={isComment} timeout="auto">
              <CardContent sx={{paddingTop: 0}}>
                <Comment />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={0} sm={3} sx={{position: 'relative'}}>
          <Sidebar />
        </Grid>
      </Grid>      
    </>
  )
}

export default Home;