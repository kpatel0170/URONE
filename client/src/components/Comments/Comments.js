import React from 'react';
import { Button, Typography, Box, TextField, IconButton, OutlinedInput, InputAdornment, FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styles from "./Comments.module.css";

const Comment = props => {    

    return(
        <Box sx={{ borderTop: 1, borderColor: '#dcdcdc', paddingTop: 3}}>
            <form>
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
        </Box>
    )
}
export default Comment;