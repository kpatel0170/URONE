import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
  Menu,
  MenuItem, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import Comment from "../../components/Comments/Comments";
import Slider2 from '../../components/Slider2/Slider2';

import styles from "../Home/Home.module.css";
import css from "../../components/Newsfeed/Newsfeed.module.css";

import { getSinglePost, reset } from '../../features/Post/PostSlice';
import Loading from '../../components/Loading/Loading';

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function SinglePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )
  const { id } = useParams();

  const [dropdown, setDropdown] = useState(false);

  const handleDrawer = (condition) => {
    setIsClicked(condition);
  };

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
      }
    }
    
    return () => {
      dispatch(reset())
    }
  }, [user])

  let typographyColor;
  switch (posts.userId?.type) {
    case 'student':
      typographyColor = '#f7c602';
      break;
    case 'professor':
      typographyColor = '#0aade2';
      break;
    case 'staff':
      typographyColor = '#634db7';
      break;
    case 'other':
      typographyColor = 'black';
      break;
    default:
      typographyColor = 'black';
  }

  const toggleDropdown = () =>{
    setDropdown(!dropdown)
  }

  return (
    <>
      <Header activateDrawer={handleDrawer}/>
      <Grid container sx={{height: '100vh', paddingTop: 7}}>
        <Grid item xs={12} sm={12} sx={{width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3}}>
          <Box className={isClicked ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
          {isLoading ? <Loading /> : <>
            {posts.length != 0 ? (
              <>
              <Card
                key={posts._id}
                sx={{ maxWidth: 570, width: 570, mt: 3, padding: 2, marginBottom: 2 }}
                className={css.card_wrap}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box>
                      {posts.userId?.profilePicture.length != 0 ? (
                        <>
                          <Box
                            sx={{
                              color: "#85868f",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              background: "#e6e7ee",
                            }}
                          >
                            <img className={styles.user_avatar} src={posts.userId?.profilePicture} />
                          </Box>
                        </>
                      ) : (
                        <Box sx={{ display: "flex" }}>
                          <Box
                            sx={{
                              color: "#85868f",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              background: "#e6e7ee",
                            }}
                          >
                            <PersonOutlineIcon />
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ paddingLeft: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{ color: "#rgba(0, 0, 0, 0.87)", fontSize: "0.875rem" }}
                        >
                          {posts.userId?.name}
                        </Typography>
                        <Box sx={{ paddingX: "8px" }}>
                          <Box
                            sx={{
                              width: "3px",
                              height: "3px",
                              background: "#95969c",
                              borderRadius: "50%",
                            }}
                          ></Box>
                        </Box>
                        <Typography
                          sx={{
                            textTransform: "capitalized",
                            background: typographyColor,
                            borderRadius: '25px',
                            padding: '2px 7px',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            color: '#fff'
                          }}
                        >
                          {posts.userId?.type}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "0.875rem" }}
                        >
                          {posts?.createdAt.slice(0, 10)}
                        </Typography>
                        <Typography
                          sx={{
                            paddingX: "3px",
                            color: "#1e6ab5",
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                          }}
                        >
                          :
                        </Typography>
                        <Typography
                          sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: "0.875rem" }}
                        >
                          {posts?.createdAt}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box>
                    <IconButton
                      aria-label="settings"
                      onClick={toggleDropdown}
                      style={{
                        display:
                          posts.userId?._id === user.data._id ? "flex" : "none",
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
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
        </Grid>
      </Grid>
    </>
  )
}

export default SinglePost