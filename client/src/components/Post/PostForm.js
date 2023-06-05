import react, { useState } from 'react';
import { Button, Typography, Box, TextField, Switch, FormControlLabel, IconButton } from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export default function PostForm() {

    // initialize values
    const [formData, setFormData] = useState({
        post: '',
        images: [],
        up: false,
        down: false,
        comment: false,
        share: false,
        checkAll: false
    });
    const {post, images, up, down, comment, share, checkAll} = formData;    
    
    const formInputHandler = (event) => {
        let {name, checked} = event.target;        

        if (name === 'checkAll') {
            console.log('in the if')
            setFormData((prevState) => ({
                ...prevState,
                up: checked,
                down: checked,
                comment: checked,
                share: checked,
                [event.target.name]: event.target.checked
            }));
        } else if(name === 'post'){
            setFormData((prevState) => ({
                ...prevState, 
                [event.target.name]: event.target.value,
            }));
        } else {
            console.log('in the else')
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked
            }));
        }
    };

    const postFormHandler = (event) => {
        event.preventDefault();
        console.log("hello ...")
        const postFormData = {
            post,
            images,
            up,
            down,
            comment,
            share
        }

        console.log(postFormData)
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: '#dcdcdc', marginBottom: 3, paddingBottom: 2}}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                    Create Post
                </Typography>
            </Box>
            <form onSubmit={postFormHandler}>                
                <TextField
                    id="post"
                    name="post"
                    onChange={formInputHandler}
                    value={post}
                    label="What's up ..."
                    multiline
                    rows={4}
                    sx={{width:1}}
                    />
                {/* <IconButton>
                    <PhotoLibraryIcon />
                </IconButton> */}
                
                <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: '#dcdcdc', marginTop: 3, marginBottom: 3, paddingBottom: 2, paddingTop: 2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold', marginBottom: 2}}>Manage Post</Typography>                        
                        <FormControlLabel
                            control={
                                <Switch checked={formData.checkAll} onChange={formInputHandler} name="checkAll" />
                            }
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: 2, paddingLeft: 2}}>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.up} onChange={formInputHandler} name="up" />
                                }
                            />
                            <ThumbUpOffAltIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.down} onChange={formInputHandler} name="down" />
                                }
                            />
                            <ThumbDownOffAltIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.comment} onChange={formInputHandler} name="comment" />
                                }
                            />
                            <ChatBubbleOutlineIcon />
                        </Box>
                        <Box>
                            <FormControlLabel
                                control={
                                    <Switch checked={formData.share} onChange={formInputHandler} name="share" />
                                }
                            />
                            <ShareIcon />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ marginBottom: 3, paddingBottom: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <Button type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Cancel</Button>
                    <Button type="submit" variant="outlined" sx={{p:1, width: '48%', border: 1, borderColor: '#dedede'}}>Post</Button>
                </Box>
            </form>
        </>
    )
}
