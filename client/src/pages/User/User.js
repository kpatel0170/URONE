import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/Header/Header';
import Newsfeed from '../../components/Newsfeed/Newsfeed';
import PostForm from '../../components/Post/PostForm';
import styles from "../Home/Home.module.css";

import { getAllPosts, reset } from '../../features/Post/PostSlice';
import { getSingleUser } from '../../features/User/UserSlice';
import Loading from '../../components/Loading/Loading';

function User() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isDrawerOpen = useSelector((state) => state.drawer.isDrawer);
    const [isClicked, setIsClicked] = useState(false);
    const currentUser = useSelector((state) => state.users.singleUser);
    const {user} = useSelector((state) => state.auth)
    const { posts, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.post
    )
    const {singleUser} = useSelector((state) => state.users)
    
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
        console.log('hi')
        if (isError) {
            console.log(message)
        }

        if (!user) {
            navigate('/login')
        }else{
            if(!isError){
                console.log(currentUser)
                let param = {type: 'userId', value: currentUser._id}
                dispatch(getAllPosts(param))
                dispatch(getSingleUser(currentUser._id))
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
                    <Box sx={{width: '570px'}} className={isClicked ? `${styles.content_active} ${styles.main_content_wrap}` : styles.main_content_wrap}>
                        <Box sx={{marginY: 4}}>
                            <Box sx={{display: 'flex'}}>
                                <Box>
                                    {currentUser.profilePicture.length === 0 ? (
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginBottom: 3, width: '150px', height: '150px', background: '#282424', borderRadius: '50%', border: '6px solid #fff'}}>
                                            <Box sx={{color: "#85868f",}}>
                                                <PersonOutlineIcon sx={{fontSize: '2.5rem', opacity: '0.7'}} />
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box sx={{marginBottom: 3, width: '150px', height: '150px', background: 'whitesmoke', borderRadius: '50%', border: '6px solid #fff'}}>
                                            <img src={currentUser.profilePicture} className='nopost_img' />
                                        </Box>
                                    )}
                                </Box>
                                <Box sx={{marginLeft: 5, marginTop: 3}}>
                                    <Box>
                                        <Typography sx={{fontSize: '1.25rem', lineHeight: '1.2', color: '#333'}} className="title_txt">{currentUser.name}</Typography>
                                    </Box>
                                    <Box sx={{marginBottom: 3, marginTop: 1}}><Typography sx={{background: '#444', fontSize: '0.8rem', color: '#fff', display: 'table', borderRadius: '25px', padding: '2px 7px'}}>{currentUser.type}</Typography></Box>
                                    <>{(!isLoading && currentUser._id !== undefined) && <Box sx={{display: 'flex', alignItems: 'center'}}> <Typography sx={{paddingRight: 1, color: '#939393'}}>Posts:</Typography> <Typography sx={{color: '#333'}}>{posts.length}</Typography></Box>}</>
                                </Box>
                            </Box>
                        </Box>
                        {isLoading ? <Loading /> : <>
                            {posts.length != 0 ? (
                                <>
                                    {posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => (
                                        <Box key={index}>
                                        <Newsfeed post={post}/>
                                        </Box>
                                    ))}
                                </>
                            ) : (
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column'}}>
                                <Box sx={{marginBottom: 3, width: '250px', height: '250px', background: 'whitesmoke', borderRadius: '50%', border: '4px solid #fff'}}>
                                    <img className='nopost_img' src={process.env.PUBLIC_URL + '/nopost_icon.png'} alt="rOne" />
                                </Box>
                                <Typography sx={{color: '#565252'}} className='title_txt'>You have no post yet.</Typography>
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

export default User