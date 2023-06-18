import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import Newsfeed from '../../components/Newsfeed/Newsfeed';
import PostForm from '../../components/Post/PostForm';
import styles from "../Home/Home.module.css";

import { getSinglePost, reset, setPostDetailId } from '../../features/Post/PostSlice';
import Loading from '../../components/Loading/Loading';

function SinglePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
  const [isClicked, setIsClicked] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )
  const { id } = useParams();
  const [defaultData, setDefaultData] = useState({
    title: '',
    text: '', 
    image: []
  });
  
  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

  useEffect(() => {
    console.log('render drawer check from home ... ', isDrawerOpen)
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
        dispatch(getSinglePost(id))
        console.log(posts)
        dispatch(setPostDetailId(id));
      }
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user])

  return (
    <>
      <Header activateDrawer={handleDrawer}/>
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={12} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>
          <Box className={isClicked ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
            {isLoading ? <Loading /> : <>
              {posts.length != 0 ? (
                <>
                  <Newsfeed post={posts} />
                </>
              ) : (
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
                  <Box sx={{marginBottom: 3, width: '250px', height: '250px', background: 'whitesmoke', borderRadius: '50%', border: '4px solid #fff'}}>
                    <img className='nopost_img' src={process.env.PUBLIC_URL + '/nopost_icon.png'} alt="rOne" />
                  </Box>
                  <Typography sx={{color: '#565252'}} className='title_txt'>The post you are finding does not exist</Typography>
                </Box>
              )}
            </>}
          </Box>
          <>
            <Box className={styles.drawer_container}>
              <Box className={isClicked ? `${styles.drawer_active} ${styles.drawer_wrapper}` : `${styles.drawer_hidden} ${styles.drawer_wrapper}`}>
                <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
              </Box>
            </Box>
          </>
        </Grid>
      </Grid>

      
    </>
  )
}

export default SinglePost