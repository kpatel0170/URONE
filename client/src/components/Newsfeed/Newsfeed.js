import React, { useState } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

import { Button, Modal, Box, Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse, Menu, MenuItem, } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import Comment from '../../components/Comments/Comments';
import styles from './Newsfeed.module.css';

import Slider from '../Slider/Slider';

import { useSelector, useDispatch } from 'react-redux';
import { deletePost, likePost, disLikePost } from '../../features/Post/PostSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};

function Newsfeed(post) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const [isComment, setIsComment] = useState(false);
    const [isReadMore, setIsReadMore]= useState(true);
    const [toggle, setToggle] = useState(null);
    const isToggle = Boolean(toggle);

    const [modal, setModal] = useState(false)
    const modalCloseHandler = () => setModal(false);

    const baseUrl = 'https://rone.onrender.com/posts/';

    const images = [
        'https://www.researchgate.net/publication/352855059/figure/fig1/AS:1040501021097984@1625086183640/a-Sample-Image-of-size-64x64.ppm',
        'https://media1.popsugar-assets.com/files/thumbor/LVytyEgKryOQhGCoQis8Uudzpp0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/09/23/953/n/1922507/c3018d08a1be257e_pexels-sharon-mccutcheon-3713892/i/Pastel-iPhone-Wallpaper.jpg',
        'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80']
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const nextSlide = () => {
        setCurrentImgIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const prevSlide = () => {
        setCurrentImgIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const showCommentHandler = () => {
        setIsComment(!isComment);
    };

    const readMoreHandler = () => {
        setIsReadMore(!isReadMore)
    }

    const enableToggleHandler = (event) => {
        setToggle(event.currentTarget);
    };

    const hideToggleHandler = (event) => {
        console.log(event.target)
        console.log(event.target.name)
        console.log("current post", post)
        setToggle(null);
        if(event.target.innerText === 'Delete Post'){
            console.log('delete the current post', post.post._id)
            setModal(true);
            
        }
    };

    const showDeletePostModal = (event) => {
        setModal(true);
        setToggle(null);
    }

    const deletePostHandler = (event)=> {
        setModal(false);
        dispatch(deletePost(post.post._id))
    }

    const likeHandler = (event) => {
        console.log('like handler from post list[newsfeed]')
        const data = {
            'id': post.post._id,
            'userId': user.data._id
        }
        
        dispatch(likePost(data))
    }

    const dislikeHandler = (event) => {
        const data = {
            'id': post.post._id,
            'userId': user.data._id
        }
        
        dispatch(disLikePost(data))
    }

    const renderImageSlider = (data) => {
        if(data.length === 1){
            return (
                <Box sx={{paddingX: 2}}>
                    {data.map((sliderImage, index) => {
                        return (
                            <Box key={index}>
                                <CardMedia
                                    component="img"
                                    image={baseUrl + sliderImage}
                                    alt="rone_image"
                                    sx={{height: '350px'}}
                                />
                            </Box>
                        )
                    })}
                </Box>
            )
        }else{
            return (
                <Slider media={data} />
            )
        }
    }

    return (
        <>        
        {user && 
        <Card key={post.post._id} sx={{ maxWidth: 540, mt: 3, padding: 2, marginBottom: 2 }} className={styles.card_wrap}>                        
            <Box sx={{display: 'flex', justifyContent: 'space-between', padding: 2}}>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box>
                        {post.post.userId?.profilePicture != undefined ?                                     
                            (
                                <Avatar sx={{border: 2, borderColor: '#1473E6'}} alt="profile" src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" />
                            ) :
                            (   <Box sx={{display: 'flex'}}>
                                    <Box sx={{color: '#85868f', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: '#e6e7ee'}}>
                                        <PersonOutlineIcon />
                                    </Box>
                                </Box>
                            )
                        }
                    </Box>
                    <Box sx={{paddingLeft: 2}}>
                        <Box>
                            <Typography sx={{color: '#rgba(0, 0, 0, 0.87)', fontSize: '0.875rem'}}>{post.post.userId?.name}</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.875rem'}}>{post.post.createdAt.slice(0, 10)}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box>
                    <IconButton 
                            aria-label="settings" 
                            onClick={enableToggleHandler}
                            style={{ display: post.post.userId?._id === user.data._id ? 'flex' : 'none' }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                </Box>
            </Box>
            
            {/* <CardHeader
                avatar={
                    <Avatar 
                    aria-label="user-avatar"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80">                    
                    </Avatar>
                }
                action={
                    <IconButton 
                        aria-label="settings" 
                        onClick={enableToggleHandler}
                        style={{ display: post.post.userId?._id === user.data._id ? 'flex' : 'none' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.post.userId?.name}
                subheader={post.post.createdAt.slice(0, 10)}
            /> */}
                <Menu
                    id="profile-menu"
                    anchorEl={toggle}
                    open={isToggle}
                    onClose={hideToggleHandler}
                    MenuListProps={{
                    'aria-labelledby': 'profile-button',
                    }}
                >
                    <MenuItem name="delete_post" onClick={showDeletePostModal} sx={{ width: '250px'}}><DeleteOutlineIcon name="delete_post" sx={{paddingRight: 1}} /> Delete Post</MenuItem>
                </Menu>
            {post.post.text && 
                <CardContent sx={{paddingTop: 0}}>
                    <Box>
                        {post.post.text.length > 250 ?
                            <>
                                {isReadMore ? (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.post.text.slice(0, 250) + `...` } 
                                            <span onClick={readMoreHandler} className={styles.readmore}> read more</span>
                                        </Typography>
                                    </>
                                ) :                                 
                                (
                                    <>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.post.text } 
                                            <span onClick={readMoreHandler} className={styles.readmore}> read less</span>
                                        </Typography>
                                    </>
                                )}
                            </> 
                        : 
                            <Typography variant="body2" color="text.secondary">
                                {post.post.text } 
                            </Typography>
                        }                        
                    </Box>

                    
                </CardContent>
            }
            {post.post.image.length != 0 &&

                
                

                <>
                {/* <Box sx={{width: 1, position: 'relative'}}>
                    <SimpleImageSlider
                        width="100%"
                        height={250}
                        position="relative"
                        images={images}
                        showBullets={true}
                        showNavs={true}
                    />
                </Box> */}
                
                {renderImageSlider(post.post.image)}
                {/* <Box className="image-slider" sx={{display: 'flex'}}>
                    {post.post.image.map((image, index) => (
                        <Box key={index}>
                            <CardMedia
                                component="img"
                                image={baseUrl + post.post.image[index]}
                                alt="rone_image"
                                sx={{height: '250px'}}
                            />
                        </Box>
                    ))}
                </Box> */}
                {/* <Box className="image-slider" sx={{display: 'flex'}}>
                    {post.post.image.map((image, index) => (
                        <Box key={index}>
                            <img src={baseUrl + post.post.image[index]} sx={{height: '250px'}}/>
                        </Box>
                    ))}
                </Box> */}
                </>
            }   
            

            {/* image slider */}
            {/* <div className="image-slider">
                <button onClick={prevSlide}>Previous</button>
                <img src={images[currentImgIndex]} alt="Slider" />
                <button onClick={nextSlide}>Next</button>
            </div> */}


            <CardActions disableSpacing sx={{ borderTop: 1, borderColor: '#dcdcdc', m: 2, marginBottom: 0, justifyContent: 'space-between' }}>              
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {post.post.likes.length != 0 &&
                        <Typography sx={{marginRight: 1}}>{post.post.likes.length}</Typography>
                    }
                    <IconButton aria-label="up-voting" onClick={likeHandler} style={{ color: post.post.likes.includes(user.data._id) ? '#1976d2' : '' }}>
                        <ThumbUpOffAltIcon />
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {post.post.dislikes.length != 0 &&
                        <Typography sx={{marginRight: 1}}>{post.post.dislikes.length}</Typography>
                    }
                    <IconButton aria-label="down-voting" onClick={dislikeHandler} style={{ color: post.post.dislikes.includes(user.data._id) ? '#1976d2' : '' }}>
                        <ThumbDownOffAltIcon />
                    </IconButton>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {post.post.comments.length != 0 &&
                        <Typography sx={{marginRight: 1}}>{post.post.comments.length}</Typography>
                    }
                    <IconButton aria-label="comment" onClick={showCommentHandler}>
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                </Box>
            </CardActions>

            <Collapse in={isComment} timeout="auto">
                <CardContent sx={{paddingTop: 0}}>
                    <Comment comment={post.post}/>
                </CardContent>
            </Collapse>
        </Card>
        }
        <Modal
            open={modal}
            onClose={modalCloseHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='styles.backdrop_wrap'
        >

            <Box className="modal_wrap" sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 1}}>
                <Box sx={{position: 'absolute', right: '10px', top: '10px'}}>
                    <IconButton aria-label="close" onClick={modalCloseHandler}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box>
                    <Box sx={{ borderBottom: 1, borderColor: '#dfdfdf', padding: 2, alignContent: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>                        
                        <Typography variant="h6">Delete Post !</Typography>
                    </Box>
                    <Box sx={{paddingY: 1}}>
                        <Typography sx={{paddingY: 2}}>Are you sure you want to delete your post?</Typography>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            {/* <Button onClick={modalCloseHandler} variant="contained" sx={{ width: 1.9/4, color: 'black', background: 'rgb(0 0 0 / 10%)', boxShadow: 'none'}} className="cancel_btn">No</Button> */}
                            <Button onClick={modalCloseHandler} type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                            <Button onClick={deletePostHandler} variant="contained" color="error" sx={{ width: 1.9/4, boxShadow: 'none' }}>Yes, Delete Post</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
        </>
    )
}

export default Newsfeed;