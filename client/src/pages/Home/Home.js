import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Grid, Typography, Drawer, Button} from '@mui/material';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Newsfeed from '../../components/Newsfeed/Newsfeed';
import Loading from '../../components/Loading/Loading';
import PostForm from '../../components/Post/PostForm';

import { getAllPosts, reset } from '../../features/Post/PostSlice';
import { toggleDrawer } from '../../features/Home/HomeSlice';
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )
  const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
  const selectedPost = useSelector((state) => state.post.selectedPost);
  const selectedNav = useSelector((state) => state.nav.selectedNav);
  const [isClicked, setIsClicked] = useState(false);
  const defaultData1 = {'title': '','text': '', 'image': []}; 
  const [defaultData, setDefaultData] = useState({
    title: '',
    text: '', 
    image: []
  });

  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

  useEffect(() => {
    if(isDrawerOpen === true){
      setIsClicked(true);
    }else{
      setIsClicked(false);
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }else{
      if(!isError){
        console.log(selectedNav)
        switch (selectedNav) {
          case 'all':
            dispatch(getAllPosts())
            break;
          case 'professor':
            let param = {type: 'usertype', value: selectedNav}
            dispatch(getAllPosts(param))
            break;
          case 'staff':
            let param1 = {type: 'usertype', value: selectedNav}
            dispatch(getAllPosts(param1))
            break;
          default:
            dispatch(getAllPosts())
        }
      }
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user, isError, selectedNav, message, navigate, dispatch])

  return (
    <>
    <Header activateDrawer={handleDrawer} />
    <Grid container sx={{ height: '100vh', paddingTop: 7 }}>
      <Grid item xs={12} sm={12} sx={{ width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
        <Box className={(isClicked || isDrawerOpen) ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
          {isLoading && <Loading />}
          {(posts?.length === 0 && !isLoading) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
              <Box sx={{ marginBottom: 3, width: '250px', height: '250px', background: 'whitesmoke', borderRadius: '50%', border: '4px solid #fff' }}>
                <img className='nopost_img' src={process.env.PUBLIC_URL + '/nopost_icon.png'} alt="rOne" />
              </Box>
              <Typography sx={{ color: '#565252' }} className='title_txt'>No posts found</Typography>
            </Box>
          ) : (
            posts?.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
              <Box key={index}>
                <Newsfeed post={post} />
              </Box>
            ))
          )}
        </Box>
        {/* <>
          <Box className={styles.drawer_container}>
            <Box className={isClicked ? `${styles.drawer_active} ${styles.drawer_wrapper}` : `${styles.drawer_hidden} ${styles.drawer_wrapper}`}>
              <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
            </Box>
          </Box>
        </> */}
      </Grid>
    </Grid>
  </>
  )
}

export default Home;