import React, { useState } from 'react';

import { Box, Typography, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse, Menu, MenuItem, } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Comment from '../../components/Comments/Comments';
import styles from './Newsfeed.module.css';

import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/Post/PostSlice';

function Newsfeed(post) {
    const dispatch = useDispatch();

    const [isComment, setIsComment] = useState(false);
    const [isReadMore, setIsReadMore]= useState(true);
    const [toggle, setToggle] = useState(null);
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
        console.log(event.target)
        console.log(event.target.name)
        console.log("current post", post)
        setToggle(null);
        if(event.target.innerText === 'Delete Post'){
            console.log('delete the current post', post.post._id)
            dispatch(deletePost(post.post._id))
        }
    };

    return (
        
        <Card key={post.post._id} sx={{ maxWidth: 540, mt: 3, padding: 2, marginBottom: 2 }} className={styles.card_wrap}>                        
            <CardHeader
                avatar={
                    <Avatar 
                    aria-label="user-avatar"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80">                    
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={enableToggleHandler}>
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
                <CardContent>
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
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
            </CardActions>

            <Collapse in={isComment} timeout="auto">
                <CardContent sx={{paddingTop: 0}}>
                    <Comment />
                </CardContent>
            </Collapse>
        </Card>
        
    )
}

export default Newsfeed;