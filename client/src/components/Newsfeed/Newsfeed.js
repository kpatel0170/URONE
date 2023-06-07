import React, { useState } from 'react';

import { Box, Typography, Grid, Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, IconButton, Collapse } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Comment from '../../components/Comments/Comments';
import styles from './Newsfeed.module.css';

function Newsfeed(post) {
    console.log(post)
    const [isComment, setIsComment] = useState(false);

    const showCommentHandler = () => {
        setIsComment(!isComment);
    };

    return (
        
        <Card key={post.post._id} sx={{ maxWidth: 540, mt: 3, padding: 2, marginBottom: 2 }} className={styles.card_wrap}>
            <CardHeader
                avatar={
                    <Avatar 
                    aria-label="user-avatar"
                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80">
                    R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                    <MoreVertIcon />
                    </IconButton>
                }
                title={post.post.userId?.name}
                subheader={post.post.createdAt}
            />
            {post.post.text && 
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.post.text}
                    </Typography>
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