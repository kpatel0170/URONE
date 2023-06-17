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
    console.log('render drawer check from home ... ', isDrawerOpen)
    if(isDrawerOpen === true){
      setIsClicked(!isClicked);
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
      <Header activateDrawer={handleDrawer}/>
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        {/* <Box sx={{marginTop: 8}}> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=" /> {isDrawerOpen}</Box> */}
        <Grid item xs={12} sm={12} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>         
          <Box className={(isClicked || isDrawerOpen) ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
            {posts.length != 0 ? (
              <>
                {/* {isLoading && <Loading />} */}
                {posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
                  <Box key={index}>
                    <Newsfeed post={post}/>
                  </Box>
                ))}
              </>
            ) : (
              <>
                {isLoading && <Loading />}
              </>
            )}
          </Box>
          
          {/* create */}
          {/* {!selectedPost &&
          <>
            <Box className={styles.drawer_container}>
              <Box className={isClicked ? `${styles.drawer_active} ${styles.drawer_wrapper}` : `${styles.drawer_hidden} ${styles.drawer_wrapper}`}>
                <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
              </Box>
            </Box>
          </>
          } */}

          {/* edit */}
          {/* {selectedPost && 
            <>
              <Box className={styles.drawer_container}>
                <Box className={(selectedPost || isDrawerOpen) ? `${styles.drawer_active} ${styles.drawer_wrapper}` : `${styles.drawer_hidden} ${styles.drawer_wrapper}`}>
                  <PostForm deactivtateDrawer={handleDrawer} data={defaultData} />
                </Box>
              </Box>
            </>
          } */}

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

export default Home;