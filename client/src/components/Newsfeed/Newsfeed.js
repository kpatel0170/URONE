import React, { useState } from 'react';

import { Button, Modal, Box, Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse, Menu, MenuItem, } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import Comment from '../../components/Comments/Comments';
import styles from './Newsfeed.module.css';

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

    const images = [
        'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80',
        'https://media1.popsugar-assets.com/files/thumbor/LVytyEgKryOQhGCoQis8Uudzpp0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/09/23/953/n/1922507/c3018d08a1be257e_pexels-sharon-mccutcheon-3713892/i/Pastel-iPhone-Wallpaper.jpg']
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

    const deletePostHandler = (event)=> {
        setModal(false);
        dispatch(deletePost(post.post._id))
    }

    const likeHandler = (event) => {
        const data = {
            'id': post.post._id,
            'userId': user.data._id
        }
        
        dispatch(likePost(data))
    }

    const likeHandler1 = (event) => {
        const data = {
            'id': post.post._id,
            'userId': user.data._id
        }
        
        dispatch(disLikePost(data))
    }

    return (
        <>
        {user && 
        <Card key={post.post._id} sx={{ maxWidth: 540, mt: 3, padding: 2, marginBottom: 2 }} className={styles.card_wrap}>                        
            <CardHeader
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
            />

                <Menu
                    id="profile-menu"
                    anchorEl={toggle}
                    open={isToggle}
                    onClose={hideToggleHandler}
                    MenuListProps={{
                    'aria-labelledby': 'profile-button',
                    }}
                    
                >
                    <MenuItem name="delete_post" onClick={hideToggleHandler} sx={{ width: '250px'}}><DeleteOutlineIcon sx={{paddingRight: 1}} /> Delete Post</MenuItem>
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
                <Box sx={{margin: 2}}>
                    <CardMedia
                        component="img"
                        image="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                        alt="Paella dish"
                        sx={{height: '250px'}}
                    />
                </Box>
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
                    <IconButton aria-label="down-voting" onClick={likeHandler1} style={{ color: post.post.dislikes.includes(user.data._id) ? '#1976d2' : '' }}>
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
            <Box sx={style}>
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
                            <Button onClick={modalCloseHandler} variant="contained" sx={{ width: 1.9/4, color: 'black', background: 'gray'}}>No</Button>
                            <Button onClick={deletePostHandler} variant="contained" color="error" sx={{ width: 1.9/4 }}>Yes, Delete Post</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
        </>
    )
}

export default Newsfeed;