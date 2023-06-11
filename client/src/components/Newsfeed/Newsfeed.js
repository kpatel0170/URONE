import React, { useState } from 'react';
import SimpleImageSlider from "react-simple-image-slider";

import { ImageListItem, ImageList, Button, Modal, Box, Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse, Menu, MenuItem, } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import Comment from '../../components/Comments/Comments';
import Slider from '../Slider/Slider';
import PostForm from '../Post/PostForm';
import styles from './Newsfeed.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { deletePost, likePost, disLikePost } from '../../features/Post/PostSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '38%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};

function Newsfeed(post) {
    const baseUrl = 'https://rone.onrender.com/posts/';
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const [isComment, setIsComment] = useState(false);
    const [isReadMore, setIsReadMore]= useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [toggle, setToggle] = useState(null);
    const [modal, setModal] = useState(false)    
    
    const gallery = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKqzLsJt9070EqnI1b1eMuPyXNZSTqzTpRg&usqp=CAU',        
        'https://cdn.shopify.com/s/files/1/1555/7781/products/Sunflowersdetail_1024x1024.jpg?v=1616990879',
        'https://t4.ftcdn.net/jpg/05/35/33/39/360_F_535333922_tBGFT4qC3bLUrnKWWQhj8pXHS1cQIuFK.jpg',
        'https://marketplace.canva.com/EAEthkBVLfQ/1/0/1600w/canva-blush-wave-desktop-wallpaper-drvq3zaYl2E.jpg',
        'https://marketplace.canva.com/EAFJd1mhO-c/1/0/900w/canva-colorful-watercolor-painting-phone-wallpaper-qq02VzvX2Nc.jpg'
    ];

    const isToggle = Boolean(toggle);
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
        setToggle(null);
        if(event.target.innerText === 'Delete Post'){
            console.log('delete the current post', post.post._id)
            setModal(true);
        }
    };

    const modalHandler = (type) => {
        console.log(type)
        if(type === 'edit'){
            setIsEdit(true);
            console.log(post.post)
        }
        setModal(true);
        setToggle(null);
    }

    const modalCloseHandler = () => {
        setModal(false);
        setIsEdit(false);
    };

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
            //     <Box sx={{marginX: 2}}>
            //     <ImageList cols={3} rowHeight={164} sx={{paddingTop: 0}}>
            //         {data.map((item) => (
            //             <ImageListItem key={item}>
            //                 <img
            //                     src={`${baseUrl+item}?w=164&h=164&fit=crop&auto=format`}
            //                     srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            //                     alt={item}
            //                     loading="lazy"
            //                     className={styles.gallery_img}
            //                 />
            //             </ImageListItem>
            //         ))}
            //     </ImageList>
            // </Box>
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
                        {post.post.userId?.profilePicture.length != 0 ?                                     
                            (
                                <Avatar alt="profile" src={baseUrl + post.post.userId?.profilePicture} />
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
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: '#rgba(0, 0, 0, 0.87)', fontSize: '0.875rem'}}>{post.post.userId?.name}</Typography>
                            <Box sx={{paddingX: '8px'}}><Box sx={{width: '3px', height: '3px', background: '#95969c', borderRadius: '50%'}}></Box></Box>
                            <Typography sx={{color: '#rgba(0, 0, 0, 0.87)', fontSize: '0.875rem', textTransform: 'capitalized'}}>{post.post.userId?.type}</Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.875rem'}}>{post.post.createdAt.slice(0, 10)}</Typography>
                            <Typography sx={{paddingX: '3px', color: '#1e6ab5', fontWeight: 'bold', fontSize: '0.875rem'}}>:</Typography>
                            <Typography sx={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.875rem'}}>{post.post.createdAt.slice(11, 16)}</Typography>
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
            <Menu
                id="profile-menu"
                anchorEl={toggle}
                open={isToggle}
                onClose={hideToggleHandler}
                MenuListProps={{
                'aria-labelledby': 'profile-button',
                }}
            >
                <MenuItem name="delete_post" onClick={() => modalHandler('delete')} sx={{ width: '250px'}}><DeleteOutlineIcon name="delete_post" sx={{paddingRight: 1}} /> Delete Post</MenuItem>
                {/* <MenuItem name="edit_post" onClick={() => modalHandler('edit')} sx={{ width: '250px'}}><DeleteOutlineIcon name="delete_post" sx={{paddingRight: 1}} /> Edit Post</MenuItem> */}
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
                    </Box> 
                    {renderImageSlider(gallery)}                
                    */}
                    {renderImageSlider(post.post.image)}
                </>
            }

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
            {!isEdit  ? (
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
                                <Button onClick={modalCloseHandler} type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                                <Button onClick={deletePostHandler} variant="contained" color="error" sx={{ width: 1.9/4, boxShadow: 'none' }}>Yes, Delete Post</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <>
                    <Box sx={style}>
                        <Box sx={{position: 'absolute', right: '10px', top: '10px'}}>
                            <IconButton aria-label="close" onClick={modalCloseHandler}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <PostForm onModalClose={modalCloseHandler} data={post.post}/>
                    </Box>
                </>
            )}
        </Modal>
        </>
    )
}

export default Newsfeed;