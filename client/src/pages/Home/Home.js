import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton } from '@mui/material';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

function Home() {
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if(!user){
  //     navigate('/login')
  //   }
  // }, [user, navigate])

  return (
    <>
      <Box sx={{position: 'fixed', width: '100%', zIndex: '2'}}>
        <Box className="header_wrap">
          <Header/>
        </Box>
      </Box>

      <Grid container sx={{height: '100vh'}}>
        <Grid item xs={9} sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Card sx={{ maxWidth: 480, mt: 3 }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <svg width="20" height="20" viewBox="0 0 32 32"><path d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z" id="XMLID_294_"/><path d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z" id="XMLID_295_"/><path d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z" id="XMLID_297_"/></svg>
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <Box>
              <CardMedia
                component="img"
                image="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                alt="Paella dish"
                sx={{height: '250px'}}
              />
            </Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ borderTop: 1, borderColor: '#dcdcdc', m: 2 }}>
              <IconButton aria-label="add to favorites">
                {/* <FavoriteIcon /> */}
              </IconButton>
              <IconButton aria-label="share">
                {/* <ShareIcon /> */}
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
      </Grid>      
    </>
  )
}

export default Home;