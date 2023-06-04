import React from 'react';
import { Typography, Box, TextField, IconButton, Avatar} from '@mui/material';
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

            <Box>
                <Box sx={{marginTop: 2, borderRadius: 2, padding: 2, background: '#e6e7ee'}}>
                    <Typography sx={{fontSize: '0.875rem', lineHeight: '1.2', marginBottom: 1}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
                            sx={{ width: 27, height: 27 }}
                        />
                        <Typography variant="subtitle1" sx={{fontWeight: '500', pr: 1, pl: 1}}>David</Typography>
                        <Box sx={{width: '3px', height: '3px', background: '#95969c', borderRadius: '50%'}}></Box>
                        <Typography variant="subtitle1" sx={{fontSize: '0.8rem', lineHeight: '2.2', pl: 1}}>2023-05-31</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Comment;