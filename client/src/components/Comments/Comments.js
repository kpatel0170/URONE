import React from 'react';
import { Typography, Box, TextField, IconButton, Avatar} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from "./Comments.module.css";

import { useSelector, useDispatch } from 'react-redux';

const Comment = (comment) => {  
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)  

    const submitCommentHandler = (event) => {
        event.preventDefault();

        console.log(comment)
    }

    return(
        <Box sx={{ borderTop: 1, borderColor: '#dcdcdc', paddingTop: 3}}>
            <form onClick={submitCommentHandler}>
                <Box sx={{ display: 'flex', position: 'relative' }}>
                    <TextField 
                        id="comment" 
                        name="comment"
                        type="text" 
                        placeholder="Write your comment ..."
                        sx={{width:1}}
                        className={styles.form_wrap}
                        />
                    <IconButton aria-label="comment-send" sx={{position: 'absolute', right: '10px', top: '10px'}}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </form>
            
            {comment.comment.length != 0 ? (
                <Box>
                    {comment.comment.map((data) => (
                        <Box key={data._id} sx={{marginTop: 2, borderRadius: 2, padding: 2, background: '#e6e7ee'}}>
                            <Typography sx={{fontSize: '0.875rem', lineHeight: '1.2', marginBottom: 1}}>
                                {data.comment}
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                                    sx={{ width: 27, height: 27 }}
                                />
                                <Typography variant="subtitle1" sx={{fontWeight: '500', pr: 1, pl: 1}}>David</Typography>
                                <Box sx={{width: '3px', height: '3px', background: '#95969c', borderRadius: '50%'}}></Box>
                                <Typography variant="subtitle1" sx={{fontSize: '0.8rem', lineHeight: '2.2', pl: 1}}>{data.at.slice(0, 10)}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography sx={{marginTop: 2, textAlign: 'center', fontSize: '0.85rem', color: '#635e5e'}}>
                    <span>Hey {user.data.name}, </span>
                    be the first person to comment the post ...
                </Typography>
            )}
            
        </Box>
    )
}
export default Comment;